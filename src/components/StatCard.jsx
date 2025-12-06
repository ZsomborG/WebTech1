export default function StatCard({ label, value, sub }) {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 shadow-sm">
            <p className="text-xs text-slate-400">{label}</p>
            <p className="mt-1 text-xl font-semibold text-white">{value}</p>
            {sub && <p className="mt-0.5 text-[11px] text-slate-500">{sub}</p>}
        </div>
    );
}