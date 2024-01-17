import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, AntDesign , FontAwesome } from "@expo/vector-icons";

import { StudentNavigator } from "./student.navigator";
import { StudentProfileScreen } from "../screens/student/student-profile/student-profile.screen";
import { ScanScreen } from "../screens/student/scan-qr/scan-qr.screen";



//bottom bar setup on app

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  HomeStudent: "home",
  Scan: "qr-code-scanner",
  Profile: "user-o"
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
  } 

  return {
    tabBarIcon: tabBarIconComponent,
    headerTitleAlign: 'center',
    headerStyle: {
      elevation: 4,
    },
  };
};

export const StudentAppNavigator = () => (
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
        name="HomeStudent" 
        component={StudentNavigator}
      />
      <Tab.Screen name="Scan" component={ScanScreen} />     
      <Tab.Screen name="Profile" component={StudentProfileScreen}  />
    </Tab.Navigator>
);