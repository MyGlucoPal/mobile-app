import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Caption, Title } from 'react-native-paper';

interface InfoBoxProp {
   title: string;
   caption: string;
   styling?: ViewStyle | {};
}

const InfoBox: React.FC<InfoBoxProp> = (prop) => {
   return (
      <View style={[styles.infoBox, prop.styling || ({} as ViewStyle)]}>
         <Title>{prop.title}</Title>
         <Caption>{prop.caption}</Caption>
      </View>
   );
};

export default InfoBox;

const styles = StyleSheet.create({
   infoBox: {
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
   },
});
