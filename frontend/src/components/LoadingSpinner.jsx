const LoadingSpinner = ({ message = 'Analyzing your resume...', size = 'lg' }) => {
  const ring = size === 'sm' ? 'h-10 w-10' : size === 'md' ? 'h-14 w-14' : 'h-16 w-16';

  return (
    <div className="flex flex-col items-center justify-center gap-5 py-14 animate-fade-in">
      <div className="relative">
        <div className={`${ring} rounded-full border-4 border-slate-200 dark:border-slate-700`} />
        <div
          className={`absolute inset-0 ${ring} animate-spin rounded-full border-4 border-transparent border-t-primary-500 border-r-accent-500`}
        />
      </div>
      <p className="max-w-sm text-center text-sm font-medium text-slate-600 dark:text-slate-400">{message}</p>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-2 w-2 animate-pulse rounded-full bg-primary-500"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;
