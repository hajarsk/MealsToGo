import React, { useContext, useEffect, useState } from "react";
import { Text } from "react-native"
import { NavigationContainer } from "@react-navigation/native";

import { AuthenticationContext } from "../services/authentication/authentication.context";
import { StudentAppNavigator } from "./student.app.navigator";
import { VendorAppNavigator } from "./vendor.app.navigator";
import { VolunteerAppNavigator } from "./volunteer.app.navigator";
import { AccountNavigator } from "./account.navigator";

import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const Navigation = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  const [userRole, setUserRole] = useState("loading");
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const user = getAuth().currentUser;

        if (user) {
          const db = getFirestore();
          const userCollection = collection(db, 'users');
          const userQuery = query(userCollection, where('email', '==', user.email));

          const querySnapshot = await getDocs(userQuery);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setUserRole(userData.role);
            
          } else {
            console.error('User document not found.');
          }
        }
        
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };
    console.log(userRole)
    fetchUserRole();
    setIsLoading(false);
  }, [isAuthenticated, userRole, isLoading]);

  let AppNavigator;

  switch (userRole) {
    case "Student":
      AppNavigator = StudentAppNavigator;
      break;
    case "Vendor":
      AppNavigator = VendorAppNavigator;
      break;
    case "Volunteer":
      AppNavigator = VolunteerAppNavigator;
      break;
    default:
      AppNavigator = AccountNavigator;
  }

  return (
    <NavigationContainer>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : isAuthenticated ? (
        <AppNavigator />
      ) : (
        <AccountNavigator />
      )}
    </NavigationContainer>
  );
};