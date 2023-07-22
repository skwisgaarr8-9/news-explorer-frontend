const currentDate = new Date();
const currentDateString = currentDate.toLocaleDateString('sv-SE');
const weekPriorDateString = new Date(
  currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
).toLocaleDateString('sv-SE');

const getNewsData = ({ apiKey, keyword }) => {
  return fetch(
    `https://nomoreparties.co/news/v2/everything?q=${keyword}&from=${weekPriorDateString}&to=${currentDateString}&pageSize=100&apiKey=${apiKey}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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
