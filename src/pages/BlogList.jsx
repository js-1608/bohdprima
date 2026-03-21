import { CalendarDays, ChevronRight, Newspaper } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPublishedBlogs, resolveMediaUrl } from '../lib/api';

function formatDate(dateValue) {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateValue));
}

function createExcerpt(content) {
  if (typeof content === 'string') {
    return content.length > 180 ? `${content.slice(0, 180)}...` : content;
  }

  const blocks = Array.isArray(content)
    ? content
    : content && typeof content === 'object' && Array.isArray(content.blocks)
      ? content.blocks
      : [];

  const text = blocks
    .filter((block) => block.type === 'paragraph' || block.type === 'heading')
    .map((block) => block.text || '')
    .join(' ')
    .trim();

  if (!text) {
    return 'Open this article to read the full update.';
  }

  return text.length > 180 ? `${text.slice(0, 180)}...` : text;
}

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    getPublishedBlogs()
      .then((response) => {
        if (isMounted) {
          setBlogs(response);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setErrorMessage(error.message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="bg-[#f8fafc] pb-24">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(234,179,8,0.22),_transparent_28%),linear-gradient(135deg,#0a3040_0%,#125c54_55%,#1f8577_100%)] pt-36 pb-24 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>
        <div className="relative mx-auto max-w-6xl px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
            <Newspaper size={16} />
            Trade Notes
          </span>
          <h1 className="mt-8 max-w-3xl text-5xl font-bold leading-tight md:text-6xl">
            Insights, logistics thinking, and export-import stories from Bodh prima.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/72">
            Follow published articles, market updates, and practical trade guidance curated for importers, exporters, and international partners.
          </p>
        </div>
      </section>

      <section className="mx-auto -mt-12 max-w-6xl px-6">
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-72 animate-pulse rounded-[28px] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]" />
            ))}
          </div>
        ) : null}

        {errorMessage ? (
          <div className="rounded-[28px] border border-rose-100 bg-rose-50 px-6 py-5 text-rose-700 shadow-sm">
            {errorMessage}
          </div>
        ) : null}

        {!isLoading && !errorMessage && blogs.length === 0 ? (
          <div className="rounded-[28px] bg-white px-8 py-14 text-center shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <h2 className="text-3xl font-semibold text-slate-900">No blog posts published yet</h2>
            <p className="mt-4 text-slate-600">Publish articles from the admin dashboard and they will appear here automatically.</p>
          </div>
        ) : null}

        <div className="relative z-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {blogs.map((blog) => (
            blog.status!== 'published' ? null : (
            <article key={blog._id} className="group overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-1">
              <div className="h-52 overflow-hidden bg-gradient-to-br from-[#0d4d63] via-[#12736d] to-[#e4af47]">
                {blog.image ? (
                  <img src={resolveMediaUrl(blog.image)} alt={blog.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : null}
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <CalendarDays size={16} />
                  <span>{formatDate(blog.createdAt)}</span>
                </div>
                <h2 className="text-2xl font-semibold leading-snug text-slate-900">{blog.title}</h2>
                <p className="text-sm leading-7 text-slate-600">{createExcerpt(blog.content)}</p>
                <Link to={`/blog/${blog.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[#0d5e65] transition-colors hover:text-[#e4af47]">
                  Read article
                  <ChevronRight size={18} />
                </Link>
              </div>
            </article>
            )
          ))}
        </div>
      </section>
    </main>
  );
}

export default BlogList;
