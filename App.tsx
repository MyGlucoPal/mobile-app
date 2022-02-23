import React from 'react';

import DiabetesApp from './src/DiabetesApp';

// Providers
import { AuthProvider } from './src/context/FirebaseContext';
import { ErrorProvider } from './src/context/ErrorContext';
import { Provider as PaperProvider } from 'react-native-paper';

const App = () => {
   return (
      <PaperProvider>
         <AuthProvider>
            <ErrorProvider>
               <DiabetesApp />
            </ErrorProvider>
         </AuthProvider>
      </PaperProvider>
   );
};

export default App;
