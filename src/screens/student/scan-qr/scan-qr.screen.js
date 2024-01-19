import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { FIREBASE_FIRESTORE } from '../../../config/firebase';
import { getAuth } from 'firebase/auth';
import { doc, setDoc,addDoc,collection } from "firebase/firestore"; 


export const ScanScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    alert(`QR code has been scanned!`);

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      console.log(user);

      const userId = user.uid;
      const email = user.email;
      const currentDate = new Date();
      const options = { timeZone: 'Asia/Kuala_Lumpur' };
      const scanDate = currentDate.toLocaleString('en-US', options);

      // Add a new document in the "Scans" collection
      const docRef = await addDoc(collection(FIREBASE_FIRESTORE, "TrackFoodQuantity"), {
        userId: userId,
        email: email,
        scanDate: scanDate,
        scanData: data, // Save the scanned QR code data
      });

      console.log("Scan data sent successfully!");

      // Perform any navigation or additional actions as needed
      // navigation.navigate('YourTargetScreen'); 
    } catch (error) {
      console.error(error);
    }
  };

  if (hasPermission === null) {
    return <Text style={styles.text}>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }

  
  return (
    <View style={styles.container}>
    <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={StyleSheet.absoluteFillObject}
    />
    {scanned && (
      <View >
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      </View>
    )}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 18,
    color: '#333',
    marginTop: 20,
  },
  
});

