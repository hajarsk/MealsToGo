import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

export const FoodDonationScreen = () => {
  const [selected, setSelected] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [foodConcerns, setFoodConcerns] = useState([]);


  const handleDonation = () => {
    console.log(`Selected: ${selected},Quantity: ${quantity}, Expiration Date: ${expirationDate}, Pickup Time: ${pickupTime}, Food Concerns: ${foodConcerns}`);

    setQuantity('');
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
    { key: '1', value: 'house' },
    { key: '2', value: 'Appliances' },
    { key: '3', value: 'Cameras' },
    { key: '4', value: 'Computers' },
    { key: '5', value: 'Vegetables' },
    { key: '6', value: 'Diary Products' },
    { key: '7', value: 'Drinks' },
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
            onSelect={() => alert(selected)}
          />
        </View>

        {/* food concerns header */}
        <Text style={styles.pickupTimeHeader}>Food Quantity</Text>
        <TextInput
          style={styles.input}
          placeholder="Eg: 250"
          keyboardType="numeric"
          value={quantity}
          onChangeText={(text) => setQuantity(text)}
        />

        {/* food concerns header */}
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


        {/* pickup time buttons */}
        <View style={styles.foodConcernsButtons}>
          <TouchableOpacity
            style={styles.foodConcernButton}
            onPress={() => handlePickupTimeChange('Morning')}
          >
            <Text style={styles.foodConcernButtonText}>10:00 AM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.foodConcernButton}
            onPress={() => handlePickupTimeChange('Evening')}
          >
            <Text style={styles.foodConcernButtonText}>4:00 PM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.foodConcernButton}
            onPress={() => handlePickupTimeChange('Night')}
          >
            <Text style={styles.foodConcernButtonText}>10:00 PM</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.foodConcernsButtons}>
          <TouchableOpacity
            style={styles.foodConcernButton}
            onPress={() => handlePickupTimeChange('Morning')}
          >
            <Text style={styles.foodConcernButtonText}>10:00 AM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.foodConcernButton}
            onPress={() => handlePickupTimeChange('Evening')}
          >
            <Text style={styles.foodConcernButtonText}>4:00 PM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.foodConcernButton}
            onPress={() => handlePickupTimeChange('Night')}
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
            onPress={() => handleFoodConcernChange('Dairy')}
          >
            <Text style={styles.foodConcernButtonText}>Dairy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.foodConcernButton}
            onPress={() => handleFoodConcernChange('Egg')}
          >
            <Text style={styles.foodConcernButtonText}>Egg</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.foodConcernButton}
            onPress={() => handleFoodConcernChange('Gluten')}
          >
            <Text style={styles.foodConcernButtonText}>Gluten</Text>
          </TouchableOpacity>
          {/* Other food concerns */}
        </View>


        <TouchableOpacity style={styles.donationButton} onPress={handleDonation}>
          <Text style={styles.buttonText}>Donate Now</Text>
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


