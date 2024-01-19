import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { VendorCheckpointScreen } from "../screens/vendor/vendor-homescreen/vendor-homescreen";
import { VendorCheckpointDetailScreen } from "../screens/vendor/checkpoint-detail-info/checkpoint-detail.screen";
import { AnnouncementScreen } from "../screens/vendor/announcement/announcement.screen";
import { VendorProfileScreen } from "../screens/vendor/vendor-profile/vendor-profile.screen";
import { DonationFormScreen } from "../screens/vendor/food-donation-form/food-donation-form.screen";
import { MapScreen } from "../screens/vendor/track-food-donation-delivery/map.screen";
import { MyDonationScreen } from "../screens/vendor/my-donation/my-donation.screen";
import { LoginScreen } from "../screens/account/login.screen";


//drawer and card
const VendorStack = createStackNavigator();

export const VendorNavigator = () => {
  return (
    <VendorStack.Navigator
    headerShown="false"
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <VendorStack.Screen
        options={{ headerShown: false }}
        name="CheckpointVendor"
        component={VendorCheckpointScreen}
      />
       <VendorStack.Screen
        name="VendorCheckpointDetail"
        component={VendorCheckpointDetailScreen}     
      />
      <VendorStack.Screen
        name="Announcement"
        component={AnnouncementScreen}
      />
      <VendorStack.Screen
        name="VendorProfile"
        component={VendorProfileScreen}
      />
      <VendorStack.Screen
        name="MyDonation"
        component={MyDonationScreen}
      />
      <VendorStack.Screen
        name="DonationForm"
        component={ DonationFormScreen}
      />
      <VendorStack.Screen
        name="Map"
        component={MapScreen}
      />
      <VendorStack.Screen
        name="Login"
        component={LoginScreen}
      />
    </VendorStack.Navigator>
  );
};