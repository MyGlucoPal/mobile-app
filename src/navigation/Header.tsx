import React from "react";
import { Appbar, Avatar, useTheme } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import type { StackHeaderProps } from "@react-navigation/stack/lib/typescript/src/types";
import type { DrawerNavigationProp } from "@react-navigation/drawer/lib/typescript/src/types";

const Header = (props: StackHeaderProps): JSX.Element => {
  const theme = useTheme();
  const previous = props.progress.previous;
  const { options, navigation, route } = props;
  props.route.name;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : route.name;

  return (
    <Appbar.Header theme={{ colors: { primary: theme.colors.surface } }}>
      {previous ? (
        <Appbar.BackAction
          onPress={navigation.goBack}
          color={theme.colors.primary}
        />
      ) : (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => {
            (navigation as any as DrawerNavigationProp<{}>).openDrawer();
          }}>
          <Avatar.Image
            size={40}
            source={{
              uri: "https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg",
            }}
          />
        </TouchableOpacity>
      )}
      <Appbar.Content
        title={
          title === "Feed" ? (
            <MaterialCommunityIcons
              style={{ marginRight: 10 }}
              name='twitter'
              size={40}
              color={theme.colors.primary}
            />
          ) : (
            title
          )
        }
        titleStyle={{
          fontSize: 18,
          fontWeight: "bold",
          color: theme.colors.primary,
        }}
      />
    </Appbar.Header>
  );
};

export default Header;
