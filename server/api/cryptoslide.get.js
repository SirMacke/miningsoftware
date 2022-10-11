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
        image: $(`table > tbody > tr:nth-child(${index + 1}) > td:nth-child(3) > div > a > div > img`).attr('src'),
        priceUSD: parseFloat($(`table > tbody > tr:nth-child(${index + 1}) > td:nth-child(4) > div > a > span`).text().replace(/,/gi, '').replace('$', '')),
        priceDirection24h: $(`table > tbody > tr:nth-child(${index + 1}) > td:nth-child(6) > span > span`).attr('class') == 'icon-Caret-down' ? false : true
      });
    }/* else {
      console.log($(`table > tbody > tr:nth-child(${index + 1}) > td:nth-child(2) > span`).text())
      cryptos.push({
        coin: $(`table > tbody > tr:nth-child(${index + 1}) > td:nth-child(3) > a > span:nth-child(2)`).text(),
        ticker: $(`table > tbody > tr:nth-child(${index + 1}) > td:nth-child(3) > a > span:nth-child(3)`).text(),
        image: $(`table > tbody > tr:nth-child(${index + 1}) > td:nth-child(3) > a > div > img`).attr('src'),
        priceUSD: parseFloat($(`table > tbody > tr:nth-child(${index + 1}) > td:nth-child(4) > span`).text().replace('$', ''))
      });
    }*/
  });

  return cryptos;
});