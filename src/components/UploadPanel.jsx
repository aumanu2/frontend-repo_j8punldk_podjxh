import { useState } from 'react';
import { FileText, Loader2, Upload } from 'lucide-react';

export default function UploadPanel({ onUpload }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files || []));
  };

  const handleUpload = async () => {
    if (!files.length) return;
    setLoading(true);
    setError('');
    try {
      const form = new FormData();
      files.forEach((f) => form.append('files', f));
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ingest`, {
        method: 'POST',
        body: form,
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      onUpload?.(data);
      setFiles([]);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/50 p-4 shadow-xl shadow-black/20">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600/90 text-white shadow-lg shadow-indigo-600/30">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Upload PDFs</h2>
            <p className="text-sm text-slate-300">Digital and scanned PDFs supported. We extract text, tables, and images.</p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
        <input
          type="file"
          accept="application/pdf"
          multiple
          onChange={handleFileChange}
          className="block w-full cursor-pointer rounded-xl border border-white/10 bg-slate-800/60 p-3 text-sm text-slate-200 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-indigo-500"
        />
        <button
          onClick={handleUpload}
          disabled={loading || !files.length}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-600/30 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {loading ? 'Uploading…' : 'Upload & Ingest'}
        </button>
      </div>

      {files.length > 0 && (
        <p className="mt-2 text-xs text-slate-400">Selected: {files.map((f) => f.name).join(', ')}</p>
      )}
      {error && <p className="mt-2 text-sm text-rose-400">{error}</p>}
    </section>
  );
}
