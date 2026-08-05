/**
 * İnteraktif 2 haftalık görev listesi — GÜN GÜN açılır/kapanır (accordion).
 * Haftalar grup başlığı, her gün tıklanınca aşağı doğru açılır.
 * İş/sprint tarzı görev içeriği. Storybook Docs sayfasında (React DOM) render edilir.
 */
import { useState } from 'react';

type Day = {
  title: string;
  hedef?: string;
  tasks: string[];
  karar?: string;
  bitti?: string;
};

type Week = {
  id: string;
  title: string;
  subtitle?: string;
  days: Day[];
};

const BRAND = '#8B5CF6';
const CARD2 = '#1a1228';
const BORDER = 'rgba(255,255,255,0.10)';
const TEXT = '#F3F0F7';
const MUTED = 'rgba(255,255,255,0.55)';

const WEEKS: Week[] = [
  {
    id: 'h0',
    title: 'Hafta 0 — Ortam Hazırlığı',
    subtitle: 'yarım gün · kurulum',
    days: [
      {
        title: 'Onboarding & keşif',
        tasks: [
          'Geliştirme ortamını kur: Node LTS, VS Code, fiziksel cihazda Expo Go.',
          'Tasarım referansını (bu Storybook) incele; ekran akışını ve bileşen envanterini çıkar.',
          'Rehber dokümanını oku (staj-claude-expo-rehberi.md, Bölüm 1).',
        ],
        karar: 'Ürün adını ve tek cümlelik değer önerisini netleştir ("Ritm" yalnızca örnek).',
      },
    ],
  },
  {
    id: 'h1',
    title: 'Hafta 1 — Temel Kurulum & Arayüz Geliştirme',
    subtitle: 'sprint 1',
    days: [
      {
        title: 'Gün 1 — Proje kurulumu & çalışma döngüsü',
        tasks: [
          'Expo projesini oluştur ve fiziksel cihazda ayağa kaldır (create-expo-app → expo start).',
          'Hot reload akışını doğrula: örnek ekranda bir metin değişikliğini yayınla.',
          'Proje bağlamını CLAUDE.md ile dokümante et (/init).',
        ],
        bitti: 'Uygulama cihazda açılıyor, değişiklikler anında yansıyor.',
      },
      {
        title: 'Gün 2 — Tasarım sistemi (design tokens)',
        hedef: 'Aşama 0 · Temeller / Renkler & Tipografi',
        tasks: [
          'Renk paleti ve tipografi ölçeğini merkezî bir token dosyasında tanımla.',
          'Ortak Text bileşenini varyantlarıyla (başlık / gövde / etiket) geliştir.',
        ],
        karar: 'Marka rengi ve başlık fontu seçimini gerekçelendir.',
        bitti: 'Tüm stiller tek kaynaktan (token) besleniyor.',
      },
      {
        title: 'Gün 3 — Bileşen kütüphanesi',
        hedef: 'Aşama 0 · Temeller / Bileşenler',
        tasks: [
          'Card, Button, Chip, ProgressRing, IconButton bileşenlerini geliştir.',
          'Her bileşeni izole doğrula (props, durumlar); tekrar kullanılabilirliği gözet.',
        ],
        karar: 'Köşe yarıçapı, gölge ve basma (press) davranışını standardize et.',
        bitti: 'Bileşenler tasarımla birebir ve yeniden kullanılabilir.',
      },
      {
        title: 'Gün 4 — Ana ekran (statik arayüz)',
        hedef: 'Aşama 1 · Statik Ekran / Bugün (Home)',
        tasks: [
          '"Bugün" ekranını statik veriyle kur: başlık, günlük ilerleme kartı, alışkanlık listesi.',
          'Yerleşimi Flexbox ile responsive kur.',
        ],
        karar: 'Kart düzeni ve ilerleme göstergesinin biçimini belirle.',
        bitti: 'Ekran, tasarım referansıyla eşleşiyor.',
      },
      {
        title: 'Gün 5 — Etkileşim & form geliştirme',
        hedef: 'Aşama 2 · Etkileşim / Alışkanlık Ekle',
        tasks: [
          'Tamamlama durumunu yerel state ile yönet (işaretle / geri al).',
          'Alışkanlık ekleme formunu controlled input ile geliştir; ekle / sil akışını bağla.',
        ],
        karar: 'Ekleme akışını tasarla: modal mı, ayrı ekran mı? Gerekçelendir.',
        bitti: 'Ekle / sil / işaretle uçtan uca çalışıyor.',
      },
    ],
  },
  {
    id: 'h2',
    title: 'Hafta 2 — Veri, Navigasyon & Yayına Hazırlık',
    subtitle: 'sprint 2',
    days: [
      {
        title: 'Gün 6 — Kalıcı veri katmanı',
        tasks: [
          'AsyncStorage entegrasyonunu kur; CRUD işlemlerini kalıcı hale getir.',
          'Veri modelini tasarla ve dokümante et (id, ad, tamamlanan günler…).',
          'Uygulamayı yeniden başlatarak kalıcılığı doğrula.',
        ],
        karar: 'Bir alışkanlığın veri şemasını tanımla.',
        bitti: 'Veriler oturumlar arasında korunuyor.',
      },
      {
        title: 'Gün 7 — Navigasyon mimarisi',
        hedef: 'Aşama 4 · Navigasyon & Detay / Alışkanlık Detay',
        tasks: [
          'Expo Router ile tab tabanlı navigasyonu ve detay rotasını kur.',
          'Liste → detay veri geçişini ve geri navigasyonu bağla.',
        ],
        karar: 'Detay ekranının kapsamını belirle (seri, takvim, notlar?).',
        bitti: 'Ekranlar arası geçiş ve parametre aktarımı sorunsuz.',
      },
      {
        title: 'Gün 8 — İş mantığı: seri (streak) hesaplama',
        hedef: 'Aşama 4 · … / Su iç (takvim)',
        tasks: [
          'Seri algoritmasını geliştir (currentStreak / bestStreak).',
          'Aylık takvim görünümünü uygula.',
          'Edge-case’leri belirle ve birim testleriyle kapsa (dün atlandı, çift işaret, ay/yıl geçişi).',
        ],
        karar: 'Seri kırılma kuralını tanımla (bir gün kaçırınca sıfırlanır mı?).',
        bitti: 'Hesaplama testlerle doğrulanmış, edge-case’lerde stabil.',
      },
      {
        title: 'Gün 9 — Raporlama & görselleştirme',
        hedef: 'Aşama 6 · İstatistik / İstatistik',
        tasks: [
          'Haftalık tamamlanma grafiğini ve metrik kartlarını geliştir.',
          'Veriyi görselleştirme için dönüştür (aggregation).',
        ],
        karar: 'Öne çıkarılacak metrikleri belirle.',
        bitti: 'En az bir anlamlı metrik/grafik yayında.',
      },
      {
        title: 'Gün 10 — Cila & bağımsız özellik teslimi',
        hedef: 'Aşama 7 · Cila / Onboarding + Profil',
        tasks: [
          'Onboarding, tema geçişi ve boş durum ekranlarını tamamla.',
          'Bağımsız bir özelliği baştan sona planla ve teslim et (kendi inisiyatifin).',
        ],
        karar: 'Kalan sürede kapsam önceliklendirmesini yap.',
        bitti: 'Yayına hazır uygulama + bağımsız geliştirdiğin 1 özellik.',
      },
    ],
  },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <span
      style={{
        display: 'inline-block',
        transition: 'transform 0.2s ease',
        transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
        color: BRAND,
        fontSize: 16,
        lineHeight: 1,
        width: 14,
      }}
    >
      ▸
    </span>
  );
}

/** Tek bir GÜN — tıklanınca içeriği aşağı açılır. */
function DayAccordion({ day, defaultOpen }: { day: Day; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div style={{ background: CARD2, border: `1px solid ${BORDER}`, borderRadius: 14, marginBottom: 8, overflow: 'hidden' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 10,
          background: 'transparent', border: 'none', cursor: 'pointer',
          padding: '14px 16px', textAlign: 'left',
        }}
      >
        <Chevron open={open} />
        <span style={{ flex: 1, color: TEXT, fontWeight: 700, fontSize: 14.5 }}>{day.title}</span>
        <span style={{ color: MUTED, fontSize: 11 }}>{day.tasks.length} görev</span>
      </button>

      {open && (
        <div style={{ padding: '0 16px 16px 40px' }}>
          {day.hedef && (
            <div style={{ marginBottom: 10 }}>
              <span style={{ fontSize: 11, color: MUTED }}>TASARIM REF. </span>
              <span style={{ fontSize: 12, color: BRAND, background: 'rgba(139,92,246,0.15)', border: `1px solid rgba(139,92,246,0.35)`, borderRadius: 8, padding: '2px 8px', fontFamily: 'monospace' }}>{day.hedef}</span>
            </div>
          )}
          <ul style={{ margin: '0 0 10px', paddingLeft: 0, listStyle: 'none' }}>
            {day.tasks.map((t, i) => (
              <li key={i} style={{ display: 'flex', gap: 8, color: 'rgba(255,255,255,0.82)', fontSize: 13.5, lineHeight: 1.5, marginBottom: 4 }}>
                <span style={{ color: MUTED }}>☐</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
          {day.karar && (
            <div style={{ fontSize: 13, color: MUTED, marginBottom: 4 }}>
              <b style={{ color: '#EC4899' }}>Karar noktası:</b> {day.karar}
            </div>
          )}
          {day.bitti && (
            <div style={{ fontSize: 13, color: MUTED }}>
              <b style={{ color: '#10B981' }}>Kabul kriteri:</b> {day.bitti}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function WeekGroup({ week, openFirst }: { week: Week; openFirst?: boolean }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ borderLeft: `3px solid ${BRAND}`, paddingLeft: 10, marginBottom: 10 }}>
        <div style={{ color: TEXT, fontWeight: 800, fontSize: 16 }}>{week.title}</div>
        {week.subtitle && <div style={{ color: MUTED, fontSize: 12, marginTop: 2 }}>{week.subtitle} · {week.days.length} görev</div>}
      </div>
      {week.days.map((d, i) => (
        <DayAccordion key={i} day={d} defaultOpen={openFirst && i === 0} />
      ))}
    </div>
  );
}

export function TaskList() {
  return (
    <div style={{ background: '#0f0a14', border: `1px solid ${BORDER}`, borderRadius: 22, padding: 18, marginTop: 8 }}>
      {WEEKS.map((w) => (
        <WeekGroup key={w.id} week={w} openFirst={w.id === 'h1'} />
      ))}
    </div>
  );
}

export default TaskList;
