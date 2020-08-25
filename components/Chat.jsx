import React, { Component } from 'react';
import { View, StyleSheet, Text, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
// KeyboardSpacer is only needed with older versions of React-Native
// import KeyboardSpacer from 'react-native-keyboard-spacer';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import NetInfo from '@react-native-community/netinfo';
import MapView from 'react-native-maps';
import firebase from 'firebase';
import 'firebase/firestore';
import CustomActions from './CustomActions';

// The next two lines fix a small issue regarding Android and React-Native
console.ignoredYellowBox = ['setting a timer']; // eslint-disable-line no-console
console.disableYellowBox = true; // eslint-disable-line no-console

export default class Chat extends Component {
  // set navigation title
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name,
    };
  };

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
      image: null,
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

  /**
   * @function MountComponent
   * @description Initialize NetInfo listener (checks if user is online) and start listening to authorization
   * from firebase/firestore. (authUnsubscribe) (if you get errors when adding NetInfo, try checking your
   * Database configuration via firebase dashboard) also starts listening to changes made on "messages"
   * collection in firebase DB
   */
  componentDidMount() {
    NetInfo.fetch().then((state) => {
      // console.log('Connection type', state.type);
      if (state.isConnected) {
        // console.log('Is connected?', state.isConnected);
        this.authUnsubscribe = firebase
          .auth()
          .onAuthStateChanged(async (user) => {
            if (!user) {
              try {
                await firebase.auth().signInAnonymously();
              } catch (error) {
                console.log(`Unable to sign in: ${error.message}`); // eslint-disable-line no-console
              }
            }
            // Update user state with currently active user data
            this.setState({
              isConnected: true,
              user: {
                _id: user.uid,
                // eslint-disable-next-line react/destructuring-assignment
                name: this.props.navigation.state.params.name,
                avatar: 'https://placeimg.com/140/140/any',
              },
              messages: [],
            });
            // console.log(user);
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

  /**
   * @function AuthStop
   * @description Stop listening to authorization requests/changes being made to "messages" collection
   * in firebase database
   */
  componentWillUnmount() {
    /* if (this.state.isOnline) is needed here to prevent errors from
    occuring when switching back to the start screen while offline. */
    if (this.state.isOnline) {
      // stop listening to auth
      this.authUnsubscribe();
      // stop listening for changes on collection
      this.unsubscribe();
    }
  }

  /**
   * @function onCollectionUpdate
   * @param {string} _id - message id
   * @param {string} text - message content
   * @param {date} createdAt - date and time of msg
   * @param {string} user - user data
   * @param {string} image
   * @param {number} location - geographical coordinates
   * @param {boolean} sent
   * @returns {state}
   */
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // Go through each document
    querySnapshot.forEach((doc) => {
      // Get queryDocumentSnapshot's data
      const data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text || '',
        createdAt: data.createdAt.toDate(),
        user: data.user,
        image: data.image || '',
        location: data.location,
        sent: true,
      });
    });
    this.setState({
      messages,
    });
  };

  /**
   * @function onSend - send msg
   * @description sends a message
   * @param {string} messages - data in form of msg, image, or geo location
   * @returns {state} @GiftedChat append - state is updated to include recent data and locally saved data
   */
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

  /**
   * @function getMessages
   * @description If user is offline, messages loaded are from AsyncStorage, user can access msg offline.
   * If user online, msg will update and send.
   * @async
   * @param {string} messages
   * @returns {state} messages
   */
  getMessages = async () => {
    let messages = [];
    try {
      messages = (await AsyncStorage.getItem('messages')) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * @function saveMessages (locally in AsyncStorage)
   * @description saves messages in AsyncStorage
   * @async
   * @returns {AsyncStorage} - setItem
   */
  saveMessages = async () => {
    try {
      await AsyncStorage.setItem(
        'messages',
        JSON.stringify(this.state.messages)
      );
    } catch (error) {
      console.log(error.message); // eslint-disable-line no-console
    }
  };

  /**
   * @function deleteMessages (locally in AsyncStorage)
   * @description Delete messages from local AsyncStorage
   * @async
   * @returns {AsyncStorage} - removeItem
   */
  deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem('messages');
    } catch (error) {
      console.log(error.message); // eslint-disable-line no-console
    }
  };

  /**
   * @function addMessage
   * @description add message to chat
   * @param {string} _id - message ID
   * @param {string} text - msg content
   * @param {date} createdAt - time and date of msg
   * @param {string} image
   * @param {number} location - geo coordinates
   * @param {boolean} sent
   */
  addMessage() {
    const message = this.state.messages[0];
    this.referenceMessages.add({
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: this.state.user,
      image: message.image || '',
      location: message.location || null,
      sent: true,
    });
  }

  /**
   * @function renderInputToolbar
   * @description Only renders InputToolBar (user input for new messages)
   * if user is online
   * @param {*} props
   * @returns {InputToolbar}
   */
  renderInputToolbar(props) {
    if (this.state.isConnected) {
      return <InputToolbar {...props} />;
    }
  }

  /**
   * @function renderBubble
   * @description Renders chat bubbles, and allows customization of said bubbles, and their text colors
   * @param {string} props
   * @returns {Bubble}
   */
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#737c00',
          },
          left: {
            backgroundColor: '#fffff0',
          },
        }}
        textStyle={{
          right: {
            color: '#FFF',
          },
          left: {
            color: '#000',
          },
        }}
      />
    );
  }

  /**
   * @function renderCustomView (map view/geo location)
   * @description renders map view/geo location uplaods from GiftedChat interface
   * @param {*} props
   * @returns {MapView}
   */
  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <View style={styles.mapContainer}>
          <MapView
            style={{
              width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3,
            }}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
      );
    }
    return null;
  }

  /**
   * @function renderCustomActions (accessing native phone components (camera, photos, & location.))
   * @param {*} props
   * @returns {CustomActions}
   */
  renderCustomActions = (props) => <CustomActions {...props} />;

  render() {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: this.props.navigation.state.params.color },
        ]}
      >
        <Text style={styles.userName}>
          Welcome to the chat
          {this.props.navigation.state.params.name}!
        </Text>

        {this.state.image && (
          <Image
            source={{ uri: this.state.image.uri }}
            style={{ width: 200, height: 200 }}
          />
        )}

        <GiftedChat
          scrollToBottom
          showUserAvatar
          user={this.state.user}
          messages={this.state.messages}
          renderUsernameOnMessage
          showAvatarForEveryMessage
          onSend={(messages) => this.onSend(messages)}
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderActions={this.renderCustomActions.bind(this)}
          renderCustomView={this.renderCustomView}
          image={this.state.image}
          timeTextStyle={{
            left: { color: '#000' },
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
  mapContainer: {
    width: 160,
    height: 120,
    borderRadius: 13,
    margin: 1,
  },
  userName: {
    fontSize: 12,
    color: '#FFF',
    alignSelf: 'center',
    opacity: 0.5,
    marginTop: 5,
    marginBottom: 5,
  },
});

Chat.propTypes = {
  navigation: PropTypes.string.isRequired,
};
