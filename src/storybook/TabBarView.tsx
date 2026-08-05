/** Presentational yüzen tab bar — Storybook story'leri için (navigasyon prop'u yok). */
import { BlurView } from 'expo-blur';
import { CalendarCheck, TrendingUp, User, type LucideIcon } from 'lucide-react-native';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { radius, space } from '@/theme/tokens';
import { useTheme } from '@/theme/theme';
import { Txt } from '@/ui/Text';

type Key = 'home' | 'stats' | 'profile';

const ITEMS: { key: Key; icon: LucideIcon; label: string }[] = [
  { key: 'home', icon: CalendarCheck, label: 'Bugün' },
  { key: 'stats', icon: TrendingUp, label: 'İstatistik' },
  { key: 'profile', icon: User, label: 'Profil' },
];

export function TabBarView({ active = 'home' }: { active?: Key }) {
  const { colors, mode } = useTheme();
  return (
    <View pointerEvents="box-none" style={styles.wrap}>
      <BlurView
        intensity={mode === 'dark' ? 40 : 60}
        tint={mode === 'dark' ? 'dark' : 'light'}
        style={[styles.bar, { backgroundColor: colors.glassBg, borderColor: colors.glassBorder }]}
      >
        {ITEMS.map((it) => {
          const on = it.key === active;
          const tint = on ? colors.brand : colors.textTertiary;
          return (
            <Pressable
              key={it.key}
              style={[styles.item, on && { backgroundColor: colors.brandSoft }]}
            >
              <it.icon size={22} color={tint} strokeWidth={2} />
              <Txt variant="tiny" color={tint} style={{ marginTop: 3 }}>
                {it.label}
              </Txt>
            </Pressable>
          );
        })}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 0, right: 0, bottom: 24, alignItems: 'center' },
  bar: {
    flexDirection: 'row',
    gap: space.xs,
    padding: 6,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth * 2,
    overflow: 'hidden',
    ...Platform.select({ web: { backdropFilter: 'blur(20px)' } as object, default: {} }),
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
