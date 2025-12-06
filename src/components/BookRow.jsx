import StatusBadge from './StatusBadge';

export default function BookRow({ book, onEdit, onDelete, onToggleFavorite }) {

    const handleAction = (e, action) => {
        e.stopPropagation();
        action(book);
    };

    return (
        <div className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm shadow-sm ring-1 ring-transparent transition hover:border-indigo-500/50 hover:bg-slate-900">
            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => handleAction(e, onToggleFavorite)}
                        className="mr-1 text-lg leading-none text-slate-600 transition hover:scale-110 hover:text-amber-400"
                        title={book.favorite ? 'Kedvenc eltávolítása' : 'Kedvencnek jelölés'}
                    >
                        {book.favorite ? '★' : '☆'}
                    </button>
                    <p className="truncate font-medium text-slate-200">{book.title}</p>
                </div>
                <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span className="font-medium text-slate-300">{book.author}</span>
                    {book.year && <span className="text-slate-500">· {book.year}</span>}
                    <StatusBadge status={book.status} />
                </div>
            </div>

            <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <button
                    onClick={(e) => handleAction(e, onEdit)}
                    className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-[11px] font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                    Szerk.
                </button>
                <button
                    onClick={(e) => handleAction(e, onDelete)}
                    className="rounded-full border border-rose-900/30 bg-rose-500/10 px-3 py-1 text-[11px] font-medium text-rose-400 hover:bg-rose-500/20 hover:text-rose-300"
                >
                    Törlés
                </button>
            </div>
        </div>
    );
}