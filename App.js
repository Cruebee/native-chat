import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default class HelloWorld extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    return (
      {/* Create parent view to hold 3 sections use flexDirection: column to display the view's children on top of eachother */ },
      <View style={[styles.container, styles.pushOut]}>
        <View style={[styles.box1, styles.cornerBox]}></View>
        <View style={styles.box2}></View>
        <View style={styles.box4}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.textColor}>You Wrote: {this.state.text}</Text>
            <TextInput
              style={{ height: 40, borderColor: 'grey', color: 'white', borderWidth: 1 }}
              onChangeText={(text) => this.setState({ text })}
              value={this.state.text}
              placeholder='Type here ...'
            />
          </View>
        </View>
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
  box4: {
    flex: 1,
    backgroundColor: 'black'
  },
  cornerBox: {
    height: 60,
  },
  bottomBox: {
    height: 280
  },
  textColor: {
    color: 'white'
  },
});