# Ritm — Alışkanlık Takibi (Stajyer Referans Tasarımı)

Bu proje, `staj-claude-expo-rehberi.md` müfredatındaki alışkanlık takibi uygulamasının
**uçtan uca hedef tasarımıdır**. Stajyer bunu "varış noktası" olarak kullanır: ekranları
inceler, kendi versiyonunu adım adım yeniden kurar. İsim, renk, kapsam değiştirilebilir —
karar mercii stajyerdir.

@AGENTS.md

## Ne / Nasıl

- **Expo SDK 57 + expo-router** (dosya tabanlı yönlendirme, kök: `src/app`).
- **Düz React Native + StyleSheet** (Tamagui YOK) — rehberdeki `View`/`Text`/`StyleSheet`
  öğrenimiyle bilinçli olarak uyumlu. Tüm stil merkezî token'lardan gelir.
- Veri: React Context + **AsyncStorage** kalıcılığı, ilk açılışta tohum (seed) veri.
- İkonlar: **lucide-react-native**. Fontlar: **Inter** (gövde) + **Inter Tight** (başlık).

## İki mod

1. **Storybook (asıl teslim — tasarım referansı).** Her ekran/bileşen ayrı bir *story*,
   rehber aşamalarına göre dizili, iPhone `DeviceFrame` içinde. Stajyere "şu story'yi yap"
   dendiğinde hedef budur. zuzi-designs / debato-designs mantığıyla aynı.
2. **Çalışan Expo uygulaması (bonus).** Aynı bileşenlerle kurulu, uçtan uca gezilebilir referans.

## Çalıştırma

```bash
npm run storybook    # tasarım referansı → http://localhost:6007
npm run web          # çalışan uygulama  → npx expo start --web (8081 doluysa --port 8090)
```

> Telefonda görmek için: `npx expo start` → QR'ı Expo Go ile okut (aynı Wi-Fi).

## Storybook Yapısı

- `.storybook/main.ts` — react-vite; `react-native → react-native-web`, `expo-*` ve
  `async-storage`/`safe-area-context` **Vite alias'larıyla web shim'lerine** yönlendirilir
  (`.storybook/shims/`), böylece uygulama bileşenlerine dokunulmaz.
- `.storybook/preview.tsx` — `ThemeProviderStatic` decorator + Tema araç çubuğu (Koyu/Açık) + iPhone viewport.
- `src/screens/*.tsx` — router/store'suz **presentational** ekranlar (prop + `mock.ts` verisi).
- `src/screens/*.stories.tsx` — story'ler; başlık = rehber aşaması (ör. `Aşama 1 · Statik Ekran/...`).
- `src/storybook/DeviceFrame.tsx`, `TabBarView.tsx` — story sarmalayıcıları.
- Bileşen/temeller: `src/ui/Foundations.stories.tsx`, `src/ui/Components.stories.tsx`.

## Dizin Yapısı

```
src/
  app/                     # expo-router rotaları
    _layout.tsx            # font yükleme + ThemeProvider + HabitsProvider + Stack
    index.tsx              # Onboarding (gate: görüldüyse /home'a yönlendirir)
    add.tsx                # Alışkanlık ekle (modal)
    habit/[id].tsx         # Alışkanlık detay (seri, takvim heatmap)
    (tabs)/
      _layout.tsx          # Yüzen pill tab bar
      home.tsx             # Bugün — günlük ilerleme + liste
      stats.tsx            # İstatistik — haftalık grafik + metrikler
      profile.tsx          # Profil — tema seçici + ayarlar
  theme/
    tokens.ts              # renk/tipografi/spacing/radius/shadow token'ları
    theme.tsx              # useTheme() — koyu/açık/sistem, AsyncStorage'da kalıcı
  store/habits.tsx         # useHabits() — CRUD + seed + kalıcılık
  lib/                     # date.ts (seri/takvim), icons.ts (lucide kaydı)
  ui/                      # Screen, Card, Button, Chip, HabitCard, ProgressRing,
                           # IconButton, SectionHeader, EmptyState, FloatingTabBar, Text
```

## Tasarım Dili (zuzi + debato karışımı)

Kaynak: `zuzi-designs/UI_RULES.md` disiplini + `debato` aksanı. Kurallar `src/theme/tokens.ts`'te.

- **Marka:** solid **mor** CTA `#8B5CF6`; dekoratif gradyan `#6145FF → #EC4899` (violet→pembe).
- **Zemin:** derin erik-siyahı 3 duraklı gradyan `#0f0a14 → #1a1025 → #0d0912`.
- **Kartlar:** solid `cardBg` + hairline border, **blur YOK**. Cam/blur yalnız tab bar & overlay.
- **Radius:** buton 16, kart 20, tab bar 32. **Spacing:** 4px ızgarası (`space` token'ı).
- **Tipografi:** başlık Inter Tight (negatif harf aralığı), gövde Inter. Hepsi `<Txt variant>`.
- **Gölge:** renkli gölge YALNIZ birincil butonda (`shadow('brand')`).
- **Hareket:** yumuşak, zıplama yok; press'te `scale(0.97)`.

## Rehber Aşaması → Ekran Eşlemesi

| Rehber aşaması | Bu projedeki karşılığı |
|---|---|
| Aşama 0–1 (statik ekran) | `index.tsx` (onboarding), `(tabs)/home.tsx` liste |
| Aşama 2 (etkileşim & state) | `home` işaretle, `add.tsx` ekle, store `toggleToday`/`addHabit` |
| Aşama 3 (kalıcılık) | `store/habits.tsx` + `theme.tsx` AsyncStorage |
| Aşama 4 (navigasyon & detay) | `(tabs)` + `habit/[id].tsx` |
| Aşama 5 (seri mantığı) | `lib/date.ts` → `currentStreak`, `bestStreak` |
| Aşama 6 (istatistik) | `(tabs)/stats.tsx` haftalık grafik + metrikler |
| Aşama 7 (cila) | koyu/açık tema, boş durum, glow orb'lar, takvim heatmap |

## Konvansiyonlar

- Yeni renk/ölçü **doğrudan yazma**; `tokens.ts`'e ekle, `useTheme().colors` üzerinden kullan.
- Metin için her zaman `<Txt variant="...">`; ham `<Text>` kullanma.
- Ekran iskeleti için `<Screen>` (gradyan zemin + güvenli alan) sar.
- Tarih anahtarı formatı: `'YYYY-MM-DD'` yerel saat (`lib/date.ts` `keyOf`).
