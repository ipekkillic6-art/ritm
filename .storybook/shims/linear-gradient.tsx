/** Web shim: expo-linear-gradient → CSS linear-gradient <div>. */
import * as React from 'react';
import { StyleSheet } from 'react-native';

type Pt = { x: number; y: number };

export function LinearGradient({
  colors = [],
  start = { x: 0, y: 0 },
  end = { x: 0, y: 1 },
  style,
  children,
}: {
  colors?: readonly string[];
  start?: Pt;
  end?: Pt;
  style?: any;
  children?: React.ReactNode;
}) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const angle = Math.round((Math.atan2(dx, -dy) * 180) / Math.PI);
  const flat = StyleSheet.flatten(style) || {};
  return (
    <div
      style={{
        // RN View varsayılanları (flex) — yoksa alignItems/justifyContent çalışmaz
        display: 'flex',
        flexDirection: 'column',
        ...(flat as object),
        backgroundImage: `linear-gradient(${angle}deg, ${colors.join(', ')})`,
      }}
    >
      {children}
    </div>
  );
}

export default LinearGradient;
