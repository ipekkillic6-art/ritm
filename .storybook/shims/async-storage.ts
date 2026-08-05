/** Web shim: AsyncStorage → localStorage (yalnız Storybook için). */
const mem: Record<string, string> = {};
const hasLS = typeof localStorage !== 'undefined';

export default {
  async getItem(k: string) {
    return hasLS ? localStorage.getItem(k) : (mem[k] ?? null);
  },
  async setItem(k: string, v: string) {
    if (hasLS) localStorage.setItem(k, v);
    else mem[k] = v;
  },
  async removeItem(k: string) {
    if (hasLS) localStorage.removeItem(k);
    else delete mem[k];
  },
};
