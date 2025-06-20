import api from '../../_api';

export const getStudentProfile = async () => {
  const res = await api.get('/student/profile');
  return res.data;
};

export const updateStudentProfile = async (data) => {
  const res = await api.put('/student/profile', data);
  return res.data;
};