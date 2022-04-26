import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
   Button,
   Card,
   DefaultTheme,
   Modal,
   Paragraph,
   Portal,
   Title,
} from 'react-native-paper';
import * as Yup from 'yup';
import { Formik, FormikValues } from 'formik';

// Custom components
import Checkbox from '../Checkbox';
import TextInput from '../TextInput';

interface FavoriteMealModalProps {
   isVisible: boolean;
   onDismiss: () => void;
   onSetMealName: (mealName: string) => void;
}

const FavoriteMealModal = (props: FavoriteMealModalProps): JSX.Element => {
   const [inputMealName, setInputMealName] = useState('');
   const [isSavingFavoriteMeal, setIsSavingFavoriteMeal] = useState(false);

   //    const MealNameSchema = Yup.object().shape({
   //         isFavoriteMeal: Yup.boolean()
   //         .label('isFavoriteMeal'),
   //         mealName: Yup.string()
   //         .label('mealName')
   //         .max(50, 'Too Long!')
   //         .when('isFavoriteMeal', {
   //             is: true,
   //             then: Yup.string().required('Meal name is required').min(1, "Too short!")
   //         }),
   //       password: Yup.string().label('password').required('Password is required'),
   //    });

   function onSubmit() {
      props.onSetMealName(inputMealName);
   }

   function onSelectCreateMealName(isSelected: boolean) {
      setIsSavingFavoriteMeal(isSelected);
   }

   // function isMealNameValid():boolean {
   //    return inputMealName.length >= 50 || inputMealName.length < 1 && isSavingFavoriteMeal && isTextMealNameTouched
   // }

   return (
      <Portal>
         <Modal visible={props.isVisible} onDismiss={props.onDismiss}>
            <View style={styles.container}>
               <Card>
                  <Card.Title title="Save Meal" />
                  <Card.Content>
                     <Checkbox
                        isChecked={onSelectCreateMealName}
                        text="Do you want to save as favorite meal?"
                     />
                     {isSavingFavoriteMeal && (
                        <TextInput
                           label="Meal Name"
                           onInput={setInputMealName}
                           theme={DefaultTheme}
                        />
                     )}
                  </Card.Content>
                  <Card.Actions style={styles.buttonContainer}>
                     <Button
                        style={styles.button}
                        onPress={onSubmit}
                        mode="contained"
                     >
                        Submit
                     </Button>
                     <Button
                        style={styles.button}
                        onPress={() => {}}
                        mode="contained"
                     >
                        Cancel
                     </Button>
                  </Card.Actions>
               </Card>
            </View>
         </Modal>
      </Portal>
   );
};

const styles = StyleSheet.create({
   container: {
      paddingHorizontal: 30,
      marginBottom: 25,
   },
   buttonContainer: {
      alignItems: 'center',
      flexDirection: 'column',
   },
   button: {
      margin: 10,
   },
});

export default FavoriteMealModal;
