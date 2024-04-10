import { useEffect, useState } from 'react';
import '../global.css';
import * as SecureStore from 'expo-secure-store';
import { Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import WelcomeScreen from './welcome';
import { ClerkProvider } from '@clerk/clerk-expo';

export default function RootLayout() {
  const [hasRunBefore, setHasRunBefore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkHasRunBefore = async () => {
      try {
        const hasRun = await AsyncStorage.getItem('hasRunBefore');
        setHasRunBefore(hasRun === 'true'); //NOTE: this is beahutiful, this is not me it's calude i never seen it write like this tho
      } catch (error) {
        console.error('Error retrieving hasRunBefore value:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkHasRunBefore();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!hasRunBefore) {
    return <WelcomeScreen setHasRunBefore={setHasRunBefore} />;
  }
  const tokenCache = {
    async getToken(key: string) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };

  const clerk_key = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={clerk_key!}>
      <Stack>
        <Stack.Screen name="(pages)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
      </Stack>
    </ClerkProvider>
  );
}
