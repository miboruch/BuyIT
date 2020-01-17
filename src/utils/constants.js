import io from 'socket.io-client';

export const API_URL = 'http://localhost:8000';
const SOCKET_URL = 'localhost:8000';
export const socket = io(SOCKET_URL);

export const categories = ['electronics', 'fashion', 'others', 'all'];
