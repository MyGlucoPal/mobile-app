import React, { useState } from 'react';
import * as Yup from 'yup';
import { Text, View } from 'react-native';
import { useFormik, Form, FormikProvider } from 'formik';
import { DefaultTheme, Button } from 'react-native-paper';

// Custom components
import TextInput from './TextInput';

// Hooks
import useAuth from '../hooks/useAuth';
import useIsMountedRef from '../hooks/useIsMountedRef';

type InitialValues = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    afterSubmit?: string;
};

const RegisterForm = () => {
    const isMountedRef = useIsMountedRef();
    const { register } = useAuth();

    const [securePassword, setSecurePassword] = useState(true);

    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string()
            .label('firstName')
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('First name required'),
        lastName: Yup.string()
            .label('lastName')
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Last name required'),
        email: Yup.string()
            .label('email')
            .email('Email must be a valid email address')
            .required('Email is required'),
        password: Yup.string()
            .label('password')
            .required('Password is required')
            .min(6, "Password must be at least 6 characters long.")
    });

    const formik = useFormik<InitialValues>({
        initialValues: {
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        },
        validationSchema: RegisterSchema,
        onSubmit: async (values, { setErrors, setSubmitting }) => {
          try {
            await register(values.email, values.password, values.firstName, values.lastName);
            
            if (isMountedRef.current) {
              setSubmitting(false);
            }
          } catch (error: any) {
            console.error(error);
            if (isMountedRef.current) {
              setErrors({ afterSubmit: error.message });
              setSubmitting(false);
            }
          }
        }
    });


    const { errors, touched, handleSubmit, isSubmitting, getFieldProps, handleChange } = formik;
    
    return (
        <View>
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>            
                    <TextInput
                        label="First name"
                        error={Boolean(touched.firstName && errors.firstName)}
                        errorMsg={errors.firstName}
                        theme={DefaultTheme}
                        onInput={handleChange('firstName')}
                    />

                    <TextInput
                        label="Last name"
                        error={Boolean(touched.lastName && errors.lastName)}
                        errorMsg={errors.lastName}
                        theme={DefaultTheme}
                        onInput={handleChange('lastName')}
                    />
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
                    <Button 
                        mode='contained'
                        loading={isSubmitting}
                        onPress={handleSubmit}
                    > 
                        Register 
                    </Button>
                    {errors.afterSubmit && <Text>{errors.afterSubmit}</Text>}
                </Form>
            </FormikProvider>
        </View>
    );
}
export default RegisterForm;