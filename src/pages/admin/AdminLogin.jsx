import { Activity, ArrowRight, KeyRound, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getHealthStatus, loginAdmin, registerAdmin } from '../../lib/api';
import { getAdminToken, setAdminSession } from '../../lib/adminAuth';

const initialCredentials = {
  email: '',
  password: '',
};

function AdminLogin() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [credentials, setCredentials] = useState(initialCredentials);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [healthStatus, setHealthStatus] = useState({ label: 'Checking backend...', ok: false });

  useEffect(() => {
    if (getAdminToken()) {
      navigate('/admin/dashboard', { replace: true });
      return;
    }

    getHealthStatus()
      .then(() => setHealthStatus({ label: 'Backend connected', ok: true }))
      .catch(() => setHealthStatus({ label: 'Backend unavailable', ok: false }));
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback({ type: '', message: '' });

    try {
      if (mode === 'register') {
        await registerAdmin(credentials);
        setFeedback({ type: 'success', message: 'Admin account created. You can login now.' });
        setMode('login');
      } else {
        const session = await loginAdmin(credentials);
        setAdminSession(session);
        navigate('/admin/dashboard', { replace: true });
        return;
      }
    } catch (error) {
      setFeedback({ type: 'error', message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(228,175,71,0.22),_transparent_22%),linear-gradient(150deg,#081d27_5%,#0c4050_44%,#0d645a_100%)] px-6 py-10 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[36px] border border-white/10 bg-white/6 p-8 shadow-[0_32px_120px_rgba(0,0,0,0.28)] backdrop-blur-xl md:p-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/75">
            <ShieldCheck size={16} />
            Admin workspace
          </div>
          <h1 className="mt-8 text-5xl font-bold leading-tight">Manage blogs, leads, and publishing from one control room.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/72">
            Use this area to create or update blog posts, publish articles to the public site, and review every incoming lead captured from the website.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              'Create and publish blogs',
              'Track lead submissions',
              'Authenticate with your backend JWT',
            ].map((item) => (
              <div key={item} className="rounded-[24px] border border-white/10 bg-slate-950/20 px-5 py-5 text-sm text-white/75">
                {item}
              </div>
            ))}
          </div>

          <div className="mt-12 inline-flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/25 px-5 py-3 text-sm">
            <Activity size={16} className={healthStatus.ok ? 'text-emerald-400' : 'text-amber-300'} />
            <span>{healthStatus.label}</span>
          </div>
        </section>

        <section className="rounded-[36px] bg-white p-8 text-slate-900 shadow-[0_32px_120px_rgba(0,0,0,0.22)] md:p-10">
          <div className="flex rounded-full bg-slate-100 p-1 text-sm font-semibold">
            <button type="button" onClick={() => setMode('login')} className={`flex-1 rounded-full px-4 py-3 transition ${mode === 'login' ? 'bg-[#0d5e65] text-white shadow-sm' : 'text-slate-500'}`}>
              Login
            </button>
            <button type="button" onClick={() => setMode('register')} className={`flex-1 rounded-full px-4 py-3 transition ${mode === 'register' ? 'bg-[#0d5e65] text-white shadow-sm' : 'text-slate-500'}`}>
              Create Admin
            </button>
          </div>

          <div className="mt-8">
            <h2 className="text-3xl font-semibold">{mode === 'login' ? 'Admin sign in' : 'Bootstrap first admin'}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              {mode === 'login'
                ? 'Login with the admin account created in your backend.'
                : 'Use this once to create your first admin user through the register API.'}
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#0d5e65] focus:ring-4 focus:ring-[#0d5e65]/10"
                placeholder="admin@bodhprima.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <KeyRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 py-3 pr-4 pl-11 outline-none transition focus:border-[#0d5e65] focus:ring-4 focus:ring-[#0d5e65]/10"
                  placeholder="Enter secure password"
                />
              </div>
            </div>

            {feedback.message ? (
              <p className={`rounded-2xl px-4 py-3 text-sm ${feedback.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                {feedback.message}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#0d5e65_0%,#12736d_60%,#e4af47_140%)] px-5 py-4 text-sm font-semibold text-white shadow-lg transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Please wait...' : mode === 'login' ? 'Enter dashboard' : 'Create admin account'}
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-8 text-sm text-slate-500">
            Public website available at <Link to="/blog" className="font-semibold text-[#0d5e65]">/blog</Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AdminLogin;
