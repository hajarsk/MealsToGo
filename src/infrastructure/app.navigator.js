import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons'; 



import { SafeArea } from "../components/utility/safe-area.component";
import { FoodDonationScreen} from "../components/features/donate/screens/donate.screen"
import { RestaurantsNavigator } from "./restaurants.navigator";
import { MapScreen } from "../components/features/map/screens/map.screen";
import { ProfileScreen } from "../components/features/profile/screen/profile.screen";

//bottom bar setup on app

const Tab = createBottomTabNavigator();
const Donates="Food Details";
const TAB_ICON = {
  Home: "md-home-outline",
  // [Donates]: "md-add-circle-outline",
  // Map: "md-map-outline",
  Profile: "md-person-outline",
};


const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={18} color={color} />
      
    ),
    headerTitleAlign: 'center', // Add this line to center the header title
    headerStyle: {
      elevation: 4, // Set the elevation value as required
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
        {/* <Tab.Screen name= {Donates} component={FoodDonationScreen} />
      <Tab.Screen name="Map" component={MapScreen} /> */}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);