export const STORAGE_KEY = 'react-crud-books-v2';

export const initialBooks = [
  { 
    id: 1, 
    title: 'JavaScript - The Good Parts', 
    author: 'Douglas Crockford', 
    year: 2008, 
    favorite: true, 
    status: 'reading' },
  { 
    id: 2, 
    title: 'Clean Code', 
    author: 'Robert C. Martin', 
    year: 2008, 
    favorite: true, 
    status: 'done' },
  { 
    id: 3, 
    title: "You Don't Know JS Yet", 
    author: 'Kyle Simpson', 
    year: 2020, 
    favorite: false, 
    status: 'planned' },
];

export const statusOptions = [
  { value: 'planned', label: 'Tervezett' },
  { value: 'reading', label: 'Olvasás alatt' },
  { value: 'done', label: 'Kész' },
];

export function loadBooks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialBooks;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return initialBooks;
    return parsed;
  } catch (e) {
    console.warn('Helyi tároló olvasási hiba:', e);
    return initialBooks;
  }
}

export function saveBooks(books) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  } catch (e) {
    console.warn('Helyi tároló írási hiba:', e);
  }
}