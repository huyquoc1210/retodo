import config from 'config';
import useLocalStorage from 'hooks/useLocalStorage';
import { createContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { DispatchAction, FCC } from 'types/react';
import type { PaletteMode } from 'types/theme';

interface Settings {
  paletteMode: PaletteMode;
  language: 'en' | 'vi';
}

const initialSettings: Settings = {
  paletteMode: 'light',
  language: 'en',
};

const SettingsContextState = createContext<Settings | null>(null);
const SettingsContextDispatch = createContext<DispatchAction<Settings> | null>(
  null
);

if (config.__DEV__) {
  SettingsContextState.displayName = 'SettingsContextState';
  SettingsContextDispatch.displayName = 'SettingsContextDispatch';
}

const SettingsProvider: FCC = (props) => {
  const { children } = props;
  const [settings, setSettings] = useLocalStorage<Settings>(
    'settings',
    initialSettings
  );

  const { i18n } = useTranslation();

  const { language } = settings;

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <SettingsContextState.Provider value={settings}>
      <SettingsContextDispatch.Provider value={setSettings}>
        {children}
      </SettingsContextDispatch.Provider>
    </SettingsContextState.Provider>
  );
};

export { SettingsContextDispatch, SettingsProvider };
export default SettingsContextState;
