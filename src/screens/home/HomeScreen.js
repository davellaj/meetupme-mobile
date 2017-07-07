import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';

import { LoadingScreen } from '../../commons';
import { MyMeetupsList } from './components';

import { fetchMyMeetup } from './actions';
import Colors from '../../../constants/Colors';
import styles from './styles/HomeScreen';

@connect(null, { fetchMyMeetup })
class HomeScreen extends Component {
  static navigationOptions = {
    headerStyle: { backgroundColor: Colors.redColor },
    tabBarIcon: ({ tintColor }) => (
      <FontAwesome
        name="home"
        size={25}
        color={tintColor}
      />
    ),
  }

  componentDidMount() {
    this.props.fetchMeetups();
  }
  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    }
    return (
      <View style={styles.root}>
        <View style={styles.topContainer}>
          <Text>HomeScreen</Text>
        </View>
        <View style={styles.bottonContainer}>
          <MyMeetupsList meetups={this.state.meetups} />
        </View>
      </View>
    );
  }
}

export default HomeScreen;
