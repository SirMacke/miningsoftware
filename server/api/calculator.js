import axios from 'axios';
import cheerio from 'cheerio';

export default defineEventHandler(async (event) => {
  let res = await axios('https://coinmarketcap.com/');
  const $ = cheerio.load(res.data);

  let cryptos = [];
  $('table > tbody > tr').each((index, element) => {
    if ($(`table > tbody > tr:nth-child(${index + 1}) > td:nth-child(3) > a > span:nth-child(2)`).text() == '') {
      cryptos.push({
        coin: $(`table > tbody > tr:nth-child(${index + 1}) > td:nth-child(3) > div > a > div > div > p`).text(),
        ticker: $(`table > tbody > tr:nth-child(${index + 1}) > td:nth-child(3) > div > a > div > div > div > p`).text(),
      });
    }
  });

  return cryptos;
});