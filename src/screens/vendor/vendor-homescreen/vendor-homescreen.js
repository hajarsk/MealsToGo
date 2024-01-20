import React, { useState, useEffect } from "react";
import { StyleSheet, Text, FlatList, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator, Badge } from "react-native-paper";
import { SliderBox } from "react-native-image-slider-box";
import { MaterialIcons } from '@expo/vector-icons';
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Search } from "../../vendor/vendor-homescreen/search.component";
import { CheckpointInfoCard } from "../../vendor/vendor-homescreen/checkpoint-card.component";
import { ref, get, query } from 'firebase/database';
import { FIREBASE_DATABASE } from "../../../config/firebase";
import { FIREBASE_FIRESTORE } from "../../../config/firebase";
import { collection, doc, getDocs, query as queryGei, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import getAnnouncement from "../../../components/actionStorage";
import RegisterUser from "../../../components/registerUser";

const CheckpointList = styled(FlatList).attrs({
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

export const VendorCheckpointScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [checkpoints, setCheckpoints] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [shouldFetchData, setShouldFetchData] = useState(true);
  const [announcement, setAnnouncement] = useState([]);

  const collectionRef = collection(FIREBASE_FIRESTORE, "users");
  const query = queryGei(collectionRef, where("email", "==", email));

  useEffect(() => {
    const collectionRef = collection(FIREBASE_FIRESTORE, "users");
    const query = queryGei(collectionRef, where("email", "==", email));

    const fetchData = async () => {
      try {
        const auth = getAuth().currentUser;
        if (auth) {
          setEmail(auth.email);
        }

        await RegisterUser(query, auth);

        if (shouldFetchData) {
          setAnnouncement(await getAnnouncement());
          fetchUserInf();
          fetchCheckpointData();
          setShouldFetchData(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [query, shouldFetchData]);

  const fetchUserInf = async () => {
    const querySnapshot = await getDocs(query);
    querySnapshot.forEach((document) => {
      const data = document.data();
      setName(data["name"]);
      setRole(data["role"]);
    });
  }

  const fetchCheckpointData = async () => {
    try {
      const dbRef = ref(FIREBASE_DATABASE, 'checkpoint');
      const snapshot = await get(dbRef);
      const allData = Object.values(snapshot.val());
      setCheckpoints(allData);
    } catch (error) {
      console.error('Error fetching checkpoint data:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const handleImagePress = (index) => {
    const announcementId = announcement[index].id;
    navigation.navigate('Announcement', { announcementId });
  };

  return (
    <SafeArea style={{ backgroundColor: 'white' }}>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color="#008000" />
        </LoadingContainer>
      )}

      <View style={styles.containerHeaderUser}>
        <View style={{ flex: 1 }}>
          <Text style={styles.userHeader}>Hi {name},</Text>
        </View>
        <View style={styles.containerHeaderIcon}>
          <TouchableOpacity
            onPress={() => navigation.navigate("StudentNotificationList")}
          >
            <MaterialIcons name="notifications-none" size={26} color="black" />
            <Badge size={9} style={{ position: 'absolute', top: 3, right: 4 }}></Badge>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.containerHeaderRole}>
        <Text style={styles.roleHeader}>You are a </Text>
        <Text style={styles.roleHeaderColor}>{role}!</Text>
      </View>

      <Search />

      <View style={styles.containerImageSlider}>
        <SliderBox
          images={announcement.map(item => item.imageId) || []}
          paginationBoxStyle={{
            backgroundColor: '#ffffff',
            borderRadius: 20,
            paddingVertical: 10,
            marginBottom: 15,
            paddingHorizontal: 10,
          }}
          onCurrentImagePressed={index => handleImagePress(index)}
          sliderBoxHeight={180}
          parentWidth={359}
          borderRadius={10}
          resizeMode="cover"
          dotColor="#4FAF5A"
          dotStyle={{ width: 20, height: 5, marginHorizontal: -7 }}
          inactiveDotColor="#e8e8e8"
          autoplay
          circleLoop
          autoplayInterval={3000}
        />
      </View>

      {/* Food bank list header */}
      <View style={styles.containerHeaderUser}>
        <Text style={styles.foodbankHeader}>UPM Food Bank List</Text>
      </View>

      <CheckpointList
        data={checkpoints}
        renderItem={({ item }) => {
          return (
            <Spacer position="bottom" size="small">
              <CheckpointInfoCard checkpoint={item} />
            </Spacer>
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
    padding: 6,

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
