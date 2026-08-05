/** Yerel tarih yardımcıları. Anahtar formatı: 'YYYY-MM-DD' (yerel saat). */

export function keyOf(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function todayKey(): string {
  return keyOf(new Date());
}

export function addDays(d: Date, n: number): Date {
  const c = new Date(d);
  c.setDate(c.getDate() + n);
  return c;
}

const GUN_KISA = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
const AY_ADI = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
];

/** Son 7 günü (bugün en sağda) etiketiyle döndürür — istatistik grafiği için. */
export function last7Days(): { key: string; label: string }[] {
  const out: { key: string; label: string }[] = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = addDays(now, -i);
    out.push({ key: keyOf(d), label: GUN_KISA[d.getDay()][0] });
  }
  return out;
}

/** Bir ayın takvim ızgarası (Pazartesi başlangıç). Boş hücreler null. */
export function monthGrid(year: number, month: number): (string | null)[] {
  const first = new Date(year, month, 1);
  const startWeekday = (first.getDay() + 6) % 7; // Pzt = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (string | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(keyOf(new Date(year, month, d)));
  return cells;
}

export function monthLabel(year: number, month: number): string {
  return `${AY_ADI[month]} ${year}`;
}

export function longDateLabel(d: Date = new Date()): string {
  return `${d.getDate()} ${AY_ADI[d.getMonth()]} ${GUN_KISA[d.getDay()]}`;
}

export function greeting(d: Date = new Date()): string {
  const h = d.getHours();
  if (h < 6) return 'İyi geceler';
  if (h < 12) return 'Günaydın';
  if (h < 18) return 'İyi günler';
  return 'İyi akşamlar';
}

/**
 * Güncel seri: bugünden geriye doğru ardışık tamamlanan gün sayısı.
 * Bugün henüz işaretlenmediyse seri dünden itibaren sayılır (bugün "kırılma" saymaz).
 */
export function currentStreak(done: Set<string>): number {
  const now = new Date();
  let streak = 0;
  let cursor = new Date(now);
  if (!done.has(keyOf(cursor))) cursor = addDays(cursor, -1); // bugünü henüz yapmadıysa dünden başla
  while (done.has(keyOf(cursor))) {
    streak++;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

/** En uzun seri (tüm geçmiş). */
export function bestStreak(done: Set<string>): number {
  if (done.size === 0) return 0;
  const sorted = [...done].sort();
  let best = 1;
  let run = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const cur = new Date(sorted[i]);
    const diff = Math.round((cur.getTime() - prev.getTime()) / 86400000);
    run = diff === 1 ? run + 1 : 1;
    if (run > best) best = run;
  }
  return best;
}
