import React from 'react';

import DiabetesApp from './src/DiabetesApp';

// Providers
import { AuthProvider } from './src/context/FirebaseContext';
import { PreferencesContext } from './src/context/PreferenceContext';


const App = ():JSX.Element => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  
  function toggleTheme() {
    setTheme(theme => (theme === 'light' ? 'dark' : 'light'));
  }


  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      theme,
    }),
    [theme]
  );

  return (
    <AuthProvider>
      <PreferencesContext.Provider value={preferences}>
        <DiabetesApp />
      </PreferencesContext.Provider>
    </AuthProvider>
  );
}

export default App;