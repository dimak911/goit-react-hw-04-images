import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getImages = async (query, currentPage = 1) => {
  const result = await axios({
    params: {
      key: '28213280-eb811a12977e7e61e372ebe76',
      image_type: 'photo',
      orientation: 'horizontal',
      page: currentPage,
      per_page: 12,
      q: query,
    },
  });
  const requiredResult = result.data.hits.map(
    ({ id, webformatURL, largeImageURL }) => ({
      id,
      webformatURL,
      largeImageURL,
    })
  );

  return requiredResult;
};
