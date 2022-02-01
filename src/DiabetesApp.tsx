import React from "react";
import { StyleSheet, Text, View } from "react-native";

//Screens
import AuthScreen from "./screens/authentication/AuthScreen";

// Hooks
import useAuth from "./hooks/useAuth";

// Costume components
import BottomNavigation from "./components/BottomNavigation";

const DiabetesApp = () => {
  const { isInitialized, user, isAuthenticated } = useAuth();

  if (!isInitialized) {
    return (
      <View style={styles.container}>
        <Text>Loading....</Text>
      </View>
    );
  }

  if (isAuthenticated && user) {
    return <BottomNavigation />;
  } else {
    return <AuthScreen />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DiabetesApp;
