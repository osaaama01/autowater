// React Imports
import React, { useEffect, useRef } from "react";
import { getLatestVersion, SET_LATEST_VERSION, SET_USER } from "../redux/actions";

// Native Element Imports
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

// Code Push
import codePush from "react-native-code-push";

let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

export const Home = () => {

	const { user } = useSelector(state => state.userReducer);
	const dispatch = useDispatch();
	const API_LATEST_VERSION = 'http://34.124.242.175:3000/api/v1.0/users/{userid}/version';

	useEffect(() => {
		fetchLatestVersion();
		return () => {
			dispatch({
				type: SET_USER,
				payload: { name: '', id: '', isAuthenticated: false }
			});
		}
	}, [user]);

	const fetchLatestVersion = () => {
		if (user?.id) {
			fetch(
				API_LATEST_VERSION.replace('{userid}', user.id),
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					}
				})
				.then(result => result.json())
				.then((data) => {
					if (data?.data?.latestVersion) {
						codePush.sync({
							installMode: codePush.InstallMode.ON_NEXT_RESTART
						});
					}
				},
					() => {
						throw new Error("API POST call failed.")
					}
				).catch((err) => console.log(err));
		}
	};


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

export default codePush(codePushOptions)(Home);
