// React Imports
import React, { useRef, useState, useEffect } from 'react';

// Native Element Imports
import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

// Store Imports
import { setAuthenticated, signIn } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';

// Components Imports
import { CustomButton } from '../components/CustomButtonComponent';
import { InputField } from '../components/InputFieldComponent';

const Login = ({ navigation }) => {

  const { user, version } = useSelector(state => state.userReducer);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const initialRender = useRef(true);
  useEffect(() => {
    if (!initialRender.current) {
      authenticateUser();
    } else {
      initialRender.current = false;
    }
  }, [user]);

  // Sign In API call
  const onLogin = () => {
    if (name && password) {
      dispatch(signIn({ name, password }));
    }
  }

  // Authenticate User
  const authenticateUser = () => {
    if (user?.isAuthenticated) {
      navigation.navigate('Home');
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
            <InputField placeholder="Username" onChangeText={(value) => setName(value)} />
            <InputField placeholder="Password" secureTextEntry={true} onChangeText={(value) => setPassword(value)} />
          </View>
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

