import { Link } from 'react-router-dom';

const EmptyState = ({ title, description, actionLabel = 'Upload Resume', actionPath = '/upload' }) => {
  return (
    <div className="card flex flex-col items-center py-16 text-center animate-fade-in">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-700">
        <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="mb-6 max-w-md text-gray-500 dark:text-gray-400">{description}</p>
      <Link to={actionPath} className="btn-primary">
        {actionLabel}
      </Link>
    </div>
  );
};

export default EmptyState;
