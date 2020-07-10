import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default class HelloWorld extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  /* Create parent view to hold 3 sections use flexDirection: column to display the view's children on top of eachother */
  /* placeholder text color must be changed inline */
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.box1, styles.cornerBox]}></View>
        <View style={styles.box2}></View>
        <View style={styles.box3}>
          <View style={styles.inputContainer}>
            <Text style={styles.textColor}>Text Output: {this.state.text}</Text>
            <TextInput
              style={[styles.messageText, styles.textColor]}
              onChangeText={(text) => this.setState({ text })}
              value={this.state.text}
              placeholderTextColor={'white'}
              placeholder='Type here ...'
            />
          </View>
        </View>
        <View style={[styles.box4, styles.bottomBox]}></View>
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
    flex: 1,
    backgroundColor: 'black'
  },
  box4: {
    backgroundColor: 'purple'
  },
  cornerBox: {
    height: 60,
  },
  bottomBox: {
    height: 270
  },
  textColor: {
    color: 'white'
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  messageText: {
    borderColor: 'grey',
    borderWidth: 1,
    height: 40
  },
});