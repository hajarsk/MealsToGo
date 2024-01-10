import React, { useState, useContext } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { ActivityIndicator, Colors, Button } from "react-native-paper";

import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  Title,
} from "../components/account.styles";
import { Spacer } from "../../../spacer/spacer.component";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { Oswald_600SemiBold } from "@expo-google-fonts/oswald";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, error, isLoading } = useContext(AuthenticationContext);
  return (
    <AccountBackground>
      <AccountCover />
      <Title>ShareCare</Title>
      <AccountContainer>
        <AuthInput
          label="Email"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(u) => setEmail(u)}
          style={{ backgroundColor: 'transparent', }}
          
        />
        <Spacer size="large">
          <AuthInput
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p) => setPassword(p)}
            style={{ backgroundColor: 'transparent' }}
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
              labelStyle={styles.buttonText}
              mode="contained"
              onPress={() => onLogin(email, password)}
            >
              Login
            </Button>
          ) : (
            <ActivityIndicator animating={true} color="#000000" />
          )}
        </Spacer>
        <Spacer size="large">
          
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#000000'}}>
                Don't have an account?
              </Text>
              <Text style={{ color: '#000000' }}> </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={{ color: '#4FAF5A',fontWeight:'bold', }}>
                Sign Up
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
    fontSize: 16,
  },
});


