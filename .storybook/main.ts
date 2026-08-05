import type { StorybookConfig } from '@storybook/react-vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const src = resolve(__dirname, '../src');

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)', '../src/**/*.mdx'],
  addons: ['@storybook/addon-links', '@storybook/addon-docs'],
  framework: { name: '@storybook/react-vite', options: {} },

  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': src,
      'react-native': 'react-native-web',
      'react-native-svg': 'react-native-svg-web',
      // expo modüllerini web shim'lerine yönlendir (bileşen koduna dokunmadan)
      'expo-linear-gradient': resolve(__dirname, './shims/linear-gradient.tsx'),
      'expo-blur': resolve(__dirname, './shims/blur.tsx'),
      'react-native-safe-area-context': resolve(__dirname, './shims/safe-area.tsx'),
      '@react-native-async-storage/async-storage': resolve(__dirname, './shims/async-storage.ts'),
      react: resolve(__dirname, '../node_modules/react'),
      'react-dom': resolve(__dirname, '../node_modules/react-dom'),
    };
    config.resolve.extensions = [
      '.web.tsx', '.web.ts', '.web.js',
      '.tsx', '.ts', '.js',
      ...(config.resolve.extensions || []),
    ];
    config.resolve.dedupe = ['react', 'react-dom'];
    config.define = {
      ...config.define,
      'process.env.EXPO_OS': JSON.stringify('web'),
      __DEV__: 'true',
    };
    return config;
  },
};

export default config;
