import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_55tmtUjgPfCch7rywRFGaDfuVYctY7ulQ9wPGBpPilTbOZoOy58Ffv47IKVE8R1d';

const BASE_URL = `https://api.thecatapi.com/v1/breeds`;
//const API_KEY =
('live_55tmtUjgPfCch7rywRFGaDfuVYctY7ulQ9wPGBpPilTbOZoOy58Ffv47IKVE8R1d');

export function fetchBreeds() {
  return axios.get(BASE_URL);

  //через fetch
  //   return fetch(BASE_URL, {
  //     headers: {
  //       'x-api-key': API_KEY,
  //     },
  //   }).then(response => {
  //     if (!response.ok) {
  //       throw new Error(response.statusText);
  //     }
  //
  return response.json();
  //   });
}

export function fetchCatByBreed(breedId) {
  const SEARCH_URL = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios.get(SEARCH_URL);

  //через fetch
  //   return fetch(SEARCH_URL).then(response => {
  //     if (!response.ok) {
  //       throw new Error(response.statusText);
  //     }
  //     return response.json();
  //   });
}
