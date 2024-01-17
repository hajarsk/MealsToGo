import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { VolunteerCheckpointScreen } from "../screens/volunteer/volunteer-homescreen/volunteer-homescreen";
import { VolunteerCheckpointDetailScreen } from "../screens/volunteer/checkpoint-detail-info/checkpoint-detail.screen"
import { AnnouncementScreen } from "../screens/volunteer/announcement/announcement.screen";
import { VolunteerProfileScreen } from "../screens/volunteer/volunteer-profile/volunteer-profile.screen";
import { MyDeliveryScreen } from "../screens/volunteer/my-delivery/my-delivery.screen"
import { VolunteerNotificationList } from "../screens/volunteer/notification-list/notification-list.screen";
import { AcceptDeliveryDetailsScreen } from "../screens/volunteer/accept-delivery-detail/accept-delivery-detail";
import { UploadPhotoScreen} from "../screens/volunteer/upload-photo-proof/upload-photo.screen"


//drawer and card
const VolunteerStack = createStackNavigator();

export const VolunteerNavigator = () => {
  return (
    <VolunteerStack.Navigator
      headerMode="none"
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <VolunteerStack.Screen
        options={{ headerShown: false }}
        name="VolunteerCheckpoint"
        component={VolunteerCheckpointScreen}
      />
       <VolunteerStack.Screen
        name="VolunteerCheckpointDetail"
        component={VolunteerCheckpointDetailScreen}     
      />
      <VolunteerStack.Screen
        name="Announcement"
        component={AnnouncementScreen}
      />
      <VolunteerStack.Screen
        name="VolunteerNotificationList"
        component={VolunteerNotificationList}
      />
      <VolunteerStack.Screen
        name="MyDelivery"
        component={MyDeliveryScreen}
      />
      <VolunteerStack.Screen
        name="Profile"
        component={VolunteerProfileScreen}
      />
      <VolunteerStack.Screen
        name="AcceptDeliveryDetails"
        component={AcceptDeliveryDetailsScreen}
      />
      <VolunteerStack.Screen
        name="UploadPhoto"
        component={UploadPhotoScreen}
      />
      
    </VolunteerStack.Navigator>
  );
};