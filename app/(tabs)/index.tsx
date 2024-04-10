import { Button, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { Link, Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { api_url } from '../components/serverUrl';

export default function TabOneScreen() {
  const apiUrl = api_url;
  const { getToken } = useAuth();
  const [data, setData] = useState(null);
  const [token, setToken] = useState('');
  const user = useUser();
  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getToken({ template: 'oneWeek' });
      setToken(fetchedToken!);
    };
    fetchToken();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl + 'data/cars', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleClearStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text>Show cars: {JSON.stringify(user)}</Text> */}
      <Link href="/">Car List</Link>
      <Button title="Clear AsyncStorage" onPress={handleClearStorage} />
      <Stack>
        <Stack.Screen name="car" />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
