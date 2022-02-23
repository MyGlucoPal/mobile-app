import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import useAuth from '../hooks/useAuth';

const HomeScreen = () => {
   const { logout } = useAuth();

   const handleLogout = async () => {
      try {
         await logout();
      } catch (error: any) {
         console.log('Error logging out \n' + error);
      }
   };
   return (
      <View>
         <Text>Welcome to your homescreen! </Text>
         <Button onPress={handleLogout}>Logout</Button>
      </View>
   );
};

export default HomeScreen;
