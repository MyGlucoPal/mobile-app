import React, { useState } from 'react';
import { View } from 'react-native';

import RegisterForm from '../../components/RegisterForm';
import LoginForm from '../../components/LoginForm';

const AuthScreen = () => {
   const [isRegistering, setIsRegistering] = useState(false);

   return (
      <View>
         {isRegistering && (
            <RegisterForm onLoginPress={() => setIsRegistering(false)} />
         )}
         {!isRegistering && (
            <LoginForm onSignUpPress={() => setIsRegistering(true)} />
         )}
      </View>
   );
};
export default AuthScreen;
