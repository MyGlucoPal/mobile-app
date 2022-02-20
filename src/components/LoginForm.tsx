import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import { Formik, FormikValues } from "formik";
import {
  DefaultTheme,
  Button,
  TextInput as PaperTextInput,
} from "react-native-paper";
import { AntDesign, Ionicons } from "@expo/vector-icons";

// Custom components
import TextInput from "./TextInput";

// Hooks
import useAuth from "../hooks/useAuth";
import useError from "../hooks/useError";

// Serive & Utilites
import { getAuthErrorMessage } from "../services/auth-service";

type InitialValues = {
  email: string;
  password: string;
  afterSubmit?: string;
};

interface LoginFormProps {
  onSignUpPress: () => void;
}

const LoginForm = (props: LoginFormProps): JSX.Element => {
  const { login } = useAuth();
  const { setErrorMsg } = useError();
  const [showPassword, setShowPassword] = useState(false);

  const emailIcon = (
    <PaperTextInput.Icon
      name={() => <AntDesign name='user' size={24} color='black' />}
    />
  );

  const lockIcon = (
    <PaperTextInput.Icon
      name={() => <Ionicons name='lock-closed' size={24} color='black' />}
    />
  );

  const passwordIcon = (
    <PaperTextInput.Icon
      name={() => (
        <Ionicons
          name={showPassword ? "eye" : "eye-off"}
          size={24}
          color='black'
          onPress={() => setShowPassword(!showPassword)}
        />
      )}
    />
  );

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .label("email")
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().label("password").required("Password is required"),
  });

  const handleSubmit = async (values: FormikValues) => {
    setShowPassword(false);
    login(values.email, values.password)
      .catch((error) => {
        const errorMsgToDisplay = getAuthErrorMessage(error?.code);
        setErrorMsg(errorMsgToDisplay);
      });
  };

  return (
    <Formik
      initialValues={
        {
          email: "",
          password: "",
        } as InitialValues
      }
      onSubmit={handleSubmit}
      validationSchema={LoginSchema}>
      {({ handleChange, handleSubmit, errors, touched, isSubmitting }) => (
        <View style={styles.container}>
          <TextInput
            autoCompleteType='username'
            textContentType='username'
            label='Email'
            error={Boolean(touched.email && errors.email)}
            errorMsg={errors.email}
            keyboardType='email-address'
            onInput={handleChange("email")}
            theme={DefaultTheme}
            left={emailIcon}
            autoCapitalize='none'
          />
          <TextInput
            autoCompleteType='password'
            textContentType='password'
            label='Password'
            error={Boolean(touched.password && errors.password)}
            errorMsg={errors.password}
            keyboardType='default'
            secureTextEntry={!showPassword}
            onInput={handleChange("password")}
            theme={DefaultTheme}
            right={passwordIcon}
            left={lockIcon}
            autoCapitalize='none'
          />

          <Button
            mode='contained'
            loading={isSubmitting}
            onPress={handleSubmit}>
            Submit
          </Button>

          <View style={styles.row}>
            <Text> Don’t have an account? </Text>
            <TouchableOpacity onPress={props.onSignUpPress}>
              <Text style={styles.link}>Sign up</Text>
            </TouchableOpacity>
          </View>
          {errors.afterSubmit && <Text>{errors.afterSubmit}</Text>}
        </View>
      )}
    </Formik>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    margin: 40,
  },
  row: {
    flexDirection: "row",
    marginTop: 15,
  },
  link: {
    fontWeight: "bold",
  },
});
