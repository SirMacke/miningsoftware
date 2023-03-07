import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

export default defineEventHandler(async (event) => {
  let res = await axios('https://coinmarketcap.com/');
  const $ = cheerio.load(res.data);

  fs.writeFileSync('test.html', res.data);

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



  /*

  let d = Math.round(new Date().getTime() / 1000);
  let coinToAlgo = {
    'ETC': 'Etchash'
  }

  let results = [];

  for (let coin of Object.keys(coinToAlgo)) {
    console.log(`https://api.minerstat.com/v2/coins-history?time=21678181700&coin=${coin}&algo=${coinToAlgo[coin]}`)
    // time=21661838300 - remove the first digit to 
    let res = await axios(`https://api.minerstat.com/v2/coins-history?time=2${d}&coin=${coin}&algo=${coinToAlgo[coin]}`);
  
    console.log(Object.keys(res.data));
    console.log(Object.keys(res.data[coin]).length);
  
  
    // time
    // network difficulty - 0
    // network hashrate - 1
    // eth/hour/hash - 2
    // price - 3
  
    let arr = [];
    let dataLength = Object.keys(res.data[coin]).length;

    for (let x = 0; x < dataLength; x += Math.round(dataLength / 200)) {
      let index = Object.keys(res.data[coin])[x];

      let dataPoint = {
        time: new Date(index),
        difficulty: parseFloat(res.data[coin][index][0]),
        hashrate: parseFloat(res.data[coin][index][3]),
        revenuePerHashPerHour: parseFloat(res.data[coin][index][3]),
        price: parseFloat(res.data[coin][index][3])
      }
      
      if (dataPoint.difficulty != undefined && dataPoint.hashrate != undefined && dataPoint.revenuePerHashPerHour != undefined && dataPoint.price != undefined) arr.push(dataPoint);
    }

    results.push(arr);

    let prices = [];
    for (let item of arr) prices.push(item.price);

    console.log(asciichart.plot(prices, { height: 50 }));
  }

  //console.log(result)

  */




  return cryptos;
});