import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ScrollView } from 'react-native';

export default class HelloWorld extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  // alert the user input
  alertMyText(input = []) {
    Alert.alert(input.text);
  }

  /* Create parent view to hold 3 sections use flexDirection: column to display the view's children on top of eachother */
  /* placeholder text color must be changed inline */
  render() {

    return (
      <View style={styles.container}>
        <View style={[styles.box1, styles.cornerBox]}></View>
        <View style={styles.box2}>
          <ScrollView>
            <Text style={{ fontSize: 110 }}>This text is so large and long, you'll need to scroll</Text>
          </ScrollView>
        </View>
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
            <Button
              style={styles.customBtn}
              onPress={() => {
                this.alertMyText({ text: this.state.text });
              }}
              title="Press Me"
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
    flex: 2,
    backgroundColor: 'black'
  },
  box4: {
    backgroundColor: 'purple'
  },
  cornerBox: {
    height: 60,
  },
  bottomBox: {
    height: 300
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
  customBtn: {
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: 'yellow'
  },
});