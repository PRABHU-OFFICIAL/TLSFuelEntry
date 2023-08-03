import React, { useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";

export default function Scan() {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(false);
  const [scannedData, setScannedData] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleScan = ({ data }) => {
    setScannedData(data.toString());
    console.log("Scanned Data:", data.length);

    // Navigate back to the previous screen with the scanned data
    navigation.goBack(); // This will take you back to the previous screen
    navigation.navigate("Home", { scannedData: data.toString() }); // Pass the scanned data as a parameter to the Home screen
  };

  return hasPermission ? (
    <BarCodeScanner
      style={StyleSheet.absoluteFill}
      onBarCodeScanned={scannedData === "" ? handleScan : null}
    />
  ) : (
    <Text
      style={{
        color: "red",
        fontSize: 26,
        textAlign: "center",
        marginTop: "50%",
        fontWeight: "bold",
        paddingHorizontal: 20,
      }}
    >
      No camera permission, You need to allow camera permission. If allowed,
      please wait a second!
    </Text>
  );
}

// import * as React from 'react';
// import {StyleSheet, Text, View} from 'react-native';
// import {useCameraDevices} from 'react-native-vision-camera';
// import {Camera} from 'react-native-vision-camera';
// import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
// import {useNavigation} from '@react-navigation/native';

// export default function Scan() {
//   const navigation = useNavigation();

//   const [hasPermission, setHasPermission] = React.useState(false);
//   const devices = useCameraDevices();
//   const device = devices.back;
//   const [scannedData, setScannedData] = React.useState('');

//   const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
//     checkInverted: true,
//   });

//   React.useEffect(() => {
//     (async () => {
//       const status = await Camera.requestCameraPermission();
//       setHasPermission(status === 'authorized');
//     })();
//   }, []);

//   React.useEffect(() => {
//     // Function to handle barcode scanning
//     const handleScan = () => {
//       if (barcodes.length > 0) {
//         const barcodeData = barcodes[0].displayValue;
//         setScannedData(barcodeData);
//         console.log('Scanned Data:', barcodeData.length);

//         // Navigate back to the previous screen with the scanned data
//         navigation.goBack(); // This will take you back to the previous screen
//         navigation.navigate('Home', {scannedData: barcodeData}); // Pass the scanned data as a parameter to the Home screen
//       }
//     };
//     if (scannedData === '') {
//       handleScan();
//     }
//   }, [barcodes, scannedData, navigation]);

//   return device != null && hasPermission ? (
//     <>
//       <Camera
//         style={StyleSheet.absoluteFill}
//         device={device}
//         isActive={true}
//         frameProcessor={frameProcessor}
//         frameProcessorFps={5}
//       />
//     </>
//   ) : (
//     <Text
//       style={{
//         color: 'red',
//         fontSize: 26,
//         textAlign: 'center',
//         marginTop: '50%',
//         fontWeight: 'bold',
//         paddingHorizontal: 20,
//       }}>
//       No camera permission ,You Need to allow Camera Permission, if allowed
//       please wait a second !!
//     </Text>
//   );
// }
