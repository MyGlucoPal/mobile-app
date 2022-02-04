import React from "react";

import "react-native-gesture-handler";

import Main from "./src/Main";

// Providers
import { AuthProvider } from "./src/context/FirebaseContext";
import { SettingsProvider } from "./src/context/SettingsContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = ():JSX.Element => {
  return (
    <AuthProvider>
      <SettingsProvider>
        <SafeAreaProvider>
          <Main />
        </SafeAreaProvider>
      </SettingsProvider>
    </AuthProvider>
  );
};

export default App;
