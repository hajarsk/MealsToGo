import React from "react";
import { SafeAreaView,  StyleSheet, View,Image, Text} from "react-native";
import { ProgressBar, Divider } from "react-native-paper";
import { Slot } from "../components/restaurant-info-card.styles";
import { ref, get } from 'firebase/database';
import { FIREBASE_DATABASE } from '../../../../config/firebase';


fetchDonationDetails = async() =>{
  try{
    const dbRef = ref(FIREBASE_DATABASE,"Donation_Details")
    const snapshot = await get(dbRef) 
    if(snapshot.exists()){
      const allData = Object.values(snapshot.val())
      return allData 
    }else{
      return []
    }
  }catch(error){
      console.error(error)
  }
 }

export const RestaurantDetailScreen = ({ route }) => {
  const { checkpoint } = route.params;
  const ratioString =  `${checkpoint.available}/${checkpoint.total}`; // Display the ratio as a string in the format `available/total`


  //available food slot left
  // Calculate progress ratio
  const progressRatio = checkpoint.total > 0 ? checkpoint.available / checkpoint.total : 0;

  const ProgressBarSlot = (progressRatio) => (
    <ProgressBar progress={progressRatio} theme={{ colors: { primary: '#4FAF5A' } }} />
  );
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerImage}>
        <Image style={styles.image} key={checkpoint.name} source={{ uri: checkpoint.images[0] }} />
       
      </View>
      <View style={styles.bodySection}>
        <Text style={styles.bodyStyle}>{checkpoint.name}</Text>
        <Text style={styles.subHeaderStyle}>{checkpoint.address}</Text>
        <Slot><Text style={styles.subHeaderStyle}>{ratioString}</Text></Slot>
        <View style={{ width:'92%',eight:5,borderRadius: 10, overflow: 'hidden' }}>
        <ProgressBarSlot></ProgressBarSlot>
        </View>
      </View>

        <View style={styles.thickLine} />

      <View style={styles.bodySection}>
        <Text style={styles.headerStyle}>Delivery Details</Text>
        <Text style={styles.subHeaderStyle}>Deliver food from:</Text>
        <Text style={styles.bodyStyle}>Hotel Le Meridien</Text>
        <Divider style={styles.divider} />
        <Text style={styles.subHeaderStyle}>Delivery address:</Text>
        <Text style={styles. bodyStyle}>Kolej Canselor, Universiti Putra Malaysia 43400 Serdang, Selangor</Text>
        <Divider style={styles.divider} />
        <Text style={styles.subHeaderStyle}>Items:</Text>
        <Text style={styles. bodyStyle}>50x Nasi Berlauk</Text>
        
          
      </View>

      

    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'white'
  },
  containerImage: {
    height: "30%",
    width: "100%",
    marginBottom: 20
  },
  image: {
    height: "100%",
    width: "100%"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4FAF5A',
  },
  titleEmail: {
    marginBottom: 5,
    marginTop: 3,
    fontSize: 15,
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
    fontSize: 15,
    color: '#979797',

  },
  bodyStyle: {
    marginBottom: 5,
    fontSize: 15,
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


  },
  subheaderSection: {
    flexDirection: 'row',
    alignItems: 'center',


  },
  titleContainer: {
    flexDirection: 'column',
    marginTop: -30,

  },
  hyperlinkStyle: {
    color: '#4FAF5A',
    textDecorationLine: 'underline',
    alignSelf: 'center',
    paddingTop: 10
  },
  thickLine: {
    borderBottomWidth: 8,
    borderBottomColor: '#e5e5e5',
    marginVertical: 25,
    width: '100%',
  },

});