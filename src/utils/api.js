import {
  get
} from './axios.js';
export function getKeyWords() {
  return get(`https://www.easy-mock.com/mock/597ae24fa1d30433d8408d2c/icms/keywords`);
}