import React from 'react';
import { Card, Text, Button } from 'react-native-elements';

export const NotificationCard = ({ order }) => {
  const { id, date, pickupLocation, deliveryLocation, total } = order;

  return (
    <Card>
      <Text h4>{id}</Text>
      <Text>{date}</Text>
      <Text>{pickupLocation || deliveryLocation}</Text>
      <Text>Total: RM {total}</Text>
      <Button title="See More Details" />
      <Button title="Rate This Order" />
    </Card>
  );
};

