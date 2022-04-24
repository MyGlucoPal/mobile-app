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

//import { SlidingScaleTable } from '../../@types/insulin';

import { InsulinDose } from '../../@types/insulin';
import { Meal } from '../../@types/meals';
import Dropdown from '../Dropdown';

type InitialValues = {
   totalInsulinUnits?: number;
   bloodGlucose?: number;
   doseLevel: string;
   totalCarbs?: number;
};

interface SlidingScaleFormProps {
   onItemAdded: (item: InsulinDose) => void;
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

   const handleSubmit = async (values: FormikValues) => {
      const insulinDose: InsulinDose = {
         bloodGlucose: parseInt(values.bloodGlucose, 10),
         doseLevel: values.doseLevel,
         totalCarbs: parseInt(values.totalCarbs, 10),
         totalInsulinUnits: parseInt(values.totalInsulinUnits, 10),
      };
      props.onItemAdded(insulinDose);
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
         onSubmit={(values, { resetForm }) => {
            handleSubmit(values);
            resetForm();
         }}
         validationSchema={ScaleSchema}
      >
         {({
            handleChange,
            handleSubmit,
            errors,
            touched,
            isSubmitting,
            values,
         }) => (
            <View style={styles.container}>
               <Dropdown
                  options={['LOW', 'MEDIUM', 'HIGH']}
                  label="Dose Level"
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
                  //left={doseIcon}
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
