import React, { createContext, ReactNode, useState } from 'react';

type SettingsContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

const SettingsContext = createContext<SettingsContextType | null>(null);

function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  function toggleTheme() {
    setTheme(theme => (theme === 'light' ? 'dark' : 'light'));
  }

  return (
    <SettingsContext.Provider value={{
      theme: theme,
      toggleTheme: toggleTheme
    }}>
      { children }
    </SettingsContext.Provider>
  );
}

export { SettingsContext, SettingsProvider };
