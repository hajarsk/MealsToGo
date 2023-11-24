import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, FlatList, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native-paper";
import { SliderBox } from "react-native-image-slider-box";
import { MaterialIcons } from '@expo/vector-icons';

import { MapScreen } from "../../map/screens/map.screen";
import { SafeArea } from "../../../utility/safe-area.component";
import { Spacer } from "../../../spacer/spacer.component";
import { Search } from "../components/search.component";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";

import { ref, get } from 'firebase/database';
import { FIREBASE_DATABASE } from '../../../../config/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";


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
    paddingTop: -5,


  },
  numColumns: 2,
  key: (data) => data.length,
})``;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;



export const RestaurantsScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [checkpoints, setCheckpoint] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);
  const [notification, setNotification] = useState("")

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

  const ImageSlider = [
    { id: 1, name: 'ImageSlider 1', imageId: 'https://source.unsplash.com/1024x768/?nature' },
    { id: 2, name: 'ImageSlider 2', imageId: 'https://source.unsplash.com/1024x768/?nature' },
    { id: 3, name: 'ImageSlider 3', imageId: 'https://source.unsplash.com/1024x768/?water' },
    // ... announcement
  ];

  const fetchImageUrls = async (imageIds) => {
    // Fetch image URLs based on image IDs
    // Assuming there's a function that fetches image URLs
    // This function returns an array of image URLs based on the provided IDs
    const imageUrls = await yourApiFunctionToFetchImageUrls(imageIds);
    return imageUrls;
  };

  // call user name
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName);

      }
    });
  }, []);

  useEffect(() => {
    // Extracting image IDs from ImageSlider
    const imageIds = ImageSlider.map((ImageSliders) => ImageSliders.imageId);

    // // Fetch image URLs based on image IDs
    // const fetchImageUrlsData = async () => {
    //   try {
    //     const urls = await fetchImageUrls(imageIds);
    //     setImageUrls(urls);
    //   } catch (error) {
    //     console.error('Error fetching image URLs:', error);
    //   }
    // };

    // fetchImageUrlsData();
  }, []);

  // display notification button and direct to noti page


  return (
    <SafeArea style={{ backgroundColor: 'white' }}>
      {/* loading page */}
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color="#008000" />
        </LoadingContainer>
      )}

      <View style={styles.containerHeaderUser}>
        {/* user name */}
        <Text style={styles.userHeader}>Hi Joshua,</Text>
        <View style={[styles.containerHeaderIcon]}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Announcement")
            }
          >
            <MaterialIcons name="notifications-none" size={26} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* user role */}
      <View style={styles.containerHeaderRole}>
        <Text style={styles.roleHeader}>You are a </Text>
        <Text style={styles.roleHeaderColor}>donor!</Text>
      </View>

      {/* display search bar */}
      <Search />
      <View style={styles.containerImageSlider}>
        
        <SliderBox images={ImageSlider.map(item => item.imageId)}
          paginationBoxStyle={{
            backgroundColor: '#ffffff',
            borderRadius: 20,
            paddingVertical: 10,
            marginBottom: 15,
            paddingHorizontal: 10,
            alignSelf: 'flex-end',
            xIndex: 5,
          }}
          sliderBoxHeight={180} // Height of the slider
          parentWidth={359}
          borderRadius={10}
          resizeMode="cover"
          onCurrentImagePressed={index => console.log(`image ${index} pressed`)}
          dotColor="#4FAF5A"
          dotStyle={{ width: 20, height: 5, marginHorizontal: -7 }}
          inactiveDotColor="#e8e8e8"// Light grey- #E8E8E8, GREY - #90A4AE
          autoplay
          circleLoop />
        {/* Button component
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Announcement")
          }}
          style={styles.donationButton} 
        >
          <Text style={styles.buttonText}>Your Button Text</Text>
        </TouchableOpacity> */}
      </View>
      <View style={styles.containerHeaderUser}>
        <Text style={styles.foodbankHeader}>Foodbank</Text>
      </View>
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

const styles = StyleSheet.create({
  containerHeaderUser: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  containerHeaderIcon: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10, // Adjust this value to control the roundness of the edges
    padding: 6, // Adjus
    marginLeft: 230,
  },
  containerImageSlider: {
    marginTop: 18,
    width: '150',
    paddingLeft: 18,
    paddingRight: 30,
    
  },
  containerHeaderRole: {
    marginTop: -10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginBottom: 0,
  },
  foodbankHeader: {
    marginTop: 1,
    marginBottom: 10,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,

  },
  roleHeader: {
    marginTop: -3,
    marginBottom: 10,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  roleHeaderColor: {
    marginTop: -3,
    color: '#4FAF5A',
    fontWeight: 'bold',
    fontSize: 16,

  },
  userHeader: {
    marginBottom: 10,
    color: '#4FAF5A',
    fontWeight: 'bold',
    fontSize: 18,

  },
  ImageSlider: {
    width: '150',
    height: '150',
  },
  donationButton: {
    backgroundColor: '#4FAF5A',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});