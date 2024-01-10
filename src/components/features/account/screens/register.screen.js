import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ActivityIndicator, RadioButton, Button } from "react-native-paper";

import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  Title,
} from "../components/account.styles";
import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { Address } from "../../restaurants/components/restaurant-info-card.styles";

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [brn, setBrn] = useState("");
  const [college, setCollege] = useState("");
  const [address, setAddress] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [checked, setChecked] = useState("");
  const { onRegisterStudent, onRegisterVendor, onRegisterVolunteer, isLoading, error } = useContext(AuthenticationContext);
console.log(checked)
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
                <Button
                  style={styles.loginButton}
                  icon="email"
                  mode="contained"
                  onPress={() => onRegisterStudent(checked,name, email, college, password, repeatedPassword)}
                >
                  Sign Up
                </Button>
              ) : (
                <ActivityIndicator animating={true} color="green" />
              )}
            </Spacer>
          </>
        )}
        {checked === "Volunteer" && (
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
                label="Phone Number"
                value={phoneNumber}
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
                <Button
                  style={styles.loginButton}
                  mode="contained"
                  onPress={() => onRegisterVolunteer(checked,name, email, phoneNumber, password, repeatedPassword)}
                >
                  Sign Up
                </Button>

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
                <Button
                style={styles.loginButton}
                mode="contained"
                onPress={() => onRegisterVendor(checked,name, email, phoneNumber, brn, password, repeatedPassword, address)}
              >
                Sign Up
              </Button>

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
    padding: 5,
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