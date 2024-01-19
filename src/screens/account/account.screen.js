import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";

import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  Title,
} from "../account/account.style";
import { TouchableOpacity } from "react-native";

export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <AccountCover />
      <Title>ShareCare</Title>
      <AccountContainer>
      <TouchableOpacity  style={styles.loginButton} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={styles.outlinedButton} onPress={() => navigation.navigate("Register")}>
          <Text style={styles.outlinedButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </AccountContainer>
    </AccountBackground>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    
    // padding: 5,
    // marginTop: 15,
    // borderRadius: 50,
    // alignItems: 'center',
    width: 300,
    backgroundColor: '#4FAF5A',
    padding: 15,
    marginTop: 15,
    borderRadius: 50,
    alignItems: 'center',

  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  outlinedButton: {
    backgroundColor: 'transparent',
    borderColor: '#4FAF5A',
    borderWidth: 1.5,
    padding: 15,
    marginTop: 15,
    borderRadius: 50,
    alignItems: 'center',
    width: 300
  },
  outlinedButtonText: {
    color: '#4FAF5A',
    fontSize: 18,
  },
});