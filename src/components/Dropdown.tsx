import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, DefaultTheme } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';

interface DropdownProps {
   options: string[];
   label: string;
   defaultIdx?: number;
   onSelection: (selectedValue: string) => void;   // Returns the `selectedValue`
}

const Dropdown = (props: DropdownProps): JSX.Element => {
   const [selectedValue, setSelectedValue] = useState(
      props.options[props.defaultIdx || 0]
   );
   const [showDropDown, setShowDropDown] = useState(false);

   const options = props.options.map((option) => {
      return { label: option, value: option };
   });
   return (
      <View style={styles.container}>
         <DropDown
            label={props.label}
            mode={'outlined'}
            visible={showDropDown}
            value={selectedValue}
            list={options}
            setValue={setSelectedValue}
            multiSelect={false}
            theme={DefaultTheme}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      width: '100%',
      marginVertical: 12,
   },
});

export default Dropdown;
