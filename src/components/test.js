import { Camera, CameraType } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FIREBASE_FIRESTORE } from '../../../config/firebase';
import { getAuth } from "firebase/auth";
export const UploadPhotoScreen = () => {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const cameraRef = useRef(null);
    const [photoUri, setPhotoUri] = useState(null);
    const [scannedCheckpoint, setScannedCheckpoint] = useState(null);

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setPhotoUri(photo.uri);

            sendDeliveryProofToDatabase(photo.uri);
        }
    };

    const handleBarCodeScanned = ({ data }) => {
        setScannedCheckpoint(data);

        const expectedCheckpoint = "ExpectedCheckpointName";
        if (data === expectedCheckpoint) {
            beepSound.play(); // Play the default beep sound on successful scan

            // Update the status to "delivered" if checkpoint names match
            sendDeliveryProofToDatabase(photoUri);

        } else {
            alert("Wrong checkpoint. This is not the expected checkpoint.");
        }
    };

    const sendDeliveryProofToDatabase = async () => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;
            console.log(user)

            const userId = user.uid;
            const email = user.email;
            const currentDate = new Date();
            const options = { timeZone: 'Asia/Kuala_Lumpur' };
            const deliveryDate = currentDate.toLocaleString('en-US', options);

            //nama,time stamp

            /*const docRef = await addDoc(collection(FIREBASE_FIRESTORE, "Delivery_Proof"), {
              userId: userId,
              email: email,
              deliveryDate: deliveryDate
            });*/
            console.log("Successfully scan the barcode")

            navigation.goBack()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <View style={styles.container}>
            <Camera
                ref={cameraRef}
                style={styles.camera}
                type={type}
                onBarCodeScanned={handleBarCodeScanned} // Update to use handleBarCodeScanned
                ratio="1:1"
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={takePicture}>
                        <Text style={styles.text}>Take Picture</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
            {photoUri && <Image source={{ uri: photoUri }} style={styles.previewImage} />}
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
