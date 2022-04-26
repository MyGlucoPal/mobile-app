

/**
 * Helper functions that calculates the total insulin units that a person needs to take 
 * depending on their current paramters (total carbs/blood glucose/ dose level (low/medium/high))
 * @param totalInsulinUnits   Total units the user has to intake
 * @param bloodGlucose        Blood Glucose measurement in milligrams per decilitre (mg/dL)
 * @param doseLevel           Dose level of the user at the time
 * @param totalCarbs          Carbs intake used to calculate the insulin dosage
 * @returns the total insulin units that user would need to take given the carb intake, and 
 *          current gluce and dose level
 */
function calculateInsulinDosage(doseLevel: string, totalCarbs: number, bloodGlucose: number): number {
    const bs_min = [70, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375, 400, 425, 450, 475, 500, 525, 550, 575, 600];
    const bs_insulin_low = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10]

    var totalInsulinDose = 0;

    // Correction factor
    for (var i = 1; i < bs_min.length; i++) {
        if (bloodGlucose < bs_min[i]) {
            totalInsulinDose += bs_insulin_low[i - 1];
        } else {
            totalInsulinDose += bs_insulin_low[i];
        }
    }

    // Insulin to carb ratio
    totalInsulinDose += (totalCarbs / 20);


    //  bs_min = {70, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375, 400, 425, 450, 475, 500, 525, 550, 575, 600}
    //  bs_max = {124, 149, 174, 199, 224, 249, 274, 299, 324, 349, 374, 399, 424, 449, 474, 499, 524, 549, 574, 599, -1}   // NOTE: -1 is because there is no maximum value, this range is 600+
    //  bs_insulin = {0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10}
   return totalInsulinDose;
}

export {
   calculateInsulinDosage
};