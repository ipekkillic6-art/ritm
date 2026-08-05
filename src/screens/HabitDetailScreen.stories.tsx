import type { Meta, StoryObj } from '@storybook/react-vite';

import { DeviceFrame } from '@/storybook/DeviceFrame';
import { HabitDetailScreen } from './HabitDetailScreen';
import { MOCK_HABITS } from './mock';

const meta: Meta<typeof HabitDetailScreen> = {
  title: 'Aşama 4 · Navigasyon & Detay/Alışkanlık Detay',
  component: HabitDetailScreen,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          '**Ne:** Bir alışkanlığa tıklayınca açılan detay ekranı.',
          '',
          '**Bölümler:** nav bar (geri + ad + sil) · seri hero\'su (ateş + büyük gün sayısı) ·',
          'mini istatistikler (güncel seri / en uzun / toplam) · aylık takvim heatmap (tamamlanan günler renkli) ·',
          'not kartı · "Bugün yaptım" butonu.',
          '',
          '**Stajyer görevi (Aşama 4–5):** listeden detaya navigasyon (Expo Router), seri algoritması,',
          'takvimde geçmiş günlere dokununca aç/kapa. Takvim hücrelerine dokunmayı dene.',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof HabitDetailScreen>;

export const SuIc: Story = {
  name: 'Su iç',
  render: () => (
    <DeviceFrame>
      <HabitDetailScreen habit={MOCK_HABITS[0]} />
    </DeviceFrame>
  ),
};

export const SporYap: Story = {
  name: 'Spor yap',
  render: () => (
    <DeviceFrame>
      <HabitDetailScreen habit={MOCK_HABITS[1]} />
    </DeviceFrame>
  ),
};
