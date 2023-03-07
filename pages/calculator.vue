<template>
  <div>
    <Navbar :tone="'black'" @isAsideOpen="isAsideOpen = !isAsideOpen" />
    <Aside :tone="'white'" :isAsideOpen="isAsideOpen" @isAsideClose="isAsideOpen = !isAsideOpen" />
    <section id="coins" :class="{ openSection: route.hash == '' || route.hash == '#coins' }">
      <h1>What cryptos are you mining?</h1>
      <div id="buttons">
        <div class="btn" v-for="(crypto, index) of cryptos" @click="clickHandler(crypto)" :class="{ selected: selectedCryptos[crypto.ticker], deselected: !selectedCryptos[crypto.ticker] }">
          <p>{{ crypto.ticker }}</p>
        </div>
      </div>
    </section>
    <section id="hashrate" :class="{ openSection: route.hash == '#hashrate' }">
      <h1>Hashrate & Power Consumption</h1>
      <div id="container">
        <div v-for="(crypto, index) of selectedCryptos" class="box">
          <div class="top">
            <img :src="tickerToData[index].image">
            <p>{{ index }}</p>
          </div>
          <div class="bottom">
            <input type="number" placeholder="Hashrate" v-model="tickerToData[index].hashrate">
            <div class="line"></div>
            <input type="number" placeholder="Watts" v-model="tickerToData[index].watts">
          </div>
        </div>
      </div>
    </section>
    <section id="electricity" :class="{ openSection: route.hash == '#electricity' }">
      <h1>Electricity Price</h1>
      <div id="container">
        <input type="number" placeholder="Price" v-model="electricity.value">
        <div id="inside-input">
          <div id="currency">
            <!--<img class="left" src="/images/chevron_black.png">-->
            <input type="text" v-model="electricity.currency" readonly>
            <!--<img class="right" src="/images/chevron_black.png">-->
          </div>
          <p>/</p>
          <div id="amount">
            <!--<img class="left" src="/images/chevron_black.png">-->
            <input type="text" v-model="electricity.format" readonly>
            <!--<img class="right" src="/images/chevron_black.png">-->
          </div>
        </div>
      </div>
    </section>
    <section id="result" :class="{ openSection: route.hash == '#result' }">
      <div id="container">
        <div id="top">
          <h1>Profitability</h1>
          <div id="right">
            <div class="btn">
              <p>1D</p>
            </div>
            <div class="btn">
              <p>7D</p>
            </div>
            <div class="btn">
              <p>30D</p>
            </div>
          </div>
        </div>
        <div id="charts">

        </div>
        <table id="table">
          <tr>
            <th>Ticker</th>
            <th>Difficulty</th>
            <th>Reward</th>
            <th>Revenue</th>
            <th>Electricity Cost</th>
            <th>Profit</th>
          </tr>
          <tr v-for="crypto of cryptos">
            {{crypto}}
            <td>{{crypto.ticker}}</td>
            <td>{{crypto.difficulty}}</td>
            <td>{{crypto.reward}}</td>
            <td>{{crypto.revenue}}</td>
            <td>{{crypto.electricityCost}}</td>
            <td>{{crypto.profit}}</td>
          </tr>
        </table>
      </div>
    </section>
    <a class="continue" v-if="route.hash == '' || route.hash == '#coins'" :href="Object.keys(selectedCryptos).length > 0 ? '#hashrate' : ''"><p>Continue</p><img src="/images/chevron_black.png"></a>
    <a class="continue" v-if="route.hash == '#hashrate'" href="#electricity"><p>Continue</p><img src="/images/chevron_black.png"></a>
    <a class="continue" v-if="route.hash == '#electricity'" href="#result"><p>Continue</p><img src="/images/chevron_black.png"></a>
  </div>
</template>

<script setup>
const route = useRoute();
let cryptos = (await useFetch('/api/calculator')).data.value;

let tickerToData = {};
for (let crypto of cryptos) tickerToData[crypto.ticker] = crypto;
</script>

<script>
export default {
  data() {
    return {
      isAsideOpen: false,
      selectedCryptos: {},
      electricity: {
        value: 0,
        currency: '$',
        format: 'kWh'
      },
      cryptos: []
    }
  },
  methods: {
    clickHandler(e) {
      console.log(e)
      this.selectedCryptos[e.ticker] == undefined ? this.selectedCryptos[e.ticker] = true : this.selectedCryptos[e.ticker] = !this.selectedCryptos[e.ticker]
      console.log(this.selectedCryptos)
    }
  }
}
</script>

<style lang="sass" scoped>
section
  position: absolute
  left: 50%
  top: 47.5%
  transform: translate(-50%, -50%)
  width: auto
  height: auto
  text-align: center
  display: none

  @media screen and (max-width: 1000px)
    width: 80%
    top: 50%

  h1
    margin: 0px 0px 40px 0px
    font-size: 2em
    line-height: 1.25em

    @media screen and (max-width: 1000px)
      margin-bottom: 25px

    @media screen and (max-width: 400px)
      font-size: 1.75em

.openSection
  display: block

#coins

  #buttons
    display: flex
    flex-flow: row wrap
    justify-content: center
    align-content: center
    align-items: center
    width: 650px

    @media screen and (max-width: 1000px)
      width: 100%

    .btn
      margin: 10px
      padding: 10px 20px
      background: $red
      border-radius: 10px
      color: $white
      font-weight: bold
      transition: 0.25s

      @media screen and (max-width: 1000px)
        margin: 7.5px

      p
        margin: 0px
        font-size: 1.25em

    .selected
      background: $color

    .selected:hover
      cursor: pointer
      background: $darkcolor

    .deselected
      background: $red

    .deselected:hover
      cursor: pointer
      background: $red-2

#hashrate

  #container
    display: flex
    flex-flow: row wrap
    justify-content: center
    align-content: center
    align-items: center
    width: 85vw

    @media screen and (max-width: 1000px)
      width: 100%

    .box
      position: relative
      margin: 10px
      background: white
      border-radius: 5px
      box-shadow: 0px 0px 20px 1px rgba($black, 0.025) 
      padding-bottom: 5px

      .top
        display: flex
        position: absolute
        width: auto
        left: 50%
        top: 20px
        transform: translateX(-50%)

        img
          width: 30px
          height: 30px
          object-fit: contain
          margin: auto 4px auto 0px

        p
          margin: auto 0px auto 4px
          font-weight: bold

      .bottom
        margin-top: 60px

        input
          border: none
          background: none
          padding: 10px 20px
          font-size: 1em
          width: 175px
          margin: 5px 2.5px
          outline: none

        .line
          background: rgba($black, 0.1)
          width: 100%
          height: 2px

#electricity

  @media screen and (max-width: 1000px)
    width: auto

  #container
    position: relative
    margin: 10px
    background: white
    border-radius: 5px
    box-shadow: 0px 0px 20px 1px rgba($black, 0.025) 

    @media screen and (max-width: 1000px)
      width: 270px
      left: 50%
      transform: translateX(-50%)

    input
      border: none
      background: none
      padding: 15px 10px
      font-size: 1.2em
      margin: 5px -2.5px 5px 12.5px
      outline: none

    #inside-input
      position: absolute
      display: flex
      flex-direction: row
      top: 50%
      transform: translateY(-50%)
      right: 20px
      height: 35px
      
      img
        width: 25px
        height: 25px
        object-fit: cover

      .left
        transform: rotateZ(180deg)

      div
        display: flex
        margin: 0px 0px
        padding: 0px

        input
          margin: auto 0px
          padding: 0px
          border: none
          outline: none
          text-align: center

        img
          margin: auto
          padding: 0px
          
        img:hover
          cursor: pointer

      #currency
        input
          width: 10px

      p
        margin: auto 5px

      #amount
        input
          width: 37.5px


#result

  #container
    position: relative
    width: 1000px
    left: 50%
    transform: translateX(-50%)

    #top
      display: flex
      height: 100px

      h1
        position: relative
        margin: 0px
        top: 50%
        transform: translateY(-50%)
        left: 0px

      #right
        display: flex
        position: absolute
        top: 50%
        transform: translateY(-50%)
        right: 0px

        .btn
          margin: 10px
          padding: 10px 20px
          background: $red
          border-radius: 10px
          color: $white
          font-weight: bold
          transition: 0.25s

        p
          margin: 0px
          font-size: 1.25em

        .selected
          background: $color

        .selected:hover
          cursor: pointer
          background: $darkcolor

        .deselected
          background: $red

        .deselected:hover
          cursor: pointer
          background: $red-2


    #charts
      display: none


.continue
  position: absolute
  bottom: 50px
  left: 50%
  transform: translateX(-50%)
  display: flex
  color: $black
  text-decoration: none
  font-size: 1.1em

  p
    margin: auto 0px
    font-weight: bold
    font-size: 1.25em

  img
    margin: 1px 0px 0px 0px
    height: 1.5em
    object-fit: cover

.continue:hover
  cursor: pointer
</style>