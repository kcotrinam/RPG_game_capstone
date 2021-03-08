import {scoreBoard} from '../api/scoreboard';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ result: {} }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

describe('Requesting data from the API', () => {
  it("The result of the promise should be an object", async () => {
    const result = await scoreBoard();
    
    expect(typeof result).toBe('object');
  });

  it("The result of the promise should be an object", async () => {
    const result = await scoreBoard();
    
    expect(typeof result).not.toBe('integer');
  });

  it("finds exchange", async () => {
    const result = await scoreBoard();

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("finds exchange", async () => {
    const result = await scoreBoard();
    const result1 = await scoreBoard();

    expect(fetch).toHaveBeenCalledTimes(2);
  });
});