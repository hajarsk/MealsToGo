import React, { useEffect, useState } from "react";
import MapView, {Marker} from "react-native-maps";
import styled from "styled-components/native";
import * as Location from 'expo-location';


const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;



export const MapScreen = async ({ navigation }) => {
  
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [volunteerCoordinates, setVolunteerCoordinates] = useState(null);
  console.log(currentLocation.latitude);
  console.log(currentLocation.longitude);


  const setupGeofence = async () => {
    // Get the user's current location
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      console.log('Location permission denied');
      return;
    }

    const location = await Location.getCurrentPositionAsync();
    setCurrentLocation(location.coords)
  }

  try {
    const dbRef = ref(database, 'volunteerLocations'); // Adjust path as needed
    await set(dbRef, location.coords);
    console.log('Coordinates posted to database');
  } catch (error) {
    console.error('Error posting coordinates:', error);
  }


useEffect(() => {
  const fetchCoordinates = async () => {
    try {
      const dbRef = ref(database, 'volunteerLocations'); // Adjust path
      const snapshot = await get(dbRef);
      const coordinates = snapshot.val();
      setVolunteerCoordinates(coordinates); 
      // Update state or map region based on retrieved coordinates
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  fetchCoordinates();
}, []);



  useEffect(() => {
    setupGeofence();

  });

    return (
      <>
        <Map
         region={{
          latitude: volunteerCoordinates?.latitude || 2.9955572872315868, // Use fetched latitude or default
          longitude: volunteerCoordinates?.longitude || 101.70888245173745, // Use fetched longitude or default
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          
        >
          <Marker
          
            title="Kolej Canselor"
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}

          >
            
          </Marker>
        </Map>
      </>
  );
};
