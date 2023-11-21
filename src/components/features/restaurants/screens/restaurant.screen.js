import React, { useContext, useState, useEffect } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator, Colors } from "react-native-paper";

import { SafeArea } from "../../../utility/safe-area.component";
import { Spacer } from "../../../spacer/spacer.component";


import { Search } from "../components/search.component";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";

import { ref, get } from 'firebase/database';
import { FIREBASE_DATABASE } from '../../../../config/firebase';

const fetchCollegeData = async () => {
    const dbRef = ref(FIREBASE_DATABASE, 'checkpoint'); // Assuming 'posts' is your Firebase collection name
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
        return Object.values(snapshot.val()); // Assuming your data is stored as an object
    } else {
        return [];
    }
};

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;


export const RestaurantsScreen = ({navigation}) => {
  const [checkpoints, setCheckpoint]= useState([])
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await fetchCollegeData();
            console.log('Fetched data:', data); // Log the fetched data
            setCheckpoint(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    fetchData();
}, []);

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color="#008000" />
        </LoadingContainer>
      )}
       <Search />
      <RestaurantList
        data={checkpoints}
        renderItem={({ item }) => {
          return (

            <TouchableOpacity
            onPress={() =>
              navigation.navigate("RestaurantDetail", {
                checkpoint: item,
              })
            }
            >
              <Spacer position="bottom" size="small">
                <RestaurantInfoCard checkpoint={item} />
                
              </Spacer>
              </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};