import { useState, useEffect } from 'react';
import { statusOptions } from '../utils/storage';

export default function BookForm({ initialData, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        year: '',
        status: 'planned',
        favorite: false
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                author: initialData.author,
                year: initialData.year || '',
                status: initialData.status,
                favorite: initialData.favorite
            });
        } else {
            setFormData({ title: '', author: '', year: '', status: 'planned', favorite: false });
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.author.trim()) return;

        onSubmit({
            ...formData,
            title: formData.title.trim(),
            author: formData.author.trim(),
            year: formData.year ? Number(formData.year) : undefined,
        });

        if (!initialData) {
            setFormData({ title: '', author: '', year: '', status: 'planned', favorite: false });
        }
    };

    const isEdit = Boolean(initialData);

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="font-semibold text-slate-100">
                    {isEdit ? 'Könyv szerkesztése' : 'Új könyv felvétele'}
                </h2>
                {isEdit && (
                    <button onClick={onCancel} className="text-xs text-rose-400 hover:text-rose-300">
                        Mégse
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="mb-1 block text-xs font-medium text-slate-400">Könyv címe</label>
                    <input
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Pl. The Clean Coder"
                        required
                    />
                </div>

                <div>
                    <label className="mb-1 block text-xs font-medium text-slate-400">Szerző</label>
                    <input
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        value={formData.author}
                        onChange={e => setFormData({ ...formData, author: e.target.value })}
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-400">Év</label>
                        <input
                            type="number"
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            value={formData.year}
                            onChange={e => setFormData({ ...formData, year: e.target.value })}
                            placeholder="2024"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-400">Státusz</label>
                        <select
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            value={formData.status}
                            onChange={e => setFormData({ ...formData, status: e.target.value })}
                        >
                            {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                    </div>
                </div>

                <div className="flex items-center gap-3 py-2">
                    <label className="flex cursor-pointer items-center gap-2 select-none">
                        <input
                            type="checkbox"
                            checked={formData.favorite}
                            onChange={e => setFormData({ ...formData, favorite: e.target.checked })}
                            className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-900"
                        />
                        <span className="text-sm text-slate-300">Kedvencnek jelölöm</span>
                    </label>
                </div>

                <button
                    type="submit"
                    className={`w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all active:scale-95 ${isEdit
                            ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-900/20'
                            : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-900/20'
                        }`}
                >
                    {isEdit ? 'Mentés' : 'Hozzáadás'}
                </button>
            </form>
        </div>
    );
}