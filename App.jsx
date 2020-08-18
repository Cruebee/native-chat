import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Chat from './components/Chat';
import Start from './components/Start';

console.ignoredYellowBox = ['setting a timer']; // eslint-disable-line no-console

const navigator = createStackNavigator({
  Start: {
    screen: Start,
    navigationOptions: {
      headerShown: false,
    },
  },
  Chat: { screen: Chat },
});

// Create container for entire app to be contained in, changes based on current nav.
const navigatorContainer = createAppContainer(navigator);

export default navigatorContainer;
