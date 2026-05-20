import { Link } from 'react-router-dom';

const EmptyState = ({
  title,
  description,
  actionLabel = 'Upload Resume',
  actionPath = '/upload',
  secondaryLabel,
  secondaryPath = '/',
}) => {
  return (
    <div className="card flex flex-col items-center py-16 text-center animate-fade-in">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-900/40">
        <svg className="h-8 w-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mb-8 max-w-md text-slate-500 dark:text-slate-400">{description}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link to={actionPath} className="btn-primary">
          {actionLabel}
        </Link>
        {secondaryLabel && (
          <Link to={secondaryPath} className="btn-secondary">
            {secondaryLabel}
          </Link>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
