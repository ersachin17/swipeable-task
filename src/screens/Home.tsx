import React from 'react';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import { Deck } from '../components/Deck';
import { useUsers } from '../hooks/useUsers';

export const HomeScreen = () => {
  const { remainingUsers, loading, swipe, liked, disliked, reset } = useUsers();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (remainingUsers.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, marginBottom: 16 }}>Deck Finished!</Text>
        <Text>Likes: {liked.length}</Text>
        <Text>Dislikes: {disliked.length}</Text>
        <Button title="Restart Deck" onPress={reset} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Deck users={remainingUsers} onSwipe={swipe} />
    </View>
  );
};
