import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Chat extends React.Component {
  render() {
    // one way to write the props for this is:
    // let name= this.props.route.params.name 
    // OR... 
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    let { color } = this.props.route.params;
    this.props.navigation.setOptions({ backgroundColor: color });

    return (
      <View style={[styles.container, { backgroundColor: color }]}>
        <Text>This is how we do Chat</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
})