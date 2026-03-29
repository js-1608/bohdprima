import {
  Activity,
  Bell,
  ChevronDown,
  ChevronRight,
  Clock,
  Edit3,
  Eye,
  FileText,
  Globe,
  Heading,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  PenSquare,
  Phone,
  Plus,
  RefreshCcw,
  Search,
  ShieldCheck,
  Trash2,
  TrendingUp,
  Type,
  UserPlus,
  Users,
  X,
  AlertCircle,
  CheckCircle2,
  MoreVertical,
} from "lucide-react";
import { useEffect, useState } from "react";

// ─── Flip animation styles ────────────────────────────────────────────────────
const flipAnimationStyles = `
  @keyframes cardFlip {
    0% { transform: rotateX(0deg); opacity: 1; }
    50% { opacity: 0.8; }
    100% { transform: rotateX(0deg); opacity: 1; }
  }
  .card-flip {
    animation: cardFlip 0.4s ease-in-out;
    transform-style: preserve-3d;
  }
`;

// ─── Inject flip animation styles ────────────────────────────────────────────
if (typeof document !== "undefined" && !document.getElementById("flip-animation-styles")) {
  const style = document.createElement("style");
  style.id = "flip-animation-styles";
  style.innerHTML = flipAnimationStyles;
  document.head.appendChild(style);
}

// ─── Real API + Auth imports (adjust path as needed) ─────────────────────────
import {
  clearAdminSession,
  getAdminProfile,
  getAdminToken,
  getRoleLabel,
  hasAdminPermission,
} from "../../lib/adminAuth";
import {
  createAdminUser,
  createBlog,
  deleteBlog,
  getAdminBlogs,
  getHealthStatus,
  getLeads,
  publishBlog,
  resolveMediaUrl,
  updateBlog,
  updateLeadStatus,
  uploadBlogImage,
  getAllUsers,
  resetUserPassword,
  deleteUser,
} from "../../lib/api";

// ─── Block helpers ────────────────────────────────────────────────────────────
const createBlock = (type = "paragraph") => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  type,
  level: 2,
  text: "",
  url: "",
});

function normalizeContentToBlocks(content) {
  if (!content) return [createBlock("paragraph")];
  if (typeof content === "string") {
    const paragraphs = content
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean)
      .map((text) => ({ ...createBlock("paragraph"), text }));
    return paragraphs.length ? paragraphs : [createBlock("paragraph")];
  }
  if (Array.isArray(content)) {
    const blocks = content.map((item) => ({
      ...createBlock(item?.type || "paragraph"),
      type: item?.type || "paragraph",
      level: Number(item?.level) || 2,
      text: typeof item?.text === "string" ? item.text : "",
      url: typeof item?.url === "string" ? item.url : "",
    }));
    return blocks.length ? blocks : [createBlock("paragraph")];
  }
  if (typeof content === "object" && Array.isArray(content.blocks)) {
    return normalizeContentToBlocks(content.blocks);
  }
  return [createBlock("paragraph")];
}

function sanitizeBlocks(blocks) {
  const normalized = blocks
    .map((block) => {
      if (block.type === "heading")
        return { type: "heading", level: Number(block.level) || 2, text: (block.text || "").trim() };
      if (block.type === "image")
        return { type: "image", url: (block.url || "").trim() };
      if (block.type === "spacer")
        return { type: "spacer" };
      return { type: "paragraph", text: (block.text || "").trim() };
    })
    .filter((b) => {
      if (b.type === "image") return Boolean(b.url);
      if (b.type === "spacer") return true;
      return Boolean(b.text);
    });
  return normalized.length ? normalized : [{ type: "paragraph", text: "" }];
}

// ─── Date helpers ─────────────────────────────────────────────────────────────
const formatDate = (d) =>
  new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(d));
const formatTimestamp = (d) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  }).format(new Date(d));

// ─── Status config ────────────────────────────────────────────────────────────
const statusConfig = {
  interested:      { bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500", label: "Interested" },
  contacted:       { bg: "bg-sky-100",     text: "text-sky-700",     dot: "bg-sky-500",     label: "Contacted" },
  "not-interested":{ bg: "bg-rose-100",    text: "text-rose-700",    dot: "bg-rose-400",    label: "Not Interested" },
  published:       { bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500", label: "Published" },
  draft:           { bg: "bg-amber-100",   text: "text-amber-700",   dot: "bg-amber-400",   label: "Draft" },
  new:             { bg: "bg-amber-100",   text: "text-amber-700",   dot: "bg-amber-400",   label: "New" },
};
const getStatusCfg = (s) => statusConfig[s] || statusConfig.new;

const roleDescriptions = {
  admin:            "Full access to all modules, can create/delete users.",
  collaborator:     "Can create blog drafts but cannot publish.",
  "content-editor": "Can create, edit, and publish blog posts.",
  "lead-manager":   "Can view and manage leads only.",
};

// ─── Shared UI ────────────────────────────────────────────────────────────────
function StatusBadge({ status, size = "sm" }) {
  const cfg = getStatusCfg(status || "new");
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold
      ${size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm"} ${cfg.bg} ${cfg.text}`}>
      <span className={`rounded-full ${cfg.dot} ${size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2"}`} />
      {cfg.label}
    </span>
  );
}

function Toast({ message, type, onClose }) {
  if (!message) return null;
  return (
    <div
      className={`fixed bottom-20 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-2xl px-5 py-3.5 shadow-2xl md:bottom-6
        ${type === "success" ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"}`}
      style={{ minWidth: 260, maxWidth: "90vw" }}
    >
      {type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-auto rounded-full p-0.5 hover:bg-white/20"><X size={14} /></button>
    </div>
  );
}

function SectionHeader({ title, subtitle, badge }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 className="text-xl font-bold text-slate-900 md:text-2xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {badge != null && (
        <span className="rounded-xl bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-600">{badge}</span>
      )}
    </div>
  );
}

function SkeletonCard() {
  return <div className="h-20 animate-pulse rounded-2xl bg-slate-100" />;
}

function AccessDenied() {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-12 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
        <ShieldCheck size={28} className="text-slate-400" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-800">Access Restricted</h3>
      <p className="mt-2 text-sm text-slate-500">
        You don't have permission to view this section. Contact an admin to update your role.
      </p>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const navItems = [
  { id: "overview", label: "Overview",  icon: LayoutDashboard },
  { id: "blogs",    label: "Blogs",     icon: FileText,  permission: "blogs" },
  { id: "leads",    label: "Leads",     icon: Users,     permission: "leads" },
  { id: "users",    label: "Users",     icon: UserPlus,  adminOnly: true },
];

function Sidebar({ active, onNav, profile, onLogout, isOpen, onClose, canBlogs, canLeads }) {
  const isAdmin = profile?.role === "admin";

  const visible = navItems.filter((item) => {
    if (item.adminOnly)          return isAdmin;
    if (item.permission === "blogs") return canBlogs;
    if (item.permission === "leads") return canLeads;
    return true;
  });

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden" onClick={onClose} />
      )}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#0a2c38] transition-transform duration-300
        md:static md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>

        {/* Logo */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e4af47]">
              <Globe size={18} className="text-[#0a2c38]" />
            </div>
            <span className="text-base font-bold tracking-tight text-white">Bohd Prima</span>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-white/50 hover:text-white md:hidden">
            <X size={18} />
          </button>
        </div>

        {/* Profile chip */}
        <div className="mx-4 mt-5 rounded-2xl bg-white/5 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e4af47]/20 text-sm font-bold text-[#e4af47]">
              {(profile?.name || "U").charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{profile?.name}</p>
              <p className="truncate text-xs text-white/50">{profile?.email}</p>
            </div>
          </div>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#e4af47]/15 px-2.5 py-1 text-xs font-semibold text-[#e4af47]">
            <ShieldCheck size={11} />
            {getRoleLabel(profile?.role)}
          </span>
        </div>

        {/* Nav */}
        <nav className="mt-4 flex-1 space-y-1 px-3">
          {visible.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button key={item.id} onClick={() => { onNav(item.id); onClose(); }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all
                  ${isActive ? "bg-[#e4af47] text-[#0a2c38] shadow-lg shadow-[#e4af47]/20"
                             : "text-white/60 hover:bg-white/8 hover:text-white"}`}>
                <Icon size={17} />
                {item.label}
                {isActive && <ChevronRight size={14} className="ml-auto" />}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-white/10 p-4">
          <button onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/50 transition hover:bg-rose-500/10 hover:text-rose-400">
            <LogOut size={17} />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}

// ─── Bottom Nav (mobile) ──────────────────────────────────────────────────────
function BottomNav({ active, onNav, canBlogs, canLeads, isAdmin }) {
  const visible = navItems.filter((item) => {
    if (item.adminOnly)              return isAdmin;
    if (item.permission === "blogs") return canBlogs;
    if (item.permission === "leads") return canLeads;
    return true;
  });

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-slate-200 bg-white/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
      {visible.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;
        return (
          <button key={item.id} onClick={() => onNav(item.id)}
            className={`flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium transition-all
              ${isActive ? "text-[#0d5e65]" : "text-slate-400"}`}>
            <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
            <span>{item.label}</span>
            {isActive && <span className="h-0.5 w-4 rounded-full bg-[#0d5e65]" />}
          </button>
        );
      })}
    </nav>
  );
}

// ─── Overview ─────────────────────────────────────────────────────────────────
function OverviewPage({ blogs, leads, profile, backendStatus, onRefresh, isLoading }) {
  const published       = blogs.filter((b) => b.status === "published").length;
  const newLeads        = leads.filter((l) => !l.status).length;
  const interestedLeads = leads.filter((l) => l.status === "interested").length;

  const stats = [
    { label: "Published Posts", value: published,       icon: FileText,  color: "text-[#0d5e65]",  bg: "bg-[#0d5e65]/10" },
    { label: "Total Leads",     value: leads.length,    icon: Users,     color: "text-violet-600", bg: "bg-violet-50"    },
    { label: "New / Untagged",  value: newLeads,        icon: Bell,      color: "text-amber-600",  bg: "bg-amber-50"     },
    { label: "Interested",      value: interestedLeads, icon: TrendingUp,color: "text-emerald-600",bg: "bg-emerald-50"   },
  ];

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#0a2c38_0%,#0d5e65_55%,#e4af47_150%)] p-6 text-white md:p-8">
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/5" />
        <div className="absolute -right-4 top-16 h-28 w-28 rounded-full bg-white/5" />
        <div className="relative">
          <p className="text-sm font-medium text-white/60">Welcome back 👋</p>
          <h1 className="mt-1 text-2xl font-bold md:text-3xl">{profile?.name}</h1>
          <p className="mt-2 max-w-md text-sm text-white/70">Here's what's happening in your workspace today.</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/80">
              <Activity size={13} className={backendStatus === "Connected" ? "animate-pulse text-emerald-300" : "text-amber-300"} />
              Backend {backendStatus}
            </div>
            <button onClick={onRefresh} disabled={isLoading}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/20 disabled:opacity-50">
              <RefreshCcw size={13} className={isLoading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <div className={`inline-flex rounded-xl p-2.5 ${s.bg}`}>
                <Icon size={18} className={s.color} />
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">{s.value}</p>
              <p className="mt-0.5 text-xs leading-tight text-slate-500">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent blogs */}
      <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-4 sm:p-5 shadow-sm md:p-6">
        <SectionHeader title="Recent Blogs" subtitle="Latest posts and their status" />
        <div className="mt-4 space-y-3">
          {isLoading ? [1,2,3].map((i) => <SkeletonCard key={i} />) : blogs.slice(0, 4).map((blog) => (
            <div key={blog._id} className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl bg-slate-50 p-3">
              <div className={`flex h-10 w-10 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl ${blog.status === "published" ? "bg-emerald-100" : "bg-amber-100"}`}>
                <FileText size={16} className={blog.status === "published" ? "text-emerald-600" : "text-amber-600"} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">{blog.title}</p>
                <p className="text-xs text-slate-500">{blog.authorName} · {formatDate(blog.updatedAt || blog.createdAt)}</p>
              </div>
              <StatusBadge status={blog.status} />
            </div>
          ))}
          {!isLoading && blogs.length === 0 && (
            <p className="py-6 text-center text-sm text-slate-400">No blog posts yet.</p>
          )}
        </div>
      </div>

      {/* Recent leads */}
      <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-4 sm:p-5 shadow-sm md:p-6">
        <SectionHeader title="Recent Leads" subtitle="Latest enquiries captured" />
        <div className="mt-4 space-y-3">
          {isLoading ? [1,2,3].map((i) => <SkeletonCard key={i} />) : leads.slice(0, 4).map((lead) => (
            <div key={lead._id} className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl bg-slate-50 p-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0d5e65]/10 text-sm font-bold text-[#0d5e65]">
                {lead.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">{lead.name}</p>
                <p className="truncate text-xs text-slate-500">{lead.email}</p>
              </div>
              <StatusBadge status={lead.status || "new"} />
            </div>
          ))}
          {!isLoading && leads.length === 0 && (
            <p className="py-6 text-center text-sm text-slate-400">No leads captured yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Blogs Page ───────────────────────────────────────────────────────────────
function BlogsPage({ blogs, isLoading, token, onRefresh }) {
  const [blogForm,     setBlogForm]     = useState({ title: "", image: "", status: "draft" });
  const [blogBlocks,   setBlogBlocks]   = useState([createBlock("paragraph")]);
  const [editingId,    setEditingId]    = useState("");
  const [isSaving,     setIsSaving]     = useState(false);
  const [uploadTarget, setUploadTarget] = useState("");
  const [expandedId,   setExpandedId]   = useState(null);
  const [animatingId,  setAnimatingId]  = useState("");
  const [toast,        setToast]        = useState({ type: "", text: "" });

  const showToast = (type, text) => { setToast({ type, text }); setTimeout(() => setToast({ type: "", text: "" }), 4000); };

  const toggleBlogExpand = (blogId) => {
    if (animatingId === blogId) return; // Prevent rapid clicks
    setAnimatingId(blogId);
    setTimeout(() => {
      setExpandedId(expandedId === blogId ? null : blogId);
      setAnimatingId("");
    }, 200);
  };

  const resetForm = () => {
    setEditingId("");
    setBlogForm({ title: "", image: "", status: "draft" });
    setBlogBlocks([createBlock("paragraph")]);
  };

  const startEdit = (blog) => {
    setEditingId(blog._id);
    setBlogForm({ title: blog.title, image: blog.image || "", status: blog.status });
    setBlogBlocks(normalizeContentToBlocks(blog.content));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contentBlocks = sanitizeBlocks(blogBlocks);
    const hasMeaningful = contentBlocks.some((b) =>
      b.type === "image" ? Boolean(b.url) : b.type === "spacer" ? false : Boolean(b.text)
    );
    if (!hasMeaningful) return showToast("error", "Add at least one heading, paragraph, or image.");
    setIsSaving(true);
    try {
      const payload = { ...blogForm, content: contentBlocks };
      if (editingId) {
        await updateBlog(editingId, payload, token);
        showToast("success", "Blog updated successfully.");
      } else {
        await createBlog(payload, token);
        showToast("success", "Blog created successfully.");
      }
      resetForm();
      await onRefresh();
    } catch (err) {
      showToast("error", err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async (blogId) => {
    try {
      await publishBlog(blogId, token);
      showToast("success", "Blog published.");
      await onRefresh();
    } catch (err) {
      showToast("error", err.message);
    }
  };

  const handleDelete = async (blogId) => {
    try {
      await deleteBlog(blogId, token);
      if (editingId === blogId) resetForm();
      showToast("success", "Blog deleted.");
      setExpandedId(null);
      await onRefresh();
    } catch (err) {
      showToast("error", err.message);
    }
  };

  const uploadCover = async (file) => {
    if (!file) return;
    try {
      setUploadTarget("cover");
      const res = await uploadBlogImage(file, token);
      setBlogForm((f) => ({ ...f, image: res.url || res.image || "" }));
      showToast("success", "Cover image uploaded.");
    } catch (err) {
      showToast("error", err.message);
    } finally {
      setUploadTarget("");
    }
  };

  const uploadContentImage = async (blockId, file) => {
    if (!file) return;
    try {
      setUploadTarget(`content-${blockId}`);
      const res = await uploadBlogImage(file, token);
      setBlogBlocks((b) => b.map((x) => x.id === blockId ? { ...x, url: res.url || res.image || "" } : x));
      showToast("success", "Image uploaded.");
    } catch (err) {
      showToast("error", err.message);
    } finally {
      setUploadTarget("");
    }
  };

  return (
    <div className="space-y-6">
      <Toast message={toast.text} type={toast.type} onClose={() => setToast({ type: "", text: "" })} />

      {/* ── Editor ── */}
      <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-4 sm:p-5 shadow-sm md:p-7">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
          <SectionHeader
            title={editingId ? "Edit Blog Post" : "New Blog Post"}
            subtitle="Draft posts stay private until published"
          />
          {editingId && (
            <button onClick={resetForm}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
              <X size={14} /> Cancel edit
            </button>
          )}
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Title</label>
            <input value={blogForm.title} onChange={(e) => setBlogForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#0d5e65] focus:ring-4 focus:ring-[#0d5e65]/10"
              placeholder="Enter a compelling blog title…" />
          </div>

          {/* Status toggle */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Status</label>
            <div className="flex gap-3">
              {["draft", "published"].map((s) => (
                <button key={s} type="button" onClick={() => setBlogForm((f) => ({ ...f, status: s }))}
                  className={`flex-1 rounded-2xl border py-3 text-sm font-semibold capitalize transition
                    ${blogForm.status === s ? "border-[#0d5e65] bg-[#0d5e65]/5 text-[#0d5e65]"
                                           : "border-slate-200 text-slate-500 hover:border-slate-300"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Cover image */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Cover Image</label>
            <div className="space-y-2 rounded-2xl border border-slate-200 p-3">
              <input value={blogForm.image} onChange={(e) => setBlogForm((f) => ({ ...f, image: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-[#0d5e65] focus:ring-2 focus:ring-[#0d5e65]/10"
                placeholder="https://example.com/image.jpg or upload below" />
              <input type="file" accept="image/*" onChange={(e) => uploadCover(e.target.files?.[0])}
                className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-full file:border-0 file:bg-[#0d5e65] file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-[#0a4f56]" />
              {uploadTarget === "cover" && <p className="text-xs text-slate-500">Uploading cover image…</p>}
              {blogForm.image && (
                <img src={resolveMediaUrl(blogForm.image)} alt="Cover preview"
                  className="h-36 w-full rounded-xl object-cover" />
              )}
            </div>
          </div>

          {/* Content blocks */}
          <div>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Content Blocks</label>
              <div className="flex flex-wrap gap-2">
                {[{ t: "heading", icon: Heading }, { t: "paragraph", icon: Type }, { t: "image", icon: ImageIcon }, { t: "spacer", icon: null }].map(({ t, icon: Icon }) => (
                  <button key={t} type="button" onClick={() => setBlogBlocks((b) => [...b, createBlock(t)])}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                    {Icon && <Icon size={12} />}
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 rounded-2xl border border-slate-100 bg-slate-50 p-3">
              {blogBlocks.map((block) => (
                <div key={block.id} className="rounded-xl border border-slate-200 bg-white p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{block.type}</span>
                    <button type="button"
                      onClick={() => setBlogBlocks((b) => { const n = b.filter((x) => x.id !== block.id); return n.length ? n : [createBlock("paragraph")]; })}
                      className="rounded-lg p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-500">
                      <X size={12} />
                    </button>
                  </div>

                  {block.type === "paragraph" && (
                    <textarea rows={3} value={block.text}
                      onChange={(e) => setBlogBlocks((b) => b.map((x) => x.id === block.id ? { ...x, text: e.target.value } : x))}
                      placeholder="Write your paragraph…"
                      className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#0d5e65] focus:ring-2 focus:ring-[#0d5e65]/10" />
                  )}

                  {block.type === "heading" && (
                    <div className="flex gap-2">
                      <select value={block.level}
                        onChange={(e) => setBlogBlocks((b) => b.map((x) => x.id === block.id ? { ...x, level: Number(e.target.value) } : x))}
                        className="rounded-xl border border-slate-200 px-2 py-2 text-sm outline-none focus:border-[#0d5e65]">
                        <option value={1}>H1</option><option value={2}>H2</option><option value={3}>H3</option>
                      </select>
                      <input value={block.text}
                        onChange={(e) => setBlogBlocks((b) => b.map((x) => x.id === block.id ? { ...x, text: e.target.value } : x))}
                        placeholder="Heading text…"
                        className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#0d5e65]" />
                    </div>
                  )}

                  {block.type === "image" && (
                    <div className="space-y-2">
                      <input value={block.url}
                        onChange={(e) => setBlogBlocks((b) => b.map((x) => x.id === block.id ? { ...x, url: e.target.value } : x))}
                        placeholder="https://example.com/image.jpg"
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#0d5e65]" />
                      <input type="file" accept="image/*" onChange={(e) => uploadContentImage(block.id, e.target.files?.[0])}
                        className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-full file:border-0 file:bg-[#0d5e65] file:px-4 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-[#0a4f56]" />
                      {uploadTarget === `content-${block.id}` && <p className="text-xs text-slate-500">Uploading image…</p>}
                      {block.url && (
                        <img src={resolveMediaUrl(block.url)} alt="Content preview"
                          className="h-32 w-full rounded-xl object-cover" />
                      )}
                    </div>
                  )}

                  {block.type === "spacer" && (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-white px-3 py-4 text-xs text-slate-400">
                      Spacer — adds visual space between sections.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button type="submit" disabled={isSaving}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#0a2c38,#0d5e65_60%,#e4af47)] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0d5e65]/20 transition hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60">
            {editingId ? <PenSquare size={16} /> : <Plus size={16} />}
            {isSaving ? "Saving…" : editingId ? "Update Blog" : "Create Blog"}
          </button>
        </form>
      </div>

      {/* ── Inventory ── */}
      <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-4 sm:p-5 shadow-sm md:p-7">
        <SectionHeader title="Blog Inventory" subtitle="Edit drafts, publish articles, remove posts" badge={`${blogs.length} posts`} />
        <div className="mt-5 space-y-3">
          {isLoading && [1,2,3].map((i) => <SkeletonCard key={i} />)}
          {!isLoading && blogs.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center text-sm text-slate-400">
              No blog posts yet. Create your first post above.
            </div>
          )}
          {blogs.map((blog) => (
            <div key={blog._id} className="overflow-hidden rounded-2xl sm:rounded-2xl border border-slate-100 bg-slate-50">
              <button onClick={() => toggleBlogExpand(blog._id)}
                className={`w-full flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 p-3 sm:p-4 text-left transition-all ${animatingId === blog._id ? "card-flip" : ""}`}
                disabled={animatingId === blog._id}>
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
                  ${blog.status === "published" ? "bg-emerald-100" : "bg-amber-100"}`}>
                  <FileText size={16} className={blog.status === "published" ? "text-emerald-600" : "text-amber-600"} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">{blog.title}</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {blog.authorName} · {getRoleLabel(blog.authorRole)} · {formatDate(blog.updatedAt || blog.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <StatusBadge status={blog.status} />
                  <MoreVertical size={16} className={`text-slate-400 transition-transform ${expandedId === blog._id ? "rotate-90" : ""}`} />
                </div>
              </button>

              {expandedId === blog._id && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 border-t border-slate-200 bg-white p-3 px-4 sm:gap-3">
                  <span className="text-xs text-slate-400">/{blog.slug}</span>
                  <div className="flex flex-col sm:flex-row gap-2 sm:ml-auto">
                    <button onClick={() => startEdit(blog)}
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                      <Edit3 size={12} /> Edit
                    </button>
                    {blog.status !== "published" && (
                      <button onClick={() => handlePublish(blog._id)}
                        className="flex items-center justify-center gap-1.5 rounded-xl bg-[#0d5e65] px-3 py-2 text-xs font-semibold text-white hover:bg-[#0a4f56]">
                        <Eye size={12} /> Publish
                      </button>
                    )}
                    <button onClick={() => handleDelete(blog._id)}
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50">
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Leads Page ───────────────────────────────────────────────────────────────
function LeadsPage({ leads, setLeads, isLoading, token }) {
  const [notes,        setNotes]        = useState({});
  const [expanded,     setExpanded]     = useState(null);
  const [animatingId,  setAnimatingId]  = useState("");
  const [actionId,     setActionId]     = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [search,       setSearch]       = useState("");
  const [toast,        setToast]        = useState({ type: "", text: "" });

  const showToast = (type, text) => { setToast({ type, text }); setTimeout(() => setToast({ type: "", text: "" }), 4000); };

  const toggleLeadExpand = (leadId) => {
    if (animatingId === leadId) return; // Prevent rapid clicks
    setAnimatingId(leadId);
    setTimeout(() => {
      setExpanded(expanded === leadId ? null : leadId);
      setAnimatingId("");
    }, 200);
  };

  const handleUpdate = async (leadId, status) => {
    try {
      setActionId(`${leadId}:${status}`);
      const res = await updateLeadStatus(leadId, { status, note: notes[leadId] || "" }, token);
      setLeads((prev) => prev.map((l) => (l._id === leadId ? res.lead : l)));
      setNotes((n) => ({ ...n, [leadId]: "" }));
      showToast("success", "Lead status updated.");
    } catch (err) {
      showToast("error", err.message);
    } finally {
      setActionId("");
    }
  };

  const filtered = leads.filter((l) => {
    const matchStatus = filterStatus === "all" || (filterStatus === "new" ? !l.status : l.status === filterStatus);
    const matchSearch = !search || l.name.toLowerCase().includes(search.toLowerCase()) || (l.email || "").toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-5">
      <Toast message={toast.text} type={toast.type} onClose={() => setToast({ type: "", text: "" })} />

      {/* Search + filter */}
      <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-4 sm:p-5 shadow-sm md:p-6">
        <SectionHeader title="Lead Inbox" subtitle="Manage and tag your enquiries" badge={`${leads.length} leads`} />
        <div className="mt-4 flex flex-col gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or email…"
              className="w-full rounded-2xl border border-slate-200 py-2.5 pl-9 pr-4 text-sm outline-none focus:border-[#0d5e65] focus:ring-4 focus:ring-[#0d5e65]/10" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {["all", "new", "contacted", "interested", "not-interested"].map((s) => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className={`shrink-0 rounded-xl px-3 py-2 text-xs font-semibold capitalize transition whitespace-nowrap
                  ${filterStatus === s ? "bg-[#0d5e65] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                {s === "not-interested" ? "Not Interested" : s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lead cards */}
      <div className="space-y-3">
        {isLoading && [1,2,3].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-3xl border border-slate-100 bg-white shadow-sm" />
        ))}
        {!isLoading && filtered.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-400">
            No leads match your filter.
          </div>
        )}
        {filtered.map((lead) => {
          const isOpen = expanded === lead._id;
          return (
            <div key={lead._id} className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
              <button className={`flex w-full flex-col sm:flex-row sm:items-center gap-3 p-4 text-left md:p-5 transition-all ${animatingId === lead._id ? "card-flip" : ""}`}
                onClick={() => toggleLeadExpand(lead._id)}
                disabled={animatingId === lead._id}>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0d5e65]/10 text-sm font-bold text-[#0d5e65]">
                  {lead.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-slate-900">{lead.name}</p>
                    <StatusBadge status={lead.status || "new"} />
                  </div>
                  <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-500">
                    {lead.email && <span className="flex items-center gap-1"><Mail size={11} />{lead.email}</span>}
                    {lead.phone && <span className="flex items-center gap-1"><Phone size={11} />{lead.phone}</span>}
                  </div>
                </div>
                <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>

              {isOpen && (
                <div className="space-y-4 border-t border-slate-100 p-4 md:p-5">
                  {lead.message && (
                    <div className="rounded-2xl bg-slate-50 p-3.5 text-sm leading-relaxed text-slate-600">
                      <MessageSquare size={13} className="mb-1.5 text-slate-400" />
                      {lead.message}
                    </div>
                  )}

                  {/* Status buttons */}
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Update Status</p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      {["contacted", "interested", "not-interested"].map((s) => {
                        const cfg = getStatusCfg(s);
                        return (
                          <button key={s} onClick={() => handleUpdate(lead._id, s)} disabled={!!actionId}
                            className={`rounded-xl px-4 py-2 text-xs font-semibold transition hover:opacity-80 disabled:opacity-50 ${cfg.bg} ${cfg.text}`}>
                            {actionId === `${lead._id}:${s}` ? "Updating…" : cfg.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Note */}
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Add a note</p>
                    <textarea value={notes[lead._id] || ""} onChange={(e) => setNotes((n) => ({ ...n, [lead._id]: e.target.value }))}
                      rows={2} placeholder="Write a note before updating status…"
                      className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#0d5e65] focus:ring-4 focus:ring-[#0d5e65]/10" />
                  </div>

                  {/* Activity log */}
                  {(lead.logs || []).length > 0 && (
                    <div>
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Activity Log</p>
                      <div className="max-h-52 space-y-2 overflow-y-auto pr-1">
                        {[...lead.logs].reverse().map((log) => (
                          <div key={log._id || `${lead._id}-${log.createdAt}`}
                            className="flex items-start gap-2 rounded-xl bg-slate-50 p-3">
                            <Clock size={12} className="mt-0.5 shrink-0 text-slate-400" />
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs font-semibold text-slate-700">{log.action}</span>
                                <StatusBadge status={log.status || "new"} />
                              </div>
                              {log.note && <p className="mt-1 text-xs text-slate-600">{log.note}</p>}
                              <p className="mt-1 text-[10px] text-slate-400">
                                {log.actedByName ? `${log.actedByName} (${getRoleLabel(log.actedByRole)})` : "System"} · {formatTimestamp(log.createdAt)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-slate-400">
                    Received {formatDate(lead.createdAt)} · Source: {lead.source || "website"}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Users Page ───────────────────────────────────────────────────────────────
function UsersPage({ token }) {
  const [form,                setForm]                = useState({ name: "", email: "", password: "", role: "collaborator" });
  const [users,               setUsers]               = useState([]);
  const [isSaving,            setIsSaving]            = useState(false);
  const [isLoadingUsers,      setIsLoadingUsers]      = useState(true);
  const [toast,               setToast]               = useState({ type: "", text: "" });
  const [resetPasswordModal,  setResetPasswordModal]  = useState({ open: false, userId: null, userName: "" });
  const [resetPasswordForm,   setResetPasswordForm]   = useState({ password: "" });
  const [isResetting,         setIsResetting]         = useState(false);
  const [actionInProgress,    setActionInProgress]    = useState("");

  const showToast = (type, text) => { setToast({ type, text }); setTimeout(() => setToast({ type: "", text: "" }), 4000); };

  // Load all users
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoadingUsers(true);
        const res = await getAllUsers(token);
        setUsers(res.users || []);
      } catch (err) {
        showToast("error", err.message);
      } finally {
        setIsLoadingUsers(false);
      }
    };
    loadUsers();
  }, [token]);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return showToast("error", "Please fill in all fields.");
    setIsSaving(true);
    try {
      const newUser = await createAdminUser(form, token);
      setUsers((prev) => [...prev, newUser.admin]);
      setForm({ name: "", email: "", password: "", role: "collaborator" });
      showToast("success", `User "${form.name}" created successfully.`);
    } catch (err) {
      showToast("error", err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetPasswordClick = (userId, userName) => {
    setResetPasswordModal({ open: true, userId, userName });
    setResetPasswordForm({ password: "" });
  };

  const handleResetPassword = async () => {
    if (!resetPasswordForm.password) {
      return showToast("error", "Please enter a new password.");
    }
    setIsResetting(true);
    try {
      setActionInProgress(`reset:${resetPasswordModal.userId}`);
      await resetUserPassword(resetPasswordModal.userId, resetPasswordForm.password, token);
      setUsers((prev) => prev.map((u) => (u.id === resetPasswordModal.userId ? { ...u } : u)));
      setResetPasswordModal({ open: false, userId: null, userName: "" });
      showToast("success", `Password reset for ${resetPasswordModal.userName}.`);
    } catch (err) {
      showToast("error", err.message);
    } finally {
      setIsResetting(false);
      setActionInProgress("");
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to delete ${userName}? This cannot be undone.`)) {
      return;
    }
    try {
      setActionInProgress(`delete:${userId}`);
      await deleteUser(userId, token);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      showToast("success", `User "${userName}" deleted successfully.`);
    } catch (err) {
      showToast("error", err.message);
    } finally {
      setActionInProgress("");
    }
  };

  return (
    <div className="space-y-6">
      <Toast message={toast.text} type={toast.type} onClose={() => setToast({ type: "", text: "" })} />

      {/* Reset Password Modal */}
      {resetPasswordModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white shadow-2xl">
            <div className="border-b border-slate-100 px-6 py-5">
              <h3 className="text-lg font-bold text-slate-900">Reset Password</h3>
              <p className="mt-1 text-sm text-slate-500">Set a new password for {resetPasswordModal.userName}</p>
            </div>
            <div className="p-6">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">New Password</label>
                <input type="password" value={resetPasswordForm.password} 
                  onChange={(e) => setResetPasswordForm({ password: e.target.value })}
                  placeholder="Enter new password"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#0d5e65] focus:ring-4 focus:ring-[#0d5e65]/10" />
              </div>
            </div>
            <div className="flex gap-3 border-t border-slate-100 px-6 py-4">
              <button onClick={() => setResetPasswordModal({ open: false, userId: null, userName: "" })}
                className="flex-1 rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                Cancel
              </button>
              <button onClick={handleResetPassword} disabled={isResetting}
                className="flex-1 rounded-2xl bg-[#0d5e65] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0d5e65]/90 disabled:opacity-60">
                {isResetting ? "Resetting…" : "Reset Password"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Role reference */}
      <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-4 sm:p-5 shadow-sm md:p-7">
        <SectionHeader title="Access Roles" subtitle="What each role can and cannot do" />
        <div className="mt-5 grid gap-3 grid-cols-1 sm:grid-cols-2">
          {Object.entries(roleDescriptions).map(([role, desc]) => (
            <div key={role} className="rounded-2xl border border-slate-100 bg-slate-50 p-3 sm:p-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0d5e65]/10">
                  <ShieldCheck size={15} className="text-[#0d5e65]" />
                </div>
                <span className="text-sm font-semibold text-slate-900">{getRoleLabel(role)}</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Users List */}
      <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-4 sm:p-5 shadow-sm md:p-7">
        <SectionHeader title="Team Members" subtitle="Manage your team and their access levels" badge={`${users.length} users`} />
        <div className="mt-5 space-y-2">
          {isLoadingUsers && [1,2,3].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-2xl bg-slate-100" />
          ))}
          {!isLoadingUsers && users.length === 0 && (
            <p className="py-6 text-center text-sm text-slate-400">No users yet.</p>
          )}
          {!isLoadingUsers && users.map((user) => (
            <div key={user.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-3 sm:p-4 transition hover:bg-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0d5e65]/10 text-sm font-bold text-[#0d5e65]">
                    {(user.name || "U").charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-slate-900">{user.name}</p>
                    <p className="truncate text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>
                <p className={`self-start sm:self-auto shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${user.role === "admin" ? "bg-[#0d5e65] text-white" : "bg-slate-200 text-slate-600"}`}>
                  {getRoleLabel(user.role)}
                </p>
              </div>
              <div className="mt-3 sm:mt-0 flex flex-col sm:flex-row gap-2 sm:justify-end">
                <button onClick={() => handleResetPasswordClick(user.id, user.name)}
                  disabled={actionInProgress === `reset:${user.id}`}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-amber-200 px-3 py-2 text-xs font-semibold text-amber-600 hover:bg-amber-50 disabled:opacity-50">
                  <RefreshCcw size={12} className={actionInProgress === `reset:${user.id}` ? "animate-spin" : ""} />
                  Reset
                </button>
                <button onClick={() => handleDeleteUser(user.id, user.name)}
                  disabled={actionInProgress === `delete:${user.id}`}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 disabled:opacity-50">
                  <Trash2 size={12} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create form */}
      <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-4 sm:p-5 shadow-sm md:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0d5e65]/10 shrink-0">
            <UserPlus size={18} className="text-[#0d5e65]" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Create New User</h2>
            <p className="text-xs sm:text-sm text-slate-500">Invite a team member with a specific role.</p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleCreateUser}>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Full Name</label>
              <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-[#0d5e65] focus:ring-4 focus:ring-[#0d5e65]/10"
                placeholder="e.g. Rahul Verma" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-[#0d5e65] focus:ring-4 focus:ring-[#0d5e65]/10"
                placeholder="user@bohdprima.com" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Password</label>
              <input type="password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-[#0d5e65] focus:ring-4 focus:ring-[#0d5e65]/10"
                placeholder="Minimum 8 characters" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Role</label>
              <select value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-[#0d5e65] focus:ring-4 focus:ring-[#0d5e65]/10">
                <option value="admin">Admin</option>
                <option value="collaborator">Collaborator</option>
                <option value="content-editor">Content Editor</option>
                <option value="lead-manager">Lead Manager</option>
              </select>
            </div>
          </div>

          {form.role && (
            <div className="rounded-2xl border border-[#0d5e65]/15 bg-[#0d5e65]/5 px-4 py-3 text-xs text-[#0d5e65]">
              <strong>{getRoleLabel(form.role)}:</strong> {roleDescriptions[form.role]}
            </div>
          )}

          <button type="submit" disabled={isSaving}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#0a2c38,#0d5e65_60%,#e4af47)] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0d5e65]/20 transition hover:-translate-y-0.5 disabled:opacity-60">
            <UserPlus size={16} />
            {isSaving ? "Creating user…" : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const token    = getAdminToken();
  const profile  = getAdminProfile();
  const isAdmin  = profile?.role === "admin";
  const canBlogs = hasAdminPermission("blogs");
  const canLeads = hasAdminPermission("leads");

  const [page,          setPage]          = useState("overview");
  const [sidebarOpen,   setSidebarOpen]   = useState(false);
  const [blogs,         setBlogs]         = useState([]);
  const [leads,         setLeads]         = useState([]);
  const [isLoading,     setIsLoading]     = useState(true);
  const [backendStatus, setBackendStatus] = useState("Checking…");
  const [globalError,   setGlobalError]   = useState("");

  const loadData = async () => {
    setIsLoading(true);
    setGlobalError("");
    try {
      const requests = [getHealthStatus()];
      if (canBlogs) requests.push(getAdminBlogs(token));
      if (canLeads) requests.push(getLeads(token));

      const results = await Promise.all(requests);
      let idx = 1;

      setBackendStatus(results[0]?.status === "ok" ? "Connected" : "Unexpected response");
      if (canBlogs) { setBlogs(results[idx]); idx++; }
      if (canLeads) { setLeads(results[idx]); }
    } catch (err) {
      setBackendStatus("Unavailable");
      setGlobalError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleLogout = () => {
    clearAdminSession();
    window.location.href = "/admin/login";
  };

  const pageTitles = {
    overview: "Dashboard Overview",
    blogs:    "Blog Management",
    leads:    "Lead Inbox",
    users:    "User Management",
  };

  return (
    <div className="flex min-h-screen bg-[#f0f4f6] font-sans">
      <Sidebar
        active={page}
        onNav={setPage}
        profile={profile}
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        canBlogs={canBlogs}
        canLeads={canLeads}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-md md:px-6">
          <button onClick={() => setSidebarOpen(true)}
            className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 md:hidden">
            <Menu size={20} />
          </button>
          <h1 className="min-w-0 flex-1 truncate text-sm font-bold text-slate-900 md:text-base">
            {pageTitles[page]}
          </h1>
          <button onClick={loadData} disabled={isLoading}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-40" title="Refresh">
            <RefreshCcw size={16} className={isLoading ? "animate-spin" : ""} />
          </button>
          <div className="flex items-center gap-2">
            <span className="hidden text-xs text-slate-500 sm:block">{profile?.name}</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0d5e65] text-xs font-bold text-white">
              {(profile?.name || "U").charAt(0)}
            </div>
          </div>
        </header>

        {/* Global error */}
        {globalError && (
          <div className="mx-4 mt-4 flex items-center gap-3 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700 md:mx-6">
            <AlertCircle size={16} />
            {globalError}
            <button onClick={() => setGlobalError("")} className="ml-auto"><X size={14} /></button>
          </div>
        )}

        {/* Page */}
        <main className="flex-1 overflow-y-auto p-4 pb-24 md:p-6 md:pb-6">
          <div className="mx-auto max-w-4xl">
            {page === "overview" && (
              <OverviewPage blogs={blogs} leads={leads} profile={profile}
                backendStatus={backendStatus} onRefresh={loadData} isLoading={isLoading} />
            )}
            {page === "blogs"  && (canBlogs
              ? <BlogsPage blogs={blogs} isLoading={isLoading} token={token} onRefresh={loadData} />
              : <AccessDenied />
            )}
            {page === "leads"  && (canLeads
              ? <LeadsPage leads={leads} setLeads={setLeads} isLoading={isLoading} token={token} />
              : <AccessDenied />
            )}
            {page === "users"  && (isAdmin
              ? <UsersPage token={token} />
              : <AccessDenied />
            )}
          </div>
        </main>
      </div>

      <BottomNav active={page} onNav={setPage} isAdmin={isAdmin} canBlogs={canBlogs} canLeads={canLeads} />
    </div>
  );
}