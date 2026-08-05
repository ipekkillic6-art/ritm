import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
  CalendarCheck,
  Flame,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

import { Button } from '@/ui/Button';
import { Screen } from '@/ui/Screen';
import { Txt } from '@/ui/Text';
import { brandGradient, radius, space } from '@/theme/tokens';
import { useTheme } from '@/theme/theme';

const ONBOARD_KEY = 'ritm:onboarded';

function GlowOrb({
  id,
  color,
  size,
  style,
}: {
  id: string;
  color: string;
  size: number;
  style: object;
}) {
  return (
    <Svg width={size} height={size} style={style as never} pointerEvents="none">
      <Defs>
        <RadialGradient id={id} cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor={color} stopOpacity="0.55" />
          <Stop offset="1" stopColor={color} stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Rect width={size} height={size} fill={`url(#${id})`} />
    </Svg>
  );
}

function Feature({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  const { colors } = useTheme();
  return (
    <View style={styles.feature}>
      <View style={[styles.featureIcon, { backgroundColor: colors.brandSoft }]}>
        <Icon size={20} color={colors.brand} strokeWidth={2} />
      </View>
      <Txt variant="body" color={colors.textSecondary} style={{ flex: 1 }}>
        {text}
      </Txt>
    </View>
  );
}

export default function Onboarding() {
  const { colors } = useTheme();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(ONBOARD_KEY).then((v) => {
      if (v === '1') router.replace('/home');
      else setChecked(true);
    });
  }, []);

  const start = async () => {
    await AsyncStorage.setItem(ONBOARD_KEY, '1');
    router.replace('/home');
  };

  if (!checked) return <View style={{ flex: 1, backgroundColor: colors.screenBg[0] }} />;

  return (
    <Screen
      decorations={
        <>
          <GlowOrb id="orb1" color="#6145FF" size={420} style={{ position: 'absolute', top: -120, left: -100 }} />
          <GlowOrb id="orb2" color="#EC4899" size={360} style={{ position: 'absolute', bottom: 40, right: -120 }} />
        </>
      }
    >
      <View style={styles.container}>
        {/* Marka */}
        <View style={styles.brandBlock}>
          <LinearGradient
            colors={brandGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.mark}
          >
            <Sparkles size={34} color="#fff" strokeWidth={2} />
          </LinearGradient>
          <Txt variant="display" style={{ marginTop: space.xl }}>
            Ritm
          </Txt>
          <Txt
            variant="body"
            color={colors.textSecondary}
            style={{ marginTop: space.sm, textAlign: 'center' }}
          >
            Küçük adımlar, kalıcı değişim.{'\n'}Alışkanlıklarını takip et, serini büyüt.
          </Txt>
        </View>

        {/* Özellikler */}
        <View style={styles.features}>
          <Feature icon={CalendarCheck} text="Günlük alışkanlıklarını tek dokunuşla işaretle" />
          <Feature icon={Flame} text="Serilerini büyüt, motivasyonunu canlı tut" />
          <Feature icon={TrendingUp} text="İlerlemeni grafiklerle net gör" />
        </View>

        {/* CTA */}
        <Button label="Başla" onPress={start} fullWidth />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingVertical: space.huge },
  brandBlock: { alignItems: 'center' },
  mark: {
    width: 84,
    height: 84,
    borderRadius: radius.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  features: { gap: space.lg, marginVertical: space.huge },
  feature: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
