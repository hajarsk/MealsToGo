import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { StudentCheckpointScreen } from "../screens/student/student-homescreen/student-homescreen";
import { StudentCheckpointDetailScreen } from "../screens/student/checkpoint-detail-info/checkpoint-detail.screen";
import { AnnouncementScreen } from "../screens/student/announcement/announcement.screen";
import { StudentNotificationList } from "../screens/student/notification-list/notification-list.screen";
import { ScanScreen } from "../screens/student/scan-qr/scan-qr.screen";
import { StudentProfileScreen } from "../screens/student/student-profile/student-profile.screen";


//drawer and card
const StudentStack = createStackNavigator();

export const StudentNavigator = () => {
  return (
    <StudentStack.Navigator
      headerMode="none"
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <StudentStack.Screen
        options={{ headerShown: false }}
        name="CheckpointStudent"
        component={StudentCheckpointScreen}
      />
       <StudentStack.Screen
        name="StudentCheckpointDetail"
        component={StudentCheckpointDetailScreen}     
      />
      <StudentStack.Screen
        name="Announcement"
        component={AnnouncementScreen}
      />
      <StudentStack.Screen
        name="Scan"
        component={ScanScreen}
      />
      <StudentStack.Screen
        name="StudentNotificationList"
        component={StudentNotificationList}
      />
      <StudentStack.Screen
        name="StudentProfile"
        component={StudentProfileScreen}
      />
    </StudentStack.Navigator>
  );
};