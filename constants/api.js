import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api';

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
}

export {
  MeetupApi,
};

// old implementation using fetch instead of axios
// export const fetchMeetups = () =>
//   fetch('http://localhost:3000/api/meetups')
//     .then(res => res.json());
