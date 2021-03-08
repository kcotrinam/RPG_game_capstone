const key = 'Zl4d7IVkemOTTVg2fUdz';
const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores`;

const sortScores = (data) => {
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

export const scoreBoard = async () => {
  const response = await fetch(url);
  const json = await response.json();
  return sortScores(json.result);
};

export const setScore = async (user, score) => {
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
