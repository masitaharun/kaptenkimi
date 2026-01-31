
import { Task } from './types';

export const TASKS: Task[] = [
  { id: 1, label: "Mandi pagi sendiri", points: 5, icon: "🚿" },
  { id: 2, label: "Dengar kata Cikgu", points: 10, icon: "👨‍🏫" },
  { id: 3, label: "Kerja Sekolah Pagi", points: 20, icon: "📝" },
  { id: 4, label: "Kerja Sekolah Agama", points: 20, icon: "🕌" },
  { id: 5, label: "Mandi petang sendiri", points: 5, icon: "🛀" },
  { id: 6, label: "Solat Subuh", points: 5, icon: "🌅" },
  { id: 7, label: "Solat Zohor", points: 5, icon: "☀️" },
  { id: 8, label: "Solat Asar", points: 5, icon: "🌤️" },
  { id: 9, label: "Solat Maghrib", points: 5, icon: "🌇" },
  { id: 10, label: "Solat Isyak", points: 5, icon: "🌙" },
  { id: 11, label: "Mengaji", points: 10, icon: "📖" },
  { id: 12, label: "Ulangkaji", points: 10, icon: "🧠" },
  { id: 13, label: "Tolong obak", points: 2, icon: "👴" },
  { id: 14, label: "Tolong nenek", points: 2, icon: "👵" },
  { id: 15, label: "Tolong Ibu", points: 2, icon: "👩" },
  { id: 16, label: "Tolong adik", points: 2, icon: "👶" },
  { id: 17, label: "Tolong kawan", points: 2, icon: "👦" },
  { id: 18, label: "Kemas mainan", points: 5, icon: "🧸" },
  { id: 19, label: "Baca buku", points: 10, icon: "📚" },
  { id: 20, label: "Makan sendiri", points: 5, icon: "🥣" },
];

export const MAX_DAILY_POINTS = 100;
export const STORAGE_KEY = 'misi_ke_zuhal_progress';
