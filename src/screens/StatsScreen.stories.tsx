import type { Meta, StoryObj } from '@storybook/react-vite';

import { DeviceFrame } from '@/storybook/DeviceFrame';
import { TabBarView } from '@/storybook/TabBarView';
import { StatsScreen } from './StatsScreen';

const meta: Meta<typeof StatsScreen> = {
  title: 'Aşama 6 · İstatistik/İstatistik',
  component: StatsScreen,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          '**Ne:** İlerleme ve seri geçmişini görselleştiren ekran.',
          '',
          '**Bölümler:** haftalık tamamlanma çubuk grafiği · 4 metrik kutucuğu',
          '(güncel seri, en uzun seri, 30 günlük tamamlanma %, toplam işaret) · alışkanlık bazlı ilerleme çubukları.',
          '',
          '**Stajyer görevi (Aşama 6):** veriyi görsele çevir. Grafik kütüphanesi seç ya da',
          'basit View yükseklikleriyle kendin çiz (buradaki gibi). Hangi metrik önemli — sen karar ver.',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof StatsScreen>;

export const Varsayilan: Story = {
  name: 'Varsayılan',
  render: () => (
    <DeviceFrame>
      <StatsScreen />
      <TabBarView active="stats" />
    </DeviceFrame>
  ),
};
