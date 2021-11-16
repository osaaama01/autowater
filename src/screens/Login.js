// React Imports
import React, { useState, useEffect } from 'react';

// Native Element Imports
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// Store Imports
import { signIn } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';

// Components Imports
import { CustomButton } from '../components/CustomButtonComponent';
import { InputField } from '../components/InputFieldComponent';

const Login = ({ navigation }) => {

  const { user } = useSelector(state => state.userReducer);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  // Authenticate User
  const onLogin = () => {
    if (username && password) {
      dispatch(signIn({ username, password }))
      if (user?.isAuthenticated) {
        console.log(user);
        navigation.navigate('Home');
      }
      else
        Alert.alert("Info", 'Invalid username or password', [{ text: 'OK', type: 'cancel' }]);
    }
  }

  return (
    <SafeAreaView style={styles.Container}>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Image
          style={styles.Image}
          source={require('../../assets/logos/logo.png')}
        />
      </View>
      <View style={{ flex: 2 }}>
        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
          <View style={{ flex: 0.7, justifyContent: 'space-evenly' }}>
            <InputField placeholder="Username" onChangeText={(value) => setUsername(value)} />
            <InputField placeholder="Password" secureTextEntry={true} onChangeText={(value) => setPassword(value)} />
          </View>
          <Pressable style={{ flex: 0.4, alignSelf: 'center', justifyContent: 'flex-start' }} onPress={() => console.log("You should have remembered it")}>
            <Text style={{ color: 'black', fontWeight: '400' }}>Forgot Password?</Text>
          </Pressable>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
          <CustomButton text="LOGIN" foregroundColor="#009dff" backgroundColor="#009dff" onPress={onLogin} />
        </View>
      </View>
    </SafeAreaView>

  );
};


const styles = StyleSheet.create({
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

export default Login;

