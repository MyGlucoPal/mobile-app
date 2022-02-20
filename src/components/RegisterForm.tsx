import React, { useState } from "react";
import * as Yup from "yup";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FormikValues, Formik } from "formik";
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
import useIsMountedRef from "../hooks/useIsMountedRef";
import useError from "../hooks/useError";

// Services & Utilities
import { getAuthErrorMessage } from "../services/auth-service";


type InitialValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  afterSubmit?: string;
};

interface RegisterFormProps {
  onLoginPress: () => void;
}

const RegisterForm = (props: RegisterFormProps): JSX.Element => {
  const isMountedRef = useIsMountedRef();
  const { register } = useAuth();
  const { setErrorMsg } = useError()

  const [showPassword, setShowPassword] = useState(false);

  const userIcon = (
    <PaperTextInput.Icon
      name={() => <AntDesign name="user" size={24} color="black" />}
    />
  );

  const lockIcon = (
    <PaperTextInput.Icon
      name={() => <Ionicons name="lock-closed" size={24} color="black" />}
    />
  );

  const passwordIcon = (
    <PaperTextInput.Icon
      name={() => (
        <Ionicons
          name={showPassword ? "eye" : "eye-off"}
          size={24}
          color="black"
          onPress={() => setShowPassword(!showPassword)}
        />
      )}
    />
  );
  const emailIcon = (
    <PaperTextInput.Icon
      name={() => <Ionicons name="at" size={24} color="black" />}
    />
  );

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .label("firstName")
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name required"),
    lastName: Yup.string()
      .label("lastName")
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Last name required"),
    email: Yup.string()
      .label("email")
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .label("password")
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long."),
  });

  const handleSubmit = async (values: FormikValues) => {
    setShowPassword(false);
    register(values.email, values.password, values.firstName, values.lastName)
      .catch(error => {
        const errorMsgToDisplay = getAuthErrorMessage(error?.code);
        setErrorMsg(errorMsgToDisplay);
      })
  };

  return (
    <Formik
      initialValues={
        {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        } as InitialValues
      }
      onSubmit={handleSubmit}
      validationSchema={RegisterSchema}
    >
      {({ handleChange, handleSubmit, errors, touched, isSubmitting }) => (
        <View style={styles.container}>
          <TextInput
            label="First name"
            error={Boolean(touched.firstName && errors.firstName)}
            errorMsg={errors.firstName}
            theme={DefaultTheme}
            onInput={handleChange("firstName")}
            left={userIcon}
            autoCapitalize="words"
          />

          <TextInput
            label="Last name"
            error={Boolean(touched.lastName && errors.lastName)}
            errorMsg={errors.lastName}
            theme={DefaultTheme}
            onInput={handleChange("lastName")}
            left={userIcon}
            autoCapitalize="words"
          />

          <TextInput
            autoCompleteType="username"
            textContentType="username"
            label="Email"
            error={Boolean(touched.email && errors.email)}
            errorMsg={errors.email}
            keyboardType="email-address"
            onInput={handleChange("email")}
            theme={DefaultTheme}
            left={emailIcon}
            autoCapitalize="none"
          />

          <TextInput
            autoCompleteType="password"
            textContentType="password"
            label="Password"
            error={Boolean(touched.password && errors.password)}
            errorMsg={errors.password}
            keyboardType="default"
            secureTextEntry={!showPassword}
            onInput={handleChange("password")}
            theme={DefaultTheme}
            right={passwordIcon}
            left = {lockIcon}
            autoCapitalize="none"
          />

          <Button
            mode="contained"
            loading={isSubmitting}
            onPress={handleSubmit}
          >
            Register
          </Button>

          <View style={styles.row}>
            <Text> Have an account already? </Text>
            <TouchableOpacity onPress={props.onLoginPress}>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>

          {errors.afterSubmit && <Text>{errors.afterSubmit}</Text>}
        </View>
      )}
    </Formik>
  );
};

export default RegisterForm;

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
