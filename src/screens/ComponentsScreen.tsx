/**
 * Bileşen Kataloğu — uygulamadaki tüm yeniden kullanılabilir yapı taşları tek yerde.
 * Amaç: stajyerin "sayfa = bileşenlerden kurulur" (component / nesne tabanlı) mantığını kavraması.
 */
import { Check, ChevronLeft, Plus } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { radius, space } from '@/theme/tokens';
import { useTheme } from '@/theme/theme';
import { Button } from '@/ui/Button';
import { Card } from '@/ui/Card';
import { Chip } from '@/ui/Chip';
import { HabitCard } from '@/ui/HabitCard';
import { IconButton } from '@/ui/IconButton';
import { ProgressRing } from '@/ui/ProgressRing';
import { Screen } from '@/ui/Screen';
import { Txt } from '@/ui/Text';
import { MOCK_HABITS } from './mock';

function Item({ name, usage, children }: { name: string; usage: string; children: ReactNode }) {
  const { colors } = useTheme();
  return (
    <View style={{ marginBottom: space.xl }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm, marginBottom: 6 }}>
        <Txt
          variant="micro"
          color={colors.brand}
          style={{ fontFamily: undefined, backgroundColor: colors.brandSoft, borderRadius: radius.sm, paddingHorizontal: 8, paddingVertical: 3, overflow: 'hidden' }}
        >
          {name}
        </Txt>
      </View>
      <Txt variant="caption" color={colors.textTertiary} style={{ marginBottom: space.md }}>
        {usage}
      </Txt>
      <Card>{children}</Card>
    </View>
  );
}

export function ComponentsScreen() {
  const { colors } = useTheme();
  return (
    <Screen scroll bottomInset={40} contentStyle={{ paddingTop: space.xs }}>
      {/* Nav */}
      <View style={styles.nav}>
        <IconButton icon={ChevronLeft} />
        <Txt variant="h3" style={{ flex: 1, textAlign: 'center' }}>Bileşenler</Txt>
        <View style={{ width: 44 }} />
      </View>

      <Txt variant="bodySm" color={colors.textSecondary} style={{ marginBottom: space.xl }}>
        Sayfalar bu yapı taşlarından kurulur. Her biri ayrı bir bileşen (`src/ui/`) — bir kez yaz, her yerde kullan.
      </Txt>

      <Item name="<Txt>" usage="Tüm metinler — başlık/gövde varyantları">
        <Txt variant="h2">Başlık (h2)</Txt>
        <Txt variant="body" color={colors.textSecondary}>Gövde metni (body)</Txt>
        <Txt variant="caption" color={colors.textTertiary}>Etiket (caption)</Txt>
      </Item>

      <Item name="<Button>" usage="Birincil / ikincil aksiyon">
        <View style={{ gap: space.md }}>
          <Button label="Birincil" icon={Check} fullWidth />
          <Button label="İkincil" variant="secondary" fullWidth />
        </View>
      </Item>

      <Item name="<Card>" usage="İçerik kapsayıcısı — solid, hairline border">
        <Txt variant="body">Kart içeriği burada.</Txt>
      </Item>

      <Item name="<Chip>" usage="Seçim çipi — sıklık, filtre">
        <View style={{ flexDirection: 'row', gap: space.sm }}>
          <Chip label="Her gün" selected />
          <Chip label="Hafta içi" />
        </View>
      </Item>

      <Item name="<IconButton>" usage="Dairesel ikon aksiyonu — nav, ekle">
        <View style={{ flexDirection: 'row', gap: space.md }}>
          <IconButton icon={Plus} />
          <IconButton icon={Check} />
        </View>
      </Item>

      <Item name="<ProgressRing>" usage="Dairesel ilerleme — günlük tamamlanma">
        <View style={{ alignItems: 'center' }}>
          <ProgressRing progress={0.66} size={96} stroke={10}>
            <Txt variant="h2" color={colors.brand}>66</Txt>
          </ProgressRing>
        </View>
      </Item>

      <Item name="<HabitCard>" usage="Alışkanlık satırı — Bugün listesi">
        <View style={{ gap: space.md }}>
          <HabitCard habit={MOCK_HABITS[0]} onToggle={() => {}} onPress={() => {}} />
        </View>
      </Item>
    </Screen>
  );
}

const styles = StyleSheet.create({
  nav: { flexDirection: 'row', alignItems: 'center', gap: space.md, paddingVertical: space.sm },
});
