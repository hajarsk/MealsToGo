
import { View, StyleSheet } from 'react-native';
import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';


export const NotificationScreen = () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          userId = user.uid;
        } else {
          userId = null;
        }
    });
      
  return (

    // id student/rider/vendor
   
    <View style={styles.container}>
      {/* profile header */}
      <Text style={styles.title}>Notification</Text>
      {/* Profile content goes here */}
      <View style={styles.profileSection}>
        <Text style={styles.profileText}>food is on its way</Text>
        <Card>
   
    <Card.Content>
      <Text variant="titleLarge">Card title</Text>
      <Text variant="bodyMedium">Card content</Text>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
        
       
        {/* Add announcement details */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

    alignItems: 'center',
    backgroundColor: 'white'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  profileSection: {
    width: '100%',


  },
  profileText: {
    fontSize: 18,
    marginBottom: 10,
  },
  divider: {
    marginVertical: 10,
    backgroundColor: 'grey',
  },
});