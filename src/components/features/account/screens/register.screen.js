import React, { useState, useContext } from "react";
import { View } from "react-native";
import { ActivityIndicator, Colors, RadioButton } from "react-native-paper";

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

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [brn, setBrn] = useState("");
  const [college, setCollege] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [checked, setChecked] = useState("");
  const { onRegisterStudent, onRegisterVendor, onRegisterVolunteer, isLoading, error } = useContext(AuthenticationContext);

  return (
    <AccountBackground>
      <AccountCover />
      <Title>Meals To Go</Title>
      <AccountContainer>
        <View style={{flexDirection:"row"}}>
          <RadioButton
            
            value="Student"
            status = {
              checked === "Student" ? "checked" : "unchecked"
            }
            onPress={() => setChecked("Student")}
          />
          <Text>Student</Text>
          <RadioButton
            value="Vendor"
            status = {
              checked === "Vendor" ? "checked" : "unchecked"
            }
            onPress={() => setChecked("Vendor")}
          />
          <Text>Vendor</Text>
          <RadioButton
            value="Volunteer"
            status = {
              checked === "Volunteer" ? "checked" : "unchecked"
            }
            onPress={() => setChecked("Volunteer")}
          />
          <Text>Volunteer</Text>
        </View>
        { checked === "Student" && (
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
            <AuthButton
              icon="email"
              mode="contained"
              onPress={() => onRegisterStudent(name, email, college, password, repeatedPassword)}
            >
              Register
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color="green" />
          )}
        </Spacer>
          </>
        )}
        { checked === "Volunteer" && (
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
            <AuthButton
              icon="email"
              mode="contained"
              onPress={() => onRegisterVolunteer(name, email, college, password, repeatedPassword)}
            >
              Register
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue300} />
          )}
        </Spacer>
          </>
        )}
        { checked === "Vendor" && (
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
              label="Business Registration Number"
              value={brn}
              autoCapitalize="none"
              onChangeText={(u) => setBrn(u)}
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
            <AuthButton
              icon="email"
              mode="contained"
              onPress={() => onRegisterVendor(name, email, college, password, repeatedPassword)}
            >
              Register
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue300} />
          )}
        </Spacer>
          </>
        )}
        
      </AccountContainer>
      <Spacer size="large">
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Back
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
};