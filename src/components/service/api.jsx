import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '33388892-f7fc46b67c8fc773e4141c829',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

const responseImages = async (query, page) => {
  const { data } = await axios.get(`?q=${query}&page=${page}`);
  return data;
};

export default responseImages;
