import { LinearGradient } from 'expo-linear-gradient';
import {
  Bell, ChevronRight, Info, LayoutGrid, Moon, RotateCcw, Smartphone, Sun, type LucideIcon,
} from 'lucide-react-native';
import { Pressable, StyleSheet, View } from 'react-native';

import { bestStreak, currentStreak } from '@/lib/date';
import { type Habit } from '@/store/habits';
import { brandGradient, radius, space } from '@/theme/tokens';
import { useTheme } from '@/theme/theme';
import { Card } from '@/ui/Card';
import { Screen } from '@/ui/Screen';
import { SectionHeader } from '@/ui/SectionHeader';
import { Txt } from '@/ui/Text';
import { MOCK_HABITS } from './mock';

const THEME_OPTS = [
  { key: 'system', label: 'Sistem', icon: Smartphone },
  { key: 'dark', label: 'Koyu', icon: Moon },
  { key: 'light', label: 'Açık', icon: Sun },
] as const;

function Row({ icon: Icon, label, tint, onPress }: { icon: LucideIcon; label: string; tint?: string; onPress?: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && { opacity: 0.6 }]}>
      <View style={[styles.rowIcon, { backgroundColor: (tint ?? colors.brand) + '26' }]}>
        <Icon size={18} color={tint ?? colors.brand} strokeWidth={2} />
      </View>
      <Txt variant="body" style={{ flex: 1 }} color={tint ?? colors.textPrimary}>{label}</Txt>
      <ChevronRight size={18} color={colors.textTertiary} strokeWidth={2} />
    </Pressable>
  );
}

export function ProfileScreen({ habits = MOCK_HABITS }: { habits?: Habit[] }) {
  const { colors, pref, setPref } = useTheme();

  const best = habits.length ? Math.max(...habits.map((h) => bestStreak(new Set(h.completedDates)))) : 0;
  const active = habits.filter((h) => currentStreak(new Set(h.completedDates)) > 0).length;

  return (
    <Screen scroll bottomInset={120} contentStyle={{ paddingTop: space.sm }}>
      <Txt variant="h1" style={{ paddingBottom: space.xl }}>Profil</Txt>

      <Card style={{ flexDirection: 'row', alignItems: 'center', gap: space.lg }}>
        <LinearGradient colors={brandGradient} style={styles.avatar}>
          <Txt variant="h1" color="#fff">A</Txt>
        </LinearGradient>
        <View style={{ flex: 1 }}>
          <Txt variant="h2">Alper</Txt>
          <Txt variant="bodySm" color={colors.textSecondary} style={{ marginTop: 2 }}>
            {active} aktif seri · en uzun {best} gün
          </Txt>
        </View>
      </Card>

      <View style={{ marginTop: space.xxl }}>
        <SectionHeader title="Görünüm" />
        <View style={styles.segment}>
          {THEME_OPTS.map((o) => {
            const on = pref === o.key;
            return (
              <Pressable key={o.key} onPress={() => setPref(o.key)} style={[styles.segItem, { backgroundColor: on ? colors.brand : colors.cardBg, borderColor: on ? colors.brand : colors.border }]}>
                <o.icon size={18} color={on ? colors.onBrand : colors.textSecondary} strokeWidth={2} />
                <Txt variant="caption" color={on ? colors.onBrand : colors.textSecondary}>{o.label}</Txt>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={{ marginTop: space.xxl }}>
        <SectionHeader title="Ayarlar" />
        <Card padded={false} style={{ paddingHorizontal: space.lg }}>
          <Row icon={Bell} label="Hatırlatıcılar" />
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
          <Row icon={Info} label="Ritm hakkında" />
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
          <Row icon={RotateCcw} label="Tanıtımı tekrar gör" />
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
          <Row icon={RotateCcw} label="Demo verisini sıfırla" tint={colors.error} />
        </Card>
      </View>

      {/* Geliştirici — bileşen kataloğu */}
      <View style={{ marginTop: space.xxl }}>
        <SectionHeader title="Geliştirici" />
        <Card onPress={() => {}} style={{ flexDirection: 'row', alignItems: 'center', gap: space.md }}>
          <View style={[styles.rowIcon, { backgroundColor: colors.brandSoft }]}>
            <LayoutGrid size={18} color={colors.brand} strokeWidth={2} />
          </View>
          <View style={{ flex: 1 }}>
            <Txt variant="body">Bileşenler kataloğu</Txt>
            <Txt variant="caption" color={colors.textSecondary}>Sayfada kullanılan tüm yapı taşları</Txt>
          </View>
          <ChevronRight size={18} color={colors.textTertiary} strokeWidth={2} />
        </Card>
      </View>

      <Txt variant="caption" color={colors.textMuted} style={{ textAlign: 'center', marginTop: space.xxl }}>
        Ritm · v1.0.0
      </Txt>
    </Screen>
  );
}

const styles = StyleSheet.create({
  avatar: { width: 64, height: 64, borderRadius: radius.full, alignItems: 'center', justifyContent: 'center' },
  segment: { flexDirection: 'row', gap: space.sm },
  segItem: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 12, borderRadius: radius.md, borderWidth: StyleSheet.hairlineWidth * 2 },
  row: { flexDirection: 'row', alignItems: 'center', gap: space.md, paddingVertical: 14 },
  rowIcon: { width: 34, height: 34, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
  divider: { height: StyleSheet.hairlineWidth },
});
