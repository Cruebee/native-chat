import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.blue}>Hello World!!</Text>
      <Text style={styles.bigRed}>How Are You?</Text>
      <Text style={[styles.blue, styles.bigRed]}>I'm Feeling Blue-ish!</Text>
      {/* Creating a layout with Flexbox */}
      <View style={styles.box}></View>
      <StatusBar style="auto" />
    </View>
  );
}

// Remove excess code since you created the styles needed with two different style objects (blue and bigRed)
// <Text style={styles.bigRedBold}>I'm Feeling Blue-ish!</Text>
// Removed bigRedBold style since you can pass the styles needed from both blue and bigRed with an array in the style prop
/* bigRedBold: {
  color: 'red',
  fontSize: 30,
  fontWeight: '600',
},
*/
// The bigRed style in the third <Text> takes precidence as it's last in the array.
// The fontWeight from blue is carried over since bigRed doesn't specify that value.

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blue: {
    color: 'blue', // Colors can also be defined as HEX codes.
    fontWeight: '600', // 600 defines a BOLD font
  },
  bigRed: {
    color: 'red',
    fontSize: 30,
  },
  box: {
    width: 60,
    height: 60,
    backgroundColor: 'blue',
  },
});
