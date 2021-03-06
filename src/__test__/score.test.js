import scoreboard from './../api/scoreboard';

const axios = require('axios');
const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
const key = 'Zl4d7IVkemOTTVg2fUdz';

jest.mock('axios');

describe('API Working', () => {
  test('API Fetches Results', () => {
    const mockedResponse = { data: { user: 'user', score: 10 } };
    axios.get.mockResolvedValue(mockedResponse);
    scoreboard.getScore();

    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(`${url}${key}/scores`);
  });
});