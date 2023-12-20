import React from 'react';
import { FlatList } from 'react-native';
import { NotificationCard } from './notification-card.component';

export const NotificationList = ({ orders }) => {
  return (
    <FlatList
      data={orders}
      keyExtractor={(order) => order.id}
      renderItem={({ item }) => <NotificationCard order={item} />}
    />
  );
};

