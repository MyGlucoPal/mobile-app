import React from 'react';
import * as Yup from 'yup';
import { StyleSheet, View } from 'react-native';
import { FormikValues, Formik } from 'formik';
import {
   DefaultTheme,
   Button,
   TextInput as PaperTextInput,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

// Custom components
import TextInput from '../TextInput';

import { FoodItem } from '../../@types/meals';

type InitialValues = {
   itemName: string;
   totalCarbs?: number;
   brand: string;
   servingSize?: number;
};

interface ItemFormProps {
   onItemAdded: (item: FoodItem) => void;
}

const ItemForm = (props: ItemFormProps): JSX.Element => {
   const foodItemIcon = (
      <PaperTextInput.Icon
         name={() => <Ionicons name="pizza-outline" size={24} color="black" />}
      />
   );

   const brandIcon = (
      <PaperTextInput.Icon
         name={() => <Ionicons name="at" size={24} color="black" />}
      />
   );

   const ItemSchema = Yup.object().shape({
      itemName: Yup.string()
         .label('itemName')
         .max(50, 'Too Long!')
         .required('Item name is required'),
      totalCarbs: Yup.number()
         .label('totalCarbs')
         .min(1, 'Too Small!')
         .required('Number of carbs is required'),
      brand: Yup.string().label('brand').max(50, 'Brand name too long'),
      servingSize: Yup.number()
         .label('servingSize')
         .min(1, 'Too Small!')
         .required('Serving size is required'),
   });

   const onFormSubmit = async (values: FormikValues) => {
      const foodItem: FoodItem = {
         name: values.itemName,
         totalCarbs: parseInt(values.totalCarbs, 10),
         brand: values.brand,
         servingSize: parseInt(values.servingSize, 10),
      };
      props.onItemAdded(foodItem);
   };

   return (
      <Formik
         initialValues={
            {
               itemName: '',
               totalCarbs: 0,
               brand: '',
               servingSize: 0,
            } as InitialValues
         }
         onSubmit={(values, { resetForm }) => {
            onFormSubmit(values);
            resetForm();
         }}
         validationSchema={ItemSchema}
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
               <TextInput
                  label="Food Item Name"
                  error={Boolean(touched.itemName && errors.itemName)}
                  errorMsg={errors.itemName}
                  theme={DefaultTheme}
                  onInput={handleChange('itemName')}
                  left={foodItemIcon}
                  autoCapitalize="words"
                  value={values.itemName}
               />

               <TextInput
                  label="Brand"
                  error={Boolean(touched.brand && errors.brand)}
                  errorMsg={errors.brand}
                  theme={DefaultTheme}
                  onInput={handleChange('brand')}
                  left={brandIcon}
                  autoCapitalize="words"
                  value={values.brand}
               />

               <View style={styles.infoBoxWrapper}>
                  <TextInput
                     style={styles.smallBoxLeft}
                     label="Total Carbs"
                     error={Boolean(touched.totalCarbs && errors.totalCarbs)}
                     errorMsg={errors.totalCarbs}
                     theme={DefaultTheme}
                     onInput={handleChange('totalCarbs')}
                     autoCapitalize="words"
                     keyboardType="numeric"
                     value={values.totalCarbs || ''}
                  />

                  <TextInput
                     style={styles.smallBoxRight}
                     label="Total Servings"
                     error={Boolean(touched.servingSize && errors.servingSize)}
                     errorMsg={errors.servingSize}
                     theme={DefaultTheme}
                     onInput={handleChange('servingSize')}
                     autoCapitalize="words"
                     keyboardType="numeric"
                     value={values.servingSize || ''}
                  />
               </View>

               <Button
                  mode="contained"
                  loading={isSubmitting}
                  onPress={handleSubmit}
               >
                  Add Item
               </Button>
            </View>
         )}
      </Formik>
   );
};

export default ItemForm;

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
