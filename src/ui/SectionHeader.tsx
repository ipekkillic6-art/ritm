/** Bölüm başlığı + isteğe bağlı sağ aksiyon. */
import { Pressable, View } from 'react-native';

import { space } from '@/theme/tokens';
import { useTheme } from '@/theme/theme';
import { Txt } from './Text';

type Props = {
  title: string;
  action?: string;
  onAction?: () => void;
};

export function SectionHeader({ title, action, onAction }: Props) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: space.md,
      }}
    >
      <Txt variant="h2">{title}</Txt>
      {action && (
        <Pressable onPress={onAction} hitSlop={8}>
          <Txt variant="caption" color={colors.brand}>
            {action}
          </Txt>
        </Pressable>
      )}
    </View>
  );
}
