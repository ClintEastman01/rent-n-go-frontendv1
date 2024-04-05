import { Button, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { Link, Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function TabOneScreen() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://2d3c-68-193-89-107.ngrok-free.app');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
      <Text>Data: {JSON.stringify(data)}</Text>
      <Text style={styles.title}>Tab One</Text>
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
