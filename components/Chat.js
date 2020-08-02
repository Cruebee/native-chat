import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
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

    // Create reference to messages collection in firebase DB
    this.referenceMessages = firebase.firestore().collection('messages');

    // Create reference to chat users
    this.referenceChatUser = null;

    this.state = {
      messages: [],
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
      uid: 0,
    };
  }

  get user() {
    return {
      name: this.props.navigation.state.params.name,
      _id: this.state.uid,
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      var data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text.toString(),
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });
    this.setState({
      messages,
    });
  };
  // Call for when a user sends a message updates the state with new messages
  onSend(messages = []) {
    // The function setState() is called with the parameter previousState, which is a reference to the component's state at the time the change is applied
    this.setState(
      (previousState) => ({
        // message a user sends gets appended to the state messages so it will be displayed in the chat.
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage();
      }
    );
  }
  // add messages to firebase
  addMessage() {
    this.referenceMessages.add({
      _id: this.state.messages[0]._id,
      text: this.state.messages[0].text,
      createdAt: this.state.messages[0].createdAt,
      user: this.state.user,
      uid: this.state.uid,
    });
  }

  componentDidMount() {
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        user = await firebase.auth().signInAnonymously();
      }
      // update user with currently active user data
      this.setState({
        uid: user.uid,
        loggedInText: 'Welcome you little guest you!',
      });
      // Create reference to active user's documents (messages)
      //this.referenceMessagesUser = firebase.firestore().collection('messages').where('uid', '==' this.state.uid);
      // Listen for collection changes for current user
      this.referenceChatUser = firebase
        .firestore()
        .collection('messages')
        .where('uid', '==', this.state.uid);
      // Listen for current chat user's collection changes
      this.unsubscribeChatUser = this.referenceMessages.onSnapshot(
        this.onCollectionUpdate
      );
      // Listen for changes on messages collection
      this.unsubscribeMessages = this.referenceMessages.onSnapshot(
        this.onCollectionUpdate
      );
    });
    this.setState({
      messages: [
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
    // Stop listening for changes to collection
    this.unsubscribeMessages();
    // Stop listening to authentication
    this.authUnsubscribe();
    // Stop listening for changes to current user's messages
    this.unsubscribeChatUser();
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
    let { color } = this.props.route.params;

    this.props.navigation.setOptions({ title: name });
    this.props.navigation.setOptions({ backgroundColor: color });

    return (
      <View style={[styles.chatContainer, { backgroundColor: color }]}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={this.state.user}
        />
        {/* Keyboard spacer fix for android only (no longer needed since last update of React-Native) */}
        {/* {Platform.OS === 'android' ? <KeyboardSpacer /> : null} */}
      </View>
    );
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
