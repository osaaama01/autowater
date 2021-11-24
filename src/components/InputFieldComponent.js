// React Imports
import React from 'react';

// Native Element Imports
import { StyleSheet, TextInput } from "react-native"

export const InputField = ({ placeholder, secureTextEntry = false, onChangeText, multiline = false, fontSize = 18, numberOfLines = 1 }) => {
	return (
		<TextInput
			style={[styles.TextInput, { fontSize: fontSize, height: numberOfLines === 1 ? 45 : 45 * numberOfLines }]}
			placeholder={placeholder}
			keyboardType="default"
			autoCapitalize='none'
			placeholderTextColor='#000000'
			textAlign='center'
			secureTextEntry={secureTextEntry}
			onChangeText={onChangeText}
			multiline={multiline}
			numberOfLines={numberOfLines}
		/>
	)
};

const styles = StyleSheet.create({
	TextInput:
	{
		textAlignVertical: 'top',
		backgroundColor: 'white',
		borderWidth: 1,
		borderRadius: 50,
		borderColor: 'orange',
		width: 250,
		height: 45,
		alignSelf: 'center',
		fontSize: 18,
		fontStyle: 'italic',
		color: '#000000'
	}
}
)
