import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import SlidingScaleForm from '../components/insulin/SlidingScaleForm';
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

         <SlidingScaleForm 
            onSubmit={() => console.log("meal screen logging")}
         />
      </View>
   );
};

export default HomeScreen;
