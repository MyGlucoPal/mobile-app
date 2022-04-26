import React, { useState } from 'react';
import { View, StyleSheet} from 'react-native';
import { Button, Card, DefaultTheme } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';


// Custom components
import Checkbox from '../Checkbox';
import SlidingScaleForm from './SlidingScaleForm';
import Dropdown from '../Dropdown';

import { addInsulinDose, calculateInsulinDosage } from '../../services/insulin-service';

import type { Meal } from '../../@types/meals';
import type { InsulinDose } from '../../@types/insulin';
import TextInput from '../TextInput';


interface InsulinCardProps {
   meal: Meal;
}

const InsulinCard = (props: InsulinCardProps):JSX.Element => {
   // const navigation = useNavigation();
   const [isCalculatingInsulin, setIsCalculatingInsulin] = useState(false);
   // const [insulinDose, setInsulinDose] = useState({} as InsulinDose);
   const [doseLevel, setDoseLevel] = useState('');
   const [glucoseLevel, setGlucoseLevel] = useState('');
   const [totalCarbs, setTotalCarbs] = useState('');


   const onSubmit = async () => {
      // We need to check how do we send them back to the main screen, aka re-route them
      console.log('creating insulin....')
      if (isCalculatingInsulin){
         const insulinUnits = calculateInsulinDosage("LOW", parseInt(totalCarbs, 10), parseInt(glucoseLevel, 10));
         const insulinDose: InsulinDose = {
            bloodGlucose: parseInt(glucoseLevel, 10),
            doseLevel: "LOW",
            totalCarbs: parseInt(totalCarbs, 10),
            totalInsulinUnits: insulinUnits,
         };
         await addInsulinDose(insulinDose);
         alert("Insulin Dose: " + insulinUnits);
      } 
      // Send them to their user screen
      routeToUserScreen();
   }

   const onCancel = () => {
      // Send them to the user screen
      routeToUserScreen();
   }

   const routeToUserScreen = () => {
      // navigation.goBack();
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
               // <SlidingScaleForm 
               //    meal={props.meal}
               //    onSubmit={onSubmit}
               // />
               <React.Fragment>
                  <Dropdown
                     options={['LOW', 'MEDIUM', 'HIGH']}
                     label="Dose Level"
                     onSelection={(newVal: string) => setDoseLevel(newVal)}
                  />
                  <TextInput
                     label="Glucose Level"
                     value={glucoseLevel}
                     // onChangeText={(newVal: string) => setGlucoseLevel(newVal)}
                     onInput={(newVal: string) => setGlucoseLevel(newVal)}
                     theme={DefaultTheme}
                  />
                  <TextInput
                     label="Total Carbs"
                     value={totalCarbs}
                     // onChangeText={(newVal: string) => setGlucoseLevel(newVal)}
                     onInput={(newVal: string) => setTotalCarbs(newVal)}
                     theme={DefaultTheme}
                  />
               </React.Fragment>
            )}
         </Card.Content>
         <Card.Actions style={styles.buttonContainer}>
         <Button
               style={styles.button}
               onPress={async () => await onSubmit()}
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
   );
}

export default InsulinCard;

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