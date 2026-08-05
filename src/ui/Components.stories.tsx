import type { Meta, StoryObj } from '@storybook/react-vite';
import { Check, Plus } from 'lucide-react-native';
import { View } from 'react-native';

import { MOCK_HABITS } from '@/screens/mock';
import { space } from '@/theme/tokens';
import { useTheme } from '@/theme/theme';
import { Button } from './Button';
import { Card } from './Card';
import { Chip } from './Chip';
import { HabitCard } from './HabitCard';
import { IconButton } from './IconButton';
import { ProgressRing } from './ProgressRing';
import { Txt } from './Text';

const meta: Meta = {
  title: 'Aşama 0 · Temeller/Bileşenler',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Yeniden kullanılabilir UI bileşenleri (`src/ui/`). Ekranlar bunlardan kurulur. ' +
          'Stajyer önce bu parçaları tek tek yapar, sonra ekranda birleştirir.',
      },
    },
  },
};
export default meta;

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <View style={{ width: 340, gap: space.lg }}>{children}</View>
);

export const Butonlar: StoryObj = {
  render: () => (
    <Wrap>
      <Button label="Birincil (mor CTA)" icon={Check} fullWidth />
      <Button label="İkincil" variant="secondary" fullWidth />
      <Button label="Devre dışı" disabled fullWidth />
      <Button label="Küçük" size="md" />
    </Wrap>
  ),
};

export const Kart: StoryObj = {
  render: () => {
    const { colors } = useTheme();
    return (
      <Wrap>
        <Card>
          <Txt variant="h3">Kart başlığı</Txt>
          <Txt variant="bodySm" color={colors.textSecondary} style={{ marginTop: 4 }}>
            Solid zemin, hairline border, blur yok — zuzi kuralı.
          </Txt>
        </Card>
      </Wrap>
    );
  },
};

export const Cipler: StoryObj = {
  name: 'Çipler',
  render: () => (
    <Wrap>
      <View style={{ flexDirection: 'row', gap: space.sm, flexWrap: 'wrap' }}>
        <Chip label="Her gün" selected />
        <Chip label="Hafta içi" />
        <Chip label="Özel" />
      </View>
    </Wrap>
  ),
};

export const AliskanlikKarti: StoryObj = {
  name: 'Alışkanlık Kartı',
  render: () => (
    <Wrap>
      <HabitCard habit={MOCK_HABITS[0]} onToggle={() => {}} onPress={() => {}} />
      <HabitCard habit={MOCK_HABITS[2]} onToggle={() => {}} onPress={() => {}} />
    </Wrap>
  ),
};

export const IlerlemeHalkasi: StoryObj = {
  name: 'İlerleme Halkası',
  render: () => {
    const { colors } = useTheme();
    return (
      <View style={{ flexDirection: 'row', gap: space.xxl, alignItems: 'center' }}>
        {[0.4, 0.75, 1].map((p) => (
          <ProgressRing key={p} progress={p} size={92} stroke={10}>
            <Txt variant="h2" color={colors.brand}>{Math.round(p * 100)}</Txt>
          </ProgressRing>
        ))}
      </View>
    );
  },
};

export const IkonButonu: StoryObj = {
  name: 'İkon Butonu',
  render: () => (
    <View style={{ flexDirection: 'row', gap: space.md }}>
      <IconButton icon={Plus} />
      <IconButton icon={Check} />
    </View>
  ),
};
