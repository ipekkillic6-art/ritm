import type { Meta, StoryObj } from '@storybook/react-vite';

import { DeviceFrame } from '@/storybook/DeviceFrame';
import { AddHabitScreen } from './AddHabitScreen';

const meta: Meta<typeof AddHabitScreen> = {
  title: 'Aşama 2 · Etkileşim/Alışkanlık Ekle',
  component: AddHabitScreen,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          '**Ne:** Yeni alışkanlık oluşturma formu (modal / bottom sheet olarak açılır).',
          '',
          '**Alanlar:** canlı önizleme, ad girişi, ikon seçici ızgarası, renk paleti,',
          'sıklık çipleri (Her gün / Hafta içi / Özel), not (isteğe bağlı), "Alışkanlık ekle" butonu.',
          '',
          '**Stajyer görevi (Aşama 2):** controlled input (`useState`), seçili ikon/renk/sıklık state\'i,',
          'boş ad ise buton devre dışı. Kaydet → listeye ekle. Alanları sen tasarla — modal mı, ayrı ekran mı?',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof AddHabitScreen>;

export const Varsayilan: Story = {
  name: 'Varsayılan',
  render: () => (
    <DeviceFrame>
      <AddHabitScreen />
    </DeviceFrame>
  ),
};
