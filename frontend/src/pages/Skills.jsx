import EmptyState from '../components/EmptyState';
import PageHeader from '../components/PageHeader';
import { useAnalysis } from '../context/AnalysisContext';

const Skills = () => {
  const { analysis } = useAnalysis();

  if (!analysis) {
    return (
      <EmptyState
        title="No Skills Data"
        description="Upload and analyze your resume to see detected skills and gaps."
      />
    );
  }

  const skills = analysis.skills || [];
  const missing = analysis.missingSkills || [];

  return (
    <div className="animate-fade-in">
      <PageHeader
        badge="Insights"
        title="Skill Analysis"
        description="Skills detected in your resume and recommended additions"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Detected Skills ({skills.length})
          </h2>
          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700 dark:bg-primary-900/50 dark:text-primary-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No skills detected.</p>
          )}
        </div>

        <div className="card">
          <h2 className="mb-4 text-lg font-semibold text-orange-700 dark:text-orange-400">
            Missing Skills ({missing.length})
          </h2>
          {missing.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {missing.map((skill, i) => (
                <span
                  key={i}
                  className="rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-sm font-medium text-orange-700 dark:border-orange-800 dark:bg-orange-900/20 dark:text-orange-300"
                >
                  + {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No missing skills identified.</p>
          )}
        </div>
      </div>

      <div className="card mt-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Skill Gap Insights</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Adding the missing skills above — where you genuinely have experience — can improve your
          ATS score and help you pass automated screening. Focus on skills relevant to your target
          role and back them up with projects or experience in your resume.
        </p>
      </div>
    </div>
  );
};

export default Skills;
