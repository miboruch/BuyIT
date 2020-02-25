import io from 'socket.io-client';
import { countries } from 'countries-list';

export const API_URL = 'https://buyit-backend.herokuapp.com';
const SOCKET_URL = 'https://buyit-backend.herokuapp.com';
export const socket = io(SOCKET_URL);

export const categories = ['electronics', 'fashion', 'others', 'all'];
export const countriesArray = Object.values(countries).map(item => item.name);
