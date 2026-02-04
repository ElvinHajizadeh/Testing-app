import { create } from 'zustand';
import { AppSettings } from '@types/index';

interface SettingsStore {
  settings: AppSettings | null;
  loading: boolean;

  setSettings: (settings: AppSettings) => void;
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
  toggleBiometrics: () => void;
  toggleNotifications: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  settings: null,
  loading: true,

  setSettings: (settings) => set({ settings, loading: false }),

  updateSetting: (key, value) =>
    set((state) => ({
      settings: state.settings ? { ...state.settings, [key]: value } : null,
    })),

  toggleBiometrics: () =>
    set((state) => ({
      settings: state.settings
        ? { ...state.settings, enableBiometrics: !state.settings.enableBiometrics }
        : null,
    })),

  toggleNotifications: () =>
    set((state) => ({
      settings: state.settings
        ? { ...state.settings, enableNotifications: !state.settings.enableNotifications }
        : null,
    })),

  setTheme: (theme) =>
    set((state) => ({
      settings: state.settings ? { ...state.settings, theme } : null,
    })),
}));
