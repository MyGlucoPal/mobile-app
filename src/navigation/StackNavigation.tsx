import React from "react";
import { createStackNavigator, Header } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import { BottomTabs } from "./BottomTab";

import type { StackNavigatorParamlist } from "../@types/navigation";

const Stack = createStackNavigator<StackNavigatorParamlist>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='FeedList'
      screenOptions={{
        header: (stackHeader) => {
          return <Header {...stackHeader} />;
        },
      }}>
      <Stack.Screen
        name='FeedList'
        component={BottomTabs}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
          return { headerTitle: routeName };
        }}
      />
      {/* <Stack.Screen
        name="Details"
        component={infoBox}
        options={{ headerTitle: 'Tweet' }}
      /> */}
    </Stack.Navigator>
  );
};

export default StackNavigator;
