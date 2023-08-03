import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  LogBox,
  Alert,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header1 from "../components/Header 1";
import { Dropdown } from "react-native-element-dropdown";
// import Loading from '../components/Loading';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Table, Row } from "react-native-table-component";
// import AwesomeAlert from 'react-native-awesome-alerts';
import queryString from "query-string";

const Home = ({ navigation, route }) => {
  const [isVehicleNoScanned, setIsVehicleNoScanned] = useState(false);

  const [VehicleNo, setVehicleNo] = useState([]);
  const [PumpName, setPumpName] = useState([]);
  const [Pumpvalue, setValue] = useState(null);
  const [loading, setLoading] = useState(true);

  const [rate, setRate] = useState("");
  const [fule, setFule] = useState(0);
  const [Previousreading, setPreviousreading] = useState(0);
  const [millage, setMillage] = useState(0);

  const [reading, setreading] = useState(0);
  const [superName, setSuperName] = useState("");
  const [remark, setRemark] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const MYTable = () => {
    const tableHead = [
      "SLNo",
      "EntryDate",
      "PumpName",
      "Rate",
      "VehicleNo",
      "Fuel",
      "PreviousReading",
      "CurrentReading",
      "Millage",
      "Supervisor",
      "Remarks",
    ];
    const widthArr = [50, 130, 250, 70, 120, 70, 300, 300, 250, 250, 250];

    const renderTable = () => {
      LogBox.ignoreAllLogs();
      return (
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: "black" }}>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={styles.header1}
              textStyle={styles.textHeader}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            {entries.length === 0 ? (
              <Table borderStyle={{ borderWidth: 1, borderColor: "black" }}>
                <Row
                  data={["No record found"]}
                  style={styles.row1}
                  textStyle={styles.text1}
                />
              </Table>
            ) : (
              <Table borderStyle={{ borderWidth: 1, borderColor: "black" }}>
                {entries.map((rowData, index) => (
                  <Row
                    key={index}
                    data={Object.values(rowData)}
                    widthArr={widthArr}
                    style={[
                      styles.row1,
                      index % 2 && { backgroundColor: "white" },
                    ]}
                    textStyle={styles.text1}
                  />
                ))}
              </Table>
            )}
          </ScrollView>
        </View>
      );
    };

    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>{renderTable()}</ScrollView>
      </View>
    );
  };

  useEffect(() => {
    getAPI();
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec
    );
  }, []);

  useEffect(() => {
    // Check if the "scannedData" parameter exists in the route
    if (route.params?.scannedData != undefined) {
      // If it exists, set the scanned data to the "VehicleNo" state
      setVehicleNo(route.params?.scannedData);
      // Mark the Vehicle Number as scanned and saved
      setIsVehicleNoScanned(true);
      // Call the function to get the previous reading data
      getPreviousReadingData(route.params?.scannedData);
    }
  }, [route.params]); // Add route.params to the dependency array

  // Get the previous reading data from the API
  const getPreviousReadingData = async (VehicleNo) => {
    var requestOptions = {
      method: "POST",
    };

    await fetch(
      `https://tlsfleet.tranzol.com/ertyuiop567k78bn9kmsd890afas/LastFuel?v=${VehicleNo}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setPreviousreading(result["ClosingKm"].toString());
      })
      .catch((error) => console.log("error", error));
  };

  const [entries, setEntries] = useState([]);
  const [slNo, setSlNo] = useState(1); // Initial SLNo value

  const handleEntrySubmit = () => {
    // const currentDate = new Date().toISOString(); // Get the current date in ISO format

    const newEntry = {
      SLNo: slNo, // Use the current SLNo value
      EntryDate: currentDate,
      PumpName: Pumpvalue, // Replace with the actual value for PumpName
      Rate: rate, // Replace with the actual value for Rate
      VehicleNo: VehicleNo, // Replace with the actual value for VehicleNo
      Fule: fule,
      // Replace with the actual value for Fule
      PreviousReading: Previousreading,
      Reading: reading,
      millage: millage,
      Supervisor: superName, // Replace with the actual value for Reading
      Remarks: remark, // Replace with the actual value for Remarks
    };

    setEntries((prevEntries) => [...prevEntries, newEntry]);
    setSlNo((prevSlNo) => prevSlNo + 1); // Increment SLNo by 1
  };

  const getAPI = async () => {
    try {
      const response1 = await fetch(
        "https://tlsfleet.tranzol.com/ertyuiop567k78bn9kmsd890afas/pumplist"
      );
      const json1 = await response1.json();

      const parsedResponse1 = JSON.parse(json1);

      const data = parsedResponse1.map((item) => {
        return {
          label: item.PumpName,
          value: item.PumpName,
        };
      });

      setPumpName(data);

      // const response2 = await fetch('https://tlsfleet.tranzol.com/ertyuiop567k78bn9kmsd890afas/vehiclelist');
      // const json2 = await response2.json();

      // const parsedResponse2 = JSON.parse(json2);

      // const data1 = parsedResponse2.map(item => {
      //   return {
      //     label: item.VehicleNo,
      //     value: item.VehicleNo
      //   };
      // });
      // setVehicleNo(data1)

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const postAPI = async () => {
    const mob = await AsyncStorage.getItem("mobileNo");
    const mobileNo = String(mob);

    const data = {
      v: VehicleNo,
      q: fule,
      r: rate,
      k: reading,
      p: Pumpvalue,
      rm: remark,
      m: mobileNo,
      pr: Previousreading,
      mm: millage,
      sn: superName,
    };

    const queryStringParams = queryString.stringify(data);
    const POSTURL =
      "https://tlsfleet.tranzol.com/ertyuiop567k78bn9kmsd890afas/vehiclesave";
    const url = `${POSTURL}?${queryStringParams}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // const json = response.json();
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const [isFocus, setIsFocus] = useState(false);
  // const [isFocus1, setIsFocus1] = useState(false);

  const handelSubmit = () => {
    if (
      Pumpvalue === null ||
      rate === "" ||
      VehicleNo === "" ||
      fule === "" ||
      reading === "" ||
      Previousreading === "" ||
      superName === ""
    ) {
      setIsVehicleNoScanned(false);
      // setValue(null)
      setVehicleNo("");
      // setRate('')
      setFule("");
      setPreviousreading("");
      setMillage("");
      setRemark("");
      setSuperName("");
      Alert.alert("ERROR", "Fill All Fields");
    } else {
      postAPI();
      // console.log(response)
      handleEntrySubmit();
      // setValue(null)
      setVehicleNo("");
      // setRate('')
      setFule("");
      setPreviousreading("");
      setMillage("");
      setreading("");
      setSuperName("");
      setRemark("");
      setIsVehicleNoScanned(false);
      Alert.alert("SUCCESS", "Submited Sucessfully");
      // }
    }
  };

  const calculateMileage = (fuel, previousReading, currentReading) => {
    const fuelValue = parseFloat(fuel);
    const previousReadingValue = parseFloat(previousReading);
    const currentReadingValue = parseFloat(currentReading);

    if (fuelValue > 0 && currentReadingValue > previousReadingValue) {
      const mileage = (currentReadingValue - previousReadingValue) / fuelValue;
      return mileage.toFixed(2); // Return rounded mileage value
    } else {
      return "0.00"; // Return "0.00" if inputs are not valid
    }
  };

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      {/* {loading ? <Loading /> : ''} */}
      <Header1 />

      <ScrollView>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 15,
            }}
          >
            <Text style={styles.text}>PumpName</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={{ color: "black" }}
              data={PumpName}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Select PumpName" : "..."}
              searchPlaceholder="Search..."
              value={Pumpvalue}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 15,
            }}
          >
            <Text style={styles.text}>Rate</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={"#6c6f73"}
                style={{
                  color: "black",
                  fontSize: 15,
                  width: "100%",
                }}
                placeholder={"Enter Fuel Rate"}
                autoCorrect={false}
                keyboardType="numeric"
                onChangeText={(text) => {
                  setRate(text);
                }}
                value={rate}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 15,
            }}
          >
            <Text style={styles.text}>VehicleNo</Text>
            {/* <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={{ color: 'black' }}
              data={VehicleNo}
              search
              maxHeight={300}
              labelField='label'
              valueField="value"
              placeholder={!isFocus1 ? 'Select VehicleNo' : '...'}
              searchPlaceholder="Search..."
              value={Vehiclevalue}
              onFocus={() => setIsFocus1(true)}
              onBlur={() => setIsFocus1(false)}
              onChange={item => {
                setValue1(item.value);
                setIsFocus1(false);
              }}

            /> */}
            <View
              style={[
                styles.inputContainer,
                { justifyContent: "space-between" },
              ]}
            >
              <TextInput
                placeholderTextColor={"#6c6f73"}
                style={{
                  color: "black",
                  fontSize: 15,
                  width: "70%",
                }}
                placeholder={"Enter VehicleNo"}
                onChangeText={(text) => {
                  setVehicleNo(text);
                }}
                value={VehicleNo}
                editable={!isVehicleNoScanned}
                // editable={false}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Scan");
                }}
                style={{ alignItems: "center", alignSelf: "center" }}
              >
                <Image
                  source={require("../assets/qr-code.png")}
                  style={{ height: 22, width: 22 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 15,
            }}
          >
            <Text style={styles.text}>Fuel (Ltr)</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={"#6c6f73"}
                style={{
                  color: "black",
                  fontSize: 15,
                  width: "100%",
                }}
                placeholder={"Enter fuel in Ltr"}
                keyboardType="numeric"
                onChangeText={(text) => {
                  setFule(text);
                  setMillage(calculateMileage(text, Previousreading, reading));
                }}
                value={fule}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 15,
            }}
          >
            <Text style={styles.text}>Previous {"\n"}Reading </Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={"#6c6f73"}
                style={{
                  color: "black",
                  fontSize: 15,
                  width: "100%",
                }}
                placeholder={"Enter Previous Meter Reading"}
                keyboardType="numeric"
                onChangeText={(text) => {
                  setPreviousreading(text);
                  setMillage(calculateMileage(fule, text, reading));
                }}
                value={Previousreading}
                editable={false}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 15,
            }}
          >
            <Text style={styles.text}>Current {"\n"}Reading</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={"#6c6f73"}
                style={{
                  color: "black",
                  fontSize: 15,
                  width: "100%",
                }}
                placeholder={"Enter Current Meter Reading"}
                keyboardType="numeric"
                onChangeText={(text) => {
                  setreading(text);
                  setMillage(calculateMileage(fule, Previousreading, text));
                }}
                value={reading}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 15,
            }}
          >
            <Text style={styles.text}>Mileage</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={"#6c6f73"}
                style={{
                  color: "black",
                  fontSize: 15,
                  width: "100%",
                }}
                placeholder={`${calculateMileage(
                  fule,
                  Previousreading,
                  reading
                )} Km/Ltr`}
                value={calculateMileage(fule, Previousreading, reading)} // Use the calculated mileage directly
                editable={false}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 15,
            }}
          >
            <Text style={styles.text}>Supervisor</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={"#6c6f73"}
                style={{
                  color: "black",
                  fontSize: 15,
                  width: "100%",
                }}
                placeholder={"Enter Supervisor Name"}
                autoCorrect={false}
                onChangeText={(text) => {
                  setSuperName(text);
                }}
                value={superName}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 15,
            }}
          >
            <Text style={styles.text}>Remarks</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={"#6c6f73"}
                style={{
                  color: "black",
                  fontSize: 15,
                  width: "100%",
                }}
                placeholder={"Enter Remarks"}
                onChangeText={(text) => {
                  setRemark(text);
                }}
                value={remark}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              handelSubmit();
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 22,
                fontWeight: "700",
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </View>
        <MYTable />
      </ScrollView>

      <View
        style={{
          backgroundColor: "#f5f9fc",
          height: 22,
          width: "100%",
          alignItems: "flex-end",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 14,
              fontStyle: "italic",
              color: "black",
            }}
          >
            Powered By
          </Text>
          <Text style={{ color: "#26b3f0", paddingLeft: 4 }}>Tranz</Text>
          <Text style={{ color: "black" }}>o</Text>
          <Text style={{ color: "#26b3f0", marginRight: 20 }}>l</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    width: "70%",
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 8,
    alignSelf: "flex-end",
    backgroundColor: "#e1e3eb",
    marginRight: 10,
  },
  placeholderStyle: {
    fontSize: 15,
    paddingLeft: 10,
    color: "#6c6f73",
  },
  selectedTextStyle: {
    fontSize: 15,
    color: "black",
    paddingLeft: 10,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 15,
    color: "#6c6f73",
  },
  text: {
    color: "black",
    fontSize: 16,
    marginLeft: 10,
    marginTop: 8,
    fontWeight: "500",
  },
  inputContainer: {
    height: 50,
    width: "70%",

    flexDirection: "row",
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 0.5,
    alignSelf: "flex-end",
    backgroundColor: "#e1e3eb",
    marginRight: 10,
    borderColor: "black",
  },
  btn: {
    height: 50,
    width: "95%",
    alignItems: "center",
    backgroundColor: "#2e5193",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 10,
    justifyContent: "center",
  },

  headerElement: {
    color: "black",
    fontSize: 15,
    fontWeight: "500",
    paddingVertical: 7,
    paddingHorizontal: 20,
    backgroundColor: "#d3dfed",
    borderRightWidth: 1,
    borderRightColor: "black",
  },
  wrowelement: {
    color: "black",
    fontSize: 15,
    fontWeight: "500",
    paddingVertical: 4,
    paddingHorizontal: 20,
    // backgroundColor: 'white',
    borderRightWidth: 1,
    borderRightColor: "black",
  },
  browelement: {
    color: "black",
    fontSize: 15,
    fontWeight: "500",
    paddingVertical: 4,
    paddingHorizontal: 20,
    // backgroundColor: '#d3dfed',
    borderRightWidth: 1,
    borderRightColor: "black",
  },
  row: {
    flexDirection: "row",
    height: 30,
    marginLeft: 10,
    marginRight: 10,
    borderColor: "black",
    borderWidth: 1,
    borderTopWidth: 0,
  },
  header: {
    flexDirection: "row",
    height: 40,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    borderColor: "black",
    borderWidth: 1,
  },
  container: { flex: 1, padding: 16, paddingTop: 20 },
  header1: { height: 50, backgroundColor: "#b5cde6" },
  text1: { textAlign: "center", color: "black" },
  textHeader: {
    textAlign: "center",
    color: "black",
    fontSize: 16,
    fontWeight: "500",
  },
  dataWrapper: { marginTop: -1 },
  row1: { height: 40, backgroundColor: "#e1e3eb" },
});

export default Home;
