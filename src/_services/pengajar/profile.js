import api from '../../_api';

export const getTeacherProfile = async () => {
  const res = await api.get('/teacher/profile');
  return res.data;
};

export const updateTeacherProfile = async (data) => {
  const res = await api.put('/teacher/profile', data);
  return res.data;
};
