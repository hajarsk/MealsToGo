import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Divider, Button, Card, List } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import { ref} from 'firebase/database';

import { FIREBASE_FIRESTORE } from '../../../config/firebase';
import { collection, getDocs, query as queryGei, where } from "firebase/firestore";

const fetchCollegeData = async () => {
  const dbRef = ref(FIREBASE_DATABASE, 'checkpoint'); // Assuming 'posts' is your Firebase collection name
  const snapshot = await get(dbRef);
  if (snapshot.exists()) {
    return Object.values(snapshot.val()); // Assuming your data is stored as an object
  } else {
    return [];
  }
};

export const VolunteerProfileScreen = () => {
  const [profileImage, setProfileImage] = useState("");
  const [expanded, setExpanded] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [donation, setDonation] = useState([]);
  const navigation = useNavigation();
  const user = getAuth();
  const handlePress = () => setExpanded(!expanded);
  
  // User information retrieval
  const collectionRef = collection(FIREBASE_FIRESTORE, "users");
  const query = queryGei(collectionRef, where("email", "==", email));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = getAuth().currentUser;
        if (auth) {
          setEmail(auth.email);
        }
  
        // Fetching checkpoint data
        fetchCollegeData();
  
        // Fetching user data
        const querySnapshot = await getDocs(query);
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setName(data["name"]);
        });
  
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [query]);
  
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


  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });

      if (!result.cancelled) {
        setProfileImage(result.uri);
      }
    } catch (error) {
      console.error('ImagePicker Error: ', error);
    }
  };


  return (
    <View style={styles.container}>

      {/* profile header */}
      <View style={styles.headerSection}>
        <Card style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
          <Card.Content >
            <TouchableOpacity onPress={handleImagePicker} >
              {profileImage && <Image source={{ uri: profileImage }} style={styles.profileImage} />}
              <Button title="Select Profile Picture" onPress={handleImagePicker} />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.titleEmail}>{email}</Text>
            </View>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.thickLine} />

      <View style={styles.bodySection}>
        
          <Text style={styles.headerStyle}>Profile Info</Text>
        
        <Divider style={styles.divider} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MyDelivery")
          }>
        <Text style={styles.bodyStyle}>My Delivery</Text>
        </TouchableOpacity>
        <Divider style={styles.divider} />
        <Text style={styles.bodyStyle}>Settings</Text>
        <Divider style={styles.divider} />
        <Text style={styles.bodyStyle}>About Us</Text>
        <Divider style={styles.divider} />
        <Text style={styles.bodyStyle}>Logout</Text>
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',

    color: '#4FAF5A',

  },
  titleEmail: {
    fontSize: 16,
    fontWeight: 'medium',
    marginBottom: 5,
    alignSelf: 'center',


  },
  bodySection: {
    width: '100%',
    backgroundColor: 'white',
    marginLeft: 30,
    marginTop: 20
  },
  profileText: {
    fontSize: 16,
    marginBottom: 10,
    paddingLeft: 20,

  },
  divider: {
    marginVertical: 8,
    width: '90%',
    alignContent: 'center',

  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 75,
    alignSelf: 'center'
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    color: '#4FAF5A',
  },
  titleContainer: {
    flexDirection: 'column',
    marginTop: -30,
    alignItems: 'center',
  },
  bodySection: {
    width: '100%',
    paddingLeft: 25,
    marginTop: -5,

  },
  headerStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4FAF5A',
    marginBottom: 10
  },
  subHeaderStyle: {
    fontSize: 16,

  },
  bodyStyle: {
    marginBottom: 5,
    fontSize: 16,


  },
  divider: {
    marginVertical: 12,
    width: '90%',
    alignContent: 'center',
  },
  thickLine: {
    borderBottomWidth: 8,
    borderBottomColor: '#e5e5e5',
    marginVertical: 25,
    width: '100%',
  },

});