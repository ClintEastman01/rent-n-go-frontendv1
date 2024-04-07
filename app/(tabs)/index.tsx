import { Button, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { Link, Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-expo';

export default function TabOneScreen() {
  const { getToken } = useAuth();
  const [data, setData] = useState(null);
  const [token, setToken] = useState('');
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
        const response = await fetch('https://1d42-68-193-89-107.ngrok-free.app/data/cars', {
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
      {/* <Text>Show cars: {JSON.stringify(data)}</Text> */}
      <Link href="/(pages)/cars">Car List</Link>
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
