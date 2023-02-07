<template>
  <div>
    <Navbar :tone="'white'" @isAsideOpen="isAsideOpen = !isAsideOpen" />
    <Aside :tone="'white'" :isAsideOpen="isAsideOpen" @isAsideClose="isAsideOpen = !isAsideOpen" />
    <HeroBackground />
    <div id="contact">
      <form onsubmit="return false">
        <div id="center">
          <div id="top">
            <h2>Write to us</h2>
          </div>
          <div id="inputs">
            <input type="text" autocomplete="off" name="name" v-model="name" placeholder="Name..." required>
            <input type="email" autocomplete="off" name="email" v-model="email" placeholder="Email..." required>
            <input type="email" autocomplete="off" name="emailConfirmation" v-model="emailConfirmation" placeholder="Confirm email..." required>
          </div>
          <textarea type="text" autocomplete="off" v-model="message" placeholder="Message..." required></textarea>
          <div id="bottom">
            <button onclick="submitContactForm()">Submit</button>
            <p v-if="messageSuccess" class="success">Successfully submitted message!</p>
            <p v-if="messageAlreadyReceived" class="success">Message already received</p>
            <p v-if="messageWarning" class="warning">Please fill out all fields</p>
            <p v-if="messageWarningEmail" class="warning">Please make sure your emails match</p>
            <p v-if="messageFailed" class="failed">Failed to submit contact form. Please contact us at support@mining.calc</p>
          </div>
        </div>
      </form>
    </div>
    <Cryptoslide />
  </div>
</template>


<script setup>
const props = defineProps(['lang']);

const name = useState('name', () => '');
const email = useState('email', () => '');
const emailConfirmation = useState('emailConfirmation', () => '');
const message = useState('message', () => '');
</script>

<script>
export default {
  data() {
    return {
      messageSuccess: false,
      messageWarning: false,
      messageWarningEmail: false,
      messageFailed: false,
      messageAlreadyReceived: false,
      working: false,
      isAsideOpen: false
    }
  },
  methods: {
    async submitContactForm() {
      if (this.working) return;
      if (window.__NUXT__.state.$semail.trim() != window.__NUXT__.state.$semailConfirmation.trim()) {
        this.messageSuccess = false;
        this.messageWarning = false;
        this.messageFailed = false;
        this.messageAlreadyReceived = false;

        this.messageWarningEmail = true;
        return;
      } 

      this.working = true;
      setTimeout(() => this.working = false, 3000);

      let res;
      try {
        let body = {
          name: window.__NUXT__.state.$sname,
          email: window.__NUXT__.state.$semail,
          message: window.__NUXT__.state.$smessage
        }
        if (body.name == '' || body.email == '' || body.message == '') res = { status: 400 };
        else {
          res = await $fetch('/api/contact', {
            method: 'POST',
            body
          });
        }
      } catch (err) {
        res = { status: 500 }
      }

      this.messageSuccess = false;
      this.messageWarning = false;
      this.messageWarningEmail = false;
      this.messageFailed = false;
      this.messageAlreadyReceived = false;

      if (res.status == 200) this.messageSuccess = true;
      else if (res.status == 400) this.messageWarning = true;
      else if (res.status == 418) this.messageAlreadyReceived = true;
      else this.messageFailed = true;
    }
  },
  mounted() {
    window.submitContactForm = this.submitContactForm;
  }
}
</script>

<style lang="sass" scoped>
#contact
  position: absolute
  width: 1000px
  left: 50%
  top: 50%
  transform: translate(-50%, -50%)

  @media screen and (max-width: 1000px)
    width: 80%

  @media screen and (max-width: 600px)
    width: 90%

  form
    position: relative
    height: auto
    width: 100%

    #center
      position: relative
      width: 800px
      height: auto
      left: 50%
      transform: translateX(-50%)
      display: flex
      flex-direction: column
      padding: 65px 0px 75px 0px
    
      @media screen and (max-width: 1000px)
        width: 80%
        padding: 40px 0px 50px 0px
          
      @media screen and (max-width: 400px)
        width: 90%

      #top
        position: relative
        display: flex

        h2
          margin-bottom: 25px
          color: $white
          
          @media screen and (max-width: 325px)
            font-size: 1.4em

          @media screen and (max-width: 300px)
            font-size: 1.25em

        #desktop
          @media screen and (max-width: 600px)
            display: none

        #mobile
          display: none

          @media screen and (max-width: 600px)
            display: block

      #inputs
        position: relative
        display: grid
        grid-template-columns: 1fr 1fr 1fr
        column-gap: 25px

        @media screen and (max-width: 1200px)
          column-gap: 15px
          
        @media screen and (max-width: 1000px)
          grid-template-columns: 1fr
          grid-template-rows: 1fr 1fr 1fr
          row-gap: 15px

        input
          padding: 15px 0px
          border: none
          border-radius: 5px
          background: rgba($white, 0.75)
          color: $black
          font-size: 1em
          width: calc(100% - 2.5px)
          text-indent: 20px
          
          @media screen and (max-width: 1200px)
            text-indent: 15px
          
          @media screen and (max-width: 600px)
            padding: 10px 0px

        input:focus
          outline: none

        input::placeholder
          color: $black

        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active
          -webkit-box-shadow: 0 0 0 30px $white-2 inset !important

      textarea
        margin: 20px 0px
        padding: 15px 20px
        border: none
        border-radius: 5px
        background: rgba($white, 0.75)
        color: $black
        font-size: 1em
        font-family: "Lato", "sans-serif"
        width: calc(100% - 42.5px)
        resize: none
        height: 150px
          
        @media screen and (max-width: 1000px)
          margin: 15px 0px 25px 0px

      textarea:focus
        outline: none

      textarea::placeholder
        color: $black

      #bottom
        position: relative
        display: flex
        flex-direction: row
        width: 100%

        @media screen and (max-width: 1000px)
          flex-direction: column

        button
          position: relative
          font-size: 1.2em
          border: none
          transition: 0.25s
          background: $color
          color: $white-2
          border-radius: 5px
          margin: 0px 0px 0px 0px
          width: 200px
          height: 50px

          @media screen and (max-width: 1000px)
            left: 50%
            transform: translateX(-50%)

        button:hover
          cursor: pointer
          background: $darkcolor

        p
          position: absolute
          right: 0px
          text-align: right
          top: 50%
          transform: translateY(-50%)
          margin: auto 0px
          font-weight: bold

          @media screen and (max-width: 1000px)
            position: relative
            left: 50%
            transform: translateX(-50%)
            text-align: center
            margin-top: 20px

        .success
          color: $color-3

        .warning
          color: orange

        .failed
          color: red
</style>