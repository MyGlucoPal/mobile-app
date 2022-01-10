import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import HomeScreen from './screens/HomeScreen';
import AuthScreen from './screens/authentication/AuthScreen';
// Hooks
import useAuth from './hooks/useAuth';
import BottomNavigation from './components/BottomNavigation';

const Stack = createNativeStackNavigator();

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
    //   <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Home" component={HomeScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <BottomNavigation/>
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