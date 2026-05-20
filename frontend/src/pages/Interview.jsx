import { useState } from 'react';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';
import PageHeader from '../components/PageHeader';
import { useAnalysis } from '../context/AnalysisContext';
import { generateInterviewQuestions } from '../services/api';

const difficultyColors = {
  Easy: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  Hard: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

const Interview = () => {
  const { analysis, setAnalysis } = useAnalysis();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const questions = analysis?.interviewQuestions || [];

  const handleRegenerate = async () => {
    if (!analysis?.skills?.length) return;

    setLoading(true);
    setError(null);

    try {
      const { data } = await generateInterviewQuestions(analysis.skills, analysis.id);
      if (data.success) {
        setAnalysis({
          ...analysis,
          interviewQuestions: data.data.interviewQuestions,
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to regenerate questions');
    } finally {
      setLoading(false);
    }
  };

  if (!analysis) {
    return (
      <EmptyState
        title="No Interview Questions"
        description="Upload and analyze your resume to get AI-generated interview questions based on your skills."
      />
    );
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        badge="Interview prep"
        title="Interview Questions"
        description="Technical questions tailored to your resume skills"
      >
        <button onClick={handleRegenerate} disabled={loading} className="btn-secondary shrink-0">
          Regenerate
        </button>
      </PageHeader>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {loading ? (
        <div className="card">
          <LoadingSpinner message="Generating new interview questions..." size="md" />
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((q, i) => (
            <div key={i} className="card-hover animate-slide-up">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  Q{i + 1}
                </span>
                {q.category && (
                  <span className="rounded-lg bg-primary-100 px-2.5 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900/50 dark:text-primary-300">
                    {q.category}
                  </span>
                )}
                {q.difficulty && (
                  <span
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium ${
                      difficultyColors[q.difficulty] || difficultyColors.Medium
                    }`}
                  >
                    {q.difficulty}
                  </span>
                )}
              </div>
              <p className="text-gray-800 dark:text-gray-200">{q.question}</p>
            </div>
          ))}
        </div>
      )}

      {questions.length === 0 && !loading && (
        <div className="card text-center text-gray-500">No interview questions generated yet.</div>
      )}
    </div>
  );
};

export default Interview;
