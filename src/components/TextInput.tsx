import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { HelperText, TextInput as Input} from 'react-native-paper';
import { TextInputProps as InputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput';

interface TextInputProps extends InputProps {
    onInput: (val:string) => void;              // Returns the current state of the component
    errorMsg?: string | undefined;
}

const TextInput = (props: TextInputProps):JSX.Element => {

    const onChange = (newText: string) => {
        props.onInput(newText);
    }

    return (
        <View style={styles.container}>
            <Input 
                onChangeText={text => onChange(text)}
                autoComplete={props.autoCompleteType}
                {...props}
            />
            <HelperText
                type='error'
                onPressIn={() => {}}
                onPressOut={() => {}}
            >
                {props.errorMsg}
            </HelperText>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      width: '100%',
      marginVertical: 12,
    },
    error: {
      fontSize: 14,
      paddingHorizontal: 4,
      paddingTop: 4,
    },
});

export default memo(TextInput);