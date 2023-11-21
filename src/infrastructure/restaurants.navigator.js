import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { RestaurantsScreen } from "../components/features/restaurants/screens/restaurant.screen";
import { RestaurantDetailScreen } from "../components/features/restaurants/screens/restaurant-detail.screen";

//drawer and card
const RestaurantStack = createStackNavigator();

export const RestaurantsNavigator = () => {
  return (
    <RestaurantStack.Navigator
      headerMode="none"
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <RestaurantStack.Screen
        options={{ headerShown: false }}
        name="Restaurants"
        component={RestaurantsScreen}
      />
       <RestaurantStack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
      />
    </RestaurantStack.Navigator>
  );
};