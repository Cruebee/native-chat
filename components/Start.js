import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }

  render() {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.box1}>
          <Text style={styles.titleStyle}>Welcome to Chatter-Box</Text>
          <TextInput
            style={styles.nameInput}
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
            placeholder='Enter a Display Name'
          />
        </View>
        <View style={styles.btnStyle}>
          <Button
            title="Get Chatting"
            onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name })}
          />
        </View>
        <View style={styles.inputViewer}><Text style={styles.outputViewer}>Display Name: {this.state.name}</Text></View>
        <View style={styles.deadSpace}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  box1: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameInput: {
    borderColor: 'grey',
    borderWidth: 1,
    height: 40,
    minWidth: 340
  },
  btnStyle: {
    flex: 1,
    justifyContent: 'center'
  },
  titleStyle: {
    color: 'green',
    fontWeight: 'bold'
  },
  inputViewer: {
    flex: 0.5,
    backgroundColor: 'black',
    justifyContent: 'center'
  },
  deadSpace: {
    flex: 3,
    backgroundColor: 'lightgrey',
  },
  outputViewer: {
    color: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    height: 40,
    alignContent: 'center'
  },
});