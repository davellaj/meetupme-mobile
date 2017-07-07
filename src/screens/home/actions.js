import { MeetupApi } from '../../../constants/api';

const MeetupApi = new MeetupApi();

const FETCH_MY_MEETUPS = 'FETCH_MY_MEETUPS';

export const fetchMyMeetup = () => ({
  type: FETCH_MY_MEETUPS,
  payload: MeetupApi.fetchGroupMeetups,
});
