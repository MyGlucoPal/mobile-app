import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';

import type { InsulinDose } from '../../@types/insulin';

interface SlidingScaleFormProps {
   insulinDose: InsulinDose[];
}

const SlidingScaleTable = (props: SlidingScaleFormProps): JSX.Element => {
   const rows = props.insulinDose.map((insulin: InsulinDose) => {
      return (
         <DataTable.Row key={insulin.doseLevel}>
            <DataTable.Cell style={styles.doseLevel}>
               {insulin.doseLevel}
            </DataTable.Cell>
            <DataTable.Cell style={styles.title}>
               {insulin.bloodGlucose}
            </DataTable.Cell>
            <DataTable.Cell style={styles.title}>
               {insulin.totalCarbs}
            </DataTable.Cell>
            <DataTable.Cell style={styles.title}>
               {insulin.totalInsulinUnits}
            </DataTable.Cell>
         </DataTable.Row>
      );
   });

   return (
      <View style={styles.tableView}>
         <DataTable.Header>
            <DataTable.Title style={styles.doseLevel}>
               Dose level
            </DataTable.Title>
            <DataTable.Title style={styles.title}>
               Blood Glucose
            </DataTable.Title>
            <DataTable.Title style={styles.title}>Carbs(g)</DataTable.Title>
            <DataTable.Title style={styles.title}>
               Total Insulin Units
            </DataTable.Title>
         </DataTable.Header>
         {rows}
      </View>
   );
};

const styles = StyleSheet.create({
   tableView: {
      flex: 7,
      alignItems: 'stretch',
   },
   screen: {
      flex: 1,
   },
   title: {
      flex: 3,
      justifyContent: 'center',
   },
   doseLevel: {
      flex: 5,
   },
});

export default SlidingScaleTable;
