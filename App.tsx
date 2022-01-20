import React from 'react';

import Main from './src/Main';

// Providers
import { AuthProvider } from './src/context/FirebaseContext';

const App = () => {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}

export default App;