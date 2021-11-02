import React, { useEffect } from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { getActivitiesList } from "../redux/actions";
import { useSelector, useDispatch } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';

export const HomeScreen = ({ navigation, route }) => {
    const { activities } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log("UseEffect running");
        dispatch(getActivitiesList());
    }, []);

    return (
        <View style={styles.body}>
            <FlatList
                data={activities}
                keyExtractor={(item,index) => String(index)}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                    return(<TouchableWithoutFeedback onPress={() => Alert.alert(item.title,item.description)}>
                        <View style={styles.card}>
                            <Text style={styles.text}>{item.title}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    )}}
            />
        </View>
    )

};

export const Logout = ({navigation}) =>
{
    useEffect(() => {
        navigation.navigate('Login', { users: [] });
    }, []);
   return(
       <View>

       </View>
   )
}


export function Home()
{
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator initialRouteName="HomeScreen" screenOptions={{headerShown: false}}>
          <Drawer.Screen name="HomeScreen" component={HomeScreen} />
          <Drawer.Screen name="Logout" component={Logout} />
        </Drawer.Navigator>
    )
  }

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
