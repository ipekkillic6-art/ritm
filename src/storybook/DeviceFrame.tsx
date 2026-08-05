/** iPhone çerçeve mockup'ı — Storybook'ta ekranları telefon içinde gösterir. */
import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

const W = 393;
const H = 852;

export function DeviceFrame({ children }: { children: ReactNode }) {
  return (
    <View style={styles.frame}>
      <View style={StyleSheet.absoluteFill}>{children}</View>

      {/* İç çerçeve (bezel) */}
      <View pointerEvents="none" style={styles.bezel} />

      {/* Dynamic Island */}
      <View pointerEvents="none" style={styles.island} />

      {/* Home indicator */}
      <View pointerEvents="none" style={styles.home} />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    width: W,
    height: H,
    borderRadius: 47,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.18)',
    backgroundColor: '#0f0a14',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.5,
    shadowRadius: 50,
  },
  bezel: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 47,
    borderWidth: 6,
    borderColor: '#0a0a0a',
    zIndex: 150,
  },
  island: {
    position: 'absolute',
    top: 12,
    left: (W - 120) / 2,
    width: 120,
    height: 34,
    borderRadius: 20,
    backgroundColor: '#000',
    zIndex: 200,
  },
  home: {
    position: 'absolute',
    bottom: 9,
    left: (W - 134) / 2,
    width: 134,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
    zIndex: 200,
  },
});
