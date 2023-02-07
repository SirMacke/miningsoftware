<template>
  <div>
    <Navbar :tone="'black'" @isAsideOpen="isAsideOpen = !isAsideOpen" />
    <Aside :tone="'white'" :isAsideOpen="isAsideOpen" @isAsideClose="isAsideOpen = !isAsideOpen" />
    <div id="about">
      <div id="left">
        <h1>About Us</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet viverra sem, eget semper purus. Aliquam sed magna vitae mauris facilisis elementum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet viverra sem, eget semper purus. Aliquam sed magna vitae mauris facilisis elementum.</p>
        <img src="/images/about/abb-gymnasiet.png">
      </div>
      <div id="right">
        <img src="/images/about/about.jpg">
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

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
#about
  position: absolute
  display: grid
  grid-template-columns: 1fr 1fr
  width: 1000px
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)

  @media screen and (max-width: 1200px)
    width: 80%

  @media screen and (max-width: 1000px)
    grid-template-columns: 1fr
    grid-template-rows: 1fr 1fr
    height: 100vh
  
  @media screen and (max-width: 800px)
    width: 90%

  #left

    h1
      @media screen and (max-width: 1000px)
        margin-top: 175px
        width: 75%
        margin-left: 15%
      
      @media screen and (max-width: 600px)
        width: 90%
        margin-left: 5%

    p
      width: 95%
      font-size: 1.2em
      
      @media screen and (max-width: 1000px)
        width: 70%
        margin-left: 15%
      
      @media screen and (max-width: 600px)
        width: 90%
        margin-left: 5%

    img
      width: 125px
      margin-top: 20px
      
      @media screen and (max-width: 1000px)
        margin-left: 15%
      
      @media screen and (max-width: 600px)
        margin-left: 5%

  #right

    img
      position: relative
      width: 90%
      left: 50%
      top: 50%
      transform: translate(-50%, -50%)
      border-radius: 10px
      box-shadow: 10px 10px 20px 0px rgba($black, 0.5)

      @media screen and (max-width: 1000px)
        width: 70%
        top: 25px
        transform: translate(-50%, 0%)
      
      @media screen and (max-width: 600px)
        width: 90%
</style>