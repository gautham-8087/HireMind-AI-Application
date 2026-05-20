import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="mt-16 border-t border-slate-200/80 py-8 dark:border-slate-800">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} HireMind — Smart hiring starts with your resume.
      </p>
      <div className="flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
        <Link to="/upload" className="hover:text-primary-600 dark:hover:text-primary-400">
          Analyze
        </Link>
        <Link to="/dashboard" className="hover:text-primary-600 dark:hover:text-primary-400">
          Dashboard
        </Link>
        <Link to="/interview" className="hover:text-primary-600 dark:hover:text-primary-400">
          Interview
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
