import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';

import RegisterForm from '../../components/RegisterForm';
import LoginForm from '../../components/LoginForm';
import { Button } from 'react-native-paper';

const AuthScreen = () => {
    const [isRegistering, setIsRegistering] = useState(true);

    const form = (isRegistering) ? <RegisterForm /> : <LoginForm />;
    const buttonText = (isRegistering) ? "Login" : "Register"

    return (
        <SafeAreaView>
            {form}
            <Button
                onPress={() => setIsRegistering(!isRegistering)}
                mode='outlined'
            > 
                {buttonText}
            </Button>
        </SafeAreaView>
    );

}
export default AuthScreen;