import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import { createMeetup } from './actions';
import { CreateMeetupForm } from './components';
import { LoadingScreen } from '../../commons/LoadingScreen';
import Colors from '../../../constants/Colors';
import styles from './styles/CreateMeetupScreen';

@connect(
  state => ({
    meetup: state.createMeetup,
  }),
  { createMeetup }
)

export default class CreateMeetupScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Create a new Meetup',
    // titleStyle: { color: Colors.whiteColor }, TODO not working
    headerStyle: { backgroundColor: Colors.redColor },
    headerLeft: (
      <TouchableOpacity style={styles.iconClose} onPress={() => navigation.goBack()}>
        <MaterialIcons
          name="close"
          size={30}
          color="#fff"
        />
      </TouchableOpacity>
    ),
  })

  state = {
    isDateTimePickerVisable: false,
    date: moment(),
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisable: true });

  _handleDateTimePicker = () => this.setState({ isDateTimePickerVisable: false });

  _handleDatePicker = date => {
    this.setState({ date });
    this._handleDateTimePicker();
  }

  _checkTitle() {
    const { date } = this.state;
    if (date > moment()) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    }
    return 'Pick a meetup date';
  }

  _checkIfButtonSubmitDisabled() {
    const { date } = this.state;
    if (date > moment()) {
      return false;
    }
    return true;
  }

  _createMeetup = async values => {
    await this.props.createMeetup(values);
    this.props.navigation.goBack();
  }

  render() {
    console.log(`this.props.meetup is ${this.props.meetup}`);
    // TODO debug how to destructure meetup
    // const { meetup } = this.props;
    // if (meetup.isLoading) {
    //   return (
    //     <View style={styles.root}>
    //       <LoadingScreen />
    //     </View>
    //   );
    // } else if (meetup.error.on) {
    //   return (
    //     <View style={styles.root}>
    //       <Text>{meetup.error.message}</Text>
    //     </View>
    //   );
    // }
    return (
      <View style={styles.root}>
        <CreateMeetupForm
          createMeetup={this._createMeetup}
          showDateTimePicker={this._showDateTimePicker}
          checkTitle={this._checkTitle()}
        />
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisable}
          onConfirm={this._handleDatePicker}
          onCancel={this._handleDateTimePicker}
          mode="datetime"
        />
      </View>
    );
  }
}
