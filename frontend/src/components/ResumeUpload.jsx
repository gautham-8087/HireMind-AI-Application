import { useCallback, useState } from 'react';

const ResumeUpload = ({ onFileSelect, disabled }) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState(null);

  const handleFile = useCallback(
    (file) => {
      if (!file) return;
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file only.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be under 5MB.');
        return;
      }
      setFileName(file.name);
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (disabled) return;
    handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`relative overflow-hidden rounded-3xl border-2 border-dashed p-14 text-center transition-all duration-300 ${
        dragActive
          ? 'border-emerald-400 bg-emerald-50/80 shadow-lg dark:border-emerald-500 dark:bg-emerald-950/30'
          : 'border-slate-300 bg-white/50 dark:border-slate-600 dark:bg-slate-900/30'
      } ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:border-primary-300 hover:bg-primary-50/30 dark:hover:border-primary-700'}`}
    >
      <input
        type="file"
        accept=".pdf,application/pdf"
        onChange={(e) => handleFile(e.target.files?.[0])}
        disabled={disabled}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary-500/5 to-transparent" />

      <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/60 dark:to-accent-900/40">
        <svg className="h-10 w-10 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      </div>

      <h3 className="relative mb-2 text-xl font-semibold text-slate-900 dark:text-white">
        {fileName || 'Drop your resume here'}
      </h3>
      <p className="relative text-sm text-slate-500 dark:text-slate-400">
        or click to browse · PDF only · max 5MB
      </p>

      {fileName && (
        <div className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-primary-100 px-5 py-2 text-sm font-semibold text-primary-800 dark:bg-primary-900/50 dark:text-primary-300">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Ready to analyze
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
