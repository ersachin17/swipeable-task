import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../utils/types';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [swipes, setSwipes] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch('https://randomuser.me/api/?results=10');
    const json = await res.json();
    const formatted = json.results.map((u: any) => ({
      id: u.login.uuid,
      name: `${u.name.first} ${u.name.last}`,
      picture: u.picture.large,
      location: u.location.country,
    }));
    setUsers(formatted.slice(0,3));
    setLoading(false);
  };

  const swipe = useCallback(async (id: string, liked: boolean) => {
    const updated = { ...swipes, [id]: liked };
    setSwipes(updated);
    await AsyncStorage.setItem('swipes', JSON.stringify(updated));
  }, [swipes]);

  const reset = useCallback(async () => {
    await AsyncStorage.removeItem('swipes');
    setSwipes({});
    fetchUsers();
  }, []);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem('swipes');
      if (stored) setSwipes(JSON.parse(stored));
      await fetchUsers();
    })();
  }, []);

  const remainingUsers = users.filter(u => !(u.id in swipes));
  const liked = users.filter(u => swipes[u.id] === true);
  const disliked = users.filter(u => swipes[u.id] === false);

  return { users, remainingUsers, swipe, liked, disliked, reset, loading };
};
