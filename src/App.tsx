import { useState, useEffect, useMemo } from 'react';
import { loadBooks, saveBooks, initialBooks, statusOptions } from './utils/storage';
import BookForm from './components/BookForm';
import BookRow from './components/BookRow';
import StatCard from './components/StatCard';
import Notification from './components/Notification';

function App() {
  const [books, setBooks] = useState(() => loadBooks());
  const [editingId, setEditingId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [statusFilter, setStatusFilter] = useState('all');

  const editingBook = useMemo(() => 
    books.find(b => b.id === editingId), [books, editingId]
  );

  useEffect(() => {
    saveBooks(books);
  }, [books]);

  const showNotify = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const handleSaveBook = (data) => {
    if (editingId) {
      setBooks(prev => prev.map(b => b.id === editingId ? { ...b, ...data } : b));
      showNotify('Könyv sikeresen frissítve!');
      setEditingId(null);
    } else {
      const nextId = books.length ? Math.max(...books.map(b => b.id)) + 1 : 1;
      setBooks(prev => [...prev, { id: nextId, ...data }]);
      showNotify('Új könyv hozzáadva!');
    }
  };

  const handleDelete = (book) => {
    if (window.confirm(`Törlöd a(z) "${book.title}" könyvet?`)) {
      setBooks(prev => prev.filter(b => b.id !== book.id));
      if (editingId === book.id) setEditingId(null);
      showNotify('Könyv törölve.', 'info');
    }
  };

  const handleReset = () => {
    if (window.confirm('Biztosan visszaállítod az alapállapotot? Minden jelenlegi adatod törlődik.')) {
      setBooks(initialBooks);
      setEditingId(null);
      setSearch('');
      showNotify('Adatok visszaállítva.', 'info');
    }
  };

  const handleToggleFavorite = (book) => {
    setBooks(prev => prev.map(b => b.id === book.id ? { ...b, favorite: !b.favorite } : b));
  };

  const processedBooks = useMemo(() => {
    let result = books.filter(b => {
      const q = search.toLowerCase();
      const matchSearch = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'all' || (statusFilter === 'favorites' ? b.favorite : b.status === statusFilter);
      return matchSearch && matchStatus;
    });

    result.sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title, 'hu');
      if (sortBy === 'year') return (b.year || 0) - (a.year || 0);
      return 0;
    });

    return result;
  }, [books, search, sortBy, statusFilter]);

  const stats = useMemo(() => ({
    total: books.length,
    favorites: books.filter(b => b.favorite).length,
    reading: books.filter(b => b.status === 'reading').length
  }), [books]);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)} 
        />
      )}

      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Könyvtáram</h1>
            <p className="mt-1 text-slate-400">Rendszerezd olvasmányaidat egyszerűen.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
             <button 
               onClick={handleReset}
               className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-rose-900/20 hover:border-rose-800 hover:text-rose-400 transition-colors"
             >
               ↺ Reset
             </button>

             <div className="h-6 w-px bg-slate-800 mx-1 hidden sm:block"></div>

             <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-slate-800">
               <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
               Local Storage
             </div>
             <span className="text-xs font-medium text-slate-500">{stats.total} könyv</span>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="sticky top-4 z-10 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-sm backdrop-blur-md">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
                  <input
                    className="w-full rounded-xl border-slate-800 bg-slate-950 py-2 pl-9 pr-4 text-sm text-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="Keresés..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <select 
                    className="rounded-xl border-slate-800 bg-slate-950 py-2 pl-3 pr-8 text-sm text-slate-300 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                  >
                    <option value="all">Minden</option>
                    <option value="favorites">Kedvencek</option>
                    {statusOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <select 
                    className="rounded-xl border-slate-800 bg-slate-950 py-2 pl-3 pr-8 text-sm text-slate-300 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                  >
                    <option value="title">Cím (A-Z)</option>
                    <option value="year">Év (Új-Régi)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {processedBooks.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-800 py-12 text-center">
                  <p className="text-slate-500">Nincs találat a keresési feltételekre.</p>
                </div>
              ) : (
                processedBooks.map(book => (
                  <div 
                    key={book.id} 
                    onClick={() => setEditingId(book.id)} 
                    className={`cursor-pointer transition-transform duration-200 ${editingId === book.id ? 'translate-x-2 ring-1 ring-indigo-500 rounded-2xl' : ''}`}
                  >
                    <BookRow 
                      book={book} 
                      onEdit={() => setEditingId(book.id)} 
                      onDelete={() => handleDelete(book)}
                      onToggleFavorite={() => handleToggleFavorite(book)}
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="lg:col-span-4 lg:sticky lg:top-8 space-y-6">
            <div className="grid grid-cols-2 gap-3">
              <StatCard label="Olvasás alatt" value={stats.reading} />
              <StatCard label="Kedvencek" value={stats.favorites} />
            </div>

            <BookForm 
              initialData={editingBook} 
              onSubmit={handleSaveBook} 
              onCancel={() => setEditingId(null)}
            />

            <div className="rounded-xl bg-slate-900/70 p-4 text-xs text-indigo-200 border border-indigo-500/20">
              <p className="font-semibold mb-1 text-indigo-100">💡 Tipp:</p>
              A bal oldali listában kattints egy könyvre a szerkesztéshez.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;