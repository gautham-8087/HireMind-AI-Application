import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import PageHeader from '../components/PageHeader';
import { useAnalysis } from '../context/AnalysisContext';
import { getHistory, getAnalysisById } from '../services/api';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setAnalysis } = useAnalysis();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await getHistory();
        if (data.success) setHistory(data.data || []);
        if (data.dbAvailable === false) setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load history');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const loadAnalysis = async (id) => {
    try {
      const { data } = await getAnalysisById(id);
      if (data.success) {
        setAnalysis({ ...data.data, id: data.data._id });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load analysis');
    }
  };

  if (loading) {
    return (
      <div className="card">
        <LoadingSpinner message="Loading analysis history..." size="md" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        badge="Archive"
        title="Analysis History"
        description="Previously analyzed resumes stored in MongoDB when connected"
      />

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {history.length === 0 ? (
        <div className="card text-center py-12">
          <p className="mb-4 text-gray-500">
            No analysis history yet.
            {!loading && (
              <span className="mt-2 block text-sm text-amber-600 dark:text-amber-400">
                History requires MongoDB. Analysis still works without it — results stay in your session until you refresh.
              </span>
            )}
          </p>
          <Link to="/upload" className="btn-primary">
            Upload Your First Resume
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item._id} className="card-hover flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{item.fileName}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(item.createdAt).toLocaleString()} · {item.skills?.length || 0} skills
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {item.atsScore}
                  </p>
                  <p className="text-xs text-gray-500">ATS Score</p>
                </div>
                <Link
                  to="/dashboard"
                  onClick={() => loadAnalysis(item._id)}
                  className="btn-primary text-sm"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
