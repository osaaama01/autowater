// React Imports
import React, { useEffect, useRef } from "react";
import { getLatestVersion, SET_USER } from "../redux/actions";

// Native Element Imports
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

// Code Push
import codePush from "react-native-code-push";

let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

export const Home = () => {

	const { user, version } = useSelector(state => state.userReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		if (version?.latestVersion) {
			codePush.sync({
				installMode: codePush.InstallMode.ON_NEXT_RESTART
			});
		}
		fetchLatestVersion();
		return () => {
			dispatch({
				type: SET_USER,
				payload: { isAuthenticated: false }
			});
		}
	}, [user.username]);

	const fetchLatestVersion = () => {
		dispatch(getLatestVersion(user?.id));
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
