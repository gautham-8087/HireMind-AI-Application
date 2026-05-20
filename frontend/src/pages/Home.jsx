import { Link } from 'react-router-dom';
import { IconChart, IconTarget, IconSparkles, IconChat } from '../components/Icons';

const features = [
  {
    title: 'ATS Score Analysis',
    description: 'Applicant Tracking System compatibility score with a clear breakdown.',
    Icon: IconChart,
    path: '/dashboard',
    color: 'from-emerald-500/20 to-teal-500/10 text-primary-600 dark:text-primary-400',
  },
  {
    title: 'Skill Gap Detection',
    description: 'Spot missing skills and align your profile with industry expectations.',
    Icon: IconTarget,
    path: '/skills',
    color: 'from-sky-500/20 to-blue-500/10 text-accent-600 dark:text-accent-400',
  },
  {
    title: 'AI Improvement Tips',
    description: 'Actionable suggestions to strengthen your resume and stand out.',
    Icon: IconSparkles,
    path: '/suggestions',
    color: 'from-violet-500/20 to-purple-500/10 text-violet-600 dark:text-violet-400',
  },
  {
    title: 'Interview Prep',
    description: 'Technical interview questions tailored to your detected skills.',
    Icon: IconChat,
    path: '/interview',
    color: 'from-amber-500/20 to-orange-500/10 text-amber-600 dark:text-amber-400',
  },
];

const stats = [
  { value: 'ATS', label: 'Score tracking' },
  { value: '10+', label: 'Interview Qs' },
  { value: 'PDF', label: 'Quick upload' },
  { value: '100%', label: 'Private analysis' },
];

const Home = () => {
  return (
    <div className="animate-fade-in">
      <section className="relative mb-20 overflow-hidden rounded-3xl border border-slate-200/60 bg-white/60 px-6 py-16 text-center backdrop-blur-sm sm:px-12 dark:border-slate-700/60 dark:bg-slate-900/40">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-accent-400/15 blur-3xl" />

        <span className="badge mb-6">Smart Resume Intelligence</span>

        <h1 className="relative mb-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
          Ace your next role with{' '}
          <span className="gradient-text">HireMind</span>
        </h1>

        <p className="relative mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          Upload your resume for instant ATS scoring, skill analysis, personalized improvement tips,
          and interview preparation — all in one polished dashboard.
        </p>

        <div className="relative flex flex-wrap justify-center gap-4">
          <Link to="/upload" className="btn-primary text-base">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Analyze My Resume
          </Link>
          <Link to="/dashboard" className="btn-secondary text-base">
            View Dashboard
          </Link>
        </div>

        <div className="relative mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-slate-200/50 bg-slate-50/80 py-4 dark:border-slate-700/50 dark:bg-slate-800/50">
              <p className="text-xl font-bold text-primary-600 dark:text-primary-400">{s.value}</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ title, description, Icon, path, color }) => (
          <Link key={title} to={path} className="card-hover group">
            <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-br p-3 ${color}`}>
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-semibold text-slate-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{description}</p>
          </Link>
        ))}
      </section>

      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 p-8 text-white sm:p-12">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-bold sm:text-3xl">How it works</h2>
            <ol className="space-y-5">
              {[
                'Upload your resume as a PDF',
                'Intelligent extraction and analysis',
                'Review ATS score, skills, and tips',
                'Practice with interview questions',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-500/30 text-sm font-bold ring-1 ring-primary-400/40">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-slate-200">{step}</span>
                </li>
              ))}
            </ol>
            <Link to="/upload" className="btn-primary mt-8 bg-white text-slate-900 hover:bg-slate-100">
              Start free analysis
            </Link>
          </div>
          <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-3">
              {['ATS Score', 'Skills', 'AI Tips', 'Interview'].map((label, i) => (
                <div
                  key={label}
                  className="flex h-28 w-32 animate-float flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur"
                  style={{ animationDelay: `${i * 0.5}s` }}
                >
                  <span className="text-2xl font-bold text-primary-300">0{i + 1}</span>
                  <span className="mt-1 text-sm font-medium text-slate-300">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
