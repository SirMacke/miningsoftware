<template>
  <div>
    <Navbar :tone="'black'" @isAsideOpen="isAsideOpen = !isAsideOpen" />
    <Aside :tone="'black'" :isAsideOpen="isAsideOpen" @isAsideClose="isAsideOpen = !isAsideOpen" />
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
            <img :src="`/images/crypto/${index}.png`">
            <p>{{ index }}</p>
          </div>
          <div class="bottom">
            <input type="number" placeholder="Hashrate">
            <div class="line"></div>
            <input type="number" placeholder="Watts">
          </div>
        </div>
      </div>
    </section>
    <section id="electricity" :class="{ openSection: route.hash == '#electricity' }">
      <h1>Electricity Price</h1>
    </section>
    <a class="continue" :href="route.hash == '' || route.hash == '#coins' ? '#hashrate' : '#electricity'"><p>Continue</p><img src="/images/chevron_black.png"></a>
  </div>
</template>

<script setup>
const route = useRoute();
let cryptos = (await useFetch('/api/calculator')).data.value;
</script>

<script>
export default {
  data() {
    return {
      isAsideOpen: false,
      selectedCryptos: {}
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

  h1
    margin: 0px 0px 40px 0px

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

    .btn
      margin: 10px
      padding: 10px 20px
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

    .deselected
      background: $red

#hashrate

  #container
    display: flex
    flex-flow: row wrap
    justify-content: center
    align-content: center
    align-items: center
    width: 650px

    .box
      position: relative
      margin: 0px 10px
      background: white
      border-radius: 5px
      box-shadow: 0px 0px 20px 1px rgba($black, 0.025) 

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
        margin-bottom: 10px

        input
          border: none
          background: none
          padding: 7.5px 20px
          font-size: 1em
          width: 175px
          margin: 2.5px
          outline: none

        .line

#electricity

.continue
  position: absolute
  bottom: 50px
  left: 50%
  transform: translateX(-50%)
  display: flex
  color: $black
  text-decoration: none

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