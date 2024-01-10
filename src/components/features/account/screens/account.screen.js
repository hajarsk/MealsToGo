import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

import { Spacer } from "../../../spacer/spacer.component";
import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
  Title,
} from "../components/account.styles";

export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <AccountCover />
      <Title>ShareCare</Title>
      <AccountContainer>

        <Button
          style={styles.loginButton}
          labelStyle={styles.buttonText}
          mode="contained"
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </Button>
        <Button
          style={styles.outlinedButton}
          labelStyle={styles.outlinedButtonText}
          mode="contained"
          onPress={() => navigation.navigate("Register")}
        >
          Sign Up
        </Button>
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
    width:300
    
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  outlinedButton: {
    backgroundColor: 'transparent',
    borderColor: '#4FAF5A', 
    borderWidth: 1.5, 
    padding: 5,
    marginTop: 15,
    borderRadius: 50,
    alignItems: 'center',
    width:300
  },
  outlinedButtonText: {
    color: '#4FAF5A',
    fontSize: 16,
  },
});