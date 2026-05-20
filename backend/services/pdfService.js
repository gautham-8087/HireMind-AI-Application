import pdf from 'pdf-parse';

export const extractTextFromPDF = async (buffer) => {
  const data = await pdf(buffer);
  const text = data.text?.trim();

  if (!text || text.length < 50) {
    throw new Error('Could not extract sufficient text from the PDF. Ensure the resume is text-based, not scanned images.');
  }

  return text;
};
