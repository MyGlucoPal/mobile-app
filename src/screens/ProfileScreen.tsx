import React, { useContext } from 'react';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { Avatar, Title, TouchableRipple } from 'react-native-paper';

import InfoBox from '../components/InfoBox';
import useAuth from '../hooks/useAuth';

const ProfileScreen = (): JSX.Element => {
   const { user } = useAuth();
   const first_name = user?.displayName.split(' ').slice(0, -1).join(' ') || '';
   const last_name = user?.displayName.split(' ').slice(-1).join(' ') || '';
   const img = user?.image || '';
   const email = user?.email || '';
   const fullName = first_name + ' ' + last_name;

   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
               {img === '' && (
                  <Avatar.Text size={80} label={first_name[0] + last_name[0]} />
               )}
               {img !== '' && <Avatar.Image source={{ uri: img }} size={80} />}
               <View style={{ marginLeft: 20 }}>
                  <Title
                     style={[
                        styles.title,
                        {
                           marginTop: 15,
                           marginBottom: 5,
                        },
                     ]}
                  >
                     {fullName}
                  </Title>
               </View>
            </View>
         </View>

         <View style={styles.userInfoSection}>
            <View style={styles.row}>
               <Avatar.Icon size={24} icon="email" />
               <Text style={{ color: '#777777', marginLeft: 20 }}>{email}</Text>
            </View>
         </View>

         <View style={styles.infoBoxWrapper}>
            <InfoBox
               title="140"
               caption="Today's Carbs"
               styling={{ borderRightColor: '#dddddd', borderRightWidth: 1 }}
            />
            <InfoBox title="12" caption="Today's Insulin Intake" />
         </View>

         <View style={styles.menuWrapper}>
            <TouchableRipple onPress={() => {}}>
               <View style={styles.menuItem}>
                  {/* <Icon name="heart-outline" color="#FF6347" size={25} /> */}
                  <Text style={styles.menuItemText}>My Meals</Text>
               </View>
            </TouchableRipple>

            <TouchableRipple onPress={() => {}}>
               <View style={styles.menuItem}>
                  {/* <Icon name="account-check-outline" color="#FF6347" size={25} /> */}
                  <Text style={styles.menuItemText}>Change Password</Text>
                  {/* Note: Maybe leave change password to be handles inside 'Settings' */}
               </View>
            </TouchableRipple>

            <TouchableRipple onPress={() => {}}>
               <View style={styles.menuItem}>
                  {/* <Icon name="settings-outline" color="#FF6347" size={25} /> */}
                  <Text style={styles.menuItemText}>Settings</Text>
               </View>
            </TouchableRipple>
         </View>
      </SafeAreaView>
   );
};

export default ProfileScreen;

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
