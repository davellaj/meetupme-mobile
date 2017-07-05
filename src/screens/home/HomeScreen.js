import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { MeetupApi } from '../../../constants/api';
import { LoadingScreen } from '../../commons';
import { MyMeetupsList } from './components';
import styles from './styles/HomeScreen';

const meetupApi = new MeetupApi();

class HomeScreen extends Component {
  static defaultProps = {
    meetupApi,
  }
  state = {
    loading: false,
    meetups: [],
  }

  async componentDidMount() {
    // console.log(typeof this.props.meetupApi.fetchGroupMeetups());
    this.setState({ loading: true });
    const meetups = await this.props.meetupApi.fetchGroupMeetups();
    this.setState({ loading: false, meetups });
  }
  render() {
    // console.log(this.state.loading);
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
