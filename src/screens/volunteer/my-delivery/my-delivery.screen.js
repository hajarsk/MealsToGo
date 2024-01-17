import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { Button, Card, Divider } from 'react-native-paper';


import { Spacer } from '../../../components/spacer/spacer.component';
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import { FIREBASE_DATABASE } from '../../../config/firebase';


export const MyDeliveryScreen = ({navigation }) => {
  const [volunteer, setVolunteer] = useState([]);
  

useEffect(() => {
  const dbRef = ref(FIREBASE_DATABASE);
  get(child(dbRef, 'Donation_Details'))
    .then((snapshot) => {
      if (snapshot.exists()) {
       const retrieveData=snapshot.val();
       const dataArray = Object.values(retrieveData)
       setVolunteer(dataArray);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error.message);
    });
}, []); 


  return (

    // id student/rider/vendor
    <View style={styles.container}>
      {/* profile header */}
      <Text style={styles.pageTitle}>Volunteer Delivery Details</Text>
      {/* Profile content goes here */}
      <View style={styles.profileSection}>
       {volunteer.map((item, index) => (
        
          <Card  style={{ backgroundColor: '#ffffff', width: 350, marginBottom: 20 }}>
            <Card.Content>
              <Spacer>
                <View style={styles.bodySection}>
                  <Text style={styles.headerStyle}>Delivery Details</Text>
                  <Text style={styles.subHeaderStyle}>Deliver food from:</Text>
                  <Text style={styles.bodyStyle}>{item.userName}</Text>
                  <Divider style={styles.divider} />
                  <Text style={styles.subHeaderStyle}>Vendor address:</Text>
                  <Text style={styles.bodyStyle}>vendorAddress</Text>
                  <Divider style={styles.divider} />
                  <Text style={styles.subHeaderStyle}>Food items:</Text>
                  <Text style={styles.bodyStyle}>{item.quantity}x {item.foodItem}</Text>
                  <Divider style={styles.divider} />
                  <Text style={styles.subHeaderStyle}>Pickup Time:</Text>
                  <Text style={styles.bodyStyle}>{item.pickupTime}</Text>
                  <Divider style={styles.divider} />
                  <Text style={styles.subHeaderStyle}>Volunteer Assigned:</Text>
                  <Text style={styles.bodyStyle}>{item.assignVolunteer}</Text>
                  <Divider style={styles.divider} />
                </View>
              </Spacer>
              <Card.Actions>
                <Button  style={{ backgroundColor: '#4faf5a' }}>
                  Confirm Delivery
                </Button>
              </Card.Actions>
            </Card.Content>
          </Card>
       ))} 
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: 'bold',

  },
  profileSection: {
    width: '100%',
  },
  profileText: {
    fontSize: 18,
    marginBottom: 10,
  },
  divider: {
    marginVertical: 10,
    backgroundColor: 'grey',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',

  },
  titleEmail: {
    marginBottom: 5,
    marginTop: 3,
    fontSize: 15,
  },
  bodySection: {
    width: '100%',
    paddingLeft: 5,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#4faf5a',
    paddingHorizontal: 30
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  blurredBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5', // Adjust background color as needed
    backdropFilter: 'blur(10px)',

  },
  picker: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    marginBottom: 20,
    borderRadius: 8,
  }
});