import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, View } from 'react-native';
import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import SignInWithOAuth from '../components/SignInWithOAuth';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <>
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
    </>
  );
}
