import { Text, View, StyleSheet, Alert, Modal, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Card, Divider, RadioButton, ProgressBar } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';
import { get, ref } from 'firebase/database';
import { FIREBASE_DATABASE } from '../../../../config/firebase';
import { Spacer } from '../../../spacer/spacer.component';
import { Slot } from '../../restaurants/components/restaurant-info-card.styles';

const ProgressBarSlot = ({ progress }) => (
  <View style={{ width: '92%', height: 5, borderRadius: 10, overflow: 'hidden' }}>
    <ProgressBar progress={progress} color={'#4FAF5A'} />
  </View>
);

export const DeliveryDetailsScreen = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFoodBank, setSelectedFoodBank] = useState(null);
  const [college, setCollege] = useState([]);
  const [ratioString, setRatioString] = useState([]);
  const [progressRatio, setProgressRatio] = useState([]);
  const [selected,setSelected]= useState([]);
  const { DonationDetails } = route.params;

  console.log(progressRatio[0])


  const handleAccept = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  


  fetchData = async () => {

    try {
      const dbRef = ref(FIREBASE_DATABASE, "checkpoint")
      const snapshot = await get(dbRef)
      if (snapshot.exists()) {
        const data = Object.values(snapshot.val())
        setCollege(data)
      } else {
        setCollege([])
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    // Calculate ratioString and progressRatio when college data changes
    const newRatioString = [];
    const newProgressRatio = [];

    college.forEach(collegeData => {
      const ratio = `${collegeData.available}/${collegeData.total}`;
      newRatioString.push(ratio);

      const progress = collegeData.total > 0 ? collegeData.available / collegeData.total : 0;
      newProgressRatio.push(progress);
    });

    setRatioString(newRatioString);
    setProgressRatio(newProgressRatio);
  }, [college]);

  useEffect(() => {
    fetchData();
  }, []);

  const data = [
    { key: '1', value: 'Nasi Berlauk' },
    { key: '2', value: 'Kuih Muih' },
    { key: '3', value: 'Nasi/Mee/Bihun/Kueytiaw Goreng' },
    { key: '4', value: 'Berkuah (laksa, mee kari, bihun sup dll)' },
    { key: '5', value: 'Goreng-goreng/Bakar-bakar' },
    { key: '6', value: 'Westen (pizza/spagetti,dll)' },
    { key: '7', value: 'Lain-lain' },
  ]

  return (

    // id student/rider/vendor

    <View style={styles.container}>
      {/* profile header */}
      <Text style={styles.pageTitle}>Delivery Details</Text>
      {/* Profile content goes here */}
      <View style={styles.profileSection}>
        <Text style={styles.profileText}></Text>
        <Card style={{ backgroundColor: '#ffffff', width: 350 }}>
          <Card.Content>
            <Spacer>

              <View style={styles.bodySection}>
                <Text style={styles.headerStyle}>Delivery Details</Text>
                <Text style={styles.subHeaderStyle}>Deliver food from:</Text>
                <Text style={styles.bodyStyle}>{DonationDetails.items.userName}</Text>
                <Divider style={styles.divider} />
                <Text style={styles.subHeaderStyle}>Vendor address:</Text>
                <Text style={styles.bodyStyle}>Lebuh IRC IOI Resort City, 62502 Putrajaya, Selangor</Text>
                <Divider style={styles.divider} />
                <Text style={styles.subHeaderStyle}>Food items:</Text>
                <Text style={styles.bodyStyle}>{DonationDetails.items.quantity}x {DonationDetails.items.foodItem}</Text>
                <Divider style={styles.divider} />
                <Text style={styles.subHeaderStyle}>Pickup Time:</Text>
                <Text style={styles.bodyStyle}>{DonationDetails.items.pickupTime}</Text>
                <Divider style={styles.divider} />
              </View>
            </Spacer>
            <Card.Actions>
              <Button style={{ borderColor: '#4faf5a' }} labelStyle={{ color: '#4faf5a' }}>Decline</Button>
              <Button onPress={handleAccept} style={{ backgroundColor: '#4faf5a' }}>Accept</Button>
            </Card.Actions>
          </Card.Content>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.blurredBackground}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Select food bank:</Text>
                  <RadioButton.Group
                    onValueChange={(value) => setSelectedFoodBank(value)}
                    value={selectedFoodBank}

                  >
                    <View >
                      <RadioButton.Item label="Kolej Canselor" value="KolejCanselor" style={{ paddingVertical: 4 }}
                        position="leading" labelStyle={{ textAlign: 'left', marginLeft: 0, fontSize: 14 }} />
                      <Slot><Text style={styles.subHeaderStyle}>{ratioString[1]}</Text></Slot>
                      <ProgressBarSlot progress={progressRatio[1]} />
                      <RadioButton.Item label="Kolej Tun Dr Ismail" value="KolejTunDrIsmail" style={{ paddingVertical: 4 }}
                        position="leading" labelStyle={{ textAlign: 'left', marginLeft: 0, fontSize: 14 }} />
                        <Slot><Text style={styles.subHeaderStyle}>{ratioString[5]}</Text></Slot>
                        <ProgressBarSlot progress={progressRatio[5]} />
                      <RadioButton.Item label="Kolej 12 & 14" value="Kolej12&14" style={{ paddingVertical: 4 }}
                        position="leading" labelStyle={{ textAlign: 'left', marginLeft: 0, fontSize: 14 }} />
                        <Slot><Text style={styles.subHeaderStyle}>{ratioString[0]}</Text></Slot>
                        <ProgressBarSlot progress={progressRatio[0]} />
                      <RadioButton.Item label="Kolej Mustafa Babjee" value="KolejMustafaBabjee" style={{ paddingVertical: 4 }}
                        position="leading" labelStyle={{ textAlign: 'left', marginLeft: 0, fontSize: 14 }} />
                        <Slot><Text style={styles.subHeaderStyle}>{ratioString[4]}</Text></Slot>
                        <ProgressBarSlot progress={progressRatio[4]} />
                      <RadioButton.Item label="Kolej Pendeta Za'ba" value="KolejPendetaZa'ba" style={{ paddingVertical: 4 }}
                        position="leading" labelStyle={{ textAlign: 'left', paddingLeft: 0, fontSize: 14 }} />
                        <Slot><Text style={styles.subHeaderStyle}>{ratioString[2]}</Text></Slot>
                        <ProgressBarSlot progress={progressRatio[2]} />
                        <RadioButton.Item label="Kolej Tan Sri Aishah Ghani" value="Kolej Tan Sri Aishah Ghani" style={{ paddingVertical: 4 }}
                        position="leading" labelStyle={{ textAlign: 'left', paddingLeft: 0, fontSize: 14 }} />
                        <Slot><Text style={styles.subHeaderStyle}>{ratioString[3]}</Text></Slot>
                        <ProgressBarSlot progress={progressRatio[3]} />
                    </View>
                  </RadioButton.Group>

                  <Text style={styles.modalText}>Assign volunteer:</Text>
                  <View style={{ paddingBottom: 20 }}>
                    <SelectList
                      placeholder="Select Item"
                      setSelected={(val) => setSelected(val)}
                      data={data}
                      save="value"

                    />
                  </View>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Save</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </Card>



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