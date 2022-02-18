import type { Timestamp } from "../@types/commons";

export interface Meal {
    totalCarbs: number;
    foodItems: FoodItem[];
    totalTimesEaten: number;
    dateCreated: Timestamp;
    dateLastModified: Timestamp;
    mealType: MealType;
}

export enum MealType {
    SNACK = "SNACK",
    BREAKFAST = "BREAKFAST",
    LUNCH = "LUNCH",
    DINNER = "DINNER",
}

export interface FoodItem {
    name: string;
    totalCarbs: number;
    brand: string;
    servingSize: number;
}