import * as React from 'react';
import { BottomNavigation as Navigation, Text } from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen';
import MealScreen from '../screens/MealScreen';
import UserScreen from '../screens/UserScreen';

// const MusicRoute = () => <Text>Music</Text>;

// const AlbumsRoute = () => <Text>Albums</Text>;

// const RecentsRoute = () => <Text>Recents</Text>;

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
    profile: UserScreen,
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