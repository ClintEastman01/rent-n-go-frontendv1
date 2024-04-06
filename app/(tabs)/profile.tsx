import { StyleSheet, Text, View } from 'react-native';
import { SignedIn } from '@clerk/clerk-expo';
import SignOut from '../components/SignOut';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <SignedIn>
        <Text>You are Signed in</Text>
        <SignOut />
      </SignedIn>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
