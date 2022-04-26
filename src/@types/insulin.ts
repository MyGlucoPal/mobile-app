import type { Timestamp } from "../@types/commons";

/**
 * Insulin dose interface
 * Note: People with `HIGH` dose level might take an insulin dose even if they don't
 * have had anything to eat. Therefore, we made `totalCarbs` optional.
 * 
 * @param totalInsulinUnits   Total units the user has to intake
 * @param bloodGlucose        Blood Glucose measurement in milligrams per decilitre (mg/dL)
 * @param doseLevel           Dose level of the user at the time
 * @param userId              User whom we are calculating the insulin dose for
 * @param createdAt           Date/Time this insulin calculation was created
 * @param totalCarbs          Optional carbs intake used to calculate the `totalInsulinUnits`
 * @param mealId              Optional meal related to this insuling dose
 * 
 */
export interface InsulinDose {
   totalInsulinUnits: number;
   bloodGlucose: number;
   doseLevel: "LOW" | "MEDIUM" | "HIGH";
   userId?: string;
   createdAt?: Timestamp;
   totalCarbs?: number;
   mealId?: string;
}