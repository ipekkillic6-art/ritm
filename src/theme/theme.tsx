/**
 * Tema sağlayıcı — koyu/açık/sistem tercihi, AsyncStorage'da kalıcı.
 * useTheme() çözülmüş paleti + yardımcı token'ları döndürür.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useColorScheme } from 'react-native';

import { getColors, type Colors, type Mode } from './tokens';

export type ThemePref = 'system' | 'dark' | 'light';

type ThemeCtx = {
  pref: ThemePref;
  mode: Mode;
  colors: Colors;
  setPref: (p: ThemePref) => void;
};

const STORAGE_KEY = 'ritm:themePref';

const Ctx = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const system = useColorScheme() ?? 'dark';
  const [pref, setPrefState] = useState<ThemePref>('system');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((v) => {
      if (v === 'dark' || v === 'light' || v === 'system') setPrefState(v);
    });
  }, []);

  const setPref = (p: ThemePref) => {
    setPrefState(p);
    AsyncStorage.setItem(STORAGE_KEY, p);
  };

  const mode: Mode = pref === 'system' ? (system as Mode) : pref;
  const colors = useMemo(() => getColors(mode), [mode]);

  const value = useMemo(
    () => ({ pref, mode, colors, setPref }),
    [pref, mode, colors],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTheme(): ThemeCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

/**
 * Statik tema sağlayıcı — Storybook için. AsyncStorage'a dokunmaz;
 * modu doğrudan prop'tan (toolbar global'ı) alır.
 */
export function ThemeProviderStatic({
  mode,
  children,
}: {
  mode: Mode;
  children: ReactNode;
}) {
  const colors = useMemo(() => getColors(mode), [mode]);
  const value = useMemo(
    () => ({ pref: mode as ThemePref, mode, colors, setPref: () => {} }),
    [mode, colors],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
