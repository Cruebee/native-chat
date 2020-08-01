import React from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import NetInfo from '@react-native-community/netinfo';

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
    //this.referenceChatUser = null;

    this.state = {
      messages: [],
      isConnected: false, // this is important!!!
      loggedInText: '',
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
      uid: 0,
    };
  }

  componentDidMount() {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        this.authUnsubscribe = firebase
          .auth()
          .onAuthStateChanged(async (user) => {
            if (!user) {
              try {
                await firebase.auth().signInAnonymously();
              } catch (error) {
                console.log('Unable to sign in: ' + error.message);
              }
            }
            this.setState({
              isConnected: true,
              user: {
                _id: user.uid,
                name: this.props.navigation.state.params.name,
                avatar: 'https://placeimg.com/140/140/any',
              },
              loggedInText:
                this.props.navigation.state.params.name +
                ' has entered the chat!',
              messages: [],
            });
            this.unsubscribeMessages = this.referenceMessages
              .orderBy('createdAt', 'desc')
              .onSnapshot(this.onCollectionupdate);
          });
      } else {
        this.setState({
          isConnected: false,
        });
        this.getMessages();
      }
    });
  }

  componentWillUnmount() {
    // Stop listening for authentication
    this.authUnsubscribe();
    // stop listening for changes
    this.unsubscribeMessages();
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get queryDocumentSnapshot data
      var data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text || '',
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });
    this.setState({
      messages,
    });
  };

  // add messages
  addMessage() {
    const message = this.state.messages[0];
    this.referenceMessages.add({
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: this.state.user,
    });
  }

  // get messages from AsyncStorage
  async getMessages() {
    let messages = [];
    try {
      messages = (await AsyncStorage.getItem('messages')) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // save messages to AsyncStorage
  async saveMessages() {
    try {
      await AsyncStorage.setItem(
        'messages',
        JSON.stringify(this.state.messages)
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  // delete messages from AsyncStorage
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
    } catch (error) {
      console.log(error.message);
    }
  }

  // Send Message
  onSend = (messages = []) => {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage();
        this.saveMessages();
      }
    );
  };

  // hide inputbar (text input) when offline
  renderInputToolbar(props) {
    if (this.state.isConnected) {
      return <InputToolbar {...props} />;
    }
  }

  // change message bubble colors
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#0E3B43',
          },
          left: {
            backgroundColor: '#357266',
          },
        }}
      />
    );
  }

  render() {
    // pull name and color info
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });
    let { color } = this.props.route.params;
    this.props.navigation.setOptions({ backgroundColor: color });

    return (
      <View style={[styles.chatContainer, { backgroundColor: color }]}>
        <GiftedChat
          scrollToBottom
          showUserAvatar={true}
          user={this.state.user}
          messages={this.state.messages}
          renderUsernameOnMessage={true}
          showAvatarForEveryMessage={true}
          renderActions={this.renderCustomActions}
          onSend={(messages) => this.onSend(messages)}
          renderBubble={this.renderBubble.bind(this)}
          timeTextStyle={{
            left: { color: '#F5F5F5' },
            right: { color: '#F5F5F5' },
          }}
        />
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
