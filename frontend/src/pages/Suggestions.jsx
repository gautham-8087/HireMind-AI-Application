import EmptyState from '../components/EmptyState';
import { useAnalysis } from '../context/AnalysisContext';

const Suggestions = () => {
  const { analysis } = useAnalysis();

  if (!analysis) {
    return (
      <EmptyState
        title="No Suggestions Yet"
        description="Analyze your resume to receive AI-powered improvement recommendations."
      />
    );
  }

  const suggestions = analysis.suggestions || [];

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="section-title mb-2">AI Suggestions</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Personalized recommendations to improve your resume
        </p>
      </div>

      <div className="space-y-4">
        {suggestions.map((suggestion, i) => (
          <div
            key={i}
            className="card-hover flex gap-4 animate-slide-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-lg font-bold text-primary-600 dark:bg-primary-900/50 dark:text-primary-400">
              {i + 1}
            </div>
            <div>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">{suggestion}</p>
            </div>
          </div>
        ))}
      </div>

      {suggestions.length === 0 && (
        <div className="card text-center text-gray-500">No suggestions available.</div>
      )}

      <div className="card mt-8 border-primary-200 bg-primary-50 dark:border-primary-800 dark:bg-primary-900/20">
        <h3 className="mb-2 font-semibold text-primary-800 dark:text-primary-300">Pro Tip</h3>
        <p className="text-sm text-primary-700 dark:text-primary-400">
          Implement 2–3 suggestions at a time, then re-upload your updated resume to track score
          improvements over time in your analysis history.
        </p>
      </div>
    </div>
  );
};

export default Suggestions;
