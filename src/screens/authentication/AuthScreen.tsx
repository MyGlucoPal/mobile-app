import React, { useState } from 'react';
import { Text, View } from 'react-native';

import RegisterForm from '../../components/RegisterForm';
import LoginForm from '../../components/LoginForm';
import { Button } from 'react-native-paper';

const AuthScreen = () => {
    const [isRegistering, setIsRegistering] = useState(true);
    if (isRegistering){
        return (
            <View>
                <RegisterForm />
                <Text>
                    Already have an account?
                </Text>
                <Button onPress={()=> setIsRegistering(false) } mode = 'contained'>
                    Log in
                </Button>
            </View>
        );
    } else {
        return (
            <View>
                <LoginForm />
                <Text>
                    Don't have an account?
                </Text>
                <Button onPress={()=> setIsRegistering(true)} mode = 'contained'>

                    Sign up
                </Button>
            </View>
        );
    }

}
export default AuthScreen;