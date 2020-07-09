import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class HelloWorld extends Component {
  render() {
    return (
      {/* Create parent view to hold 3 sections use flexDirection: column to display the view's children on top of eachother */ },
      <View style={[styles.container, styles.pushOut]}>
        <View style={[styles.box1, styles.cornerBox]}></View>
        <View style={styles.box2}></View>
        <View style={[styles.box3, styles.bottomBox]}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'orange'
  },
  box1: {
    flex: 0.6,
    backgroundColor: 'blue'
  },
  box2: {
    flex: 5,
    backgroundColor: 'green'
  },
  box3: {
    backgroundColor: 'purple'
  },
  cornerBox: {
    height: 60,
  },
  bottomBox: {
    width: 100,
    height: 200
  },
  pushOut: {
    marginLeft: 5,
    marginRight: 5
  },
});