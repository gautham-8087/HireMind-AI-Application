import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResumeUpload from '../components/ResumeUpload';
import LoadingSpinner from '../components/LoadingSpinner';
import { IconDocument, IconShield, IconBolt } from '../components/Icons';
import { useAnalysis } from '../context/AnalysisContext';
import { fullAnalysis } from '../services/api';

const infoCards = [
  { label: 'PDF format', desc: 'Text-based resumes work best', Icon: IconDocument },
  { label: 'Up to 5MB', desc: 'Standard resume file size', Icon: IconShield },
  { label: 'Fast analysis', desc: 'Results in under a minute', Icon: IconBolt },
];

const Upload = () => {
  const [file, setFile] = useState(null);
  const { setAnalysis, loading, setLoading, error, setError } = useAnalysis();
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please select a PDF resume first.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data } = await fullAnalysis(file);
      if (data.success) {
        setAnalysis(data.data);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Analysis failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to analyze resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl animate-fade-in">
      <div className="mb-10 text-center">
        <span className="badge mb-4">Step 1</span>
        <h1 className="section-title mb-3">Upload your resume</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Drag and drop your PDF for instant, intelligent analysis
        </p>
      </div>

      {loading ? (
        <div className="card border-primary-200/50 dark:border-primary-800/50">
          <LoadingSpinner message="Analyzing your resume — this usually takes 30–60 seconds..." />
        </div>
      ) : (
        <>
          <ResumeUpload onFileSelect={setFile} disabled={loading} />

          {error && (
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-400">
              <svg className="mt-0.5 h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleAnalyze}
              disabled={!file || loading}
              className="btn-primary min-w-[220px] text-base"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Analyze Resume
            </button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {infoCards.map(({ label, desc, Icon }) => (
              <div key={label} className="card flex items-start gap-3 !p-4">
                <div className="rounded-lg bg-primary-100 p-2 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{label}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Upload;
