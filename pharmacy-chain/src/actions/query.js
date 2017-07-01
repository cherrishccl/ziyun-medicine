/**
 * oxchain
 *
 *
 * Author: Jun
 * Date: 30/06/2017
 *
 */

import axios from 'axios';
import {
  ROOT_URL,
  FETCH_SENSOR_DATA,
  requestError,
  getAuthorizedHeader
} from './types';

/**
 * 查询传感器数据结果
 */
export function fetchSensorData({ serial, type, startDate, endDate }, callback) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/contract/sensor?${type==='serial'?'serial':'equipment'}=${serial}&start=${startDate}&end=${endDate}`, { headers: getAuthorizedHeader() })
    //axios.get('http://localhost:3000/sensor')
      .then(response => {
        dispatch({ type: FETCH_SENSOR_DATA, payload:response });
        callback();
      })
      .catch( err => callback(err.message) );
  }
}