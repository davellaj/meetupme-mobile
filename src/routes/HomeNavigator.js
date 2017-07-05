import { TabNavigator } from 'react-navigation';
import {
  HomeScreen,
  NotificationsScreen,
} from '../screens';

export default TabNavigator({
  Home: {
    screen: HomeScreen,
  },
  Notifications: {
    screen: NotificationsScreen,
  },
});
