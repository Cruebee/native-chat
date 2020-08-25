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

/**
 * @function Start class Component
 * @description Landing page for chat application, takes user input (screen name, and color input)
 * and applies it to design of Chat screen.
 * @param {string} Username - name of user to be entered in Chat Screen (Screen Name)
 * @param {string} Color - color selected by user to be entered in Chat screen (backgroundColor)
 * @returns {state} - State of backgroundColor and name are parameters used in Chat.jsx
 */
export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: '#000',
    };
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/backgroundImage.png')}
        style={styles.backgroundImg}
      >
        <Text style={styles.title}>Chatter-Box</Text>
        <KeyboardAvoidingView behavior='height'>
          <View style={styles.container}>
            <TextInput
              style={styles.nameInput}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              placeholder='Your Screen Name'
              placeholderTextColor='#d3d3d3'
            />
            <Text style={styles.text}>Choose A Background Color:</Text>
            <View style={styles.colorOptions}>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel='Dark Background'
                accesibilityHint='Allows you to choose the color of the background.'
                accesibilityRole='button'
                onPress={() => this.setState({ color: '#090C08' })}
                style={[styles.colorButton, styles.color1]}
              />
              <TouchableOpacity
                accessible={true}
                accessibilityLabel='Deep Purple Background'
                accesibilityHint='Allows you to choose the color of the background.'
                accesibilityRole='button'
                onPress={() => this.setState({ color: '#474056' })}
                style={[styles.colorButton, styles.color2]}
              />
              <TouchableOpacity
                accessible={true}
                accessibilityLabel='Blueish Background'
                accesibilityHint='Allows you to choose the color of the background.'
                accesibilityRole='button'
                onPress={() => this.setState({ color: '#8A95A5' })}
                style={[styles.colorButton, styles.color3]}
              />
              <TouchableOpacity
                accessible={true}
                accessibilityLabel='Minty Background'
                accesibilityHint='Allows you to choose the color of the background.'
                accesibilityRole='button'
                onPress={() => this.setState({ color: '#738276' })}
                style={[styles.colorButton, styles.color4]}
              />
            </View>
            <View style={styles.btnPosition}>
              <View style={styles.btnContainer}>
                <Button
                  color='#737c00'
                  backgroundColor='#474056'
                  style={styles.button}
                  title='Begin Chatting'
                  onPress={() =>
                    this.props.navigation.navigate('Chat', {
                      name: this.state.name,
                      color: this.state.color,
                    })
                  }
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    backgroundColor: 'rgba(0,0,0,0.0)',
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
    color: '#000',
    opacity: 50,
    borderWidth: 1,
    borderColor: '#fffff0',
    marginBottom: 30,
    marginTop: 30,
    width: 250,
    height: 55,
    borderRadius: 5,
    textAlign: 'center',
    backgroundColor: '#fffff0',
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
    color: '#fffff0',
  },
  colorOptions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorButton: {
    height: 35,
    width: 35,
    borderWidth: 1,
    borderColor: '#fffff0',
    borderRadius: 70,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
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
    backgroundColor: '#738276',
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
    marginBottom: 20,
    color: '#474056',
  },
  btnContainer: {
    justifyContent: 'center',
    width: '80%',
    backgroundColor: '#fffff0',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
  },
  btnPosition: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
