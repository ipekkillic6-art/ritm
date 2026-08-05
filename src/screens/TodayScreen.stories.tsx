import type { Meta, StoryObj } from '@storybook/react-vite';

import { todayKey } from '@/lib/date';
import { DeviceFrame } from '@/storybook/DeviceFrame';
import { TabBarView } from '@/storybook/TabBarView';
import { TodayScreen } from './TodayScreen';
import { MOCK_HABITS } from './mock';

const meta: Meta<typeof TodayScreen> = {
  title: 'Aşama 1 · Statik Ekran/Bugün (Home)',
  component: TodayScreen,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          '**Ne:** Uygulamanın ana ekranı. Günün alışkanlıklarını listeler, tek dokunuşla işaretlenir.',
          '',
          '**Bölümler (yukarıdan aşağıya):**',
          '1. Başlık — tarih + selamlama + "+" (alışkanlık ekle) butonu',
          '2. Günlük ilerleme kartı — dairesel yüzde halkası + "x/y tamamlandı"',
          '3. "Bugün" listesi — her satır: ikon karosu + ad + seri + işaret dairesi',
          '4. Yüzen pill tab bar (ekranın dışında, altta sabit)',
          '',
          '**Stajyer görevi (Aşama 1–2):** Önce statik liste (View/Text/StyleSheet, Flexbox).',
          'Sonra işaret dairesine `useState` ile "bugün yaptım" aç/kapa ekle.',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof TodayScreen>;

export const Varsayilan: Story = {
  name: 'Varsayılan',
  render: () => (
    <DeviceFrame>
      <TodayScreen />
      <TabBarView active="home" />
    </DeviceFrame>
  ),
};

export const HepsiTamamlandi: Story = {
  name: 'Tümü tamamlandı',
  render: () => (
    <DeviceFrame>
      <TodayScreen initial={MOCK_HABITS.map((h) => ({ ...h, completedDates: [...h.completedDates, todayKey()] }))} />
      <TabBarView active="home" />
    </DeviceFrame>
  ),
};

export const BosDurum: Story = {
  name: 'Boş durum',
  render: () => (
    <DeviceFrame>
      <TodayScreen initial={[]} />
      <TabBarView active="home" />
    </DeviceFrame>
  ),
};
