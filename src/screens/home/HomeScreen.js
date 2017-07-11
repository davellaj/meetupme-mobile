import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';

import { LoadingScreen } from '../../commons';
import { MyMeetupsList } from './components';

import { fetchMyMeetups } from './actions';
import Colors from '../../../constants/Colors';
import styles from './styles/HomeScreen';

@connect(
  state => ({
    myMeetups: state.home.myMeetups,
  }),
  { fetchMyMeetups }
)

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
    this.props.fetchMyMeetups();
  }
  render() {
    const {
      myMeetups: {
        isFetched,
        data,
        error,
      },
    } = this.props;

    if (!isFetched) {
      return <LoadingScreen />;
    } else if (error.on) {
      return (
        <View>
          <Text>{error.message}</Text>
        </View>
      );
    }

    return (
      <View style={styles.root}>
        <View style={styles.topContainer}>
          <Text>HomeScreen</Text>
        </View>
        <View style={styles.bottonContainer}>
          <MyMeetupsList meetups={data} />
        </View>
      </View>
    );
  }
}

export default HomeScreen;
