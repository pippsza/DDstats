// https://ddnet.org/players/?json2=Cor
// import axios from 'axios';
const button = document.querySelector('.js-button');
const input = document.querySelector('.js-input');
const list = document.querySelector('.js-list');
const item = document.querySelector('.js-item');
button.addEventListener('click', () => {
  inputValue = input.value;
  console.log(inputValue);
});
