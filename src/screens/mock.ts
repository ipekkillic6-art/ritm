/** Story'ler için mock alışkanlık verisi (tarayıcıda canlı geçmiş üretir). */
import { addDays, keyOf } from '@/lib/date';
import type { Habit } from '@/store/habits';

function dates(pattern: (i: number) => boolean, span = 24): string[] {
  const out: string[] = [];
  const now = new Date();
  for (let i = span; i >= 0; i--) if (pattern(i)) out.push(keyOf(addDays(now, -i)));
  return out;
}

const created = keyOf(addDays(new Date(), -30));

export const MOCK_HABITS: Habit[] = [
  {
    id: 'h-water', name: 'Su iç', icon: 'droplet', color: '#3B82F6', freq: 'daily',
    note: 'Günde 8 bardak su. Sabah bir bardakla başla.', createdAt: created,
    completedDates: dates((i) => i !== 0 && i % 7 !== 3),
  },
  {
    id: 'h-workout', name: 'Spor yap', icon: 'dumbbell', color: '#8B5CF6', freq: 'weekdays',
    note: '30 dakika hareket.', createdAt: created,
    completedDates: dates((i) => i % 5 !== 2),
  },
  {
    id: 'h-read', name: 'Kitap oku', icon: 'book', color: '#F59E0B', freq: 'daily',
    note: 'En az 10 sayfa.', createdAt: created,
    completedDates: dates((i) => i % 2 === 0),
  },
  {
    id: 'h-meditate', name: 'Meditasyon', icon: 'brain', color: '#10B981', freq: 'daily',
    note: '10 dakika nefes çalışması.', createdAt: created,
    completedDates: dates((i) => i !== 0 && i < 12 && i % 3 !== 0),
  },
  {
    id: 'h-sleep', name: 'Erken yat', icon: 'moon', color: '#EC4899', freq: 'daily',
    createdAt: created,
    completedDates: dates((i) => i % 3 === 1),
  },
];

export const MOCK_HABIT = MOCK_HABITS[0];
