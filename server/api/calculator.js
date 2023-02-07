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
        image: $(`table > tbody > tr:nth-child(${index + 1}) > td:nth-child(3) > div > a > div > img`).attr('src')
      });
    }
  });

  for (let x = cryptos.length - 1; x >= 0; x--) {
    //console.log(cryptos[x].ticker)
    if (cryptos[x].ticker == 'USDT' || cryptos[x].ticker == 'USDC' || cryptos[x].ticker == 'BUSD') {
      cryptos.splice(x, 1);
    }
  }

  return cryptos;
});