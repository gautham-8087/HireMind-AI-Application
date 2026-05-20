import { createContext, useContext, useState } from 'react';
import { loadAnalysisLocally, saveAnalysisLocally, clearAnalysisLocally } from '../utils/storage';

const AnalysisContext = createContext();

export const AnalysisProvider = ({ children }) => {
  const [analysis, setAnalysisState] = useState(() => loadAnalysisLocally());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const setAnalysis = (data) => {
    setAnalysisState(data);
    if (data) saveAnalysisLocally(data);
    else clearAnalysisLocally();
  };

  const clearAnalysis = () => {
    setAnalysisState(null);
    setError(null);
    clearAnalysisLocally();
  };

  return (
    <AnalysisContext.Provider
      value={{ analysis, setAnalysis, loading, setLoading, error, setError, clearAnalysis }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (!context) throw new Error('useAnalysis must be used within AnalysisProvider');
  return context;
};
