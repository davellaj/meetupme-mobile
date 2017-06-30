import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { MeetupApi } from '../../../constants/api';
import styles from './styles/HomeScreen';

const meetupApi = new MeetupApi();

class HomeScreen extends Component {
  static defaultProps = {
    meetupApi,
  }
  state = {
    loading: true,
    meetups: [],
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const meetups = await this.props.meetupApi.fetchGroupMeetups();
    this.setState({ loading: false, meetups });
  }
  render() {
    return (
      <View style={styles.root}>
        <Text>HomeScreen</Text>
      </View>
    );
  }
}

export default HomeScreen;
