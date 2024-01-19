import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { RestaurantsScreen } from "../components/features/restaurants/screens/restaurant.screen";
import { RestaurantDetailScreen } from "../components/features/restaurants/screens/restaurant-detail.screen";
import { AnnouncementScreen } from "../components/features/announcement/screen/announcement.screen";
import { FoodDonationScreen } from "../components/features/donate/screens/donate.screen";
import { Notification } from "../components/features/restaurants/screens/notification.screen";
import { ScanScreen } from "../components/features/scan/screen/scan.screen";
import { TrackDeliveryScreen } from "../components/features/track/screen/track-delivery.screen";
import { MapScreen } from "../components/features/map/screens/map.screen";
import { DeliveryDetailsScreen } from "../components/features/delivery/screen/delivery-detail.screen";

//drawer and card
const RestaurantStack = createStackNavigator();

export const RestaurantsNavigator = () => {
  return (
    <RestaurantStack.Navigator
      headerShown="false"
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
      <RestaurantStack.Screen
        name="Announcement"
        component={AnnouncementScreen}
      />
      <RestaurantStack.Screen
        name="Scan"
        component={ScanScreen}
      />
      <RestaurantStack.Screen
        name="Notification"
        component={Notification}
      />
      <RestaurantStack.Screen
        name="DeliveryDetails"
        component={DeliveryDetailsScreen}
      />
      <RestaurantStack.Screen
        name="DonationDetails"
        component={FoodDonationScreen}
      />
      <RestaurantStack.Screen
        name="TrackDelivery"
        component={TrackDeliveryScreen}
      />
      <RestaurantStack.Screen
        name="Map"
        component={MapScreen}
      />
    </RestaurantStack.Navigator>
  );
};