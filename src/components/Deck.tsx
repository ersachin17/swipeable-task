import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Card } from './Card';
import { User } from '../utils/types';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface DeckProps {
  users: User[];
  onSwipe: (userId: string, liked: boolean) => void;
}

export const Deck: React.FC<DeckProps> = ({ users, onSwipe }) => {
  // show only top 3 cards
  const top3 = users.slice(0, 3);
  return (
    <View style={styles.container}>
     
      {top3
        .map((user, index) => (
          <Card
            key={user.id}
            user={user}
            isTop={index === 0} // only top card is swipeable
            onSwipe={onSwipe}
            index={index}
          />
        ))
        .reverse()} 
        {/* reverse so top card renders last (on top visually) */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT * 0.75,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
