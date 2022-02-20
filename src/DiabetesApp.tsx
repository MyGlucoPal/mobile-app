import React from "react";
import { StyleSheet, Text, View } from "react-native";

//Screens
import AuthScreen from "./screens/authentication/AuthScreen";

// Hooks
import useAuth from "./hooks/useAuth";

// Custom components
import BottomNavigation from "./components/BottomNavigation";
import ErrorModal from "./components/ErrorModal";

const DiabetesApp = () => {
  const { isInitialized, isAuthenticated } = useAuth();

  if (!isInitialized) {
    return (
      <View style={styles.container}>
        <Text>Loading....</Text>
      </View>
    );
  } else {
    return (
      <React.Fragment>
        {isAuthenticated && <BottomNavigation />}
        {!isAuthenticated && <AuthScreen />}
        <ErrorModal />
      </React.Fragment>
    );
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
