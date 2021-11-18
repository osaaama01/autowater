// React Imports
import React, { useEffect, useRef } from "react";
import { getLatestVersion, SET_USER, SET_LATEST_VERSION } from "../redux/actions";

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

		if (!version?.latestVersion)
			fetchLatestVersion();

		if (version?.latestVersion) {
			codePush.sync({
				installMode: codePush.InstallMode.ON_NEXT_RESTART
			});
		}

		return () => {
			dispatch({
				type: SET_USER,
				payload: { user: '', id: '', isAuthenticated: false }
			});
			dispatch({
				type: SET_LATEST_VERSION,
				payload: {}
			});
		}
	}, []);

	const fetchLatestVersion = () => {
		dispatch(getLatestVersion(user?.id));
	};


	return (
		<View style={styles.body}>
			<Text style={styles.text}>
				Version {version.currentVersion}
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
