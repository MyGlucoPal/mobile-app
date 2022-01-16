import React, { useState } from 'react';
import { Text, View } from 'react-native';
import * as Yup from 'yup';
import { Formik, FormikValues } from 'formik';
import { DefaultTheme, Button } from 'react-native-paper';

// Custom components
import Checkbox from './Checkbox';
import TextInput from './TextInput';

// Hooks
import useIsMountedRef from '../hooks/useIsMountedRef';
import useAuth from '../hooks/useAuth';

type InitialValues = {
    email: string;
    password: string;
    afterSubmit?: string;
};

const LoginForm = () => {
    const isMountedRef = useIsMountedRef();
    const { login } = useAuth();

    const [securePassword, setSecurePassword] = useState(true);

    const LoginSchema = Yup.object().shape({
      email: Yup
        .string()
        .label('email')
        .email('Email must be a valid email address')
        .required('Email is required'),
      password: Yup
        .string()
        .label('password')
        .required('Password is required')
    });

    const handleSubmit = async (values:FormikValues) => {
      try {
        await login(values.email, values.password);
        if (isMountedRef.current) {
          values.setSubmitting(false);
        }
      } catch (error: any) {
        console.error(error);
        values.resetForm();
        if (isMountedRef.current) {
          values.setSubmitting(false);
          values.setErrors({ afterSubmit: error.message });
        }
      }
    }

    return (
      <Formik
        initialValues={{
          email: '',
          password: ''
        } as InitialValues}
        onSubmit={handleSubmit}
        validationSchema={LoginSchema}
      >
        {({ handleChange, handleSubmit, errors, touched, isSubmitting }) => (
          <View>
            <TextInput
              autoCompleteType='username'
              textContentType='username'
              label="email"
              error={Boolean(touched.email && errors.email)}
              errorMsg={errors.email}
              keyboardType='email-address'
              onInput={handleChange('email')}
              theme={DefaultTheme}
            />
            <TextInput
              autoCompleteType="password"
              textContentType='password'
              label="password"
              error={Boolean(touched.password && errors.password)}
              errorMsg={errors.password}
              keyboardType='default'
              secureTextEntry={securePassword}
              onInput={handleChange('password')}
              theme={DefaultTheme}
            />
            <Checkbox 
              checked={!securePassword}
              onPress={() => setSecurePassword(!securePassword)}
              text='Show password'
            /> 

            <Button 
              mode='contained'
              loading={isSubmitting}
              onPress={handleSubmit}
            >
              Submit 
            </Button>
            {errors.afterSubmit && <Text>{errors.afterSubmit}</Text>}
          </View>
        )}
      </Formik>
    );
}

export default LoginForm;