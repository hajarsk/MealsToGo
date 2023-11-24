import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Foundation } from "@expo/vector-icons";

import { FoodDonationScreen} from "../components/features/donate/screens/donate.screen"
import { RestaurantsNavigator } from "./restaurants.navigator";
import { MapScreen } from "../components/features/map/screens/map.screen";
import { ProfileScreen } from "../components/features/profile/screen/profile.screen";

//bottom bar setup on app

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Home: "home",
  
  Map: "md-map-outline",
  Profile: "md-person-outline",
};


const createScreenOptions = ({ route }) => {
  let tabBarIconComponent;

  // Conditionally set the icon based on the route name
  if (route.name === 'Map' || route.name === 'Profile') {
    tabBarIconComponent = ({ size, color }) => (
      <Ionicons name={TAB_ICON[route.name]} size={size} color={color} />
    );
  } else if (route.name === 'Home') {
    tabBarIconComponent = ({ size, color }) => (
      <Foundation name={TAB_ICON[route.name]} size={size} color={color} />
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

export const AppNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator
      
      screenOptions={createScreenOptions}
      tabBarOptions={{
        activeTintColor: '#4FAF5A',
        inactiveTintColor: "gray",
        
      }}
    >
      <Tab.Screen
        options={{headerShown: false }}
        name="Home" 
        component={RestaurantsNavigator}
      />
        {/* <Tab.Screen name= {Donates} component={FoodDonationScreen} /> */}
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);