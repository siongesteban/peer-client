import axios from 'axios';

import { API_URL } from './NoteConstants';

class NoteApi {
  static getNotes() {
    return axios.get(API_URL)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        return err;
      })
  }
}

export default NoteApi;