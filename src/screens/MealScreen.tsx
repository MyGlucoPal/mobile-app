import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import useAuth from '../hooks/useAuth';

import ItemForm from '../components/meal/ItemForm';
import FoodItemTable from '../components/meal/FoodItemTable';

import { addMeal } from '../services/meal-service';

import { FoodItem, MealType } from '../@types/meals';

const MealScreen = () => {
   const { user } = useAuth();
   const [foodItems, setFoodItems] = useState([] as FoodItem[]);
   const userId = user?.userId || '';

   const onItemAdded = (foodItem: FoodItem) => {
      setFoodItems((oldFoodItems) => [...oldFoodItems, foodItem]);
   };

   const onMealComplete = () => {
      var allCarbs = 0;
      for (let i = 0; i < foodItems.length; i++) {
         allCarbs += foodItems[i].totalCarbs;
      }

      addMeal(allCarbs, foodItems, MealType.SNACK, userId);
   };

   return (
      <View>
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
