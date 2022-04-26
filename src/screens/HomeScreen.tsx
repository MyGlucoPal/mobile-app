import React, { useCallback } from 'react';
import { Text, View, StyleSheet, Linking, Image } from 'react-native';
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

   const insulinHelpLink = "https://medlineplus.gov/ency/patientinstructions/000660.htm";
   const bloodSugarHelpLink = "https://www.mayoclinic.org/diseases-conditions/diabetes/in-depth/blood-sugar/art-20046628#:~:text=Insert%20a%20test%20strip%20into,screen%20after%20a%20few%20seconds.";

   const handlePress = async (url: string) => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);
   
      if (supported) {
         // Opening the link with some app, if the URL scheme is "http" the web link should be opened
         // by some browser in the mobile
         await Linking.openURL(url);
      }
   };

   return (
      <View>
         <Text style={[styles.title,
                        {
                           marginTop: 15,
                           marginBottom: 5,
                           textAlign: 'center',
                        },
                     ]}>Welcome to your homescreen!
         </Text>

         <Image source={require('../../images/glucoseStockImage.jpg')}
         style={{marginTop: 10, marginBottom: 10, marginLeft: 60, width: 300, height: 200}} />

         <Button style={{
            margin: 20
         }} onPress={() => {
            handlePress(bloodSugarHelpLink);
         }} mode="contained">
            Help with testing blood sugar
         </Button>

         <Image source={require('../../images/insulinStockImage.jpg')}
         style={{marginTop: 10, marginBottom: 10, marginLeft: 60, width: 300, height: 200}} />

         <Button style={{
            margin: 20
         }} onPress={() => {
            handlePress(insulinHelpLink);
         }} mode="contained">
            Help with administering insulin dose
         </Button>

         
         <Button onPress={handleLogout}>Logout</Button>

         {/* <SlidingScaleForm 
            onSubmit={() => console.log("meal screen logging")}
         /> */}
      </View>
   );
};

export default HomeScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   userInfoSection: {
      paddingHorizontal: 30,
      marginBottom: 25,
   },
   title: {
      fontSize: 24,
      fontWeight: 'bold',
   },
   caption: {
      fontSize: 14,
      lineHeight: 14,
      fontWeight: '500',
   },
   row: {
      flexDirection: 'row',
      marginBottom: 10,
   },
   infoBoxWrapper: {
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1,
      borderTopColor: '#dddddd',
      borderTopWidth: 1,
      flexDirection: 'row',
      height: 100,
   },
   menuWrapper: {
      marginTop: 10,
   },
   menuItem: {
      flexDirection: 'row',
      paddingVertical: 15,
      paddingHorizontal: 30,
   },
   menuItemText: {
      color: '#777777',
      marginLeft: 20,
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 26,
   },
});
