import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons,MaterialIcons, AntDesign , FontAwesome } from "@expo/vector-icons";

import { FoodDonationScreen} from "../components/features/donate/screens/donate.screen"
import { RestaurantsNavigator } from "./restaurants.navigator";
import { MapScreen } from "../components/features/map/screens/map.screen";
import { ProfileScreen } from "../components/features/profile/screen/profile.screen";
import { ScanScreen } from "../components/features/scan/screen/scan.screen";
import { RestaurantDetailScreen } from "../components/features/restaurants/screens/restaurant-detail.screen";
import { TrackDeliveryScreen } from "../components/features/track/screen/track-delivery.screen";

//bottom bar setup on app

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Home: "home",
  Scan: "qr-code-scanner",
  Profile: "user-o",
  Delivery:"delivery-dining"
};

const createScreenOptions = ({ route }) => {
  let tabBarIconComponent;

  // Conditionally set the icon based on the route name
  if (route.name === 'Scan') {
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
  } else if (route.name === 'Delivery') {
    
    tabBarIconComponent = ({ color }) => (
      <MaterialIcons name={TAB_ICON[route.name]} size={24} color={color} />
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
        component={RestaurantsNavigator}
      />
        {/* <Tab.Screen name= {Donates} component={FoodDonationScreen} /> */}
      <Tab.Screen name="Scan" component={ScanScreen} />
      
      
      <Tab.Screen name="Delivery" component={TrackDeliveryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen}  />
    </Tab.Navigator>
);