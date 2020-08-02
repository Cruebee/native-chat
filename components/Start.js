import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Import Firestore
const firebase = require('firebase');
require('firebase/firestore');

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: '',
    };
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/backgroundImage.png')}
        style={styles.backgroundImg}
      >
        <Text style={styles.title}>Chatter-Box</Text>
        <KeyboardAvoidingView behavior="height">
          <View style={styles.container}>
            <TextInput
              style={styles.nameInput}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              placeholder="Your Screen Name"
            />
            <Text style={styles.text}>Choose Background Color:</Text>
            <View style={styles.colorOptions}>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Dark Background"
                accesibilityHint="Allows you to choose the color of the background."
                accesibilityRole="button"
                onPress={() => this.setState({ color: '#090C08' })}
                style={[styles.colorButton, styles.color1]}
              />
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Deep Purple Background"
                accesibilityHint="Allows you to choose the color of the background."
                accesibilityRole="button"
                onPress={() => this.setState({ color: '#474056' })}
                style={[styles.colorButton, styles.color2]}
              />
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Blueish Background"
                accesibilityHint="Allows you to choose the color of the background."
                accesibilityRole="button"
                onPress={() => this.setState({ color: '#8A95A5' })}
                style={[styles.colorButton, styles.color3]}
              />
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Minty Background"
                accesibilityHint="Allows you to choose the color of the background."
                accesibilityRole="button"
                onPress={() => this.setState({ color: '#B9C6AE' })}
                style={[styles.colorButton, styles.color4]}
              />
            </View>
            <View style={styles.btnContainer}>
              <Button
                color="#757083"
                style={styles.button}
                title="Begin Chatting"
                onPress={() =>
                  this.props.navigation.navigate('Chat', {
                    name: this.state.name,
                    color: this.state.color,
                  })
                }
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '44%',
    width: '88%',
    margin: 20,
    borderRadius: 5,
  },
  backgroundImg: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  nameInput: {
    fontSize: 16,
    fontWeight: '600',
    color: '#757083',
    opacity: 50,
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 30,
    marginTop: 30,
    width: 250,
    height: '10%',
    borderRadius: 5,
    textAlign: 'center',
  },
  title: {
    color: 'green',
    fontSize: 45,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 70,
  },
  text: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
  },
  colorOptions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  colorButton: {
    height: 35,
    width: 35,
    borderRadius: 70,
    margin: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  color1: {
    backgroundColor: '#090C08',
  },
  color2: {
    backgroundColor: '#474056',
  },
  color3: {
    backgroundColor: '#8A95A5',
  },
  color4: {
    backgroundColor: '#B9C6AE',
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
    marginBottom: 20,
  },
  btnContainer: {
    marginBottom: 20,
  },
});
