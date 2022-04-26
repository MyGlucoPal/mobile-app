import React, { useState } from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-paper';

// Custom components
import Checkbox from '../Checkbox';
import SlidingScaleForm from './SlidingScaleForm';

import type { Meal } from '../../@types/meals';
import type { InsulinDose } from '../../@types/insulin';

interface InsulinCardProps {
   meal: Meal;

}

const InsulinCard = (props: InsulinCardProps):JSX.Element => {
   const [isCalculatingInsulin, setIsCalculatingInsulin] = useState(false);

   const onSubmit = (insulinDose: InsulinDose) => {

   }

   return (
      <Card>
         <Card.Title title="Calculate Insulin Dose" />
         <Card.Content>
            <Checkbox
               isChecked={setIsCalculatingInsulin}
               text="Do you want to calculate your insulin dose with this meal?"
            />
            {isCalculatingInsulin && (
               <SlidingScaleForm 
                  meal={props.meal}
                  onSubmit={onSubmit}
               />
            )}
         </Card.Content>
      </Card>
   );
}

export default InsulinCard;