import { router, useLocalSearchParams } from 'expo-router';
import { Check, ChevronLeft, Flame, Trash2 } from 'lucide-react-native';
import { Pressable, StyleSheet, View } from 'react-native';

import {
  bestStreak,
  currentStreak,
  keyOf,
  monthGrid,
  monthLabel,
} from '@/lib/date';
import { getIcon } from '@/lib/icons';
import { FREQ_LABEL, isDoneToday, useHabits } from '@/store/habits';
import { radius, space } from '@/theme/tokens';
import { useTheme } from '@/theme/theme';
import { Button } from '@/ui/Button';
import { Card } from '@/ui/Card';
import { IconButton } from '@/ui/IconButton';
import { Screen } from '@/ui/Screen';
import { Txt } from '@/ui/Text';

const WEEKDAYS = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'];

export default function HabitDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();
  const { getHabit, toggleToday, toggleDate, deleteHabit } = useHabits();
  const habit = getHabit(id);

  if (!habit) {
    return (
      <Screen>
        <Txt variant="h3">Alışkanlık bulunamadı.</Txt>
      </Screen>
    );
  }

  const Icon = getIcon(habit.icon);
  const done = new Set(habit.completedDates);
  const streak = currentStreak(done);
  const best = bestStreak(done);
  const total = habit.completedDates.length;
  const doneToday = isDoneToday(habit);
  const todayKey = keyOf(new Date());

  const now = new Date();
  const grid = monthGrid(now.getFullYear(), now.getMonth());

  const remove = () => {
    deleteHabit(habit.id);
    router.back();
  };

  const stats = [
    { label: 'Güncel seri', value: streak },
    { label: 'En uzun', value: best },
    { label: 'Toplam', value: total },
  ];

  return (
    <Screen scroll bottomInset={40} contentStyle={{ paddingTop: space.xs }}>
      {/* Nav bar */}
      <View style={styles.nav}>
        <IconButton icon={ChevronLeft} onPress={() => router.back()} />
        <Txt variant="h3" numberOfLines={1} style={{ flex: 1, textAlign: 'center' }}>
          {habit.name}
        </Txt>
        <IconButton icon={Trash2} color={colors.error} onPress={remove} />
      </View>

      {/* Seri hero'su */}
      <Card style={{ alignItems: 'center', paddingVertical: space.xxl, marginTop: space.md }}>
        <View style={[styles.heroIcon, { backgroundColor: habit.color + '26' }]}>
          <Icon size={30} color={habit.color} strokeWidth={2} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm, marginTop: space.lg }}>
          <Flame size={30} color={colors.warning} strokeWidth={2} />
          <Txt variant="display" color={colors.textPrimary}>{streak}</Txt>
        </View>
        <Txt variant="caption" color={colors.textSecondary}>
          günlük seri · {FREQ_LABEL[habit.freq]}
        </Txt>
      </Card>

      {/* Mini istatistikler */}
      <View style={styles.statRow}>
        {stats.map((s) => (
          <Card key={s.label} style={styles.stat}>
            <Txt variant="h1" color={colors.brand}>{s.value}</Txt>
            <Txt variant="caption" color={colors.textSecondary}>{s.label}</Txt>
          </Card>
        ))}
      </View>

      {/* Takvim */}
      <Card style={{ marginTop: space.md }}>
        <Txt variant="h3" style={{ marginBottom: space.lg }}>
          {monthLabel(now.getFullYear(), now.getMonth())}
        </Txt>
        <View style={styles.weekRow}>
          {WEEKDAYS.map((w) => (
            <View key={w} style={styles.cell}>
              <Txt variant="micro" color={colors.textTertiary}>{w}</Txt>
            </View>
          ))}
        </View>
        <View style={styles.calGrid}>
          {grid.map((key, i) => {
            if (!key) return <View key={`e${i}`} style={styles.cell} />;
            const isDone = done.has(key);
            const isToday = key === todayKey;
            const isFuture = key > todayKey;
            const dayNum = Number(key.slice(-2));
            return (
              <Pressable
                key={key}
                disabled={isFuture}
                onPress={() => toggleDate(habit.id, key)}
                style={styles.cell}
              >
                <View
                  style={[
                    styles.day,
                    {
                      backgroundColor: isDone ? habit.color : colors.trackBg,
                      borderWidth: isToday ? 2 : 0,
                      borderColor: colors.brand,
                      opacity: isFuture ? 0.35 : 1,
                    },
                  ]}
                >
                  <Txt
                    variant="micro"
                    color={isDone ? '#fff' : colors.textSecondary}
                  >
                    {dayNum}
                  </Txt>
                </View>
              </Pressable>
            );
          })}
        </View>
      </Card>

      {/* Not */}
      {habit.note ? (
        <Card style={{ marginTop: space.md }}>
          <Txt variant="caption" color={colors.textTertiary} style={{ marginBottom: 4 }}>
            NOT
          </Txt>
          <Txt variant="body" color={colors.textSecondary}>{habit.note}</Txt>
        </Card>
      ) : null}

      {/* İşaretle */}
      <Button
        label={doneToday ? 'Bugünü geri al' : 'Bugün yaptım'}
        icon={doneToday ? undefined : Check}
        variant={doneToday ? 'secondary' : 'primary'}
        onPress={() => toggleToday(habit.id)}
        fullWidth
        style={{ marginTop: space.xl }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    paddingVertical: space.sm,
  },
  heroIcon: {
    width: 60,
    height: 60,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statRow: { flexDirection: 'row', gap: space.md, marginTop: space.md },
  stat: { flex: 1, alignItems: 'center', gap: 2 },
  weekRow: { flexDirection: 'row' },
  calGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  cell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
  },
  day: {
    width: 34,
    height: 34,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
