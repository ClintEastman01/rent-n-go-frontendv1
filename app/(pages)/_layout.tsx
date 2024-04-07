import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: true, title: 'Sign In' }} />
      <Stack.Screen name="cars" options={{ headerShown: true, title: 'Car Page' }} />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
