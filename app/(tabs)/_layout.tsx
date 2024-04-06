import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, View } from 'react-native';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import SignInWithOAuth from '../components/SignInWithOAuth';
import * as SecureStore from 'expo-secure-store';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
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

export default function TabLayout() {
  const clerk_key = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={clerk_key!}>
      <SignedOut>
        <SignInWithOAuth />
      </SignedOut>

      <SignedIn>
        <Tabs screenOptions={{}}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home Page',
              tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
              headerRight: () => (
                <Link href="/modal" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <FontAwesome
                        name="info-circle"
                        size={25}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </Link>
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
            }}
          />
        </Tabs>
      </SignedIn>
    </ClerkProvider>
  );
}
