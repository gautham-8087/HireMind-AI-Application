const PageHeader = ({ badge, title, description, centered, children }) => (
  <div
    className={`mb-8 flex flex-wrap items-end justify-between gap-4 ${centered ? 'flex-col items-center text-center' : ''}`}
  >
    <div>
      {badge && <span className="badge mb-3">{badge}</span>}
      <h1 className="section-title mb-2">{title}</h1>
      {description && <p className="max-w-2xl text-slate-600 dark:text-slate-400">{description}</p>}
    </div>
    {children}
  </div>
);

export default PageHeader;
