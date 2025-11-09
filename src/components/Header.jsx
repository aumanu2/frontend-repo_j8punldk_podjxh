import { Database, FileText, Search, Upload } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-white/10 bg-gradient-to-b from-slate-900 to-slate-950/80 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Enterprise PDF Intelligence</h1>
              <p className="text-xs text-slate-300">Ingest • Extract • Store • Search • Answer</p>
            </div>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <Badge icon={<Upload className="h-3.5 w-3.5" />} label="Ingestion" color="indigo" />
            <Badge icon={<Database className="h-3.5 w-3.5" />} label="Mongo + Vectors" color="emerald" />
            <Badge icon={<Search className="h-3.5 w-3.5" />} label="Semantic QA" color="cyan" />
          </div>
        </div>
      </div>
    </header>
  );
}

function Badge({ icon, label, color = 'indigo' }) {
  const colorMap = {
    indigo: 'bg-indigo-500/10 text-indigo-300 ring-indigo-500/30',
    emerald: 'bg-emerald-500/10 text-emerald-300 ring-emerald-500/30',
    cyan: 'bg-cyan-500/10 text-cyan-300 ring-cyan-500/30',
  };
  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs ring-1 ${colorMap[color]}`}>
      {icon}
      <span>{label}</span>
    </div>
  );
}
