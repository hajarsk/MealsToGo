import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { FIREBASE_DATABASE } from '../../../config/firebase';
import { getAuth } from "firebase/auth";
import { child, get, getDatabase, ref, update } from 'firebase/database';

export const UploadPhotoScreen = ({ route, navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { DocumentPath } = route.params;

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    if (data === DocumentPath.checkpoint) {
      const auth = getAuth();
      const user = auth.currentUser;
      const userId = user.uid;

      const dbRef = getDatabase();
      const checkpointRef = ref(dbRef, `/checkpoint/${DocumentPath.checkpoint}`);
      const donationDetailsRef = ref(dbRef, `/Donation_Details/${DocumentPath.docPath}`);

      const snapshot = await get(checkpointRef);
      const snapshot2 = await get(donationDetailsRef);

      if (snapshot.exists()) {
        const checkpointData = snapshot.val();
        const donationDetailsSnapshot = snapshot2.val();
        await update(donationDetailsRef, {
          status: "delivered",
        });
        await update(checkpointRef, {
          available: parseInt(checkpointData.available) + parseInt(donationDetailsSnapshot.quantity),
        });
        alert(`Thank you for delivering the food to ${data} checkpoint!`);
        navigation.goBack();
      } else {
        alert(`Checkpoint not found. This is not the expected ${data} checkpoint!`);
      }
    } else {
      alert(`Wrong checkpoint. This is not the expected checkpoint.`);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        ratio="1:1"
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center the content vertically
    backgroundColor: 'black',
  },
  camera: {
    aspectRatio: 1, // Set the aspect ratio to 1:1
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    margin: 20,
  },
  button: {
    flex: 0.4,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  previewImage: {
    flex: 1,
    resizeMode: 'contain',
  },
});