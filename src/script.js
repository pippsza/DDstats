import axios from 'axios';
// https://ddnet.org/players/?json2=Cor

// import axios from 'axios';

// export const fetchPhotosByQuery = async (searchedQuery, currentPage) => {
//   const axiosOptions = {
//     params: {
//       q: searchedQuery,
//       key: '48288384-c73711b953ffb418f1a2cd50e',
//       image_type: 'photo',
//       orientation: 'horizontal',
//       page: currentPage,
//       per_page: 15,
//       safesearch: 'true',
//     },
//   };

//   const response = await axios.get(`https://pixabay.com/api/`, axiosOptions);

//   return response.data;
// };
const playerName = 'Cor';
const getTeeInfo = async () => {
  const axiosOptions = {
    params: {
      json2: playerName,
    },
  };

  const response = await axios.get(
    `https://ddnet.org/players/
`,
    axiosOptions
  );
  console.log(response);
  return response;
};

const button = document.querySelector('.js-button');
const input = document.querySelector('.js-input');
const list = document.querySelector('.js-list');
const item = document.querySelector('.js-item');
button.addEventListener('click', () => {
  inputValue = input.value;
  console.log(inputValue);
});
