import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const button = document.querySelector('.js-button');
const input = document.querySelector('.js-input');
const list = document.querySelector('.js-list');
const item = document.querySelector('.js-item');

const players = [];
const handlerIzitoast = (title, message, color) => {
  iziToast.show({
    closeOnClick: true,
    messageColor: color,
    timeout: 1500,
    transitionIn: 'flipInX',
    position: 'topCenter',
    titleColor: 'green',
    title: title,
    drag: true,
    close: false,
    message: message,
  });
};

const getTeeInfo = async playerName => {
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

  return response.data;
};
s;

document.addEventListener('keydown', ev => {
  if (ev.key === 'Enter') {
    cardInsert();
  }
});

async function cardInsert() {
  const inputValue = input.value;
  input.value = '';
  button.disabled = true;
  // document.removeEventListener();
  if (players.includes(inputValue) || inputValue.trim() === '') {
    handlerIzitoast('', 'Player is already added!', 'green');

    return;
  }
  // {player, favourite_server, favourite_partners, points:{points,rank}, types, activity}
  handlerIzitoast('Wait', '- Player is loading!');

  const teeInfo = await getTeeInfo(inputValue);
  if (teeInfo.player === undefined) {
    handlerIzitoast('Oops!', '- Player doesnt exist!', 'red');

    return;
  }
  players.push(inputValue);
  const {
    player,
    favorite_server,
    favorite_partners,
    points: { points, rank },
    types,
    activity,
  } = teeInfo;
  console.log(players);

  let totalHours = 0;
  let totalFinished = 0;
  activity.map(el => {
    totalHours = totalHours + parseInt(el.hours_played);
  });
  for (let item in types) {
    const oneMap = types[item].maps;
    for (let oneMapsItem in oneMap) {
      const oneFinish = oneMap[oneMapsItem].finishes;
      totalFinished = totalFinished + oneFinish;
    }
  }

  list.insertAdjacentHTML(
    'beforeend',
    `   <li id=${player} class="js-item list-item">
          <img class="tee-container" src="" alt="" />
          <div class="info-container">
            <h1 class="tee-name">${player}</h1>
            <p class="tee-info">Points: ${points}</p>
            <p class="tee-info">Rank: ${rank}</p>
            <p class="tee-info">Favourite partner: ${favorite_partners[0].name}</p>
            <p class="tee-info">Favourite server: ${favorite_server.server}</p>
            <p class="tee-info">Total played: ${totalHours}h </p>
            <p class="tee-info">Finishline touched: ${totalFinished} times</p>
          </div>
        </li>`
  );
}

// https://ddnet.org/players/?query=Cor -МОЖНО ДЕЛАТЬ ЗАПРОС НА СЕРВЕР И ПОЛУЧАТЬ ПОДХОДЯЩИЕ НИКИ
// https://ddstats.tw/player/json?player=Cor
