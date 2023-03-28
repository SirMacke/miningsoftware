import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

export default defineEventHandler(async (event) => {
  let res = await axios('https://coinmarketcap.com/');
  const $ = cheerio.load(res.data);

  //fs.writeFileSync('test.html', res.data);

  let cryptos = [];
  $('table > tbody > tr').each((index, element) => {
    //table > tbody > tr:nth-child(30) > td:nth-child(3) > div > a > div > div > p
    
    console.log($(`table > tbody > tr:nth-child(${index + 1}) > td:nth-child(3) > div > a > div > div > p`).text())
    
    if ($(`table > tbody > tr:nth-child(${index + 1}) > td:nth-child(3) > div > a > div > div > p`).text() == '') {
      /*cryptos.push({
        coin: $(`table > tbody > tr:nth-child(${index + 1}) > td:nth-child(3) > a > span:nth-child(2)`).text(),
        ticker: $(`table > tbody > tr:nth-child(${index + 1}) > td:nth-child(3) > a > span:nth-child(2)`).text()
      });*/
    } else {
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

  console.log(cryptos)



  

  let d = Math.round(new Date().getTime() / 1000);
  let coinToAlgo = {
    'ETC': 'Etchash',
    'BTC': 'SHA-256'
  }

  for (let coin of cryptos) {
    
    if (!Object.keys(coinToAlgo).includes(coin.ticker)) continue;

    console.log(`https://api.minerstat.com/v2/coins-history?time=21678181700&coin=${coin.ticker}&algo=${coinToAlgo[coin.ticker]}`)
    // time=21661838300 - remove the first digit to 
    let res2 = await axios(`https://api.minerstat.com/v2/coins-history?time=2${d}&coin=${coin.ticker}&algo=${coinToAlgo[coin.ticker]}`);
  
    console.log(Object.keys(res2.data));
    console.log(Object.keys(res2.data[coin.ticker]).length);
  
  
    // time
    // network difficulty - 0
    // network hashrate - 1
    // eth/hour/hash - 2
    // price - 3
  
    let arr = [];
    let dataLength = Object.keys(res2.data[coin.ticker]).length;

    for (let x = 0; x < dataLength; x += Math.round(dataLength / 200)) {
      let index = Object.keys(res2.data[coin.ticker])[x];

      let dataPoint = {
        time: new Date(parseInt(index + '000')),
        difficulty: parseFloat(res2.data[coin.ticker][index][0]),
        hashrate: parseFloat(res2.data[coin.ticker][index][1]),
        revenuePerHashPerHour: parseFloat(res2.data[coin.ticker][index][2]),
        price: parseFloat(res2.data[coin.ticker][index][3])
      }
      
      if (dataPoint.difficulty != undefined && dataPoint.hashrate != undefined && dataPoint.revenuePerHashPerHour != undefined && dataPoint.price != undefined) arr.push(dataPoint);
    }

    //let prices = [];
    //for (let item of arr) prices.push(item.price);
    //console.log(asciichart.plot(prices, { height: 50 }));

    coin.data = arr;

  }


  return cryptos;

});