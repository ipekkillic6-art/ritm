/** Standart kart — solid zemin, hairline border, blur YOK (zuzi kuralı). */
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type ViewStyle } from 'react-native';

import { radius, shadow, space } from '@/theme/tokens';
import { useTheme } from '@/theme/theme';

type Props = {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
  onPress?: () => void;
  padded?: boolean;
};

export function Card({ children, style, onPress, padded = true }: Props) {
  const { colors, mode } = useTheme();
  const base: ViewStyle = {
    backgroundColor: colors.cardBg,
    borderColor: colors.cardBorder,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderRadius: radius.xl,
    padding: padded ? space.lg : 0,
    ...shadow('sm', mode),
  };

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          base,
          style as ViewStyle,
          pressed && { transform: [{ scale: 0.985 }] },
        ]}
      >
        {children}
      </Pressable>
    );
  }
  return <View style={[base, style as ViewStyle]}>{children}</View>;
}
