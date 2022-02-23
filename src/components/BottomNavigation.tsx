import * as React from 'react';
import { BottomNavigation as Navigation } from 'react-native-paper';

import HomeScreen from '../screens/HomeScreen';
import MealScreen from '../screens/MealScreen';
import ProfileScreen from '../screens/ProfileScreen';

const BottomNavigation = () => {
   const [index, setIndex] = React.useState(1);
   const [routes] = React.useState([
      { key: 'meal', title: 'Meal', icon: 'food' },
      { key: 'home', title: 'Home', icon: 'home' },
      { key: 'profile', title: 'Profile', icon: 'account' },
   ]);

   const renderScene = Navigation.SceneMap({
      meal: MealScreen,
      home: HomeScreen,
      profile: ProfileScreen,
   });

   return (
      <Navigation
         navigationState={{ index, routes }}
         onIndexChange={setIndex}
         renderScene={renderScene}
      />
   );
};

export default BottomNavigation;
