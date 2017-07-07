import {
  FETCH_MY_MEETUPS,
} from './actions';

const INITIAL_STATE = {
  myMeetups: {
    data: [],
    isFetched: false,
    error: {
      on: false,
      message: null,
    },
  },
};
export default(state = INITIAL_STATE, actions) => {

};
