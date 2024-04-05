import { Text, View, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
const cars = () => {
  const router = useRouter();
  return (
    <View>
      <Text onPress={() => router.replace("/")}>cars</Text>
    </View>
  );
};

export default cars;

const styles = StyleSheet.create({});
