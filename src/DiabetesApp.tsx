import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

//Screens
import HomeScreen from './screens/HomeScreen';
import AuthScreen from './screens/authentication/AuthScreen';
// Types
import type { User } from './@types/commons';
// Hooks
import useAuth from './hooks/useAuth';


const DiabetesApp = () => {

  const { isInitialized, user, isAuthenticated } = useAuth();

  // We want to track if we have a user signed in
  // 1. If they are not signed in -> then show the login/signup screens
  // 2. If they are signed in -> We show the main screen of the app

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

  
  // return (
  //   <PaperProvider theme={DefaultTheme}>
  //       {isAuthenticated && user &&
  //         <HomeScreen />
  //       }
  //       {!isAuthenticated && !user && 
  //         // <LoginScreen />
  //         <RegisterScreen/>

  //       }
  //       <Text>This will always be here </Text>
  //       {/* <RegisterScreen/> */}
  //   </PaperProvider>
  // );
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