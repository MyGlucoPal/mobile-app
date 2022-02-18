import { collection, addDoc} from 'firebase/firestore';

import { db } from '../Firebase-config';
import { getCurrentTimestamp } from './helpers';

// Types & Interfaces
import type { FoodItem, Meal, MealType } from '../@types/meals';
import type { Timestamp } from '../@types/commons';
import { FirebaseError } from 'firebase/app';

/**
 * Function that creates a `Meal` and sends it to the backend. 
 * 
 * @param totalCarbs    total carbohydrates in this meal
 * @param foodItems     list of `FoodItem` objects that compose the meal
 * @param mealType      the type of meal 
 * @param userId        string ID to attach with the meal to identify the user with the meal
 */
export const addMeal = async(totalCarbs: number, foodItems: FoodItem[], mealType: MealType, userId: string) => {
    const now = getCurrentTimestamp();
    const meal = createMeal(totalCarbs, foodItems, mealType, 1, now, now);
    try {
        // Add the meal data into the backend/firebase
        const mealDocRef = collection(db, 'meals')
        const response = await addDoc(mealDocRef, {...meal, userId});
        console.log("Successfully added meal to DB, with id `" + response.id + "`");
    } catch (err){
        // TODO: Call some function to display the error in the app instead of just logging it
        if (err instanceof FirebaseError){
            console.log(err.code);
            console.log(err.message);
        } else{
            console.log("Error trying to add meal to DB");
        }
    }
}

/**
 * Helper functions that creates a `Meal` object from the given arguments.
 * 
 * @param totalCarbs        total carbs in the meal
 * @param foodItems         list of `foodItem` that componse this meal
 * @param mealType          type of meal (snack/breakfast/lunch/...)
 * @param totalTimesEaten   optional total ammount this meal has been used by the user, defaults to 1
 * @param dateCreated       optional timestamp the meal was created at, defaults to `now`
 * @param dateLastModified  optional timestamp the meal was last updated at, defautls to `now`
 * @returns 
 */
function createMeal(totalCarbs: number, foodItems: FoodItem[], mealType: MealType,
    totalTimesEaten?: number, dateCreated?: Timestamp, dateLastModified?: Timestamp ): Meal{
    const now = getCurrentTimestamp();
    return {
        totalCarbs: totalCarbs,
        foodItems: foodItems, 
        totalTimesEaten: totalTimesEaten || 1,
        mealType: mealType,
        dateCreated: dateCreated || now,
        dateLastModified: dateLastModified || now
    };
}