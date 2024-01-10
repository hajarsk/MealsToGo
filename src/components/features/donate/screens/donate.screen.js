import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { FIREBASE_DATABASE } from '../../../../config/firebase';
import { push, ref as databaseRef } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { setupNotification } from '../../restaurants/components/notification.component';

export const FoodDonationScreen = ({ navigation }) => {
  const [selected, setSelected] = useState('');
  const [quantity, setQuantity] = useState('');
  const [weight, setWeight] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [foodConcerns, setFoodConcerns] = useState([]);

  const sendDonationDetailsToDatabase = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      const userId = user.uid;
      const userName = user.displayName;

      const postData = {
        userId: userId,
        userName: userName,
        foodItem: selected,
        quantity: quantity,
        weight: weight,
        expirationDate: expirationDate,
        pickupTime: pickupTime,
        foodConcerns: foodConcerns
      }
      const dbRef = databaseRef(FIREBASE_DATABASE, "Donation_Details")
      await push(dbRef, postData)
      console.log("data send successful!")
     
      navigation.goBack()
    } catch (error) {
      console.error(error)
    }
  }

  const handleDonation = () => {
    console.log(`Selected: ${selected},Quantity: ${quantity}, Weight: ${weight},Expiration Date: ${expirationDate}, Pickup Time: ${pickupTime}, Food Concerns: ${foodConcerns}`);
    sendDonationDetailsToDatabase()
    setupNotification()
    setQuantity('');
    setWeight('');
    setExpirationDate('');

  };

  const handlePickupTimeChange = (selectedPickupTime) => {
    setPickupTime(selectedPickupTime);
  };

  const handleFoodConcernChange = (selectedFoodConcern) => {
    if (foodConcerns.includes(selectedFoodConcern)) {
      setFoodConcerns(foodConcerns.filter((concern) => concern !== selectedFoodConcern));
    } else {
      setFoodConcerns((prevConcerns) => [...prevConcerns, selectedFoodConcern]);
    }
  };

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
    <View style={styles.container}>
      <View style={styles.formContainer}>
        {/* food concerns header */}


        <Text style={styles.pickupTimeHeader}>Food Item</Text>

        <View style={{ paddingBottom: 20 }}>
          <SelectList

            placeholder="Select Item"
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
          onChangeText={(text) => setQuantity(text)}
        />

        {/* food weight header */}
        <Text style={styles.pickupTimeHeader}>Food Weight (kg)</Text>
        <TextInput
          style={styles.input}
          placeholder="Eg: 0.5"
          keyboardType="numeric"
          value={weight}
          onChangeText={(text) => setWeight(text)}
        />

        {/* Food Expiration Date header */}
        <Text style={styles.pickupTimeHeader}>Food Expiration Date</Text>
        <TextInput
          style={styles.input}
          placeholder="Eg: 2 hours"
          value={expirationDate}
          onChangeText={(text) => setExpirationDate(text)}
        />

        {/* pickup time header */}
        <Text style={styles.pickupTimeHeader}>
          Pickup Time
        </Text>


        {/* food concern buttons */}
        <View style={styles.foodConcernsButtons}>
          <TouchableOpacity
            style={styles.foodConcernButton}
            onPress={() => handlePickupTimeChange('10:00 AM')}
          >
            <Text style={styles.foodConcernButtonText}>10:00 AM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.foodConcernButton}
            onPress={() => handlePickupTimeChange('4:00 PM')}
          >
            <Text style={styles.foodConcernButtonText}>4:00 PM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.foodConcernButton}
            onPress={() => handlePickupTimeChange('10:00 PM')}
          >
            <Text style={styles.foodConcernButtonText}>10:00 PM</Text>
          </TouchableOpacity>

        </View>
        


        {/* food concerns header */}
        <Text style={styles.pickupTimeHeader}>
          Food Concerns
        </Text>

        {/*Food concerns buttons */}
        <View style={styles.foodConcernsButtons}>
          <TouchableOpacity
            style={styles.foodConcernButton}
            onPress={() => handleFoodConcernChange('Gluten')}
          >
            <Text style={styles.foodConcernButtonText}>Gluten</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.foodConcernButton}
            onPress={() => handleFoodConcernChange('Lactose')}
          >
            <Text style={styles.foodConcernButtonText}>Lactose</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.foodConcernButton}
            onPress={() => handleFoodConcernChange('Vegetarian')}
          >
            <Text style={styles.foodConcernButtonText}>Vegetarian</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.foodConcernButton}
            onPress={() => handleFoodConcernChange('Nut')}
          >
            <Text style={styles.foodConcernButtonText}>Nut</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.foodConcernButton}
            onPress={() => handleFoodConcernChange('Allergen')}
          >
            <Text style={styles.foodConcernButtonText}>Allergen</Text>
          </TouchableOpacity>
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
    paddingTop: 30,
    alignItems: 'center',
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


