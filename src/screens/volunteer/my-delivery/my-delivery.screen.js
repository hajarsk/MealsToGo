import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Card, Divider } from 'react-native-paper';
import { Spacer } from '../../../components/spacer/spacer.component';
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import { FIREBASE_DATABASE } from '../../../config/firebase';
import { getAuth } from 'firebase/auth';

export const MyDeliveryScreen = ({ navigation }) => {
  const [volunteer, setVolunteer] = useState([]);

  useEffect(() => {
    const fetchDonationDetails = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      const userId = user.uid;

      const dbRef = ref(FIREBASE_DATABASE);
      try {
        const snapshot = await get(child(dbRef, 'Donation_Details'));
        if (snapshot.exists()) {
          const retrieveData = snapshot.val();
          const dataArray = Object.entries(retrieveData).map(([docPath, item]) => ({
            ...item,
            docPath, // Include the document path in each item
          }));
          // Filter donation details based on volunteerID
          const filteredData = dataArray.filter(item => {
            console.log("Volunteer Assign:", item.volunteerID); // log volunteerID
            return item.volunteerID === userId;
          });
          console.log(userId);
          setVolunteer(filteredData);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchDonationDetails();
  }, []);

  const toggleDetails = (index) => {
    setVolunteer((preVolunteer) =>
      preVolunteer.map((item, i) =>
        i === index ? { ...item, showDetails: !item.showDetails } : item
      )
    );
  };

  return (
    // id student/rider/vendor
    <View style={styles.container}>

      {/* Profile content goes here */}
      <View style={styles.profileSection}>
        {volunteer.map((item, index) => (
          <Card key={item.id} style={{ backgroundColor: '#ffffff', width: 365, marginVertical: 8 }}>
            {/* Header Section */}
            <View style={styles.headerSection}>
              <Text style={styles.headerText}>Delivery Summary</Text>
            </View>
            <Card.Content>
              <Spacer size={"large"}>
                <View style={styles.bodySection}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.bodyStyle}>{item.deliveryDate}</Text>

                  </View>
                  <Divider style={styles.divider} />
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>

                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View >
                      <Spacer size="small">
                        <Text style={styles.subHeaderStyle}>Pickup Time:</Text>
                        <Text style={styles.bodyStyle}>{item.pickupTime}</Text>
                      </Spacer>
                    </View>
                    <View style={{ alignContent: 'flex-end' }}>
                      {item.status === "delivered" ? <Text style={styles.subHeaderFont}>Delivered</Text> : (
                        <Button
                          style={{ backgroundColor: '#4faf5a', borderColor: '#ffffff', marginTop: 7 }}
                          labelStyle={{ color: '#ffffff' }}
                          onPress={() => navigation.navigate('Scan Qr at Checkpoint', { DocumentPath: item })}
                        >
                          Confirm Delivery
                        </Button>
                      )}
                    </View>
                  </View>

                  {item.showDetails && (
                    <>

                      <Divider style={styles.divider} />
                      <Spacer size="medium">
                        <Text style={styles.subHeaderStyle}>Deliver Food To:</Text>
                        <Text style={styles.bodyStyle}>{item.checkpoint}, Universiti Putra Malaysia</Text>
                      </Spacer>
                      <Divider style={styles.divider} />
                      <Spacer size="medium">
                        <Text style={styles.subHeaderStyle}>Food Item:</Text>
                        <Text style={styles.bodyStyle}>{item.quantity}x {item.foodItem}</Text>
                      </Spacer>
                    </>
                  )}
                </View>

              </Spacer>
              <Card.Actions>
                <View style={{
                  flex: 1, flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 5,
                }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Text
                      style={styles.hyperlinkStyle}
                      onPress={() => toggleDetails(index)}
                      labelStyle={{ color: '#ffffff' }}
                    >

                      {item.showDetails ? 'Hide Details' : 'See More Details'}
                    </Text>
                  </View>

                </View>
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

  subHeaderFont: {
    paddingTop: 20,
    fontSize: 17,
    color: 'green',

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
  headerSection: {
    backgroundColor: '#a0ca85',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 8,
  },
  headerText: {

    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000', // Adjust text color as needed
  },
  hyperlinkStyle: {
    color: '#4FAF5A',
    textDecorationLine: 'underline',
    alignItems: 'flex-start',
    paddingTop: 10
  },
});