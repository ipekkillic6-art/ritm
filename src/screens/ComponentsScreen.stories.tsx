import type { Meta, StoryObj } from '@storybook/react-vite';

import { DeviceFrame } from '@/storybook/DeviceFrame';
import { ComponentsScreen } from './ComponentsScreen';

const meta: Meta<typeof ComponentsScreen> = {
  title: 'Aşama 7 · Cila/Bileşenler Kataloğu',
  component: ComponentsScreen,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          '**Ne:** Profil → "Bileşenler kataloğu" sekmesinden açılan, uygulamadaki tüm',
          'yeniden kullanılabilir yapı taşlarını tek yerde gösteren ekran.',
          '',
          '**Amaç (nesne tabanlı / component düşünme):** Her ekran bağımsız bileşenlerden kurulur',
          '(`<Txt>`, `<Button>`, `<Card>`, `<Chip>`, `<IconButton>`, `<ProgressRing>`, `<HabitCard>`).',
          'Bir kez yaz, her yerde kullan. Stajyer buradaki her bileşeni tek tek yapıp sonra ekranlarda birleştirir.',
          '',
          '**Not:** Bu bir "geliştirici" ekranı — kullanıcıya değil, öğrenmeye yönelik. Uygulamada',
          'göstermek zorunda değilsin; burada tasarım referansı olarak duruyor.',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ComponentsScreen>;

export const Varsayilan: Story = {
  name: 'Varsayılan',
  render: () => (
    <DeviceFrame>
      <ComponentsScreen />
    </DeviceFrame>
  ),
};
