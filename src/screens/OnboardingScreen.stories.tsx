import type { Meta, StoryObj } from '@storybook/react-vite';

import { DeviceFrame } from '@/storybook/DeviceFrame';
import { OnboardingScreen } from './OnboardingScreen';

const meta: Meta<typeof OnboardingScreen> = {
  title: 'Aşama 7 · Cila/Onboarding',
  component: OnboardingScreen,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          '**Ne:** Uygulamayı ilk açışta görünen karşılama ekranı.',
          '',
          '**Bölümler:** dekoratif glow orb\'lar · gradyan marka logosu · uygulama adı (Inter Tight) ·',
          'kısa slogan · 3 özellik satırı · "Başla" birincil butonu.',
          '',
          '**Stajyer görevi (Aşama 7):** ilk açılışta göster, sonra tab\'lere geç (AsyncStorage bayrağı).',
          'İsim/marka senin — burada "Ritm" yalnızca örnek.',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof OnboardingScreen>;

export const Varsayilan: Story = {
  name: 'Varsayılan',
  render: () => (
    <DeviceFrame>
      <OnboardingScreen />
    </DeviceFrame>
  ),
};
