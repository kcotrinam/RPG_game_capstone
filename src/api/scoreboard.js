import axios from 'axios';

const key = 'Zl4d7IVkemOTTVg2fUdz';
const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores`

export const scoreBoard = async () => {
  const response = await fetch(url);
  const json = response.json();
  return json
}

export const setScore = async (user, score) => {
  console.log(user, score)
  const submit = {
    user,
    score,
  };
  const post = JSON.stringify(submit);
  const address = url;
  const settings = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: post,
  };
  const response = await fetch(address, settings);
  const answer = await response.json();
  return answer;
};

const sortScores = (obj) => {
  const array = [];
  for (let i = 0; i < obj.length; i += 1) {
    array.push([obj[i].user, obj[i].score]);
  }
  return Array.from(array).sort((a, b) => b[1] - a[1]);
};

const scoreboard = (() => {
  const getScore = () => new Promise((resolve, reject) => {
    const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores`;
    axios.get(url).then((res) => {
      resolve(res.data.result);
    }).catch((error) => {
      reject(error.message);
    });

  });



  const orderedScores = (data) => {
    const arr = [...data];
    arr.sort((a, b) => {
      if (a.score > b.score) {
        return -1;
      }
      if (b.score > a.score) {
        return 1;
      }
      return 0;
    });
    return arr;
  };

  const setScore = (user, score) => new Promise((resolve, reject) => {
    // console.log(user, score)
    const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`;
    axios.post(url, { user, score }).then((res) => {
      resolve(res.data.result);
    }).catch((error) => {
      reject(error);
    });
  });


  return {
    getScore,
    orderedScores,
    setScore,
  };
})();

export default scoreboard;