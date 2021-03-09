<template>
  <!-- <div class="container pt-5">
    <div class="row">
      <div class="col-md-4">
        <h3>Login: {{getUserName}} ({{getRoom}})</h3>
        <ul class="list-group">
          <button v-for="(item, i) in users" :key="i" @click="getListChat(item.id, item.name)" class="list-group-item">
            {{item.name}}
          </button>
        </ul>
      </div>
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            {{to}}
          </div>
          <div class="card-body">
            <div class="mb-4" v-for="(item, i) in chat" :key="i">
              <div v-if="item.from_name === getUserName" class="text-right">
                {{item.from_name}} : {{item.message}}
                <div><small>{{item.created_at}}</small></div>
              </div>
              <div v-else>
              {{item.from_name}} : {{item.message}}
              <div><small>{{item.created_at}}</small></div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <form @submit.prevent="sendMsg()" action="" class="form-inline d-flex justify-content-flex-end">
              <input v-model="text" type="text" class="form-control" placeholder="Text">
              <button class="btn btn-success ml-2">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5 pt-5">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h4>Pengumuman</h4>
              <form @submit.prevent="sendBroadcast()" action="" class="form-inline d-flex justify-content-flex-end">
                <input v-model="textBroadcast" type="text" class="form-control" placeholder="Text">
                <button class="btn btn-success ml-2">Send Broadcast</button>
              </form>
            <div class="card-body">
              <div v-for="(item, i) in listBroadcast" :key="i">
              {{item}}
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-4 col-sm-5 col-12">
        <!--  -->
        <div class="row mt-4 justify-content-center">
          <div id="textTitle" class="col-md-5 col-6 blueText">
            Telegram
          </div>
          <form class="col-md-6 col-12">
            <button class="btnIcon">
              <b-icon
                @click="onLogout()"
                class="icon blueText mt-2"
                icon="box-arrow-right"
                aria-hidden="true"
              ></b-icon>
            </button>
              <b-icon
                @click="profile()"
                class="icon blueText ml-3"
                icon="card-text"
                aria-hidden="true"
              ></b-icon>
          </form>
        </div>
        <div v-show="status === true">
          <componentProfile />
        </div>
        <div v-show="status === false">
          <form class="form-inline mt-5 ml-4">
            <b-icon
              @click="action()"
              style="color: #848484;"
              class="icon iconSearch"
              icon="search"
              aria-hidden="true"
            ></b-icon>
            <input
              v-model="to"
              id="inputAdd"
              type="text"
              class="form-control"
              placeholder="Type your message..."
            />
            <!-- <button class="btnIcon"> -->
              <b-icon
                @click="addFriend()"
                class="icon blueText iconPlus"
                icon="plus"
                aria-hidden="true"
              ></b-icon>
            <!-- </button> -->
          </form>
          <div id="btnBlue" class="row text-center ml-2">
            <button
              class="col-md-2 col-2"
              :class="clicked ? 'blue' : 'white'"
              @click="clicked = !clicked"
            >
              All
            </button>
            <button
              class="col-md-4 col-4"
              :class="clicked2 ? 'blue' : 'white'"
              @click="clicked2 = !clicked2"
            >
              Important
            </button>
            <button
              class="col-md-4 col-4"
              :class="clicked3 ? 'blue' : 'white'"
              @click="clicked3 = !clicked3"
            >
              Unread
            </button>
          </div>
          <div v-if="tampil === true">
            <div v-for="(item, i) in friends" :key="i" @click="getListChat(item.id, item.name, item.image)">
              <div class="row mt-3 ml-3">
              <div class="col-lg-2 col-md-3 col-sm-4 col-3">
                <img
                  class="tagImg"
                  :src="`${serverURL}/images/${item.image}`"
                  :alt="item.name"
                />
              </div>
              <div class="col-md-5 col-sm-7 col-5 ml-2">
                <div style="font-weight: bold; font-size: 18px;">{{ item.name }}</div>
                <div class="blueText" style="font-size: 16px;">{{item.bio}}</div>
              </div>
            </div>
            </div>
          </div>
          <div v-else>
          <div v-for="(item, i) in users" :key="i" @click="getListChat(item.id, item.name, item.image)" v-b-toggle.sidebar-1>
            <div class="row mt-3 ml-3">
              <div class="col-lg-2 col-md-3 col-sm-4 col-3">
                <img
                  class="tagImg"
                  :src="`${serverURL}/images/${item.image}`"
                  :alt="item.name"
                />
              </div>
              <div class="col-md-5 col-sm-7 col-5 ml-2">
                <div style="font-weight: bold; font-size: 18px;">{{ item.name }}</div>
                <div class="blueText" style="font-size: 16px;">{{item.bio}}</div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      <div style="position: relative; background: #FAFAFA;" class="col-md-8 col-sm-7 website">
        <!-- Header -->
        <div class="row">
          <div class="col-md-12 col-12 p-3" style="background: white;">
            <div class="row">
              <div class="col-lg-1 col-md-2 col-sm-2 col-2">
                <div v-if="to_image===undefined"></div>
                <div v-else>
                <!-- <router-link to="/friend"> -->
                  <img
                    v-b-toggle.sidebar-right
                    class="tagImg"
                    :src="`${serverURL}/images/${to_image}`"
                    alt=""
                  />
                  <componentFriend />
                <!-- </router-link> -->

                </div>
              </div>
              <div class="col-md-2 col-sm-4 col-4 ml-2 uName">
                <p>{{ to }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="chat.length >= 1">
          <!-- CHAT -->
          <div class="mt-3" v-for="(item, i) in chat" :key="i">
            <div v-if="item.from_name === getUserName" class="text-right">
                  <div class="msgWhite">{{ item.message }}</div>
                  <div class="date mb-2">{{(new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false }))}}</div>
            </div>
            <div v-else>
              <div class="row">
                <div class="message">{{ item.message }}</div><br>
              </div>
                  <div class="date mb-2">{{(new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false }))}}</div>
            </div>
          </div>
        </div>
        <div class="elseMsg" v-else>Please select a chat and type your message to start messaging</div>
        <!--  -->
        <!-- <div v-if="resGetListChat()"> -->
          <form style="position: fixed; bottom: 0;" @submit.prevent="sendMsg()" class="form-inline">
            <input v-model="text" type="text" class="inputMsg" placeholder="Type your message...">
          </form>
        <!-- </div> -->
      </div>
    </div>
    <!-- SIDEBAR CHAT -->
    <!-- col -->
  <div>
    <!-- <b-button v-b-toggle.sidebar-1>Toggle Sidebar</b-button> -->
    <!-- mobile -->
    <b-sidebar id="sidebar-1" shadow width="100%" class="mobile">
        <div style="position: relative; background: #FAFAFA;" class="col-12 mobile">
        <!-- Header -->
        <div class="row">
          <div class="col-12 p-3" style="background: white;">
            <div class="row">
              <div class="col-3">
                <div v-if="to_image===undefined"></div>
                <div v-else>
                  <img
                    v-b-toggle.sidebar-right
                    class="tagImg"
                    :src="`${serverURL}/images/${to_image}`"
                    alt=""
                  />
                  <componentFriend />
                </div>
              </div>
              <div class="col-4 ml-2 uName">
                <p>{{ to }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="chat.length >= 1">
          <!-- CHAT -->
          <div class="mt-3" v-for="(item, i) in chat" :key="i">
            <div v-if="item.from_name === getUserName" class="text-right">
                  <div class="msgWhite">{{ item.message }}</div>
                  <div class="date mb-2">{{(new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false }))}}</div>
            </div>
            <div v-else>
              <div class="row">
                <div class="message">{{ item.message }}</div><br>
              </div>
                  <div class="date mb-2">{{(new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false }))}}</div>
            </div>
          </div>
        </div>
        <div class="elseMsg" v-else>Please select a chat and type your message to start messaging</div>
        <!--  -->
        <!-- <div v-if="resGetListChat()"> -->
          <form style="position: fixed; bottom: 0;" @submit.prevent="sendMsg()" class="form-inline">
            <input v-model="text" type="text" class="inputMsg" placeholder="Type your message...">
          </form>
        <!-- </div> -->
      </div>
    </b-sidebar>
  </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapGetters, mapActions } from 'vuex'
import componentProfile from '../components/Profile'
import componentFriend from '../components/Friend'
export default {
  name: 'Home',
  components: {
    componentProfile,
    componentFriend
  },
  data () {
    return {
      serverURL: process.env.VUE_APP_URL,
      socket: io(process.env.VUE_APP_URL),
      text: '',
      users: [],
      friends: [],
      chat: [],
      to: '',
      // to_id: '',
      textBroadcast: '',
      listBroadcast: [],
      //
      clicked: false,
      clicked2: false,
      clicked3: false,
      to_image: '',
      status: false,
      tampil: false
    }
  },
  computed: {
    ...mapGetters({
      getUserName: 'auth/getName',
      getRoom: 'auth/getRoomId',
      getIdUser: 'auth/getIdUsers',
      to_id: 'auth/getToId',
      userList: 'auth/getUserList'
    })
  },
  methods: {
    ...mapActions({
      actionLogout: 'auth/logout',
      actionToId: 'auth/friendDetail',
      actionUser: 'auth/listUsers'
    }),
    onLogout () {
      this.actionLogout().then(response => {
        if (response) {
          this.$router.push('/')
        }
      })
    },
    joinRoom () {
      this.socket.emit('join-room', this.getRoom)
    },
    getListUsers () {
      this.socket.emit('get-list-users', this.getIdUser, this.getRoom)
    },
    resGetListUser () {
      this.socket.on('res-get-list-users', users => {
        this.users = users
      })
    },
    getListChat (idTo, name, image) {
      this.to = name
      // this.to_id = idTo
      this.to_image = image
      this.socket.emit('get-list-chat', {
        id_from: this.getIdUser,
        id_to: idTo,
        room_id: this.getRoom
      })
      this.actionToId(idTo)
    },
    resGetListChat () {
      this.socket.on('res-get-list-chat', chat => {
        this.chat = chat
      })
    },
    sendMsg () {
      const data = {
        from: this.getIdUser,
        to: this.to_id,
        msg: this.text
      }
      this.socket.emit('send-message', data)
      this.text = ''
    },
    addFriend () {
      const data = {
        id_user: this.getIdUser,
        id_friend: this.to_id
      }
      this.socket.emit('add-friend', data)
      this.$router.go('/home')
    },
    getListFriends () {
      this.socket.emit('get-list-friends', this.getIdUser, this.getRoom)
    },
    resGetListFriend () {
      this.socket.on('res-get-list-friends', friends => {
        this.friends = friends
      })
    },
    action () {
      this.tampil = !this.tampil
    },
    sendBroadcast () {
      const data = {
        from: this.getIdUser,
        msg: this.textBroadcast
      }
      this.socket.emit('send-broadcast', data)
      this.textBroadcast = ''
    },
    resBroadcast () {
      this.socket.on('res-broadcast', data => {
        this.listBroadcast = [...this.listBroadcast, data]
      })
    },
    profile () {
      this.status = !this.status
    }
  },
  mounted () {
    this.joinRoom()
    this.getListUsers()
    this.resGetListUser()
    this.getListChat()
    this.resGetListChat()
    this.getListFriends()
    this.resGetListFriend()
    this.actionUser()
    // this.resBroadcast()
  }
}
</script>

<style scoped>
@media (max-width: 576px) {
  .website{
    display: none;
  }
}
@media (min-width: 577px) {
  .mobile{
    display: none;
  }
}
#btnBlue button {
  font-weight: bold;
  border-radius: 15px;
  margin: 5px;
  padding: 10px;
  border: none;
}
.uName {
  font-size: 20px;
  font-weight: bold;
}
.blue {
  background-color: #7e98df;
  color: white;
}
.white {
  background-color: white;
  color: black;
}
#inputAdd {
  width: 70%;
  border: none;
  outline: none;
}
.iconPlus {
  height: 40px;
  width: 40px;
}
#textTitle {
  font-size: 28px;
  font-weight: bold;
  letter-spacing: 1px;
  margin-left: 20px;
}
.blueText {
  color: #7e98df;
}
.col-md-3 .icon {
  height: 30px;
  width: 30px;
  margin-top: 7px;
}
.col-md-6 .icon {
  height: 30px;
  width: 30px;
  /* margin-top: 7px; */
}
.tagImg {
  width: 60px;
  height: 60px;
  border-radius: 20px;
}
.imgSmall {
  width: 50px;
  height: 50px;
  border-radius: 15px;
}
.btnIcon {
  border: none;
  background-color: white;
}
.message {
  background-color: #7e98df;
  border-radius: 35px 35px 35px 10px;
  padding: 10px;
  padding-left: 20px;
  padding-right: 30px;
  margin-left: 10px;
  overflow: hidden;
  max-width: 200px;
}
.date{
  color: #7e98df;
  font-size: small;
}
.msgWhite {
  background: white;
  border-radius: 35px 10px 35px 35px;
  padding: 10px;
  padding-left: 20px;
  padding-right: 30px;
  margin-right: 10px;
  overflow: hidden;
  display: inline-block;
  max-width: 400px;
}
.inputMsg{
  width: 10000px;
  margin-bottom: 20px;
  outline: none;
  border: none;
}
.elseMsg{
  color: #848484;
  position: inherit;
  display: flex;
  justify-content: center;
  top: 28%;
}
</style>
