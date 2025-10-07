// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HomeScreen } from './src/screens/Home';
import { SummaryScreen } from './src/screens/Summary';

export type RootStackParamList = {
  Home: undefined;
  Summary: undefined;
  Splash:undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Swipeable Deck' }}
          />
          <Stack.Screen
            name="Summary"
            component={SummaryScreen}
            options={{ title: 'Summary' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
