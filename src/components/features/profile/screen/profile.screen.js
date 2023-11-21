import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* profile header */}
      <Text style={styles.title}>Joshua</Text>   
      {/* Profile content goes here */}
      <View style={styles.profileSection}>
        <Text style={styles.profileText}>Username: JohnDoe</Text>
        <Divider style={styles.divider} />
        <Text style={styles.profileText}>Email: johndoe@example.com</Text>
        <Divider style={styles.divider} />
        {/* Add more profile details */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    
    alignItems: 'center',
    backgroundColor:'white'
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