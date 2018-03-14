import * as moment from 'moment';

const formatDate = date => {
  return moment(date).format('MMMM D, YYYY h:m A')
};

export default formatDate;