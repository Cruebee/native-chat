import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

// Keyboard spacer no longer needed from last react-native update
// import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    messages: [],
  };

  // Testing messages
  componentDidMount() {
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
  }

  // Call for when a user sends a message updates the state with new messages
  onSend(messages = []) {
    // setState() is called with the parameter previousState, which refers to the component's state at the time the change is applied
    this.setState((previousState) => ({
      // the sent message is appended to the state messages so it will be displayed
      messages: GiftedChat.append(previousState.messages, messages),
    }));
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
          main: {
            color: 'black',
          },
        }}
      />
    );
  }

  render() {
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
