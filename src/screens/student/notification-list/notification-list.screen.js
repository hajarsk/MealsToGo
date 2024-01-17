import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { ref, onValue, update, remove } from 'firebase/database';

import { FIREBASE_DATABASE } from '../../../config/firebase';


export const StudentNotificationList = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);

  // Function to mark the notification as read
  const markNotificationAsRead = (item) => {
    // Check if the notification is already marked as read
    if (!item.read) {
      // Update the Firebase database to mark the notification as read
      const notificationRef = ref(FIREBASE_DATABASE, `notifications/${item.id}`);
      update(notificationRef, {
        read: true,
      })
        .then(() => {
          console.log('Notification marked as read:', item.read);
        })
        .catch((error) => {
          console.error('Error marking notification as read:', error);
        });
    }
  };

  // Function to delete the notification
  const deleteNotification = (item) => {
    const notificationRef = ref(FIREBASE_DATABASE, `notifications/${item.id}`);
    remove(notificationRef)
      .then(() => {
        console.log('Notification deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting notification:', error);
      });
  };

  useEffect(() => {
    const notificationsRef = ref(FIREBASE_DATABASE, 'notifications');

    // Subscribe to changes in the notifications node
    const unsubscribe = onValue(notificationsRef, (snapshot) => {
      if (snapshot.exists()) {
        // Convert the snapshot value to an array and update the state
        const notificationsArray = Object.values(snapshot.val()).map((item) => ({
          ...item,
          read: item.read || false, // Default to false if "read" property doesn't exist
        }));
        setNotifications(notificationsArray);
      } else {
        // Handle the case when there are no notifications
        setNotifications([]);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []); // The empty dependency array ensures that this effect runs once after the initial render

  // Swipeable component that renders delete button on swipe
  const renderLeftActions = (_, dragX, item) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [0, 0, 0, 1],
    });

    return (
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center', alignItems: 'flex-start' }}
        onPress={() => deleteNotification(item)}
      >
        <View style={{ padding: 20 }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Clear</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Main component rendering each notification
  const renderNotification = ({ item }) => {
    return (
      <Swipeable renderLeftActions={(progress, dragX) => renderLeftActions(progress, dragX, item)}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            markNotificationAsRead(item);
            navigation.navigate('StudentCheckpointDetail', {
               DonationDetails: item,
            });
          }}
        >
          <View
            style={[
              styles.container,
              { backgroundColor: item.read ? '#cccccc' : '#ffffff' }, // Apply gray or white background based on read status
            ]}
          >
            <View style={{}}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderNotification}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    flexDirection: 'row',
  },
  imageContainer: {
    marginRight: 10,
    maxHeight: 50,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
  },
});