import React, { useEffect, useState } from 'react';
import { ScrollView,Text, View, StyleSheet } from 'react-native';
import { Button, Card, Divider} from 'react-native-paper';
import { get, child,ref  } from 'firebase/database';

import { FIREBASE_DATABASE } from '../../../config/firebase';
import { Spacer } from '../../../components/spacer/spacer.component';

export const MyDonationScreen = ({navigation}) => {
  const [myDonation, setMyDonation] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const dbRef = ref(FIREBASE_DATABASE);
    get(child(dbRef, 'Donation_Details'))
      .then((snapshot) => {
        if (snapshot.exists()) {
         const retrieveData=snapshot.val();
         const dataArray = Object.values(retrieveData).map((item) => ({
          ...item,
          showDetails: false,
        }));
         setMyDonation(dataArray);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  }, []); 

  const toggleDetails = (index) => {
    setMyDonation((prevDonation) =>
      prevDonation.map((item, i) =>
        i === index ? { ...item, showDetails: !item.showDetails } : item
      )
    );
  };
  

 
  return (
<ScrollView contentContainerStyle={styles.scrollViewContainer}>
    {/* // id student/rider/vendor */}
    <View style={styles.container}>
      {/* profile header */}
      <Text style={styles.pageTitle}>My Donation List</Text>
      {/* Profile content goes here */}
      <View style={styles.profileSection}>
        {myDonation.map((item, index) => (

        <Card style={{ backgroundColor: '#ffffff', width: 350, marginVertical:8 }}>
          {/* Header Section */}
          <View style={styles.headerSection}>
                  <Text style={styles.headerText}>Donation Summary</Text>
                </View>
          <Card.Content>
            
                
            <Spacer>
              <View style={styles.bodySection}>
                
                {/* <Text style={styles.subHeaderStyle}>Deliver food from:</Text>
                <Text style={styles.bodyStyle}>{item.userName}</Text> */}
                <Text style={styles.subHeaderStyle}>Food Item:</Text>
                      <Text style={styles.bodyStyle}>{item.quantity}x {item.foodItem}</Text>
                      
                <Divider style={styles.divider} />
                <Text style={styles.subHeaderStyle}>Pickup Time:</Text>
                      <Text style={styles.bodyStyle}>{item.pickupTime}</Text>
                
                {item.showDetails && (
                    <>
                      
                      <Divider style={styles.divider} />
                      
                      <Text style={styles.subHeaderStyle}>Delivery food from:</Text>
                      <Text style={styles.bodyStyle}>{item.userName}</Text>

                      
                      <Divider style={styles.divider} />
                      <Text style={styles.subHeaderStyle}>Vendor Address:</Text>
                      <Text style={styles.bodyStyle}>Address</Text>
                      
                    </>
                  )}
              </View>
            </Spacer>
            <Card.Actions>
            <View style={{flex:1,flexDirection:'row',
    justifyContent: 'space-between',
    marginTop: 5,}}>
            <View >
            <Text style={styles.hyperlinkStyle} 
                   onPress={() => toggleDetails(index)}
                  labelStyle={{ color: '#ffffff' }}
                  
                >
                  
                  {item.showDetails ? 'Hide Details' : 'See More Details'}
                  </Text>
            </View>
            <View style={{alignContent:'flex-end'}} >
            {item.status === 'pending' ? (
              <Button
                style={{ backgroundColor: 'grey', borderColor: '#ffffff'}}
                labelStyle={{ color: '#ffffff' }}
              >
                Pending
              </Button>
            ) : (
              <Button
                style={{ backgroundColor: '#4faf5a', borderColor: '#ffffff' }}
                labelStyle={{ color: '#ffffff' }}
                onPress={() => navigation.navigate('Map')}
              >
                Track
              </Button>
              
            )}
            </View>
            </View>
          </Card.Actions>
          </Card.Content>
        </Card>
        ))}



      </View>
    </View>
    </ScrollView>
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
  },
  hyperlinkStyle:{
    color: '#4FAF5A',
    textDecorationLine: 'underline',
    alignItems:'flex-start',
    paddingTop:10
  }, 
  headerSection: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,   
    marginBottom:5,
  },
  headerText: {
    
    fontSize: 15,
    fontWeight: 'bold',
    textAlign:'center',
    color: '#000000', // Adjust text color as needed
  },
});