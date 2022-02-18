import React from "react"
import { View, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";

import type { FoodItem } from "../../@types/meals";

interface FoodItemTableProps {
    foodItems: FoodItem[]
}

const FoodItemTable = (props:FoodItemTableProps):JSX.Element => { 

    const rows = props.foodItems.map((food: FoodItem) => {
        return (
            <DataTable.Row key={food.name}>
                <DataTable.Cell style={styles.foodName}>
                    {food.name}
                </DataTable.Cell>
                <DataTable.Cell style={styles.title}>
                    {food.totalCarbs}
                </DataTable.Cell>
                <DataTable.Cell style={styles.title}>
                    {food.servingSize}
                </DataTable.Cell>
            </DataTable.Row>
        );
    })

    return (
        <View style={styles.tableView}>
            <DataTable.Header>
                <DataTable.Title style={styles.foodName}>Food Item</DataTable.Title>
                <DataTable.Title style={styles.title}>Carbs(g)</DataTable.Title>
                <DataTable.Title style={styles.title}>Servings</DataTable.Title>
            </DataTable.Header>
            {rows}
        </View>
    );
}

const styles = StyleSheet.create({
	tableView: {
		flex: 7,
		alignItems: "stretch",
	},
	screen: {
		flex: 1,
	},
	title: {
		flex: 3,
		justifyContent: "center",
	},
	foodName: {
		flex: 5,
	},
});

export default FoodItemTable;
