import React from 'react';
import { TabNavigator } from 'react-navigation';
import { TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import styles from '../screens/home/styles/HomeScreen';

import Colors from '../../constants/Colors';

import {
  HomeScreen,
  NotificationsScreen,
  ProfileScreen,
} from '../screens';

export default TabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: Colors.redColor },
      headerRight: (
        <TouchableOpacity
          style={styles.iconAdd}
          onPress={() => {
            navigation.navigate('CreateMeetup');
          }}
        >
          <MaterialIcons
            name="add-circle"
            size={30}
            color={Colors.whiteColor}
          />
        </TouchableOpacity>
      ),
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome
          name="home"
          size={25}
          color={tintColor}
        />
      ),
    }),
  },
  Notifications: {
    screen: NotificationsScreen,
  },
  ProfileScreen: {
    screen: ProfileScreen,
  },
}, {
  swipeEnabled: false,
  animationEnabled: false,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showLabel: false,
    showIcont: true,
    inactiveTintColor: Colors.blackBlueColor,
    activeTintColor: Colors.redColor,
    pressColor: Colors.redColor,
    indicatorStyle: { backgroundColor: Colors.redColor },
    style: {
      backgroundColor: Colors.whiteColor,
    },
  },
});
