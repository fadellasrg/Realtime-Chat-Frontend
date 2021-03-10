<template>
<div class="container d-flex justify-content-center p-5 m-5">
    <div class="col-md-6 col-12 card">
      <div class="text-center mt-5">Login</div>
      <div class="pt-5 pl-5">Hi, Welcome Back</div>
      <form @submit.prevent="onLogin()">
        <div class="pt-4 pl-5 greyText">Email</div>
        <input
          class="pl-5 pt-3"
          type="email"
          v-model="email"
          placeholder="Email" required
        />
        <hr class="setLine" />
        <div class="pt-4 pl-5 greyText">Password</div>
        <input
          class="pl-5 pt-3"
          type="password"
          v-model="password"
          placeholder="Password" required
        />
        <hr class="setLine" />
        <div class="pr-5 pt-3 text-right">Forgot Password?</div>
        <div class="text-center pt-5">
          <button class="btnLogin">Login</button>
        </div>
      </form>
      <div class="register p-5">Don't have an account?
        <router-link to="/register" style="color: #7E98DF;"> Sign Up</router-link>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from 'axios'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions({
      actionLogin: 'auth/login'
    }),
    onLogin () {
      const data = {
        email: this.email,
        password: this.password
      }
      this.actionLogin(data)
        .then(response => {
          if (response.code === 404 || response.code === 500) {
            alert(response.message)
          } else {
            this.$router.push(`/home?id_user=${response.id}`)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.card {
  width: auto;
  box-shadow: 0px 20px 20px rgba(126, 152, 223, 0.05);
  border-radius: 30px;
}
.text-center {
  font-size: 22px;
  font-weight: bold;
  letter-spacing: -0.165px;
  color: #7e98df;
}
.greyText {
  color: #848484;
  opacity: 0.75;
}
input {
  font-weight: bold;
  outline: none;
  border: none;
}
.setLine {
  color: black;
  background: black;
  width: auto;
  margin-left: 48px;
  margin-right: 40px;
}
.text-right {
  color: #7e98df;
}
.btnLogin {
  font-size: 16px;
  border: none;
  color: white;
  background: #7e98df;
  border-radius: 70px;
  width: 80%;
  height: 60px;
}
.register{
  text-align: center;
  font-size: 14px;
}
</style>
