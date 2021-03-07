import axios from 'axios';

const key = 'Zl4d7IVkemOTTVg2fUdz';

export const scoreBoard = async () => {
  const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores`);
  const json = response.json();
  return json
}

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