/** 44×44 dairesel ikon butonu (nav / aksiyon). */
import { Pressable, StyleSheet, type ViewStyle } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

import { radius } from '@/theme/tokens';
import { useTheme } from '@/theme/theme';

type Props = {
  icon: LucideIcon;
  onPress?: () => void;
  color?: string;
  size?: number;
  style?: ViewStyle;
};

export function IconButton({ icon: Icon, onPress, color, size = 44, style }: Props) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => [
        {
          width: size,
          height: size,
          borderRadius: radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.glassBg,
          borderWidth: StyleSheet.hairlineWidth * 2,
          borderColor: colors.glassBorder,
        },
        pressed && { transform: [{ scale: 0.93 }], opacity: 0.85 },
        style,
      ]}
    >
      <Icon size={20} color={color ?? colors.brand} strokeWidth={1.75} />
    </Pressable>
  );
}
