import { useEffect, useState } from 'react';
import { Database, Loader2, RefreshCw, Trash2 } from 'lucide-react';

export default function DocumentsTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDocs = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/documents`);
      if (!res.ok) throw new Error('Failed to load documents');
      setRows(await res.json());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/documents/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setRows((prev) => prev.filter((r) => r._id !== id));
    } catch (e) {
      alert(e.message);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/50 p-4 shadow-xl shadow-black/20">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600/90 text-white shadow-lg shadow-emerald-600/30">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Documents</h2>
            <p className="text-sm text-slate-300">Stored metadata and extracted table counts.</p>
          </div>
        </div>
        <button onClick={fetchDocs} className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-slate-800/60 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-slate-400">
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Pages</th>
              <th className="px-3 py-2">Tables</th>
              <th className="px-3 py-2">Uploaded</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((r) => (
              <tr key={r._id} className="text-sm text-slate-200">
                <td className="px-3 py-2">{r.title}</td>
                <td className="px-3 py-2">{r.pages || '-'}</td>
                <td className="px-3 py-2">{r.table_count ?? '-'}</td>
                <td className="px-3 py-2">{new Date(r.created_at).toLocaleString()}</td>
                <td className="px-3 py-2">
                  <button onClick={() => handleDelete(r._id)} className="inline-flex items-center gap-1 rounded-md bg-rose-600/90 px-2 py-1 text-xs text-white hover:bg-rose-600">
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {error && <p className="mt-3 text-sm text-rose-400">{error}</p>}
      {!loading && rows.length === 0 && !error && (
        <p className="mt-3 text-sm text-slate-400">No documents yet. Upload PDFs to get started.</p>
      )}
    </section>
  );
}
