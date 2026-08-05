/** Yüzen pill tab bar — cam/blur zemin, aktif sekme marka renginde. */
import { BlurView } from 'expo-blur';
import { CalendarCheck, TrendingUp, User, type LucideIcon } from 'lucide-react-native';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { radius, space } from '@/theme/tokens';
import { useTheme } from '@/theme/theme';
import { Txt } from './Text';

const CONFIG: Record<string, { icon: LucideIcon; label: string }> = {
  home: { icon: CalendarCheck, label: 'Bugün' },
  stats: { icon: TrendingUp, label: 'İstatistik' },
  profile: { icon: User, label: 'Profil' },
};

export function FloatingTabBar({ state, navigation }: BottomTabBarProps) {
  const { colors, mode } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      pointerEvents="box-none"
      style={[styles.wrap, { bottom: Math.max(insets.bottom, 16) }]}
    >
      <BlurView
        intensity={mode === 'dark' ? 40 : 60}
        tint={mode === 'dark' ? 'dark' : 'light'}
        style={[
          styles.bar,
          { backgroundColor: colors.glassBg, borderColor: colors.glassBorder },
        ]}
      >
        {state.routes.map((route, i) => {
          const cfg = CONFIG[route.name];
          if (!cfg) return null;
          const focused = state.index === i;
          const Icon = cfg.icon;
          const tint = focused ? colors.brand : colors.textTertiary;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={({ pressed }) => [
                styles.item,
                focused && { backgroundColor: colors.brandSoft },
                pressed && { opacity: 0.7 },
              ]}
            >
              <Icon size={22} color={tint} strokeWidth={2} />
              <Txt variant="tiny" color={tint} style={{ marginTop: 3 }}>
                {cfg.label}
              </Txt>
            </Pressable>
          );
        })}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  bar: {
    flexDirection: 'row',
    gap: space.xs,
    padding: 6,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth * 2,
    overflow: 'hidden',
    ...Platform.select({
      web: { backdropFilter: 'blur(20px)' } as object,
      default: {},
    }),
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: radius.xxl,
    minWidth: 76,
  },
});
