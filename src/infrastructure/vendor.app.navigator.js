import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, AntDesign , FontAwesome } from "@expo/vector-icons";

import { VendorNavigator } from "./vendor.navigator";
import { VendorProfileScreen } from "../screens/vendor/vendor-profile/vendor-profile.screen";
import { DonationFormScreen } from "../screens/vendor/food-donation-form/food-donation-form.screen"



//bottom bar setup on app

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Home: "home",
  Donate: "add-circle",
  Profile: "user-o"
};

const createScreenOptions = ({ route }) => {
  let tabBarIconComponent;

  // Conditionally set the icon based on the route name
  if (route.name === 'Donate') {
    tabBarIconComponent = ({ color }) => (
      <MaterialIcons name={TAB_ICON[route.name]} size={24} color={color} />
    );
  } else if (route.name === 'Home') {
    tabBarIconComponent = ({ color }) => (
      <AntDesign name={TAB_ICON[route.name]} size={24} color={color} />
    );
  } else if (route.name === 'Profile') {
    tabBarIconComponent = ({ color }) => (
      <FontAwesome name={TAB_ICON[route.name]} size={22} color={color} />
    );
  } 

  return {
    tabBarIcon: tabBarIconComponent,
    headerTitleAlign: 'center',
    headerStyle: {
      elevation: 4,
    },
  };
};

export const VendorAppNavigator = () => (
    <Tab.Navigator
      
      screenOptions={createScreenOptions}
      tabBarOptions={{
        activeTintColor: '#4FAF5A',
        inactiveTintColor: "grey",
        // showLabel: false,//disable icon text
      }} 
      tabBarStyle={{
        borderRadius:60
      }}
    >
      <Tab.Screen
        options={{headerShown: false }}
        name="Home" 
        component={VendorNavigator}
      />
      <Tab.Screen name="Donate" component={DonationFormScreen} />     
      <Tab.Screen name="Profile" component={VendorProfileScreen}  />
    </Tab.Navigator>
);