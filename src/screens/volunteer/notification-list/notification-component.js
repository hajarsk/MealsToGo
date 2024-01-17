import * as Notifications from 'expo-notifications';
import { ref, get, push, update } from 'firebase/database';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { FIREBASE_DATABASE } from '../../../config/firebase';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const auth = getAuth();

// Ensure the user is signed in before accessing uid
let userId = null;

const unsubscribe = onAuthStateChanged(auth, (user) => {
  if (user) {
    userId = user.uid;
  } else {
    userId = null;
  }
});

export async function schedulePushNotification(item) {
  const title = `Delivery Request`;
  const body = `${item.userName}`;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });

  sendDataToDatabase(title, body, item);
};

// save notification inside the database so that the notification screen can show
const sendDataToDatabase = async (title, body, item) => {
  try {
    if (!userId) {
      console.error('User is not signed in.');
      return;
    }

    const postData = {
      userId: userId,
      title: title,
      body: body,
      items: item,
      read: false,
    }

    const dbRef = ref(FIREBASE_DATABASE, "notifications");
    const notificationRef = await push(dbRef, postData);
    const notificationId = notificationRef.key; // Get the unique notification ID

    // Update the notification with the generated ID
    const updates = {};
    updates[`/notifications/${notificationId}/id`] = notificationId;
    await update(ref(FIREBASE_DATABASE), updates);

    console.log("Notification sent successfully!");
  } catch (error) {
    console.error(error);
  }
};

export const setupNotification = async () => {
  // Get the missing cat location from the database
  const DonationDetailsButtonRef = ref(FIREBASE_DATABASE, 'Donation_Details');

  try {
    const snapshot = await get(DonationDetailsButtonRef);
   

    if (snapshot.exists()) {
      const allData = Object.values(snapshot.val());
      console.log(allData)
      const filteredData = allData[allData.length - 1]
      console.log(allData[allData.length - 1])
        // Trigger the notification for each location in the geofence
          await schedulePushNotification(filteredData);
       console.log("owner post should not get notification about his own post")
  
  
    } else {
      console.log('Data not found in the database');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  return () => unsubscribe();
};