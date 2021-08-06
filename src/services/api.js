import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = () => {
  const defaultOptions = {
    baseURL: 'http://localhost:8080/',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      return value;
    } catch (err) {
      return null;
    }
  };

  let instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async config => {
    const token = await getToken();
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  });

  return instance;
};

export default api();