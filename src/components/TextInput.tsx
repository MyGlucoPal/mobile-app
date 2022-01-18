import React, { memo } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { DefaultTheme, TextInput as Input} from 'react-native-paper';
import { TextInputProps as InputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput';

interface TextInputProps extends InputProps {
    onInput: (val:string) => void;              // Returns the current state of the component
    errorMsg?: string | undefined;
}

const TextInput = (props: TextInputProps) => {

    const onChange = (newText: string) => {
        props.onInput(newText);
    }

    return (
        <View style={styles.container}>
            <Input 
                label={props.label}
                value={props.value}
                placeholder={props.placeholder}
                onChangeText={text => onChange(text)}
                error={props.error}
                mode={props.mode}
                secureTextEntry={props.secureTextEntry}
                keyboardType={props.keyboardType}
                textContentType={props.textContentType}
                autoCorrect={props.autoCorrect}
                autoComplete={props.autoCompleteType}
                {...props}
            />
            {/* Check if we have an error/errorMsg, if we do then display it */}
            {props.error && props.errorMsg &&
                <Text>
                    {props.errorMsg}
                </Text>}
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