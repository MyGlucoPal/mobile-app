import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import DiabetesApp from './src/DiabetesApp';

// Providers
import { AuthProvider } from './src/context/FirebaseContext';
import { SettingsProvider } from './src/context/SettingsContext';


const App = ():JSX.Element => {

  return (
    <AuthProvider>
      <SettingsProvider>
        <PaperProvider>
          <DiabetesApp />
        </PaperProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;