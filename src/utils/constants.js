import io from 'socket.io-client';
import { countries } from 'countries-list';

export const API_URL = 'http://localhost:8000';
const SOCKET_URL = 'localhost:8000';
export const socket = io(SOCKET_URL);

export const categories = ['electronics', 'fashion', 'others', 'all'];
export const countriesArray = Object.values(countries).map(item => item.name);
