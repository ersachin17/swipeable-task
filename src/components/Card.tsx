// src/components/Card.tsx
import React from 'react';
import { Dimensions, Image, StyleSheet} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming, interpolate } from 'react-native-reanimated';
import { User } from '../utils/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;

interface CardProps {
  user: User;
  isTop: boolean;
  onSwipe: (userId: string, liked: boolean) => void;
  index?:number
}
export const Card: React.FC<CardProps> = ({ user, isTop, onSwipe,index }) => {
  console.log("data",user)
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      // could track initial positions here if needed
    })
    .onUpdate((event) => {
      if (!isTop) return;
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      rotate.value = interpolate(translateX.value, [-SCREEN_WIDTH, 0, SCREEN_WIDTH], [-15, 0, 15]);
    })
    .onEnd(() => {
      if (!isTop) return;
      const tx = translateX.value;
      const goRight = tx > SWIPE_THRESHOLD;
      const goLeft = tx < -SWIPE_THRESHOLD;

      if (goRight || goLeft) {
        const toX = goRight ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5;
        translateX.value = withTiming(toX, { duration: 250 }, () => {
          runOnJS(onSwipe)(user.id, goRight);
        });
        translateY.value = withTiming(0);
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotate.value = withSpring(0);
      }
    });

  // const animatedStyle = useAnimatedStyle(() => ({
  //   transform: [
  //     { translateX: translateX.value },
  //     { translateY: translateY.value },
  //     { rotate: `${rotate.value}deg` },
  //   ],
  // }));
  const animatedStyle = useAnimatedStyle(() => {
    const scale = isTop ? 1 : 0.95 - index * 0.02;
    const offsetY = isTop ? 0 : 10 + index * 8;

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value + offsetY },
        { rotate: `${rotate.value}deg` },
        { scale },
      ],
    };
  });
  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          {
            width: '90%',
            height: '60%',
            position: 'absolute',
            borderRadius: 20,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
          },
          animatedStyle,
        ]}
      >
        <Animated.Image
          source={{ uri: user?.picture }}
          style={{ width: 150, height: 150, borderRadius: 75, marginBottom: 20 }}
        />
        <Animated.Text style={{ fontSize: 20, fontWeight: '600' }}>
          {user?.name}
        </Animated.Text>
        <Animated.Text>{user?.location}</Animated.Text>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    position: 'absolute',
    width: SCREEN_WIDTH - 40,
    left: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    padding: 16,
    alignItems: 'center',
  },
  avatar: {
    width: '100%',
    height: 260,
    borderRadius: 8,
    marginBottom: 12,
  },
  info: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  name: { fontSize: 18, fontWeight: '700' },
  location: { fontSize: 14, color: '#666' },
});
