import SettingsContextState from 'contexts/Settings';
import { useContext } from 'react';

const useSettings = () => {
  const context = useContext(SettingsContextState);

  if (!context) {
    throw new Error('Settings context must be used within a Provider');
  }

  return context;
};

export default useSettings;
