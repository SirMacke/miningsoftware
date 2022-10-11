<template>
  <div>
    <Navbar :tone="'black'" />
    <section id="coins">
      <h1>What cryptos are you mining?</h1>
      <div id="buttons">
        <div class="btn" v-for="(crypto, index) of cryptos" @click="clickHandler(crypto)" :class="{ selected: selectedCryptos[crypto.ticker] == true ? true : false }">{{selectedCryptos[crypto.ticker]}}
          <p>{{ crypto.ticker }}</p>
        </div>
      </div>
    </section>
    <section id="hashrate">
     
    </section>
    <section id="electricity">
     
    </section>
    <div class="continue"><p>Continue</p><img src="/images/chevron_black.png"></div>
  </div>
</template>

<script setup>
let cryptos = (await useFetch('/api/calculator')).data.value;

let selectedCryptos = {};
for (let crypto of cryptos) selectedCryptos[crypto.ticker] = false;
function clickHandler(crypto) {
  console.log(crypto)
  selectedCryptos[crypto.ticker] == undefined ? selectedCryptos[crypto.ticker] = true : selectedCryptos[crypto.ticker] = !selectedCryptos[crypto.ticker]
  console.log(selectedCryptos)
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
  display: none
  overflow: none
  text-align: center

  h1
    margin: 0px 0px 40px 0px

#coins
  display: block

  #buttons
    display: flex
    flex-flow: row wrap
    justify-content: center
    align-content: center
    align-items: center
    width: 650px

    .btn
      margin: 10px
      padding: 10px 25px
      background: $red
      border-radius: 10px
      color: $white
      font-weight: bold

      p
        margin: 0px

    .btn:hover
      cursor: pointer

    .selected
      background: $color


.continue
  position: absolute
  bottom: 50px
  left: 50%
  transform: translateX(-50%)
  display: flex

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