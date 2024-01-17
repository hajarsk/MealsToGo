import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AccountScreen } from "../screens/account/account.screen";
import { LoginScreen } from "../screens/account/login.screen";
import { RegisterScreen } from "../screens/account/register.screen";

const Stack = createStackNavigator();

export const AccountNavigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Main" component={AccountScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);