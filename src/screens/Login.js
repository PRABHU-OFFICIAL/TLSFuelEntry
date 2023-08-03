import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {StyleSheet} from 'react-native';
import {Image} from 'react-native';
// import { myFetchPostRequest } from '../api/MyFetchApi'

// import { myFetchPostRequest } from '../common/MyFetchApi'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../components/Loading';

const {height, widht} = Dimensions.get('window');

const Login = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const [mobileNo, setMobileNo] = useState('');
  const [mobileNoError, setMobileNoError] = useState('');

  const handleMobileNumberChange = text => {
    setMobileNo(text);
    setMobileNoError(text.length < 10 ? 'Mobile number must be 10 digits' : '');
  };

  const handleSubmit = () => {
    if (mobileNo === '') {
      setMobileNoError('Mobile number is required');
    } else if (mobileNo.length !== 10) {
      setMobileNoError('Mobile number must be 10 digits');
    } else {
      // make API call to validate login credentials
      setLoading(true);
      AsyncStorage.setItem('mobileNo', mobileNo);
      navigation.replace('Home');
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      {loading && <Loading />}
      <View style={styles.container}>
        <Image
          source={require('../assets/loginScreen.jpg')}
          resizeMode="center"
          style={styles.img}
        />
        <Welcome />

        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#ebeef2',
            width: '100%',
            height: height / 2 + 60,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            marginTop: 30,
            paddingTop: 30,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 28,
              fontWeight: 'bold',
            }}>
            Login
          </Text>

          <View>
            <View style={styles.inputContainer}>
              <Image
                style={styles.leftIcon}
                source={require('../assets/cell-phone.png')}
              />
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  paddingLeft: 30,
                  color: 'black',
                  fontSize: 15,
                  width: 250,
                }}
                placeholder={'Enter Phone Number'}
                autoCorrect={false}
                maxLength={10}
                value={mobileNo}
                keyboardType="numeric"
                onChangeText={handleMobileNumberChange}
              />
            </View>

            {mobileNoError ? (
              <Text style={styles.errorText}>{mobileNoError}</Text>
            ) : null}
          </View>

          <LoginButton
            onClick={() => {
              handleSubmit();
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const Welcome = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Text style={[styles.txt, {color: 'black'}]}>
        Welcome to TLSFuelEntry{' '}
      </Text>
    </View>
  );
};

const LoginButton = prop => {
  return (
    <TouchableOpacity style={styles.button} onPress={prop.onClick}>
      <Text style={styles.text}>Login</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 450,
    height: 250,
    marginTop: 10,
    marginBottom: 10,
  },
  txt: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  inputContainer: {
    height: 55,
    width: 300,
    backgroundColor: '#cbdcf7',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 0.5,
    alignItems: 'center',
    marginTop: 40,
    // borderColor:'#5d92d4',
  },
  leftIcon: {
    position: 'absolute',
    left: 0,
    height: 25,
    width: 25,
    margin: 10,
    tintColor: 'black',
  },
  rrightIcon: {
    position: 'absolute',
    right: 0,
    height: 25,
    width: 25,
    margin: 10,
    tintColor: 'black',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    marginVertical: 40,
    height: 50,
    width: 300,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  inputError: {
    borderColor: 'red', // add red border color if mobile number is not valid
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default Login;
