import { Activity, Eye, FileText, Heading, ImageIcon, LogOut, Mail, PenSquare, Plus, RefreshCcw, Trash2, Type, Users, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { clearAdminSession, getAdminProfile, getAdminToken } from '../../lib/adminAuth';
import { createBlog, deleteBlog, getAdminBlogs, getHealthStatus, getLeads, publishBlog, resolveMediaUrl, updateBlog, uploadBlogImage } from '../../lib/api';

const initialBlogForm = {
  title: '',
  image: '',
  status: 'draft',
};

const createBlock = (type = 'paragraph') => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  type,
  level: 2,
  text: '',
  url: '',
});

const initialBlogBlocks = [createBlock('paragraph')];

function normalizeContentToBlocks(content) {
  if (!content) {
    return [createBlock('paragraph')];
  }

  if (typeof content === 'string') {
    const paragraphs = content
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((text) => ({ ...createBlock('paragraph'), text }));

    return paragraphs.length ? paragraphs : [createBlock('paragraph')];
  }

  if (Array.isArray(content)) {
    const blocks = content.map((item) => ({
      ...createBlock(item?.type || 'paragraph'),
      type: item?.type || 'paragraph',
      level: Number(item?.level) || 2,
      text: typeof item?.text === 'string' ? item.text : '',
      url: typeof item?.url === 'string' ? item.url : '',
    }));

    return blocks.length ? blocks : [createBlock('paragraph')];
  }

  if (typeof content === 'object' && Array.isArray(content.blocks)) {
    return normalizeContentToBlocks(content.blocks);
  }

  return [createBlock('paragraph')];
}

function sanitizeBlocks(blocks) {
  const normalized = blocks
    .map((block) => {
      if (block.type === 'heading') {
        return {
          type: 'heading',
          level: Number(block.level) || 2,
          text: (block.text || '').trim(),
        };
      }

      if (block.type === 'image') {
        return {
          type: 'image',
          url: (block.url || '').trim(),
        };
      }

      if (block.type === 'spacer') {
        return {
          type: 'spacer',
        };
      }

      return {
        type: 'paragraph',
        text: (block.text || '').trim(),
      };
    })
    .filter((block) => {
      if (block.type === 'image') {
        return Boolean(block.url);
      }

      if (block.type === 'spacer') {
        return true;
      }

      return Boolean(block.text);
    });

  return normalized.length ? normalized : [{ type: 'paragraph', text: '' }];
}

function formatDate(dateValue) {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateValue));
}

function AdminDashboard() {
  const token = getAdminToken();
  const adminProfile = getAdminProfile();
  const [blogs, setBlogs] = useState([]);
  const [leads, setLeads] = useState([]);
  const [blogForm, setBlogForm] = useState(initialBlogForm);
  const [blogBlocks, setBlogBlocks] = useState(initialBlogBlocks);
  const [editingBlogId, setEditingBlogId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingTarget, setUploadingTarget] = useState('');
  const [pageMessage, setPageMessage] = useState({ type: '', text: '' });
  const [backendStatus, setBackendStatus] = useState('Checking backend');

  const loadDashboardData = async () => {
    setIsLoading(true);
    setPageMessage({ type: '', text: '' });

    try {
      const [healthResponse, blogResponse, leadResponse] = await Promise.all([
        getHealthStatus(),
        getAdminBlogs(token),
        getLeads(token),
      ]);

      setBackendStatus(healthResponse.status === 'ok' ? 'Connected' : 'Unexpected response');
      setBlogs(blogResponse);
      setLeads(leadResponse);
    } catch (error) {
      setBackendStatus('Unavailable');
      setPageMessage({ type: 'error', text: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const resetBlogForm = () => {
    setEditingBlogId('');
    setBlogForm(initialBlogForm);
    setBlogBlocks([createBlock('paragraph')]);
  };

  const handleBlogFieldChange = (event) => {
    const { name, value } = event.target;
    setBlogForm((current) => ({ ...current, [name]: value }));
  };

  const handleBlogSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setPageMessage({ type: '', text: '' });

    try {
      const contentBlocks = sanitizeBlocks(blogBlocks);
      const hasMeaningfulContent = contentBlocks.some((block) => {
        if (block.type === 'image') {
          return Boolean(block.url);
        }
        if (block.type === 'spacer') {
          return false;
        }
        return Boolean(block.text);
      });

      if (!hasMeaningfulContent) {
        throw new Error('Add at least one heading, paragraph, or image in content.');
      }

      const payload = {
        ...blogForm,
        content: contentBlocks,
      };

      if (editingBlogId) {
        await updateBlog(editingBlogId, payload, token);
        setPageMessage({ type: 'success', text: 'Blog updated successfully.' });
      } else {
        await createBlog(payload, token);
        setPageMessage({ type: 'success', text: 'Blog created successfully.' });
      }

      resetBlogForm();
      await loadDashboardData();
    } catch (error) {
      setPageMessage({ type: 'error', text: error.message });
    } finally {
      setIsSaving(false);
    }
  };

  const startEditing = (blog) => {
    setEditingBlogId(blog._id);
    setBlogForm({
      title: blog.title,
      image: blog.image || '',
      status: blog.status,
    });
    setBlogBlocks(normalizeContentToBlocks(blog.content));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addContentBlock = (type) => {
    setBlogBlocks((current) => [...current, createBlock(type)]);
  };

  const removeContentBlock = (id) => {
    setBlogBlocks((current) => {
      const updated = current.filter((block) => block.id !== id);
      return updated.length ? updated : [createBlock('paragraph')];
    });
  };

  const updateContentBlock = (id, patch) => {
    setBlogBlocks((current) => current.map((block) => (block.id === id ? { ...block, ...patch } : block)));
  };

  const uploadAndSetCoverImage = async (file) => {
    if (!file) {
      return;
    }

    try {
      setUploadingTarget('cover');
      const response = await uploadBlogImage(file, token);
      setBlogForm((current) => ({ ...current, image: response.url || response.image || '' }));
      setPageMessage({ type: 'success', text: 'Cover image uploaded.' });
    } catch (error) {
      setPageMessage({ type: 'error', text: error.message });
    } finally {
      setUploadingTarget('');
    }
  };

  const uploadAndSetContentImage = async (blockId, file) => {
    if (!file) {
      return;
    }

    try {
      setUploadingTarget(`content-${blockId}`);
      const response = await uploadBlogImage(file, token);
      updateContentBlock(blockId, { url: response.url || response.image || '' });
      setPageMessage({ type: 'success', text: 'Content image uploaded.' });
    } catch (error) {
      setPageMessage({ type: 'error', text: error.message });
    } finally {
      setUploadingTarget('');
    }
  };

  const handlePublish = async (blogId) => {
    try {
      await publishBlog(blogId, token);
      setPageMessage({ type: 'success', text: 'Blog published.' });
      await loadDashboardData();
    } catch (error) {
      setPageMessage({ type: 'error', text: error.message });
    }
  };

  const handleDelete = async (blogId) => {
    try {
      await deleteBlog(blogId, token);
      if (editingBlogId === blogId) {
        resetBlogForm();
      }
      setPageMessage({ type: 'success', text: 'Blog deleted.' });
      await loadDashboardData();
    } catch (error) {
      setPageMessage({ type: 'error', text: error.message });
    }
  };

  const handleLogout = () => {
    clearAdminSession();
    window.location.href = '/admin/login';
  };

  return (
    <main className="min-h-screen bg-[#f3f6f8] px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#0a3040_0%,#125c54_58%,#e4af47_160%)] p-8 text-white shadow-[0_32px_120px_rgba(15,23,42,0.18)] md:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/75">
                <Activity size={16} className={backendStatus === 'Connected' ? 'text-emerald-300' : 'text-amber-300'} />
                Backend {backendStatus}
              </div>
              <h1 className="mt-6 text-4xl font-bold md:text-5xl">Admin Dashboard</h1>
              <p className="mt-4 max-w-2xl text-white/75">
                Create articles, publish updates to the public blog, and monitor every lead captured from the website.
              </p>
              <p className="mt-4 text-sm text-white/65">Logged in as {adminProfile?.email || 'admin'}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={loadDashboardData} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
                <RefreshCcw size={16} />
                Refresh
              </button>
              <button type="button" onClick={handleLogout} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { label: 'Total blogs', value: blogs.length, icon: FileText },
              { label: 'Published blogs', value: blogs.filter((blog) => blog.status === 'published').length, icon: Eye },
              { label: 'Captured leads', value: leads.length, icon: Users },
            ].map((item) => (
              <div key={item.label} className="rounded-[24px] border border-white/10 bg-slate-950/20 px-5 py-5">
                <div className="flex items-center justify-between text-white/70">
                  <span className="text-sm uppercase tracking-[0.2em]">{item.label}</span>
                  <item.icon size={18} />
                </div>
                <p className="mt-5 text-4xl font-bold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {pageMessage.text ? (
          <div className={`rounded-[24px] px-5 py-4 text-sm shadow-sm ${pageMessage.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
            {pageMessage.text}
          </div>
        ) : null}

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[32px] bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-semibold text-slate-900">{editingBlogId ? 'Edit blog' : 'Create a new blog'}</h2>
                <p className="mt-2 text-sm text-slate-500">Draft posts stay private until you publish them.</p>
              </div>
              {editingBlogId ? (
                <button type="button" onClick={resetBlogForm} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900">
                  Cancel edit
                </button>
              ) : null}
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleBlogSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Title</label>
                <input name="title" value={blogForm.title} onChange={handleBlogFieldChange} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#0d5e65] focus:ring-4 focus:ring-[#0d5e65]/10" placeholder="Enter blog title" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Cover image</label>
                <div className="space-y-3 rounded-2xl border border-slate-200 p-3">
                  <input name="image" value={blogForm.image} onChange={handleBlogFieldChange} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#0d5e65] focus:ring-4 focus:ring-[#0d5e65]/10" placeholder="https://example.com/blog-image.jpg or upload below" />
                  <input type="file" accept="image/*" onChange={(event) => uploadAndSetCoverImage(event.target.files?.[0])} className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-full file:border-0 file:bg-[#0d5e65] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#0a4f56]" />
                  {uploadingTarget === 'cover' ? <p className="text-xs text-slate-500">Uploading cover image...</p> : null}
                  {blogForm.image ? <img src={resolveMediaUrl(blogForm.image)} alt="Cover preview" className="h-40 w-full rounded-xl object-cover" /> : null}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Status</label>
                <select name="status" value={blogForm.status} onChange={handleBlogFieldChange} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#0d5e65] focus:ring-4 focus:ring-[#0d5e65]/10">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <label className="block text-sm font-medium text-slate-700">Content editor</label>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={() => addContentBlock('heading')} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-slate-300 hover:text-slate-900">
                      <Heading size={14} />
                      Heading
                    </button>
                    <button type="button" onClick={() => addContentBlock('paragraph')} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-slate-300 hover:text-slate-900">
                      <Type size={14} />
                      Paragraph
                    </button>
                    <button type="button" onClick={() => addContentBlock('spacer')} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-slate-300 hover:text-slate-900">
                      Spacer
                    </button>
                    <button type="button" onClick={() => addContentBlock('image')} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-slate-300 hover:text-slate-900">
                      <ImageIcon size={14} />
                      Image
                    </button>
                  </div>
                </div>

                <div className="space-y-3 rounded-3xl border border-slate-200 p-4">
                  {blogBlocks.map((block) => (
                    <div key={block.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{block.type}</span>
                        <button type="button" onClick={() => removeContentBlock(block.id)} className="inline-flex items-center gap-1 rounded-full border border-rose-200 px-2 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50">
                          <X size={12} />
                          Remove
                        </button>
                      </div>

                      {block.type === 'heading' ? (
                        <div className="space-y-2">
                          <select value={block.level || 2} onChange={(event) => updateContentBlock(block.id, { level: Number(event.target.value) })} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#0d5e65] focus:ring-4 focus:ring-[#0d5e65]/10">
                            <option value={1}>H1</option>
                            <option value={2}>H2</option>
                            <option value={3}>H3</option>
                          </select>
                          <input value={block.text || ''} onChange={(event) => updateContentBlock(block.id, { text: event.target.value })} placeholder="Enter heading text" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#0d5e65] focus:ring-4 focus:ring-[#0d5e65]/10" />
                        </div>
                      ) : null}

                      {block.type === 'paragraph' ? (
                        <textarea value={block.text || ''} onChange={(event) => updateContentBlock(block.id, { text: event.target.value })} rows="4" placeholder="Enter paragraph text" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#0d5e65] focus:ring-4 focus:ring-[#0d5e65]/10" />
                      ) : null}

                      {block.type === 'spacer' ? (
                        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-3 py-4 text-xs text-slate-500">
                          Spacer block adds visual space between sections.
                        </div>
                      ) : null}

                      {block.type === 'image' ? (
                        <div className="space-y-2">
                          <input value={block.url || ''} onChange={(event) => updateContentBlock(block.id, { url: event.target.value })} placeholder="https://example.com/content-image.jpg" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#0d5e65] focus:ring-4 focus:ring-[#0d5e65]/10" />
                          <input type="file" accept="image/*" onChange={(event) => uploadAndSetContentImage(block.id, event.target.files?.[0])} className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-full file:border-0 file:bg-[#0d5e65] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#0a4f56]" />
                          {uploadingTarget === `content-${block.id}` ? <p className="text-xs text-slate-500">Uploading image...</p> : null}
                          {block.url ? <img src={resolveMediaUrl(block.url)} alt="Content preview" className="h-36 w-full rounded-xl object-cover" /> : null}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={isSaving} className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#0d5e65_0%,#12736d_60%,#e4af47_140%)] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-70">
                {editingBlogId ? <PenSquare size={16} /> : <Plus size={16} />}
                {isSaving ? 'Saving...' : editingBlogId ? 'Update blog' : 'Create blog'}
              </button>
            </form>
          </div>

          <div className="rounded-[32px] bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-semibold text-slate-900">Lead inbox</h2>
                <p className="mt-2 text-sm text-slate-500">Submissions from the website contact form land here.</p>
              </div>
              <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                {leads.length} total
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {isLoading ? (
                [1, 2, 3].map((item) => <div key={item} className="h-28 animate-pulse rounded-[24px] bg-slate-100" />)
              ) : null}

              {!isLoading && leads.length === 0 ? (
                <div className="rounded-[24px] border border-dashed border-slate-200 px-6 py-10 text-center text-sm text-slate-500">
                  No leads captured yet.
                </div>
              ) : null}

              {leads.map((lead) => (
                <div key={lead._id} className="rounded-[24px] border border-slate-100 bg-slate-50 px-5 py-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{lead.name}</h3>
                      <div className="mt-2 flex flex-wrap gap-3 text-sm text-slate-500">
                        {lead.email ? <span className="inline-flex items-center gap-2"><Mail size={14} />{lead.email}</span> : null}
                        {lead.phone ? <span>{lead.phone}</span> : null}
                      </div>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{lead.source || 'website'}</span>
                  </div>
                  {lead.message ? <p className="mt-4 text-sm leading-7 text-slate-600">{lead.message}</p> : null}
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-400">Received {formatDate(lead.createdAt)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[32px] bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] md:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900">Blog inventory</h2>
              <p className="mt-2 text-sm text-slate-500">Edit drafts, publish articles, and remove outdated posts.</p>
            </div>
            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              {blogs.length} posts
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-[28px] border border-slate-100">
            <div className="hidden grid-cols-[1.6fr_0.7fr_0.8fr_1fr] gap-4 bg-slate-50 px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 md:grid">
              <span>Article</span>
              <span>Status</span>
              <span>Updated</span>
              <span>Actions</span>
            </div>

            <div className="divide-y divide-slate-100">
              {isLoading ? (
                [1, 2, 3].map((item) => <div key={item} className="h-24 animate-pulse bg-white" />)
              ) : null}

              {!isLoading && blogs.length === 0 ? (
                <div className="px-6 py-12 text-center text-sm text-slate-500">No blogs yet. Create your first post above.</div>
              ) : null}

              {blogs.map((blog) => (
                <div key={blog._id} className="grid gap-4 px-6 py-5 md:grid-cols-[1.6fr_0.7fr_0.8fr_1fr] md:items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{blog.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">/{blog.slug}</p>
                  </div>
                  <div>
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${blog.status === 'published' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                      {blog.status}
                    </span>
                  </div>
                  <div className="text-sm text-slate-500">{formatDate(blog.updatedAt || blog.createdAt)}</div>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={() => startEditing(blog)} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900">
                      <PenSquare size={14} />
                      Edit
                    </button>
                    {blog.status !== 'published' ? (
                      <button type="button" onClick={() => handlePublish(blog._id)} className="inline-flex items-center gap-2 rounded-full bg-[#0d5e65] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0a4f56]">
                        <Eye size={14} />
                        Publish
                      </button>
                    ) : null}
                    <button type="button" onClick={() => handleDelete(blog._id)} className="inline-flex items-center gap-2 rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50">
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AdminDashboard;
