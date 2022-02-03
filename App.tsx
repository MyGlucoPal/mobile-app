import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import "react-native-gesture-handler";

import DiabetesApp from "./src/Main";

// Providers
import { AuthProvider } from "./src/context/FirebaseContext";
import { SettingsProvider } from "./src/context/SettingsContext";
import { AppearanceProvider } from "react-native-appearance";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <SettingsProvider>
        <PaperProvider>
          <AppearanceProvider>
            <SafeAreaProvider>
              <DiabetesApp />
            </SafeAreaProvider>
          </AppearanceProvider>
        </PaperProvider>
      </SettingsProvider>
    </AuthProvider>
  );
};

export default App;
