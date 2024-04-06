import React from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const RentOrPartnerScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => router.replace('/(pages)/rentersignup')}
        style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://plus.unsplash.com/premium_photo-1661290470322-a313098e7c2a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
          placeholder={blurhash}
          contentFit="cover"
          transition={1000}
        />
        <Text style={styles.text}>RENT</Text>
      </Pressable>
      <Pressable onPress={() => router.replace('/(tabs)')} style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
          placeholder={blurhash}
          contentFit="cover"
          transition={1000}
        />
        <Text style={styles.text}>PARTNER</Text>
      </Pressable>
    </View>
  );
};

export default RentOrPartnerScreen;

const styles = StyleSheet.create({
  text: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -60 }, { translateY: -50 }],
    fontSize: 50,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0553',
  },
});
