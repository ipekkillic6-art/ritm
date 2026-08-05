/** Ekran kabuğu — gradyan zemin + güvenli alan + isteğe bağlı scroll. */
import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View, type ViewStyle } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { SCREEN_PAD } from '@/theme/tokens';
import { useTheme } from '@/theme/theme';

type Props = {
  children: ReactNode;
  scroll?: boolean;
  pad?: boolean; // yatay ekran boşluğu (24px)
  edges?: Edge[];
  contentStyle?: ViewStyle;
  decorations?: ReactNode; // arka plan glow orb'ları vb.
  bottomInset?: number; // yüzen tab bar için ekstra alt boşluk
};

export function Screen({
  children,
  scroll,
  pad = true,
  edges = ['top', 'bottom'],
  contentStyle,
  decorations,
  bottomInset = 0,
}: Props) {
  const { colors } = useTheme();
  const padStyle: ViewStyle = pad ? { paddingHorizontal: SCREEN_PAD } : {};

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={colors.screenBg}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {decorations}
      <SafeAreaView style={styles.root} edges={edges}>
        {scroll ? (
          <ScrollView
            style={styles.root}
            contentContainerStyle={[
              padStyle,
              { paddingBottom: bottomInset },
              contentStyle,
            ]}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          <View style={[styles.root, padStyle, contentStyle]}>{children}</View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  // Dış kap: dekoratif orb'lar sayfayı yatayda genişletmesin diye klipslenir
  container: { flex: 1, overflow: 'hidden' },
});
