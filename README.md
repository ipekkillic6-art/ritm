# Ritm — Alışkanlık Takibi

Günlük alışkanlıkları takip etmeye yarayan bir mobil uygulama. Kullanıcı alışkanlıklarını ekler, her gün tamamladıklarını işaretler, serilerini ve ilerlemesini istatistiklerle izler.

React Native ve Expo ile yazıldı; iOS, Android ve web'de çalışır.

> Bu proje bir **staj projesidir**. Staj programındaki referans tasarım temel alınarak, **Claude Code** yardımıyla geliştirildi.

## Özellikler

- **Tanıtım ekranı:** İlk açılışta uygulamayı tanıtır.
- **Bugün:** Günün alışkanlıkları ve günlük ilerleme.
- **Alışkanlık ekleme:** İsim, ikon, renk ve sıklık seçimi (her gün, hafta içi, özel).
- **Alışkanlık detayı:** Seri bilgisi ve takvim görünümü.
- **İstatistikler:** Haftalık grafik, güncel seri, en uzun seri, tamamlanma oranı.
- **Profil ve ayarlar:** Açık / koyu / sistem teması, demo verisini sıfırlama.
- **Kalıcı veri:** Alışkanlıklar ve tema tercihi cihazda saklanır (AsyncStorage).

## Kullanılan Teknolojiler

- [Expo](https://expo.dev) (SDK 57) ve [Expo Router](https://docs.expo.dev/router/introduction/) (dosya tabanlı yönlendirme)
- React Native + TypeScript
- React Context + AsyncStorage (durum yönetimi ve kalıcılık)
- [Storybook](https://storybook.js.org) (ekran ve bileşenleri ayrı ayrı görüntüleme)
- lucide-react-native (ikonlar), Inter ve Inter Tight (yazı tipleri)

## Proje Yapısı

```
src/
  app/          # Ekranların rotaları (Expo Router)
    (tabs)/     # Alt menüdeki sekmeler: Bugün, İstatistik, Profil
    add.tsx     # Alışkanlık ekleme
    habit/      # Alışkanlık detayı
  screens/      # Ekran tasarımları ve Storybook hikâyeleri
  ui/           # Tekrar kullanılan bileşenler (Button, Card, HabitCard, ProgressRing...)
  store/        # Alışkanlık verisi: ekleme, güncelleme, kaydetme
  theme/        # Renk, yazı, boşluk ve köşe yuvarlaklığı ayarları
  lib/          # Tarih ve seri hesaplamaları, ikon listesi
```

## Çalıştırma

```bash
npm install

npm start          # Expo geliştirme sunucusu (telefonda Expo Go ile QR kodu okut)
npm run web        # Tarayıcıda çalıştır
npm run storybook  # Storybook: http://localhost:6007
```
