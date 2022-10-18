<template>
  <aside :class="{ asideOpen: isAsideOpen, asideClose: firstOpenHappened ? !isAsideOpen : onload(), black: tone == 'black' }">
    <svg :class="{ black: tone == 'black' }" @click="clickHandler" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
    <div id="main-links">
      <div :class="{ black: tone == 'black' }"><a class="link" href="/" @click="clickHandler">Home</a></div>
      <div :class="{ black: tone == 'black' }"><a class="link" href="/calculator" @click="clickHandler">Calculator</a></div>
      <div :class="{ black: tone == 'black' }"><a class="link" href="/profitability" @click="clickHandler">Profitability</a></div>
      <div :class="{ black: tone == 'black' }"><a class="link" href="/about" @click="clickHandler">About</a></div>
      <div :class="{ black: tone == 'black' }"><a class="link" href="/contact" @click="clickHandler">Contact</a></div>
    </div>
  </aside>
</template>

<script>
export default {
  props: ['isAsideOpen', 'tone'],
  data() {
    return {
      firstOpenHappened: false
    }
  },
  methods: {
    onload() {
      if (this.isAsideOpen) this.firstOpenHappened = true;
      return false;
    },
    clickHandler(e) {
      this.$emit('isAsideClose');
    }
  }
}
</script>

<style lang="sass" scoped>
aside
  position: fixed
  width: 300px
  height: 100vh
  left: -350px
  overflow: hidden
  z-index: 20
  box-shadow: 0px 0px 50px 1px rgba(black, 0.2)
  background: rgba($white, 0.5)
  backdrop-filter: blur(10px)

  @media screen and (max-width: 300px)
    width: 100%

  svg:hover
    cursor: pointer

  svg
    position: absolute
    top: 25px
    left: 55px
    fill: $white
    height: 50px
    width: 50px

    @media screen and (max-width: 600px)
      top: 31px
      left: 34px
      
    @media screen and (max-width: 400px)
      top: 30px
      left: 29px

  .black
    fill: $black

  #main-links
    display: flex
    flex-direction: column
    margin: 0px 0px 0px 0px
    padding-top: 100px

    .black
      color: $black

    div
      width: 100%
      padding: 10px 0px
      margin: 0px auto 0px 0px
      font-size: 1.25em
      transition: 0.25s
      color: $white

      @media screen and (max-width: 300px)
        margin: 0px auto
        text-align: center

      .link
        padding: 10px 180px 10px 60px
        color: inherit
        text-decoration: none

        @media screen and (max-width: 300px)
          margin: 0px auto

    div:hover
      cursor: pointer
      background: rgba($color, 0.25)

.asideOpen
  animation: asideOpen ease-in-out 1s forwards

  @media screen and (max-width: 300px)
    animation: asideOpen300 ease-in-out 1s forwards

.asideClose
  animation: asideClose ease-in-out 1s forwards

  @media screen and (max-width: 300px)
    animation: asideClose300 ease-in-out 1s forwards

@keyframes asideOpen
  0%
    left: -350px
  100%
    left: 0px
    
@keyframes asideClose
  0%
    left: 0px
  100%
    left: -350px

@keyframes asideOpen300
  0%
    left: calc(-100% - 50px)
  100%
    left: 0px
    
@keyframes asideClose300
  0%
    left: 0px
  100%
    left: calc(-100% - 50px)
</style>