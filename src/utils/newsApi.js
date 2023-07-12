const currentDate = new Date();
const currentDateString = currentDate.toLocaleDateString('sv-SE');
const weekPriorDateString = new Date(
  currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
).toLocaleDateString('sv-SE');

const getNewsData = ({ apiKey, topic }) => {
  return fetch(
    `https://newsapi.org/v2/everything?q=${topic}&from=${weekPriorDateString}&to=${currentDateString}&pageSize=100`,
    {
      method: 'GET',
      headers: {
        'X-API-KEY': apiKey,
      },
    }
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  });
};

export default getNewsData;
