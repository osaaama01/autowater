// React Imports
import React from "react";

// Native Element Imports
import { StyleSheet, Text, View } from "react-native";

export const Home = () => {
	return (
		<View style={styles.body}>
			<Text style={styles.text}>
				Version 1.0
			</Text>
		</View>
	)

};

const styles = StyleSheet.create({
	body: {
		flex: 1,
		backgroundColor: 'red',
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		fontSize: 50,
		fontStyle: "normal",
		fontWeight: "bold",
		color: 'white',
		fontFamily: 'ShadowsIntoLight-Regular'
	}
})

export default Home;
