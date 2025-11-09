import { useState } from 'react';
import Header from './components/Header';
import UploadPanel from './components/UploadPanel';
import DocumentsTable from './components/DocumentsTable';
import SearchQA from './components/SearchQA';
import HowItWorks from './components/HowItWorks';

export default function App() {
  const [lastIngest, setLastIngest] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <section className="mb-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <UploadPanel onUpload={(data) => setLastIngest({ time: Date.now(), count: data?.inserted || 0 })} />
              <SearchQA />
            </div>
            <div className="lg:col-span-1 space-y-6">
              <HowItWorks />
              {lastIngest && (
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <p className="text-sm font-medium text-emerald-300">Ingestion complete</p>
                  <p className="mt-1 text-sm text-slate-200">Inserted {lastIngest.count} records.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <DocumentsTable />
      </main>

      <footer className="border-t border-white/10 py-6 text-center text-xs text-slate-400">
        Built for secure enterprise document understanding.
      </footer>
    </div>
  );
}
