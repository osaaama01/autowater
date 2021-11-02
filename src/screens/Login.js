import React, { useState, useEffect } from 'react';
import {
  Alert,
  Button,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput
} from 'react-native';
import { CustomButton } from '../components/CustomButtonComponent';
import { InputField } from '../components/InputFieldComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './Home';
import { Provider } from 'react-redux';
import { getPeopleList, addActivity } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import reduxStore from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const Stack = createNativeStackNavigator();

const Login = ({ navigation }) => {

  const { users } = useSelector(state => state.userReducer);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPeopleList());
  }, []);

  const onLogin = () => {
    let check = -1;
    users.map((user, index) => {
      if (user.name === username && user.password === password) {
        check = index;
      }
    });
    if (check != -1)
      navigation.navigate('Home', { users: users[check] });
    else
      Alert.alert("Info", 'Invalid username or password', [{ text: 'OK', type: 'cancel' }]);
  }

  return (
    <SafeAreaView style={styles.Container}>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Image
          style={styles.Image}
          source={require('../../src/assets/logos/logo.png')}
        />
      </View>
      <View style={{ flex: 2 }}>
        <View style={{ flex: 1, justifyContent: 'flex-start'}}>
          <View style={{ flex: 0.7, justifyContent: 'space-evenly' }}>
            <InputField placeholder="Username" onChangeText={(value) => setUsername(value)} />
            <InputField placeholder="Password" secureTextEntry={true} onChangeText={(value) => setPassword(value)} />
          </View>
          <Pressable style={{ flex: 0.4, alignSelf: 'center', justifyContent: 'flex-start' }} onPress={() => console.log("You should have remembered it")}>
            <Text style={{ color: 'black',fontWeight:'400' }}>Forgot Password?</Text>
          </Pressable>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
          <CustomButton text="LOGIN" foregroundColor="#009dff" backgroundColor="#009dff" onPress={onLogin} />
        </View>
      </View>
    </SafeAreaView>

  );
};


function MainLogin() {
  const [modalVisible, setModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const dispatch = useDispatch();

  function saveNewToDo() {
    dispatch(addActivity(taskTitle, taskDescription));
    Alert.alert("Confirmation", "Saving the new todo.. woohoo..!", [{
      onPress: () => setModalVisible(!modalVisible)
    }]);
  }

  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={
          {
            headerRight: () => (
              <Pressable
                style={
                  {
                    backgroundColor: '#009dff',
                    borderRadius: 50,
                    width: 40,
                    height: 40,
                    alignitems: 'center',
                    justifyContent: 'center',
                  }
                }
                onPress={() => {
                  setModalVisible(!modalVisible);
                }
                }
              >
                <Text style={{
                  fontSize: 30,
                  alignSelf: 'center',
                  paddingTop: 9
                }}>+</Text>
                <View style={styles.centeredView}>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                  >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <View style={{alignItems:'center'}}>
                        <Text style={{marginBottom:8,fontWeight:'500',color:'#000000'}}>  New To Do... </Text>
                        </View>
                        <View style={{alignItems:'center'}}>
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
              </Pressable>
            ),
          }} >

        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  const { Store, persistor } = reduxStore();
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainLogin />
      </PersistGate>
    </Provider>
  );
}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
  Container:
  {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  Image:
  {
    height: 120,
    width: 120,
    alignSelf: 'center',
    borderRadius: 60
  }

});

export default App;

