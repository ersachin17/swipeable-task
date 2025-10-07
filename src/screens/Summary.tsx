// src/screens/SummaryScreen.tsx
import React from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { useUsers } from '../hooks/useUsers';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Summary: undefined;
};

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Summary'>;

export const SummaryScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const { likedCount, dislikedCount, restart } = useUsers();

  const handleRestart = async () => {
    await restart();
    navigation.replace('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Summary</Text>
        <Text style={styles.text}>👍 Liked: {likedCount}</Text>
        <Text style={styles.text}>👎 Disliked: {dislikedCount}</Text>
        <Text style={styles.restart} onPress={handleRestart}>
          Restart Deck
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    elevation: 4,
  },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16 },
  text: { fontSize: 18, marginVertical: 4 },
  restart: { color: 'blue', marginTop: 20 },
});
