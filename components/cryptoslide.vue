<template>
  <div id="cryptoslide">
    <div class="crypto" v-for="(crypto, index) of cryptos">
      <img :src="crypto.image">
      <p class="ticker">{{ crypto.ticker }}</p>
      <p class="price" :class="{ down: !crypto.priceDirection24h, up: crypto.priceDirection24h }">${{ crypto.priceUSD }}</p>
    </div>
  </div>
</template>

<script setup>
let cryptos = (await useFetch('/api/cryptoslide')).data.value;
</script>

<style lang="sass" scoped>
#cryptoslide
  position: absolute
  bottom: 0px
  width: 100%
  height: 60px
  background: rgba($white, 0.75)
  display: flex
  flex-direction: row
  overflow: hidden
  cursor: default

  @keyframes slide
    0%
      left: 0px
    100%
      left: calc(6 * -240px)

  .crypto
    position: relative
    height: 100%
    min-width: 190px
    display: flex
    flex-direction: row
    margin: auto 25px
    font-weight: bold
    font-size: 1.1em
    animation: slide 20s infinite linear

    @media screen and (max-width: 800px)
      margin: auto 15px

    img
      height: 35px
      object-fit: cover
      margin: auto 0px

    .ticker
      margin: auto 12.5px

      @media screen and (max-width: 800px)
        margin: auto 10px

    .price
      margin: auto 0px
    
    .down
      color: $red

    .up
      color: $color
</style>