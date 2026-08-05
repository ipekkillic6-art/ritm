/** Web shim: react-native-safe-area-context (RN codegen bağımlılığını atlar). */
import * as React from 'react';
import { View } from 'react-native';

export type Edge = 'top' | 'bottom' | 'left' | 'right';

const INSETS = { top: 47, bottom: 34, left: 0, right: 0 };

export function SafeAreaProvider({ children }: { children?: React.ReactNode; [k: string]: any }) {
  return <>{children}</>;
}

export function useSafeAreaInsets() {
  return INSETS;
}

export function SafeAreaView({
  edges = ['top', 'bottom', 'left', 'right'],
  style,
  children,
  ...rest
}: {
  edges?: Edge[];
  style?: any;
  children?: React.ReactNode;
  [k: string]: any;
}) {
  const pad = {
    paddingTop: edges.includes('top') ? INSETS.top : 0,
    paddingBottom: edges.includes('bottom') ? INSETS.bottom : 0,
    paddingLeft: edges.includes('left') ? INSETS.left : 0,
    paddingRight: edges.includes('right') ? INSETS.right : 0,
  };
  return (
    <View style={[pad, style]} {...rest}>
      {children}
    </View>
  );
}

export const initialWindowMetrics = { frame: { x: 0, y: 0, width: 393, height: 852 }, insets: INSETS };
