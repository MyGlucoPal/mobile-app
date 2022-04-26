import React from 'react';
import * as Yup from 'yup';
import { StyleSheet, View, Picker } from 'react-native';
import { FormikValues, Formik } from 'formik';
import {
   DefaultTheme,
   Button,
   TextInput as PaperTextInput,
} from 'react-native-paper';

import { Entypo, Fontisto } from '@expo/vector-icons';

// Custom components
import TextInput from '../TextInput';
import Dropdown from '../Dropdown';

// Types
import { InsulinDose } from '../../@types/insulin';
import { Meal } from '../../@types/meals';

type InitialValues = {
   doseLevel: string;
   totalInsulinUnits?: number;
   bloodGlucose: number;
   totalCarbs?: number;
};

interface SlidingScaleFormProps {
   onSubmit: (insulinDose: InsulinDose) => void;
   meal?: Meal;
}

const SlidingScaleForm = (props: SlidingScaleFormProps): JSX.Element => {
   const bloodIcon = (
      <PaperTextInput.Icon
         name={() => <Fontisto name="blood" size={24} color="red" />}
      />
   );

   const doseIcon = (
      <PaperTextInput.Icon
         name={() => <Entypo name="select-arrows" size={24} color="black" />}
      />
   );

   const ScaleSchema = Yup.object().shape({
      bloodGlucose: Yup.number()
         .label('bloodGlucose')
         .max(400, 'Maximum glucose level is 400mg')
         .required('Blood Glucose Level is required'),
      doseLevel: Yup.string()
         .label('doseLevel')
         .required('Dose Level is required'),
      totalCarbs: Yup.number()
         .label('totalCarbs')
         .min(0, "Total carbs can't be less than 0"),
   });

   const handleSubmit = (values: FormikValues) => {
      console.log('submitting in the sliding form')
      const insulinDose: InsulinDose = {
         bloodGlucose: parseInt(values.bloodGlucose, 10),
         doseLevel: values.doseLevel,
         totalCarbs: parseInt(values.totalCarbs, 10),
         totalInsulinUnits: parseInt(values.totalInsulinUnits, 10),
      };
      props.onSubmit(insulinDose);
   };

   return (
      <Formik
         initialValues={
            {
               bloodGlucose: 0,
               doseLevel: '',
               totalCarbs: props.meal?.totalCarbs || 0,
            } as InitialValues
         }
         onSubmit={handleSubmit}
         validationSchema={ScaleSchema}
      >
         {({
            handleChange,
            handleSubmit,
            errors,
            touched,
            isSubmitting,
            values
         }) => (
            <View style={styles.container}>
               <Dropdown
                  options={['LOW', 'MEDIUM', 'HIGH']}
                  label="Dose Level"
                  onSelection={handleChange('doseLevel')}
               />
               <TextInput
                  label="Glucose Level"
                  error={Boolean(touched.bloodGlucose && errors.bloodGlucose)}
                  errorMsg={errors.bloodGlucose}
                  theme={DefaultTheme}
                  onInput={handleChange('bloodGlucose')}
                  left={bloodIcon}
                  autoCapitalize="words"
               />

               <TextInput
                  label="Total Carbohydrates"
                  error={Boolean(touched.totalCarbs && errors.totalCarbs)}
                  errorMsg={errors.totalCarbs}
                  theme={DefaultTheme}
                  onInput={handleChange('totalCarbs')}
                  autoCapitalize="words"
                  defaultValue={props.meal?.totalCarbs.toString() || '0'}
               />

               <Button
                  mode="contained"
                  loading={isSubmitting}
                  onPress={handleSubmit}
               >
                  Add Insulin Stats
               </Button>
            </View>
         )}
      </Formik>
   );
};

export default SlidingScaleForm;

const styles = StyleSheet.create({
   container: {
      margin: 40,
   },
   smallBoxLeft: {
      width: '90%',
   },
   smallBoxRight: {
      width: '90%',
      alignSelf: 'flex-end',
   },
   infoBoxWrapper: {
      flexDirection: 'row',
      width: '50%',
   },
});
