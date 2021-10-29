import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getActivitiesList } from "../redux/actions";
import { useSelector, useDispatch } from 'react-redux';

export const Home = ({ navigation, route }) => {
    const { activities } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("UseEffect running");
        dispatch(getActivitiesList());
    }, [ ]);

    return (
        <View style={styles.body}>
            {activities.map((activity,index) => {
                return(
                <View style={styles.card} key={index}>
                    <Text style={styles.text}>
                        {activity.title}
                    </Text>
                </View>
                );
            })}
        </View>
    )

};

const styles = StyleSheet.create({
    body:
    {
        flex: 1,
        backgroundColor: '#6efff5',
        alignItems: 'center',
    },
    card:
    {
        height: 80,
        width: 200,
        backgroundColor: '#fcb944',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        borderWidth: 1,
        marginTop: 20
    },
    text: {
        fontSize: 20,
        fontStyle: "normal",
        color: '#000000',
        fontFamily: 'ShadowsIntoLight-Regular'
    }

})
