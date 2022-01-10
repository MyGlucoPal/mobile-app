import React from 'react';

import DiabetesApp from './src/DiabetesApp';

// Providers
import { AuthProvider } from './src/context/FirebaseContext';

const App = () => {
  return (
    <AuthProvider>
      <DiabetesApp />
    </AuthProvider>
  );
}

export default App;