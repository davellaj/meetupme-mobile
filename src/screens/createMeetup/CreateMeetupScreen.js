import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import { MeetupApi } from '../../../constants/api';
import Colors from '../../../constants/Colors';
import styles from './styles/CreateMeetupScreen';

const meetupApi = new MeetupApi();
class CreateMeetupScreen extends Component {
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
    title: '',
    description: '',
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

  _changeTitle = title => this.setState({ title })
  _changeDescription = description => this.setState({ description })

  _checkIfButtonSubmitDisabled() {
    const { title, description, date } = this.state;
    if (title.length > 5 && description.length > 5 && date > moment()) {
      return false;
    }
    return true;
  }

  _createMeetup = async () => {
    const { title, description, date } = this.state;

    const res = await meetupApi.createGroupMeetups({
      title,
      description,
      date,
    });
    console.log(res);
  }

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.container}>
          <View style={styles.item}>
            <FormLabel fontFamily="montserrat">Title</FormLabel>
            <FormInput
              onChangeText={this._changeTitle}
              value={this.state.title}
              selectionColor={Colors.redColor}
            />
          </View>
          <View style={styles.item}>
            <FormLabel fontFamily="montserrat">Description</FormLabel>
            <FormInput
              onChangeText={this._changeDescription}
              value={this.state.description}
              selectionColor={Colors.redColor}
              multiline
            />
          </View>
          <View style={styles.item}>
            <Button
              onPress={this._showDateTimePicker}
              title={this._checkTitle()}
              raised
              fontFamily="montserrat"
            />
          </View>
          <View style={styles.buttonCreate}>
            <Button
              title="Create Meetup"
              raised
              fontFamily="montserrat"
              disabled={this._checkIfButtonSubmitDisabled()}
              backgroundColor={Colors.blackBlueColor}
              onPress={this._createMeetup}
            />
          </View>
        </View>
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

export default CreateMeetupScreen;
