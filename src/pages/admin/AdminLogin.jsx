import { Activity, ArrowRight, KeyRound, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getHealthStatus, loginAdmin } from '../../lib/api';
import { getAdminToken, setAdminSession } from '../../lib/adminAuth';

const initialCredentials = {
  email: '',
  password: '',
};

function AdminLogin() {
  const navigate = useNavigate();
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
      const session = await loginAdmin(credentials);
      setAdminSession(session);
      navigate('/admin/dashboard', { replace: true });
      return;
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
            Role-based workspace
          </div>
          <h1 className="mt-8 text-5xl font-bold leading-tight">Role-based login for admin, collaborator, content editor, and lead manager.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/72">
            Each account gets access based on its role. Blog users can manage articles, lead users can update lead tags and logs, and collaborators can handle both.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              'Admin: blogs and leads',
              'Content editor: blogs only',
              'Lead manager: leads only',
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
          <div className="mt-8">
            <h2 className="text-3xl font-semibold">Admin sign in</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Login with the admin credentials you created directly in the backend. New users are created only from the admin dashboard after login.
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
              {isSubmitting ? 'Please wait...' : 'Enter dashboard'}
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
