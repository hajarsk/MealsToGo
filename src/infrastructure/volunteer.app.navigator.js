import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

import { VolunteerNavigator } from "./volunteer.navigator";
import { VolunteerProfileScreen } from "../screens/volunteer/volunteer-profile/volunteer-profile.screen";
import { UploadPhotoScreen } from "../screens/volunteer/upload-photo-proof/upload-photo.screen";
import { MyDeliveryScreen } from "../screens/volunteer/my-delivery/my-delivery.screen";



//bottom bar setup on app

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Home: "home",
  Profile: "user-o",
  MyDelivery: "motorcycle"
};

const createScreenOptions = ({ route }) => {
  let tabBarIconComponent;

  // Conditionally set the icon based on the route name
  if (route.name === 'Home') {
    tabBarIconComponent = ({ color }) => (
      <AntDesign name={TAB_ICON[route.name]} size={24} color={color} />
    );
  } else if (route.name === 'Profile') {
    tabBarIconComponent = ({ color }) => (
      <FontAwesome name={TAB_ICON[route.name]} size={22} color={color} />
    );
  } else if (route.name === 'MyDelivery') {
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
    tabBarActiveTintColor: '#4FAF5A',
    tabBarInactiveTintColor: 'grey',
    tabBarStyle: [
      { display: 'flex' },
      null
    ],
  };
};

export const VolunteerAppNavigator = () => (
  <Tab.Navigator
    screenOptions={createScreenOptions}
    tabBarStyle={{
      borderRadius: 60,
    }}
  >
    <Tab.Screen
      options={{ headerShown: false }}
      name="Home"
      component={VolunteerNavigator}
    />
    <Tab.Screen name="MyDelivery" component={MyDeliveryScreen} />
    <Tab.Screen name="Profile" component={VolunteerProfileScreen} />
  </Tab.Navigator>
)