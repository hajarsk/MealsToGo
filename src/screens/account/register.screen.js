import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ActivityIndicator, RadioButton, Button } from "react-native-paper";
import { SelectList } from 'react-native-dropdown-select-list';

import { FIREBASE_FIRESTORE } from "../../config/firebase";
import { collection, addDoc as firestoreDoc, getDocs } from "firebase/firestore"

import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  Title,
} from "../account/account.style";
import { Text } from "../../components/typography/text.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../services/authentication/authentication.context";


export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [brn, setBrn] = useState("");
  const [selected, setSelected] = useState("");
  const [college, setCollege] = useState("");
  const [address, setAddress] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [checked, setChecked] = useState("");
  const { onRegisterStudent, onRegisterVendor, onRegisterVolunteer, isLoading, error } = useContext(AuthenticationContext);


  const studentData = {
    id: Math.floor(Math.random() * 900000) + 100000,
    role: checked,
    name: name,
    email: email,
    college: college,
    register: false
  }
  const vendorData = {
    role: checked,
    name: name,
    email: email,
    brn: brn,
    phoneNumber: phoneNumber,
    address: address,
    verify: false,
    register: false
  }
  const volunteerData = {
    id: Math.floor(Math.random() * 900000) + 100000,
    role: checked,
    name: name,
    email: email,
    phoneNumber: phoneNumber,
    associationName: selected,
    register: false
  }

  const sendDataToDatabase = async () => {

    const postCollection = collection(FIREBASE_FIRESTORE, "users")

    try {
      if (checked == "student") {
        firestoreDoc(postCollection, studentData).then((docRef) => {
          console.log("done send data")
        })
        onRegisterStudent(email, password, repeatedPassword)

      } else if (checked == "volunteer") {
        firestoreDoc(postCollection, volunteerData).then((docRef) => {
          console.log("done send data")
        })
        onRegisterVolunteer(email, password, repeatedPassword)
      } else {
        firestoreDoc(postCollection, vendorData).then((docRef) => {
          console.log("done send data")
        })
        onRegisterVendor(email, password, repeatedPassword)
      }
    } catch (error) {
      console.error(error)
    }
  }
  console.log(checked)

  const data = [
    { key: '1', value: 'Persatuan Belia Harmoni' },
    { key: '2', value: 'Kelab Rakan Siswa' },
    { key: '3', value: 'Kelab Penyayang' },

  ]

  return (
    <AccountBackground>
      <AccountCover />
      <Title>ShareCare</Title>
      <AccountContainer>
        <View style={{ flexDirection: "row" }}>
          <RadioButton

            value="Student"
            status={
              checked === "Student" ? "checked" : "unchecked"
            }
            onPress={() => setChecked("Student")}
          />
          <Text>Student</Text>
          <RadioButton
            value="Vendor"
            status={
              checked === "Vendor" ? "checked" : "unchecked"
            }
            onPress={() => setChecked("Vendor")}
          />
          <Text>Vendor</Text>
          <RadioButton
            value="Volunteer"
            status={
              checked === "Volunteer" ? "checked" : "unchecked"
            }
            onPress={() => setChecked("Volunteer")}
          />
          <Text>Volunteer</Text>
        </View>
        {checked === "Student" && (
          <>
            <Spacer size="large">
              <AuthInput
                label="Name"
                value={name}
                autoCapitalize="none"
                onChangeText={(u) => setName(u)}
              />
            </Spacer>
            <Spacer size="large">
              <AuthInput
                label="UPM Email"
                value={email}
                textContentType="emailAddress"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(u) => setEmail(u)}
              />
            </Spacer>
            <Spacer size="large">
              <AuthInput
                label="College"
                value={college}
                autoCapitalize="none"
                onChangeText={(u) => setCollege(u)}
              />
            </Spacer>
            <Spacer size="large">
              <AuthInput
                label="Password"
                value={password}
                textContentType="password"
                secureTextEntry
                autoCapitalize="none"
                onChangeText={(p) => setPassword(p)}
              />
            </Spacer>
            <Spacer size="large">
              <AuthInput
                label="Repeat Password"
                value={repeatedPassword}
                textContentType="password"
                secureTextEntry
                autoCapitalize="none"
                onChangeText={(p) => setRepeatedPassword(p)}
              />
            </Spacer>
            {error && (
              <ErrorContainer size="large">
                <Text variant="error">{error}</Text>
              </ErrorContainer>
            )}
            <Spacer size="large">
              {!isLoading ? (
                <TouchableOpacity style={styles.loginButton} onPress={() => sendDataToDatabase()}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

              ) : (
                <ActivityIndicator animating={true} color="green" />
              )}
            </Spacer>
          </>
        )}
        {checked === "Volunteer" && (
          <>
            <Spacer size="large">
              <View>
                <SelectList

                  placeholder="Select Association"
                  setSelected={(val) => setSelected(val)}
                  data={data}
                  save="value"

                />
              </View>
            </Spacer>
            <Spacer size="small">
              <AuthInput
                label="Name"
                value={name}
                autoCapitalize="none"
                placeholder="Alia Hassan"
                onChangeText={(u) => setName(u)}
              />
            </Spacer>
            <Spacer size="large">
              <AuthInput
                label="UPM Email"
                value={email}
                textContentType="emailAddress"
                keyboardType="email-address"

                autoCapitalize="none"
                onChangeText={(u) => setEmail(u)}
              />
            </Spacer>
            <Spacer size="large">
              <AuthInput
                label="Phone Number"
                value={phoneNumber}
                keyboardType="numeric"
                autoCapitalize="none"

                onChangeText={(u) => setPhoneNumber(u)}
              />
            </Spacer>
            <Spacer size="large">
              <AuthInput
                label="Password"
                value={password}
                textContentType="password"
                secureTextEntry
                autoCapitalize="none"
                onChangeText={(p) => setPassword(p)}
              />
            </Spacer>
            <Spacer size="large">
              <AuthInput
                label="Repeat Password"
                value={repeatedPassword}
                textContentType="password"
                secureTextEntry
                autoCapitalize="none"
                onChangeText={(p) => setRepeatedPassword(p)}
              />
            </Spacer>
            {error && (
              <ErrorContainer size="large">
                <Text variant="error">{error}</Text>
              </ErrorContainer>
            )}
            <Spacer size="large">
              {!isLoading ? (
                <TouchableOpacity style={styles.loginButton} onPress={() => sendDataToDatabase()}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

              ) : (
                <ActivityIndicator animating={true} color="#456876" />
              )}
            </Spacer>
          </>
        )}
        {checked === "Vendor" && (
          <>
            <Spacer size="medium">
              <AuthInput
                label="Restaurant Name"
                value={name}
                autoCapitalize="none"
                onChangeText={(u) => setName(u)}
              />
            </Spacer>
            <Spacer size="medium">
              <AuthInput
                label="Email"
                value={email}
                textContentType="emailAddress"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(u) => setEmail(u)}
              />
            </Spacer>
            <Spacer size="medium">
              <AuthInput
                label="Phone Number"
                value={phoneNumber}
                autoCapitalize="none"
                onChangeText={(u) => setPhoneNumber(u)}
              />
            </Spacer>
            <Spacer size="medium">
              <AuthInput
                label="Business Registration Number"
                value={brn}
                autoCapitalize="none"
                onChangeText={(u) => setBrn(u)}
              />
            </Spacer>
            <Spacer size="medium">
              <AuthInput
                label="Password"
                value={password}
                textContentType="password"
                secureTextEntry
                autoCapitalize="none"
                onChangeText={(p) => setPassword(p)}
              />
            </Spacer>
            <Spacer size="medium">
              <AuthInput
                label="Repeat Password"
                value={repeatedPassword}
                textContentType="password"
                secureTextEntry
                autoCapitalize="none"
                onChangeText={(p) => setRepeatedPassword(p)}
              />
            </Spacer>
            <Spacer size="medium">
              <AuthInput
                label="Restaurant Address"
                value={address}
                autoCapitalize="none"
                onChangeText={(u) => setAddress(u)}
              />
            </Spacer>
            {error && (
              <ErrorContainer size="large">
                <Text variant="error">{error}</Text>
              </ErrorContainer>
            )}
            <Spacer size="large">
              {!isLoading ? (
                <TouchableOpacity style={styles.loginButton} onPress={() => sendDataToDatabase()}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

              ) : (
                <ActivityIndicator animating={true} color="#000000" />
              )}
            </Spacer>
          </>
        )}
        <Spacer size="large">
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#000000' }}>
              Don't have an account?
            </Text>
            <Text style={{ color: '#000000' }}> </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{ color: '#4FAF5A', fontWeight: 'bold', }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};

const styles = StyleSheet.create({
  loginButton: {
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
});