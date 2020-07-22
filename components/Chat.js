import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

// declare and require firebase
const firebase = require('firebase');
require('firebase/firestore');

// Keyboard spacer no longer needed from last react-native update
// import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class Chat extends React.Component {
  constructor() {
    super();

    // Configure connection to firebase
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyCWetFkieBBCbt8alxjFwG1Y-GjbI0oBXY',
        authDomain: 'testing-firebase-cruebee.firebaseapp.com',
        databaseURL: 'https://testing-firebase-cruebee.firebaseio.com',
        projectId: 'testing-firebase-cruebee',
        storageBucket: 'testing-firebase-cruebee.appspot.com',
        messagingSenderId: '1059572141729',
      });
    }

    // Create reference to message user
    this.referenceMessageUser = null;

    // Create reference to messages collection in firebase DB
    this.referenceMessages = firebase.firestore().collection('messages');

    this.state = {
      messages: [],
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
      uid: 0,
      loggedInText: 'Please Wait... You are being logged in.',
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      var data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.CreatedAt,
        user: this.state.uid,
      });
    });
    this.setState({
      messages,
    });
  };

  // Call for when a user sends a message updates the state with new messages
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => this.addMessage()
    );
  }

  // add messages to firebase
  addMessage() {
    const message = this.state.messages[0];
    this.referenceMessages.add({
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt,
      user: message.user,
    });
  }

  // Custom Gifted Chat bubbles
  renderBubble(props) {
    return (
      <Bubble
        // inherit props with {...props}
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'green',
          },
          left: {
            backgroundColor: '#444',
          },
        }}
        textStyle={{
          left: {
            color: '#FFF',
          },
          right: {
            color: '#FFF',
          },
        }}
      />
    );
  }

  render() {
    // Pulling name/color information from Start.js
    // one way to write the props for this is:
    // let name= this.props.route.params.name
    // OR...
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    let { color } = this.props.route.params;
    this.props.navigation.setOptions({ backgroundColor: color });

    return (
      <View style={[styles.chatContainer, { backgroundColor: color }]}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {/* Keyboard spacer fix for android only (no longer needed since last update of React-Native) */}
        {/* {Platform.OS === 'android' ? <KeyboardSpacer /> : null} */}
      </View>
    );
  }

  componentDidMount() {
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
      // update user with currently active user data
      this.setState({
        uid: user.uid,
        loggedInText: 'Welcome you little guest you!',
      });
      // Create reference to active user's documents (messages)
      //this.referenceMessagesUser = firebase.firestore().collection('messages').where('uid', '==' this.state.uid);
      // Listen for collection changes for current user
      this.unsubscribeMessages = this.referenceMessages.onSnapshot(
        this.onCollectionUpdate
      );
    });
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello Developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          // System Message
          _id: 2,
          text: this.props.route.params.name + ' has entered the chat',
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  }

  componentWillUnmount() {
    // Stop listening for changes to current user
    //this.unsubscribeMessages();
    // Stop listening to authentication
    this.authUnsubscribe();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatContainer: {
    flex: 1,
  },
});

// Temporary messages for testing purposes (goes inside componentDidMount())
/* 
   this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello Developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text:
            this.props.route.params.name +
            ' Has Entered the chat, is it possible to change the color/size of this text??',
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  */
