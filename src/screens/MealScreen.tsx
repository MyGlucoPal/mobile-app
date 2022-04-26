import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

import useAuth from '../hooks/useAuth';

import ItemForm from '../components/meal/ItemForm';
import FoodItemTable from '../components/meal/FoodItemTable';
import FavoriteMealModal from '../components/meal/FavoriteMealModal';

import { addMeal } from '../services/meal-service';

import { FoodItem, MealType } from '../@types/meals';

const MealScreen = () => {
   const { user } = useAuth();
   const [foodItems, setFoodItems] = useState([] as FoodItem[]);
   const [favoriteMealModalVisible, setFavoriteMealModalVisible] =
      useState(false);
   const [totalCarbs, setTotalCarbs] = useState(0);
   const [didSubmitMeal, setDidSubmitMeal] = useState(false);

   const onItemAdded = (foodItem: FoodItem) => {
      setFoodItems((oldFoodItems) => [...oldFoodItems, foodItem]);
   };

   const onMealComplete = () => {
      var allCarbs = 0, totalItems = 0;
      for (let i = 0; i < foodItems.length; i++) {
         allCarbs += foodItems[i].totalCarbs * foodItems[i].servingSize;
         totalItems++;
      }
      setTotalCarbs(allCarbs);
      setFavoriteMealModalVisible(true);
      // addMeal(allCarbs, foodItems, MealType.SNACK, user?.userId || '');
   };

   return (
      <View>
         <FavoriteMealModal
            isVisible={favoriteMealModalVisible}
            onDismiss={() => setFavoriteMealModalVisible(false)}
            totalCarbs={totalCarbs}
            foodItems={foodItems}
            mealType={MealType.SNACK}
            userId={user?.userId || ''}
         />

         <ItemForm
            onItemAdded={(foodItem: FoodItem) => {
               onItemAdded(foodItem);
            }}
         />
         <FoodItemTable foodItems={foodItems} />

         <Button onPress={onMealComplete}>Register Meal</Button>
      </View>
   );
};

export default MealScreen;
