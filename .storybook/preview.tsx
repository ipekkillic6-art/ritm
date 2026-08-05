import * as React from 'react';
import type { Preview } from '@storybook/react-vite';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProviderStatic } from '../src/theme/theme';

const INITIAL_METRICS = {
  frame: { x: 0, y: 0, width: 393, height: 852 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Tema',
      toolbar: {
        title: 'Tema',
        icon: 'mirror',
        items: [
          { value: 'dark', title: 'Koyu', icon: 'moon' },
          { value: 'light', title: 'Açık', icon: 'sun' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'dark',
    viewport: { value: 'iphone15pro' },
  },
  parameters: {
    layout: 'centered',
    backgrounds: { disabled: true },
    controls: { expanded: false },
    options: {
      storySort: {
        order: [
          'Görev Listesi (2 Hafta)',
          'Rehber',
          'Aşama 0 · Temeller',
          'Aşama 1 · Statik Ekran',
          'Aşama 2 · Etkileşim',
          'Aşama 4 · Navigasyon & Detay',
          'Aşama 6 · İstatistik',
          'Aşama 7 · Cila',
          'Ekranlar',
          'Bileşenler',
        ],
      },
    },
    viewport: {
      options: {
        iphone15pro: { name: 'iPhone 15 Pro', styles: { width: '393px', height: '852px' }, type: 'mobile' },
        iphone17promax: { name: 'iPhone 17 Pro Max', styles: { width: '440px', height: '956px' }, type: 'mobile' },
        pixel8: { name: 'Google Pixel 8', styles: { width: '412px', height: '892px' }, type: 'mobile' },
      },
    },
  },
  decorators: [
    (Story, context) => {
      const mode = (context.globals.theme || 'dark') as 'dark' | 'light';
      const bg = '#0b0710';
      return (
        <SafeAreaProvider initialMetrics={INITIAL_METRICS}>
          <ThemeProviderStatic mode={mode}>
            <div
              style={{
                minHeight: '100vh',
                background: bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 24,
                boxSizing: 'border-box',
              }}
            >
              <Story />
            </div>
          </ThemeProviderStatic>
        </SafeAreaProvider>
      );
    },
  ],
};

export default preview;
