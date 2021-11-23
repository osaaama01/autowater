// React Imports
import React from 'react';

// Native Element Imports/
import { Pressable, StyleSheet, Text } from "react-native"

export const CustomButton = ({ text, foregroundColor, backgroundColor, onPress }) => {
	return (
		<Pressable
			android_ripple={{ color: foregroundColor, foreground: true }}
			style={({ pressed }) => [
				{
					backgroundColor: pressed
						? foregroundColor
						: backgroundColor
				},
				styles.wrapperCustom
			]}
			onPress={onPress}
		>
			<Text style={styles.text}>{text ? text : 'Press me'}</Text>
		</Pressable>
	)
};

const styles = StyleSheet.create({
	wrapperCustom:
	{
		justifyContent: 'center',
		alignSelf: 'center',
		marginTop: 25,
		borderRadius: 50,
		padding: 6,
		height: '18%',
		width: '80%',
	},
	text:
	{
		color: 'white',
		fontSize: 16,
		textAlign: 'center',
	},
})
