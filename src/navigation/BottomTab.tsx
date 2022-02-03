import React from "react";
import color from "color";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Portal, FAB, useTheme } from "react-native-paper";
import {
  getFocusedRouteNameFromRoute,
  RouteProp,
  useIsFocused,
} from "@react-navigation/native";

import HomeScreen from "../screens/HomeScreen";
import MealScreen from "../screens/MealScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Overlay from "./Overlay";

import type { StackNavigatorParamlist } from "../@types/navigation";

type Props = {
  route: RouteProp<StackNavigatorParamlist, "FeedList">;
};

const Tab = createMaterialBottomTabNavigator();

export const BottomTabs = (props: Props) => {
  // Get a name of current screen
  const routeName = getFocusedRouteNameFromRoute(props.route) ?? "Home";
  const isFocused = useIsFocused();
  const theme = useTheme();

  let icon = "feather";

  switch (routeName) {
    case "Meals":
      icon = "email-plus-outline";
      break;
    default:
      icon = "feather";
      break;
  }

  const tabBarColor = theme.dark
    ? (Overlay(6, theme.colors.surface) as string)
    : theme.colors.surface;

  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName='Home'
        backBehavior='initialRoute'
        shifting={true}
        activeColor={theme.colors.primary}
        inactiveColor={color(theme.colors.text).alpha(0.6).rgb().string()}
        sceneAnimationEnabled={false}>
        <Tab.Screen
          name='Meals'
          component={MealScreen}
          options={{
            tabBarIcon: "home-account",
            tabBarColor,
          }}
        />
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            tabBarIcon: "bell-outline",
            tabBarColor,
          }}
        />
        <Tab.Screen
          name='Profile'
          component={ProfileScreen}
          options={{
            tabBarIcon: "message-text-outline",
            tabBarColor,
          }}
        />
      </Tab.Navigator>
      <Portal>
        <FAB
          visible={isFocused}
          icon={icon}
          style={{
            position: "absolute",
            bottom: 100,
            right: 16,
          }}
          color='white'
        />
      </Portal>
    </React.Fragment>
  );
};
