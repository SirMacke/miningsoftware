<template>
  <nav>
    <div v-if="tone == 'white'" class="white">
      <img @click="clickHandler" src="/images/nav/menu_white.png">
      <NuxtLink to="/">Miningsoftware</NuxtLink>
    </div>
    <div v-if="tone == 'black'" class="black">
      <img @click="clickHandler" src="/images/nav/menu_black.png">
      <NuxtLink to="/">Miningsoftware</NuxtLink>
    </div>
  </nav>
</template>

<script setup>
const props = defineProps(['tone']);
</script>

<script>
export default {
  data() {
    return {
      isAsideOpen: true
    };
  },
  methods: {
    clickHandler(e) {
      console.log('heree')
      this.$emit('isAsideOpen');
      this.isAsideOpen = !this.isAsideOpen;
    }
  }
};
</script>

<style lang="sass" scoped>
nav
  position: absolute
  height: 100px
  width: 100vw
  z-index: 20

  div
    display: flex
    width: 100%
    height: 100%

    img
      position: relative
      top: 50%
      transform: translateY(-50%)
      left: 50px
      height: 65px
      width: 65px
      object-fit: cover

    img:hover
      cursor: pointer

    a
      position: relative
      margin: auto 0px
      left: 80px
      font-size: 1.75em
      text-decoration: none
      font-family: "Poppins", "sans-serif"

  .white
    a
      color: $white

  .black
    a
      color: $black
</style>