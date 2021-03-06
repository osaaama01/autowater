import React, { useEffect, useState, useRef } from "react";
import {
    Alert, FlatList, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View,
    Modal,
    ActivityIndicator
} from "react-native";
import { getActivitiesList, addActivity, removeActivity } from "../../redux/actions";
import { useSelector, useDispatch } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { InputField } from '../../components/InputFieldComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export const HomeScreen = ({ route }) => {


    let { activities } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const onDelete = (id) => {
        // alert("deleted");
        dispatch(removeActivity(id));
    }

    useEffect(() => {
        dispatch(getActivitiesList());
    }, []);

    return (
        <View style={styles.body}>
            <FlatList
                data={activities}
                keyExtractor={(item, index) => String(index)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Pressable style={{ flex: 0.9 }} onPress={() => Alert.alert(item.title, item.description)}>
                                <View style={styles.card}>
                                    <Text style={styles.text}>{item.title}</Text>
                                </View>
                            </Pressable>


                            <Pressable style={{ flex: 0.1 }} onPress={() => onDelete(item.id)}>
                                <View style={[styles.card, { backgroundColor: 'red' }]}>
                                    <Text style={styles.text}>
                                        <Icon name="delete" size={25} color="black" /></Text>
                                </View>
                            </Pressable>
                        </View>
                    )
                }}
            />
        </View>
    )

};

export const Logout = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const isMountedVal = useRef(true);

    useEffect(() => {
        // console.log("UseEffect running");
        if (isMountedVal.current) {
            setTimeout(() => {
                // console.log("Call Back running");
                setIsLoading(false);
            }, 1000);
            // console.log("ComponentDidMount");
            isMountedVal.current = false;
        }

        return () => {
            // console.log("Unmounting");
            navigation.navigate('Login', { users: [] });
        }

    });

    if (isLoading)
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
                <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: 'bold' }}>Logging out...</Text>
            </View>
        );
    else {
        return null;
    }
}

export function Home({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const { activities } = useSelector(state => state.userReducer);

    const Drawer = createDrawerNavigator();
    const dispatch = useDispatch();


    function saveNewToDo() {
        dispatch(addActivity(activities.length, taskTitle, taskDescription));
        setModalVisible(!modalVisible);
        // Alert.alert("Confirmation", "Saving the new todo.. woohoo..!", [{
        //     onPress: () => setModalVisible(!modalVisible)
        // }]);
    }

    return (
        <Drawer.Navigator initialRouteName="HomeScreen" screenOptions={{
            headerStyle: {
                backgroundColor: '#fff',
            },
        }}>
            <Drawer.Screen name="HomeScreen" component={HomeScreen} options={
                {
                    title: "Home",
                    drawerIcon: ({ size }) => (
                        <Icon
                            name="home"
                            size={size}
                        />
                    ),
                    headerRight: () => (
                        <View style={{flexDirection:'row-reverse',alignItems:'center'}}>
                            <Pressable
                                style={
                                    {
                                        backgroundColor: '#009dff',
                                        borderRadius: 50,
                                        width: 20,
                                        height: 40,
                                        alignitems: 'center',
                                        justifyContent: 'center',
                                        marginRight: 4,
                                        flex:0.2
                                    }
                                }
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }
                                }
                            >
                                <Text style={{
                                    alignSelf: 'center',
                                    alignItems: 'center',
                                }}><Icon
                                        name="lead-pencil"
                                        size={30}
                                        color={'black'}
                                    /></Text>
                            </Pressable>
                            <View style={styles.centeredView}>
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={modalVisible}
                                >
                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>
                                            <View style={{ alignItems: 'center' }}>
                                                <Text style={{ marginBottom: 8, fontWeight: '500', color: '#000000' }}>  New To Do... </Text>
                                            </View>
                                            <View style={{ alignItems: 'center' }}>
                                                <InputField placeholder="Title of task" onChangeText={(value) => setTaskTitle(value)} fontSize={15} />
                                                <InputField placeholder="Description of task" onChangeText={(value) => setTaskDescription(value)} multiline={true} fontSize={15} numberOfLines={5} />
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Pressable
                                                    style={[styles.button]}
                                                    onPress={saveNewToDo}
                                                >
                                                    <Text style={styles.textStyle}>Save</Text>
                                                </Pressable>

                                                <Pressable
                                                    style={[styles.button]}
                                                    onPress={() => setModalVisible(!modalVisible)}
                                                >
                                                    <Text style={styles.textStyle}>Exit</Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                    </View>
                                </Modal>
                            </View>
                        </View>

                    )
                }} />
            <Drawer.Screen name="Logout" component={Logout} options={{
                headerShown: false,
                drawerIcon: ({ size, color }) => (
                    <Icon
                        name="logout"
                        size={size}
                    />
                ),
            }} />
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    body:
    {
        flex: 1,
        backgroundColor: '#303fcf',
    },
    card:
    {
        height: 80,
        backgroundColor: '#18dfe7',
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
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        flex:1,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        width: 70,
        height: 40,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 5,
        marginTop: 10,
        backgroundColor: "#2196F3",
    },
    buttonOpen: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    container: {
        flex: 1,
        justifyContent: "center"
    }

})
