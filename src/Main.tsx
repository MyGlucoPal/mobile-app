import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider as ThemeProvider } from "react-native-paper";

//Screens
import AuthScreen from "./screens/authentication/AuthScreen";

// Hooks
import useAuth from "./hooks/useAuth";

// Costume components
import RootNavigator from "./navigation/RootNavigation";

// Custom imports
import { LightTheme, DarkTheme } from "./theme";

// Hooks
import useSettings from "./hooks/useSettings";

const Main = (): JSX.Element => {
  const { isInitialized, user, isAuthenticated } = useAuth();
  const { theme } = useSettings();

  if (!isInitialized) {
    return (
      <View style={styles.container}>
        <Text>Loading....</Text>
      </View>
    );
  }

  return (
    <ThemeProvider theme={theme === "light" ? LightTheme : DarkTheme}>
      {isAuthenticated && user ? <RootNavigator /> : <AuthScreen />}
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Main;
