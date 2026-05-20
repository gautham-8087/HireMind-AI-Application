const STORAGE_KEY = 'hiremind_analysis';

export const saveAnalysisLocally = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore quota errors */
  }
};

export const loadAnalysisLocally = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const clearAnalysisLocally = () => {
  localStorage.removeItem(STORAGE_KEY);
};
