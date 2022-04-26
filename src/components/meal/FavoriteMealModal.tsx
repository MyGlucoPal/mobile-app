import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
    ActivityIndicator,
   Button,
   Card,
   Colors,
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

// Types & interfaces
import type { FoodItem, Meal, MealType } from '../../@types/meals';

import { addMeal } from '../../services/meal-service';

interface FavoriteMealModalProps {
   isVisible: boolean;
   onDismiss: () => void;
   totalCarbs: number;
   foodItems: FoodItem[]
   mealType: MealType;
   userId: string;
}

const FavoriteMealModal = (props: FavoriteMealModalProps): JSX.Element => {
   const [inputMealName, setInputMealName] = useState('');
   const [isSavingFavoriteMeal, setIsSavingFavoriteMeal] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

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

   const onSubmitMeal = () => {
      addMeal(props.totalCarbs, props.foodItems, props.mealType, props.userId, inputMealName);
      // We want to send the meal data to the parent component, or send it here directly to firebase
   }

   const onSelectCreateMealName = (isSelected: boolean) => {
      setIsSavingFavoriteMeal(isSelected);
   }

   return (
      <Portal>
         <Modal visible={props.isVisible} onDismiss={props.onDismiss}>
            { !isLoading &&
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
                           onPress={onSubmitMeal}
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
            }
            {isLoading && 
               <ActivityIndicator animating={true} color={Colors.purple800} />
            }
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
