import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="flex min-h-[50vh] flex-col items-center justify-center text-center animate-fade-in">
    <p className="text-6xl font-extrabold text-emerald-500">404</p>
    <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">Page not found</h1>
    <p className="mt-2 max-w-md text-slate-500 dark:text-slate-400">
      The page you are looking for does not exist or was moved.
    </p>
    <Link to="/" className="btn-primary mt-8">
      Back to Home
    </Link>
  </div>
);

export default NotFound;
