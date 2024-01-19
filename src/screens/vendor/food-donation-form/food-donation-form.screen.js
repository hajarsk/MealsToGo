import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { push, ref as databaseRef } from 'firebase/database';
import { getAuth } from 'firebase/auth';

import { FIREBASE_DATABASE } from '../../../config/firebase';
// import { setupNotification } from '../../vendor/notification-list/notification-component';

export const DonationFormScreen = ({ navigation }) => {
  const [selected, setSelected] = useState('');
  const [quantity, setQuantity] = useState('');
  const [weight, setWeight] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [foodConcerns, setFoodConcerns] = useState([]);

  const handleDonation = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      const userId = user.uid;
      const userName = user.displayName;

      const postData = {
        status: "pending",
        userId: userId,
        userName: userName,
        foodItem: selected,
        quantity: quantity,
        weight: weight,
        expirationDate: expirationDate,
        pickupTime: pickupTime,
        foodConcerns: foodConcerns,
        deliveryDate: deliveryDate
      }
      const dbRef = databaseRef(FIREBASE_DATABASE, "Donation_Details")
      await push(dbRef, postData)
      console.log("data send successful!");

      setSelected('');
      setQuantity('');
      setWeight('');
      setExpirationDate('');
      setPickupTime('');
      setFoodConcerns([]);

      navigation.goBack();
    } catch (error) {
      console.error(error)
    }

  };

  const currentDate= new Date();
      const options = { timeZone: 'Asia/Kuala_Lumpur' };
    const deliveryDate = currentDate.toLocaleString('en-US', options);


  const data = [
    { key: '1', value: 'Nasi Berlauk' },
    { key: '2', value: 'Kuih Muih' },
    { key: '3', value: 'Nasi/Mee/Bihun/Kueytiaw Goreng' },
    { key: '4', value: 'Berkuah (laksa, mee kari, bihun sup dll)' },
    { key: '5', value: 'Goreng-goreng/Bakar-bakar' },
    { key: '6', value: 'Westen (pizza/spagetti,dll)' },
    { key: '7', value: 'Lain-lain' },
  ]

  const pickupTimeData = [
    { key: '1', value: '8:00 AM' },
    { key: '2', value: '10:00 AM' },
    { key: '3', value: '12:00 PM' },
    { key: '4', value: '2:00 PM' },
    { key: '5', value: '4:00 PM' },
    { key: '6', value: '6:00 PM' },
    { key: '7', value: '8:00 PM' },
    { key: '8', value: '9:00 PM' },
    { key: '9', value: '10:00 PM' },
    { key: '10', value: '11:00 PM' },
  ];

  const foodConcernsData = [
    { key: '1', value: 'Gluten' },
    { key: '2', value: 'Lactose' },
    { key: '3', value: 'Vegetarian' },
    { key: '4', value: 'Nut' },
    { key: '5', value: 'Allergen' },
    { key: '6', value: 'Meat' },
    { key: '7', value: 'Dairy' },
    { key: '5', value: 'Non-Halal' },
  ];




  return (
    <View style={styles.container}>

      <View style={styles.formContainer}>
        {/* food concerns header */}
        <Text style={styles.pickupTimeHeader}>Food Item</Text>
        <View style={{ paddingBottom: 20 }}>
          <SelectList
            placeholder="Select Food Item"
            setSelected={(val) => setSelected(val)}
            data={data}
            save="value"
          />
        </View>

        {/* food Quantity header */}
        <Text style={styles.pickupTimeHeader}>Food Quantity</Text>
        <TextInput
          style={styles.input}
          placeholder="Eg: 250"
          keyboardType="numeric"
          value={quantity}
          onChangeText={(text) => {
            // Use a regular expression to allow only numeric values
            const numericValue = text.replace(/[^0-9]/g, '');
            setQuantity(numericValue);
          }}
        />

        {/* food weight header */}
        <Text style={styles.pickupTimeHeader}>Weight (kg)</Text>
        <TextInput
          style={styles.input}
          placeholder="Eg: 0.5"
          keyboardType="numeric"
          value={weight}
          onChangeText={(text) => setWeight(text)}
        />

        {/* Food Expiration Date header */}
        <Text style={styles.pickupTimeHeader}>Shelf Life (in Hours)</Text>
        <TextInput
          style={styles.input}
          placeholder="Eg: 2 hours"
          keyboardType="numeric"
          value={expirationDate}
          onChangeText={(text) => setExpirationDate(text)}
        />

        {/* pickup time dropdown */}
        <Text style={styles.pickupTimeHeader}>
          Pickup Time
        </Text>
        <View style={{ paddingBottom: 20 }}>
          <SelectList
            placeholder="Select Pickup Time"
            setSelected={(val) => setPickupTime(val)}
            data={pickupTimeData}
            save="value"
          />
        </View>

        {/* Food Concerns Dropdown */}
        <Text style={styles.pickupTimeHeader}>Food Concerns</Text>
        <View style={{ paddingBottom: 20 }}>
          <SelectList
            placeholder="Select Food Concerns"
            setSelected={(val) => setFoodConcerns(val)}
            data={foodConcernsData}
            save="key" // Use "key" to save the selected key
            canDeselect={true} // Allow deselecting concerns
            multiple={true} // Allow multiple selections
          />
        </View>

        <TouchableOpacity style={styles.donationButton} onPress={handleDonation}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>


      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,

    paddingLeft: 10,
  },
  donationButton: {
    backgroundColor: '#4FAF5A',
    padding: 15,
    marginTop: 15,
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  containerPickupTime: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  pickupTimeHeader: {
    marginBottom: 10,
    marginTop: -5,
    color: 'black',
    fontWeight: 'bold',
  },
  pickupTimeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  pickupTimeButton: {

    backgroundColor: 'white',
    borderColor: 'grey',
    borderRadius: 2,
    padding: 10,
    fontWeight: 'bold',


  },
  pickupTimeButtonText: {
    color: 'grey',
    fontWeight: 'bold',
  },
  foodConcernsButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
  },
  foodConcernButton: {
    borderWidth: 1, // Set border width
    borderColor: 'grey', // 
    paddingHorizontal: 20,
    padding: 12,
    borderRadius: 10,
    margin: 8,
  },
  foodConcernButtonText: {
    color: 'grey',

  },
});


