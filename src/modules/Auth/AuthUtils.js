import axios from 'axios';
import jwt from 'jsonwebtoken';

export const setAuthorizationToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const getUser = () => {
  const token = localStorage.getItem('token');
  const user = jwt.decode(token);

  return user;
}