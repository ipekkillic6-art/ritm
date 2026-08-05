import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';

import { brandGradient, radius, space } from '@/theme/tokens';
import { useTheme } from '@/theme/theme';
import { Txt, type Variant } from './Text';

const meta: Meta = {
  title: 'Aşama 0 · Temeller/Renkler & Tipografi',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Tasarım sisteminin temel token\'ları. Tüm ekranlar bunları kullanır (`src/theme/tokens.ts`). ' +
          'Karışım dili: zuzi disiplini + debato Inter Tight başlık + mor CTA.',
      },
    },
  },
};
export default meta;

function Swatch({ name, value }: { name: string; value: string }) {
  const { colors } = useTheme();
  return (
    <View style={{ width: 150, gap: 6 }}>
      <View style={{ height: 52, borderRadius: radius.md, backgroundColor: value, borderWidth: 1, borderColor: colors.border }} />
      <Txt variant="caption">{name}</Txt>
      <Txt variant="tiny" color={colors.textTertiary}>{value}</Txt>
    </View>
  );
}

export const Renkler: StoryObj = {
  render: () => {
    const { colors } = useTheme();
    const items: [string, string][] = [
      ['brand (CTA)', colors.brand],
      ['brandStrong', colors.brandStrong],
      ['pink (aksan)', colors.pink],
      ['success', colors.success],
      ['warning', colors.warning],
      ['error', colors.error],
      ['info', colors.info],
      ['cardBg', colors.cardBg],
      ['textPrimary', colors.textPrimary],
      ['textSecondary', colors.textSecondary],
    ];
    return (
      <View style={{ width: 340 }}>
        <Txt variant="h2" style={{ marginBottom: space.lg }}>Renkler</Txt>
        <View style={{ height: 60, borderRadius: radius.lg, marginBottom: space.lg, overflow: 'hidden' }}>
          {/* marka gradyanı (dekoratif) */}
          <View style={{ flex: 1, backgroundColor: brandGradient[0] }}>
            <Txt variant="caption" color="#fff" style={{ padding: space.md }}>
              marka gradyanı {brandGradient.join(' → ')}
            </Txt>
          </View>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.md }}>
          {items.map(([n, v]) => <Swatch key={n} name={n} value={v} />)}
        </View>
      </View>
    );
  },
};

export const Tipografi: StoryObj = {
  render: () => {
    const { colors } = useTheme();
    const rows: [Variant, string][] = [
      ['display', 'Display · Inter Tight 800'],
      ['h1', 'H1 · Ekran başlığı'],
      ['h2', 'H2 · Bölüm başlığı'],
      ['h3', 'H3 · Kart başlığı'],
      ['body', 'Body · Gövde metni (Inter)'],
      ['bodySm', 'Body Small · ikincil'],
      ['caption', 'Caption · etiket'],
      ['micro', 'MICRO · rozet'],
      ['tiny', 'Tiny · tab etiketi'],
    ];
    return (
      <View style={{ width: 340, gap: space.md }}>
        <Txt variant="h2" style={{ marginBottom: space.sm }}>Tipografi</Txt>
        {rows.map(([v, label]) => (
          <View key={v} style={{ borderBottomWidth: 1, borderBottomColor: colors.divider, paddingBottom: space.sm }}>
            <Txt variant={v}>{label}</Txt>
          </View>
        ))}
      </View>
    );
  },
};
