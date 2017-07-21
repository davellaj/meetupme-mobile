import axios from 'axios';
import { Platform } from 'react-native';

let url;

if (Platform.OS !== 'ios') {
  url = 'http://10.0.3.2:3000/api';
} else {
  url = 'http://localhost:3000/api';
}

axios.defaults.baseURL = url;

const fakeGroupId = '594c6952f730d15964ac53e4';

class MeetupApi {
  constructor() {
    this.groupId = fakeGroupId;
    this.path = `/groups/${this.groupId}/meetups`;
  }

  async fetchGroupMeetups() {
    try {
      const { data } = await axios.get(this.path);
      return data.meetups;
    } catch (err) {
      console.log(err);
    }
  }

  async createGroupMeetups(args) {
    try {
      const res = await axios.post(`${this.path}/new`, { ...args });
      console.log(res);
      return res;
    } catch (e) {
      console.log(e);
    }
  }
}

export {
  MeetupApi,
};

// old implementation using fetch instead of axios
// export const fetchMeetups = () =>
//   fetch('http://localhost:3000/api/meetups')
//     .then(res => res.json());
