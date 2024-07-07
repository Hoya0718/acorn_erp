import axiosInstance from './axios';

const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get('/userinfo');
    return response.data;
  } catch (err) {
    console.error('Error fetching user info:', err);
    return null;
  }
};

export default getUserInfo;