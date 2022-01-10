import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

//Screens
import HomeScreen from './screens/HomeScreen';
import AuthScreen from './screens/authentication/AuthScreen';
// Hooks
import useAuth from './hooks/useAuth';

const DiabetesApp = () => {

  const { isInitialized, user, isAuthenticated } = useAuth();

  if (!isInitialized){
    return (
      <View style={styles.container}>
        <Text>
          Loading....
        </Text>
      </View>
    )
  }

  if (isAuthenticated && user){
    return (
      <HomeScreen />
    );
  } else {
    return(
      <AuthScreen />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DiabetesApp;