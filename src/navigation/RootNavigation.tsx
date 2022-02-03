import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { useTheme } from "react-native-paper";

import StackNavigation from "./StackNavigation";
import DrawerContent from "./DrawerContent";

const Drawer = createDrawerNavigator();

const RootNavigator = (): JSX.Element => {
  const theme = useTheme();
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={navigationTheme}>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name='Home' component={StackNavigation} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
