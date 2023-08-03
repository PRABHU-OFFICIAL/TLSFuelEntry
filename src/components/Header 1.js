import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get("window");

const Header1 = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            alignSelf: "center",
            justifyContent: "center",
            marginLeft: 20,
          }}
        >
          <Text style={styles.txt}>Fuel Entry</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.replace("Login");
          // AsyncStorage.clear();
        }}
        style={styles.scanButton}
      >
        <Image
          source={require("../assets/logout.png")}
          style={styles.scanButton}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: width,
    height: 60,
    backgroundColor: "#2e5193",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  txt: {
    fontSize: 28,
    fontWeight: "500",
    color: "white",
  },
  scanButton: {
    height: 28,
    width: 28,
    marginRight: 20,
    marginVertical: 8,
    tintColor: "white",
  },
});

export default Header1;
