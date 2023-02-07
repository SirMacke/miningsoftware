<template>
  <div>
    <Navbar :tone="'white'" @isAsideOpen="isAsideOpen = !isAsideOpen" />
    <Aside :tone="'white'" :isAsideOpen="isAsideOpen" @isAsideClose="isAsideOpen = !isAsideOpen" />
    <HeroBackground />
    <main>
      <h1>Crypto Mining Profitability</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet viverra sem, eget semper purus. Aliquam sed magna vitae mauris facilisis elementum.</p>
      <NuxtLink to="/calculator" id="button">
        <p>Calculator</p>
        <img src="/images/hero/growth.png" alt="Growth image">
      </NuxtLink>
    </main>
    <Cryptoslide />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAsideOpen: false
    }
  }
}
</script>

<style lang="sass" scoped>
main
  position: absolute
  height: auto
  width: auto
  left: 50%
  top: 47.5%
  transform: translate(-50%, -50%)
  text-align: center
  color: $white

  @media screen and (max-width: 1000px)
    width: 80%
    top: 50%

  h1
    margin: 0px
    font-size: 3em
    line-height: 1.15em

    @media screen and (max-width: 1000px)
      font-size: 2.5em

    @media screen and (max-width: 400px)
      font-size: 2em

  p
    width: 850px
    font-size: 1.4em
    margin: 35px 0px

    @media screen and (max-width: 1000px)
      width: 100%
      margin: 20px 0px 0px 0px

    @media screen and (max-width: 400px)
      font-size: 1.3em

  #button
    position: relative
    left: 50%
    transform: translateX(-50%)
    background: $color
    width: 185px
    height: 50px
    display: flex
    border-radius: 10px
    transition: 0.25s
    margin-top: 50px
    color: $white
    text-decoration: none

    @media screen and (max-width: 1000px)
      margin-top: 35px

    @media screen and (max-width: 400px)
      width: 160px
      height: 45px

    p
      margin: auto 0px auto 12.5px
      font-size: 1.25em
      font-weight: bold

      @media screen and (max-width: 400px)
        font-size: 1.15em

    img
      width: 30px
      height: 30px
      object-fit: cover
      margin: auto 20px auto 0px

      @media screen and (max-width: 400px)
        width: 25px
        height: 25px

  #button:hover
    cursor: pointer
    background: $darkcolor
</style>