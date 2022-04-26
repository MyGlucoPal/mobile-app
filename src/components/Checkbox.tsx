import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Checkbox as PaperCheckbox } from 'react-native-paper';

interface CheckBoxProps {
   isChecked: (selectedValue: boolean) => void;
   text?: string;
}

const Checkbox = (props: CheckBoxProps) => {
   const [checked, setChecked] = useState(false);

   const onPress = () => {
      const newVal = !checked;
      setChecked(newVal);
      props.isChecked(newVal);
   }

   return (
      <View style={styles.container}>
         <View style={styles.checkboxContainer}>
            <PaperCheckbox
               status={checked ? 'checked' : 'unchecked'}
               onPress={onPress}
            />
            {props.text && <Text style={styles.label}>{props.text}</Text>}
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   checkboxContainer: {
      flexDirection: 'row',
      marginBottom: 20,
   },
   checkbox: {
      alignSelf: 'center',
   },
   label: {
      margin: 8,
   },
});

export default Checkbox;
