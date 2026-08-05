import type { Meta, StoryObj } from '@storybook/react-vite';

import { DeviceFrame } from '@/storybook/DeviceFrame';
import { TabBarView } from '@/storybook/TabBarView';
import { ProfileScreen } from './ProfileScreen';

const meta: Meta<typeof ProfileScreen> = {
  title: 'Aşama 7 · Cila/Profil',
  component: ProfileScreen,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          '**Ne:** Profil ve ayarlar ekranı.',
          '',
          '**Bölümler:** kullanıcı başlığı (avatar + isim + seri özeti) · tema seçici',
          '(Sistem / Koyu / Açık segmented) · ayar satırları · sürüm.',
          '',
          '**Stajyer görevi (Aşama 7):** koyu/açık tema geçişi (üstteki Tema araç çubuğuyla dene),',
          'tercihi AsyncStorage\'da sakla. Boş durumlar, küçük dokunuşlar — önceliklendirme senin.',
          '',
          '_Not: tema butonlarını canlı görmek için Storybook üst çubuğundaki **Tema** anahtarını kullan._',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ProfileScreen>;

export const Varsayilan: Story = {
  name: 'Varsayılan',
  render: () => (
    <DeviceFrame>
      <ProfileScreen />
      <TabBarView active="profile" />
    </DeviceFrame>
  ),
};
