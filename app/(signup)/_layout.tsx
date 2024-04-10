import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Redirect, Stack } from 'expo-router';
const _layout = () => {
  const signedUp = true;

  return (
    <>
      {signedUp && <Redirect href="/(tabs)" />}

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default _layout;

const styles = StyleSheet.create({});
