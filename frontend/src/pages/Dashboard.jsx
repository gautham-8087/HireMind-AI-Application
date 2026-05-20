import { Link } from 'react-router-dom';
import ScoreRing from '../components/ScoreRing';
import EmptyState from '../components/EmptyState';
import PageHeader from '../components/PageHeader';
import { useAnalysis } from '../context/AnalysisContext';

const Dashboard = () => {
  const { analysis } = useAnalysis();

  if (!analysis) {
    return (
      <EmptyState
        title="No Analysis Yet"
        description="Upload your resume to see your ATS compatibility score and detailed breakdown."
      />
    );
  }

  const score = analysis.atsScore ?? 0;

  return (
    <div className="animate-fade-in">
      <PageHeader
        badge="Results"
        title="ATS Score Dashboard"
        description={
          analysis.fileName ? `Analysis for ${analysis.fileName}` : 'Your resume compatibility overview'
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card flex flex-col items-center justify-center lg:col-span-1">
          <ScoreRing score={score} size={180} />
          <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">ATS Compatibility Score</p>
        </div>

        <div className="card lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Summary</h2>
          <p className="leading-relaxed text-gray-600 dark:text-gray-300">
            {analysis.summary || 'No summary available.'}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Link to="/skills" className="rounded-xl bg-primary-50 p-4 transition-colors hover:bg-primary-100 dark:bg-primary-900/30 dark:hover:bg-primary-900/50">
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {analysis.skills?.length || 0}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Skills Detected</p>
            </Link>
            <Link to="/suggestions" className="rounded-xl bg-orange-50 p-4 transition-colors hover:bg-orange-100 dark:bg-orange-900/20 dark:hover:bg-orange-900/30">
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {analysis.missingSkills?.length || 0}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Missing Skills</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="card">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-green-700 dark:text-green-400">
            <span>✓</span> Strengths
          </h2>
          <ul className="space-y-2">
            {(analysis.strengths || []).map((item, i) => (
              <li key={i} className="flex gap-2 text-gray-600 dark:text-gray-300">
                <span className="text-green-500">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-red-600 dark:text-red-400">
            <span>!</span> Weaknesses
          </h2>
          <ul className="space-y-2">
            {(analysis.weaknesses || []).map((item, i) => (
              <li key={i} className="flex gap-2 text-gray-600 dark:text-gray-300">
                <span className="text-red-500">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <Link to="/skills" className="btn-primary">View Skills</Link>
        <Link to="/suggestions" className="btn-secondary">AI Suggestions</Link>
        <Link to="/interview" className="btn-secondary">Interview Prep</Link>
      </div>
    </div>
  );
};

export default Dashboard;
