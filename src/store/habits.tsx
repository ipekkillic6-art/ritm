/**
 * Alışkanlık deposu — Context + AsyncStorage kalıcılığı.
 * İlk açılışta canlı görünmesi için tohum (seed) veriyle dolar.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { addDays, keyOf, todayKey } from '@/lib/date';

export type Frequency = 'daily' | 'weekdays' | 'custom';

export type Habit = {
  id: string;
  name: string;
  icon: string;
  color: string;
  freq: Frequency;
  note?: string;
  createdAt: string;
  completedDates: string[];
};

const STORAGE_KEY = 'ritm:habits:v1';

function uid(): string {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}

export const FREQ_LABEL: Record<Frequency, string> = {
  daily: 'Her gün',
  weekdays: 'Hafta içi',
  custom: 'Özel',
};

/* ------------------------------------------------------------------ */
/* Tohum veri — son ~24 günden gerçekçi bir geçmiş üretir             */
/* ------------------------------------------------------------------ */

function seedDates(pattern: (i: number) => boolean, span = 24): string[] {
  const out: string[] = [];
  const now = new Date();
  for (let i = span; i >= 0; i--) {
    if (pattern(i)) out.push(keyOf(addDays(now, -i)));
  }
  return out;
}

function buildSeed(): Habit[] {
  const created = keyOf(addDays(new Date(), -30));
  return [
    {
      id: 'h-water',
      name: 'Su iç',
      icon: 'droplet',
      color: '#3B82F6',
      freq: 'daily',
      note: 'Günde 8 bardak su. Sabah bir bardakla başla.',
      createdAt: created,
      // neredeyse her gün — bugün henüz değil
      completedDates: seedDates((i) => i !== 0 && i % 7 !== 3),
    },
    {
      id: 'h-workout',
      name: 'Spor yap',
      icon: 'dumbbell',
      color: '#8B5CF6',
      freq: 'weekdays',
      note: '30 dakika hareket. Hafta içi her gün.',
      createdAt: created,
      completedDates: seedDates((i) => {
        const wd = addDays(new Date(), -i).getDay();
        return wd !== 0 && wd !== 6 && i % 5 !== 2;
      }),
    },
    {
      id: 'h-read',
      name: 'Kitap oku',
      icon: 'book',
      color: '#F59E0B',
      freq: 'daily',
      note: 'En az 10 sayfa.',
      createdAt: created,
      completedDates: seedDates((i) => i % 2 === 0),
    },
    {
      id: 'h-meditate',
      name: 'Meditasyon',
      icon: 'brain',
      color: '#10B981',
      freq: 'daily',
      note: '10 dakika nefes çalışması.',
      createdAt: created,
      completedDates: seedDates((i) => i !== 0 && i < 12 && i % 3 !== 0),
    },
    {
      id: 'h-sleep',
      name: 'Erken yat',
      icon: 'moon',
      color: '#EC4899',
      freq: 'daily',
      createdAt: created,
      completedDates: seedDates((i) => i % 3 === 1),
    },
  ];
}

/* ------------------------------------------------------------------ */
/* Context                                                            */
/* ------------------------------------------------------------------ */

type HabitsCtx = {
  habits: Habit[];
  ready: boolean;
  getHabit: (id: string) => Habit | undefined;
  addHabit: (h: Omit<Habit, 'id' | 'createdAt' | 'completedDates'>) => void;
  deleteHabit: (id: string) => void;
  toggleDate: (id: string, key: string) => void;
  toggleToday: (id: string) => void;
  resetAll: () => void;
};

const Ctx = createContext<HabitsCtx | null>(null);

export function HabitsProvider({ children }: { children: ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [ready, setReady] = useState(false);

  // Yükle veya tohumla
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          setHabits(JSON.parse(raw));
        } else {
          const seed = buildSeed();
          setHabits(seed);
          AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
        }
      } catch {
        setHabits(buildSeed());
      } finally {
        setReady(true);
      }
    })();
  }, []);

  // Değişince kaydet
  const persist = useCallback((next: Habit[]) => {
    setHabits(next);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const getHabit = useCallback(
    (id: string) => habits.find((h) => h.id === id),
    [habits],
  );

  const addHabit = useCallback<HabitsCtx['addHabit']>(
    (h) => {
      const item: Habit = {
        ...h,
        id: uid(),
        createdAt: todayKey(),
        completedDates: [],
      };
      persist([item, ...habits]);
    },
    [habits, persist],
  );

  const deleteHabit = useCallback(
    (id: string) => persist(habits.filter((h) => h.id !== id)),
    [habits, persist],
  );

  const toggleDate = useCallback(
    (id: string, key: string) => {
      persist(
        habits.map((h) => {
          if (h.id !== id) return h;
          const has = h.completedDates.includes(key);
          return {
            ...h,
            completedDates: has
              ? h.completedDates.filter((d) => d !== key)
              : [...h.completedDates, key],
          };
        }),
      );
    },
    [habits, persist],
  );

  const toggleToday = useCallback(
    (id: string) => toggleDate(id, todayKey()),
    [toggleDate],
  );

  const resetAll = useCallback(() => {
    const seed = buildSeed();
    persist(seed);
  }, [persist]);

  const value = useMemo(
    () => ({
      habits,
      ready,
      getHabit,
      addHabit,
      deleteHabit,
      toggleDate,
      toggleToday,
      resetAll,
    }),
    [habits, ready, getHabit, addHabit, deleteHabit, toggleDate, toggleToday, resetAll],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useHabits(): HabitsCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useHabits must be used within HabitsProvider');
  return ctx;
}

/** Yardımcı: bugün tamamlandı mı? */
export function isDoneToday(h: Habit): boolean {
  return h.completedDates.includes(todayKey());
}
