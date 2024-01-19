import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Divider,Card, Avatar} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import { ref} from 'firebase/database';
import { MaterialIcons } from '@expo/vector-icons';

import { FIREBASE_FIRESTORE } from '../../../config/firebase';
import { collection, getDocs, query as queryGei, where } from "firebase/firestore";

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
  
        // Fetching user data
        const querySnapshot = await getDocs(query);
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setName(data["name"]);
        });
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [query]);


  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });

      if (!result.canceled) {
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
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{paddingBottom:40}}>
            <TouchableOpacity >
             
              
              {!profileImage && <Avatar.Icon icon="account" style={styles.profileImage} />}
             
            </TouchableOpacity>
            
            </View>
            
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.titleEmail}>{email}</Text>
            </View>
            </View>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.thickLine} />

      <View style={styles.bodySection}>
        
          <Text style={styles.headerStyle}>Profile Info</Text>
        
        <Divider style={styles.divider} />
        
        <TouchableOpacity  style={styles.loginButton} onPress={() =>
            navigation.navigate("MyDelivery")
          }>
            <Text style={styles.buttonText}>MyDelivery</Text>
          </TouchableOpacity>
        <Divider style={styles.divider} />
        <Text style={styles.bodyStyle}>Settings</Text>
        <Divider style={styles.divider} />
        <Text style={styles.bodyStyle}>About Us</Text>
        <Divider style={styles.divider} />
        <TouchableOpacity  style={styles.loginButton}>
        <Text style={styles.bodyStyle}>Logout</Text>
        </TouchableOpacity>
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
    alignSelf: 'center',
    backgroundColor: 'white',
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
    width: '92%',
    alignContent: 'center',
  },
  thickLine: {
    borderBottomWidth: 8,
    borderBottomColor: '#e5e5e5',
    marginVertical: 25,
    width: '100%',
  },
  loginButton: {
    width: 340,
    borderColor: '#4FAF5A',
    marginTop: 5,
    borderRadius: 10,
   
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
  },

});