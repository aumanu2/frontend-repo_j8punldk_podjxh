import { Brain, Database, FileText, Table, Settings } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <FileText className="h-5 w-5" />, title: 'Ingest PDFs', desc: 'Upload digital or scanned PDFs. We handle OCR when needed.'
    },
    {
      icon: <Table className="h-5 w-5" />, title: 'Extract Structure', desc: 'Parse text, tables, and images into structured objects.'
    },
    {
      icon: <Database className="h-5 w-5" />, title: 'Store', desc: 'Save metadata and tables to MongoDB; embeddings to a vector index.'
    },
    {
      icon: <Brain className="h-5 w-5" />, title: 'Search & QA', desc: 'Semantic search with grounded answers and inline citations.'
    },
  ];

  return (
    <section className="rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900/60 to-slate-950/60 p-6 shadow-xl shadow-black/20">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600/90 text-white shadow-lg shadow-violet-600/30">
          <Settings className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">How it works</h2>
          <p className="text-sm text-slate-300">A simple pipeline from ingestion to answers.</p>
        </div>
      </div>

      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={i} className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
            <div className="flex items-center gap-2 text-violet-300">
              {s.icon}
              <span className="text-sm font-medium">Step {i + 1}</span>
            </div>
            <p className="mt-2 text-base font-semibold text-white">{s.title}</p>
            <p className="mt-1 text-sm text-slate-300">{s.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
