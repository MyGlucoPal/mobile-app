import React, { useState } from 'react';
import { Text, View } from 'react-native';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import {DefaultTheme, Button } from 'react-native-paper';

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

      const formik = useFormik<InitialValues>({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
          try {
            await login(values.email, values.password);
            // enqueueSnackbar('Login success', {
            //   variant: 'success',
            //   action: (key) => (
            //     <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            //       {/* <Icon icon={closeFill} /> */}
            //     </MIconButton>
            //   )
            // });
            if (isMountedRef.current) {
              setSubmitting(false);
            }
          } catch (error: any) {
            console.error(error);
            resetForm();
            if (isMountedRef.current) {
              setSubmitting(false);
              setErrors({ afterSubmit: error.message });
            }
          }
        }
      });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, handleChange} = formik;



    return (
        <View>
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
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

                    {/* Show password??? */}
                    
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

                    
                </Form>
            </FormikProvider>
            {errors.afterSubmit && <Text>{errors.afterSubmit}</Text>}
        </View>
    );
}

export default LoginForm;