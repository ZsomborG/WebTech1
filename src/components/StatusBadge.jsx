export default function StatusBadge({ status }) {
    if (!status) return null;

    const map = {
        planned: { text: 'Tervezett', classes: 'bg-sky-500/10 text-sky-400 ring-sky-500/20' },
        reading: { text: 'Olvasás alatt', classes: 'bg-amber-500/10 text-amber-400 ring-amber-500/20' },
        done: { text: 'Kész', classes: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20' },
    };

    const conf = map[status] || map.planned;

    return (
        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${conf.classes}`}>
            {conf.text}
        </span>
    );
}