import React from "react";
import { View, Text } from "react-native";
import { Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

type WelcomeScreenProps = {
  setHasRunBefore: React.Dispatch<React.SetStateAction<boolean>>;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ setHasRunBefore }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }} className="text-red-500">
        Welcome to Rent N Go!
      </Text>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        We need your loaction
      </Text>
      <Text style={{ fontSize: 16, padding: 10 }}>
        To offer you the best car rental experience, we need your location. This
        helps us find nearby cars, show accurate prices, and guide you to pickup
        points. Your privacy is important; we only use your location in the app
        and never share it without your permission. Grant Rent N Go access to
        your location to get started. For questions, contact our support.
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => {
          setHasRunBefore(true);
          AsyncStorage.setItem("hasRunBefore", "true");
        }}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
export default WelcomeScreen;
