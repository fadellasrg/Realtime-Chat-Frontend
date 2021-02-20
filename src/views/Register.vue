<template>
  <div class="container d-flex justify-content-center p-5 m-5">
    <div class="card">
        <div class="row mt-5 text-center">
            <div class="col-md-2">
                <router-link to="/"><b-icon class="icon" icon="chevron-left" aria-hidden="true"></b-icon></router-link>
            </div>
            <div class="col-md-8">
                <div>Register</div>
            </div>
        </div>
      <div class="pt-5 pl-5">Let's create your account!</div>
      <form @submit.prevent="onRegister()">
        <div class="pt-4 pl-5 greyText">Name</div>
        <input
          class="pl-5 pt-3"
          type="text"
          v-model="name"
          placeholder="Name"
        />
        <hr class="setLine" />
        <div class="pt-4 pl-5 greyText">Email</div>
        <input
          class="pl-5 pt-3"
          type="text"
          v-model="email"
          placeholder="Email"
        />
        <hr class="setLine" />
        <div class="pt-4 pl-5 greyText">Password</div>
        <input
          class="pl-5 pt-3"
          type="password"
          v-model="password"
          placeholder="Password"
        />
        <hr class="setLine" />
        <div class="text-center pt-5">
          <button class="btnLogin">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions({
      actionRegister: 'auth/register'
    }),
    onRegister () {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.actionRegister(data)
        .then(response => {
          if (response.code === 500) {
            alert(response.message)
          } else {
            this.$router.push('/')
          }
        })
        .catch(err => {
          alert(err)
        })
    }
  }
}
</script>

<style scoped>
.icon {
  color: #7e98df;
  width: 40px;
  height: 20px;
}
.card {
  width: 50%;
  box-shadow: 0px 20px 20px rgba(126, 152, 223, 0.05);
  border-radius: 30px;
}
.text-center {
  font-size: 22px;
  font-weight: bold;
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
  width: 81%;
  margin-left: 48px;
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
.col-md-2{
    padding-left: 50px;
}
</style>
