import { useMemo, useState } from 'react';
import { Loader2, MessageCircleQuestion, Search } from 'lucide-react';

export default function SearchQA() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [answer, setAnswer] = useState(null);
  const [error, setError] = useState('');

  const hasQuery = useMemo(() => query.trim().length > 0, [query]);

  const runSearch = async () => {
    if (!hasQuery) return;
    setLoading(true);
    setError('');
    setAnswer(null);
    setResults([]);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/search?query=` + encodeURIComponent(query));
      if (!res.ok) throw new Error('Search failed');
      const data = await res.json();
      setResults(data.matches || []);
      setAnswer(data.answer || null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/50 p-4 shadow-xl shadow-black/20">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-600/90 text-white shadow-lg shadow-cyan-600/30">
          <MessageCircleQuestion className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Semantic Search & QA</h2>
          <p className="text-sm text-slate-300">Ask questions and get answers with citations from your PDFs.</p>
        </div>
      </div>

      <div className="flex w-full items-center gap-3">
        <div className="relative w-full">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && runSearch()}
            placeholder="Ask a question about your documents..."
            className="w-full rounded-xl border border-white/10 bg-slate-800/60 py-2.5 pl-10 pr-3 text-sm text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
        </div>
        <button
          onClick={runSearch}
          disabled={!hasQuery || loading}
          className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-cyan-600/30 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          {loading ? 'Searching…' : 'Search'}
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-rose-400">{error}</p>}

      {answer && (
        <div className="mt-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-3">
          <p className="text-sm font-medium text-cyan-200">Answer</p>
          <p className="mt-1 text-sm text-slate-200">{answer.text}</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-slate-300">Top matches</p>
          <ul className="mt-2 space-y-2">
            {results.map((r, i) => (
              <li key={i} className="rounded-lg border border-white/10 bg-slate-800/50 p-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Score: {r.score?.toFixed?.(3) ?? r.score}</span>
                  <span>Doc: {r.metadata?.title || r.doc_id}</span>
                </div>
                <p className="mt-1 text-sm text-slate-200">{r.text}</p>
                {r.metadata?.page && (
                  <p className="mt-1 text-xs text-slate-400">Page {r.metadata.page}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
