import React, { useEffect, useState } from "react";
import { View, Text} from 'react-native';
import MapView, {Polyline, Marker} from "react-native-maps";
import styled from "styled-components/native";
import * as Location from 'expo-location';


const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

export const MapScreen = ({ navigation }) => {
  
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
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

  useEffect(() => {
    setupGeofence();

  });

    return (
      <>
        <Map
          region={{
            latitude: 2.9955572872315868,
            longitude: 101.70888245173745,
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