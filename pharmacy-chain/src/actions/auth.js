import axios from 'axios';
import {
  ROOT_URL,
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from './types';


/**
 * 登录
 * @param username
 * @param password
 * @param callback
 * @returns {Function}
 */
export function signinAction({username, password}, callback) {
  return function (dispatch) {

    axios.post(`${ROOT_URL}/token`, {username, password})

    //axios.get('http://localhost:3000/signin')
      .then(response => {

        if (response.data.status == 1) {//auth success
          // - Save the JWT token
          localStorage.setItem('token', response.data.data.token);
          localStorage.setItem('company', response.data.data.company);
          localStorage.setItem('username', username);

          dispatch({type: AUTH_USER});
          // - redirect to the route '/'
        } else {//auth fail
          dispatch(authError(response.data.message));
        }

      })
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad Login'));
      });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

/**
 * 登出
 * @returns {{type}}
 */
export function signoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('company');
  localStorage.removeItem('username');

  return {type: UNAUTH_USER};
}
