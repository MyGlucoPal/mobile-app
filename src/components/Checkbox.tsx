import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Checkbox as PaperCheckbox } from 'react-native-paper';

// types
import { TextInputProps as InputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput';

interface CheckBoxProps {
    checked: boolean;
    onPress: () => void;
    text?: string;
}

const Checkbox = (props: CheckBoxProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.checkboxContainer}>
                <PaperCheckbox 
                    status={props.checked ? 'checked' : 'unchecked' }
                    onPress={props.onPress}
                    // theme={styles.checkbox}
                />

                {props.text && 
                    <Text style={styles.label}>
                    {props.text}
                    </Text>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: "center",
    },
    label: {
      margin: 8,
    },
});

export default Checkbox;