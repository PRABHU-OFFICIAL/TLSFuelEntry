import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(getLoginDetails, 3000);
  }, []);

  const getLoginDetails = async () => {
    let mobileNo = await AsyncStorage.getItem('mobileNo');
    if (mobileNo) {
      navigation.replace('Home', {mobileNo});
    } else {
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/tranzolLogo.png')}
        style={styles.logo}
      />
      <Text style={styles.smallText}>Powered by TRANZOL</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  smallText: {
    fontSize: 14,
    fontStyle: 'italic',
    position: 'absolute',
    bottom: 30,
    color: 'black',
  },
});

export default Splash;
