import { useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';

const useSettings = () => {
  const context = useContext(SettingsContext);

  if (!context) throw new Error('Settings context must be use inside SettingsProvider');

  return context;
};

export default useSettings;