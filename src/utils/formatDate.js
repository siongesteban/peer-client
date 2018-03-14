import * as moment from 'moment';

const formatDate = date => {
  const dateNow = Date.now();

  if (
    moment(dateNow).format('MMMM D, YYYY') ===
    moment(date).format('MMMM D, YYYY')
  ) {
    return `Today ${moment(date).format('h:mm A')}`;
  }

  return moment(date).format('MMMM D, YYYY h:mm A')
};

export default formatDate;