/** Web shim: expo-blur → CSS backdrop-filter <div>. */
import * as React from 'react';
import { StyleSheet } from 'react-native';

export function BlurView({
  intensity = 20,
  tint,
  style,
  children,
}: {
  intensity?: number;
  tint?: string;
  style?: any;
  children?: React.ReactNode;
}) {
  const flat = StyleSheet.flatten(style) || {};
  const b = Math.max(2, Math.round(intensity / 2.5));
  return (
    <div
      style={{
        // RN View varsayılanları (flex) — yoksa flexDirection/align çalışmaz
        display: 'flex',
        flexDirection: 'column',
        ...(flat as object),
        backdropFilter: `blur(${b}px)`,
        WebkitBackdropFilter: `blur(${b}px)`,
      }}
    >
      {children}
    </div>
  );
}

export default BlurView;
