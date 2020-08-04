import React, { Component } from 'react';
import { View, StyleSheet, Platform, AsyncStorage } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import NetInfo from '@react-native-community/netinfo';
import firebase from 'firebase';
import 'firebase/firestore';

import { decode, encode } from 'base-64';
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
      isConnected: false,
    };
    // Firebase init
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyCWetFkieBBCbt8alxjFwG1Y-GjbI0oBXY',
        authDomain: 'testing-firebase-cruebee.firebaseapp.com',
        databaseURL: 'https://testing-firebase-cruebee.firebaseio.com',
        projectId: 'testing-firebase-cruebee',
        storageBucket: 'testing-firebase-cruebee.appspot.com',
        messagingSenderId: '1059572141729',
        appId: '1:1059572141729:web:d1b786eacc070202a92ae0',
        measurementId: 'G-NFJ117BKJP',
      });
    }
    this.referenceMessages = firebase.firestore().collection('messages');
  }

  // Set navigation title as username
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name,
    };
  };

  // Display elements
  componentDidMount() {
    NetInfo.fetch().then((state) => {
      //console.log('Connection type', state.type);
      if (state.isConnected) {
        //console.log('Is connected?', state.isConnected);
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
                ' has entered the chat',
              messages: [],
            });
            //console.log(user);
            this.unsubscribe = this.referenceMessages
              .orderBy('createdAt', 'desc')
              .onSnapshot(this.onCollectionUpdate);
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
    // if (this.state.isOnline) is needed here to prevent errors from occuring when switching back to the start screen while offline.
    if (this.state.isOnline) {
      // stop listening to auth
      this.authUnsubscribe();
      // stop listening for changes on collection
      this.unsubscribe();
    }
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // Go through each document
    querySnapshot.forEach((doc) => {
      // Get queryDocumentSnapshot's data
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

  // Add message
  addMessage() {
    const message = this.state.messages[0];
    this.referenceMessages.add({
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: this.state.user,
    });
  }

  // Get messages from local(async) storage
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

  // Save messages locally(asyncStorage)
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

  // Delete messages locally(asyncStorage)
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
    } catch (error) {
      console.log(error.message);
    }
  }

  // Send message
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

  // Hide inputbar when offline
  renderInputToolbar(props) {
    if (this.state.isConnected) {
      return <InputToolbar {...props} />;
    }
  }

  // Change message bubble color
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
            fontColor: 'white',
          },
        }}
        textStyle={{
          right: {
            color: 'white',
          },
          left: {
            color: 'white',
          },
        }}
      />
    );
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: this.props.navigation.state.params.color },
        ]}
      >
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
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          timeTextStyle={{
            left: { color: '#F5F5F5' },
            right: { color: '#F5F5F5' },
          }}
        />
        {/* {Platform.OS === 'android' ? <KeyboardSpacer /> : null} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#FFFFFF',
    backgroundColor: '#000000',
  },
});
