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

// TODO(nloewenthal): REMOVE
import InfoBox from "../components/InfoBox";

type InitialValues = {
    mealName: string;
    itemName: string;
    totalCarbs?: number;
    brand: string;
    servingSize?: number;
}

interface MealFormProps {
    onSubmitPress: () => void;
}

const MealForm = (props: MealFormProps): JSX.Element => {
    // Do I need to do any auth?? dont think so...
    //  Additionally, should remove any imports at top

    // Create any icons...  Note, may not want any...
    /*  TODO(nloewenthal): Change the layout of the input boxes
            - Move the carbs/serving next to serving size
            - Make these 2 boxes smaller
    */

    /*  TOOD(nloewenthal): 
            - Possibly remove the icons, can be just temporary
            - Test the Yup input verification
            - Remove any imports not in use
    */

    /*  TDODO(nloewenthal):
            - Deal with submission - Work with Carlos
    */

    const mealIcon = (
        <PaperTextInput.Icon
          name={() => <Ionicons name="fast-food-outline" size={24} color="black " />}
        />
    );

    const foodItemIcon = (
        <PaperTextInput.Icon
          name={() => <Ionicons name="pizza-outline" size={24} color="black " />}
        />
    );

    const carbsIcon = (
        <PaperTextInput.Icon
          name={() => <Ionicons name="flame-outline" size={24} color="black" />}
        />
    );

    const brandIcon = (
        <PaperTextInput.Icon
          name={() => <Ionicons name="at" size={24} color="black" />}
        />
    );

    const servingIcon = (
        <PaperTextInput.Icon
          name={() => <Ionicons name="cafe-outline" size={24} color="black" />}
        />
    );

    const MealSchema = Yup.object().shape({
        mealName: Yup.string()
            .label("mealName")
            .max(50, "Too Long!")
            .required("Meal name is required"),
        itemName: Yup.string()
            .label("itemName")
            // .min(1, "Too Short!")
            .max(50, "Too Long!")
            .required("Item name is required"),
        totalCarbs: Yup.number()
            .label("totalCarbs")
            .min(1, "Too Small!")
            .required("Number of carbs is required"),
        brand: Yup.string()
            .label("brand")
            .max(50, "Brand name too long"),
        servingSize: Yup.number()
            .label("servingSize")
            .min(1, "Too Small!")
            .required("Serving size is required")
    });

    const handleSubmit = async (values: FormikValues) => {
        const { setErrors, setSubmitting } = values;
        
    }

    return (
        <Formik
            initialValues = {
                {
                    mealName: "",
                    itemName: "",
                    totalCarbs: 0,
                    brand: "",
                    servingSize: 0
                } as InitialValues
            }
            onSubmit = {handleSubmit}
            validationSchema = {MealSchema}
        >

            {({ handleChange, handleSubmit, errors, touched, isSubmitting }) => (
                <View style={styles.container}>
                    <TextInput
                        label="Meal Name"
                        error={Boolean(touched.mealName && errors.mealName)}
                        errorMsg={errors.mealName}
                        theme={DefaultTheme}
                        onInput={handleChange("mealName")}
                        left={mealIcon}
                        autoCapitalize="words"
                    />

                    <TextInput
                        label="Food Item Name"
                        error={Boolean(touched.itemName && errors.itemName)}
                        errorMsg={errors.itemName}
                        theme={DefaultTheme}
                        onInput={handleChange("itemName")}
                        left={foodItemIcon}
                        autoCapitalize="words"
                    />

                    <TextInput
                        label="Brand"
                        error={Boolean(touched.brand && errors.brand)}
                        errorMsg={errors.brand}
                        theme={DefaultTheme}
                        onInput={handleChange("brand")}
                        left={brandIcon}
                        autoCapitalize="words"
                    />

                    <View style={styles.infoBoxWrapper}>
                        <TextInput style={styles.smallBoxLeft}
                            label="Total Carbs"
                            error={Boolean(touched.totalCarbs && errors.totalCarbs)}
                            errorMsg={errors.totalCarbs}
                            theme={DefaultTheme}
                            onInput={handleChange("totalCarbs")}
                            // left={carbsIcon}
                            autoCapitalize="words"
                            keyboardType="numeric"
                        />

                        <TextInput style={styles.smallBoxRight}
                            label="Total Servings"
                            error={Boolean(touched.servingSize && errors.servingSize)}
                            errorMsg={errors.servingSize}
                            theme={DefaultTheme}
                            onInput={handleChange("servingSize")}
                            // left={servingIcon}
                            autoCapitalize="words"
                            keyboardType="numeric"
                        />
                    </View>
                </View>
            )}
        </Formik>
    );
};

export default MealForm;

const styles = StyleSheet.create({
    container: {
      margin: 40,
    },
    smallBoxLeft: {
        width: "90%",
    },
    smallBoxRight: {
        width: "90%",
        alignSelf: "flex-end",
    },
    infoBoxWrapper: {
        flexDirection: "row",
        width: "50%",
    },
});
  