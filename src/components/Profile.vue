<template>
  <div class="mt-3">
    <div v-for="(item, i) in getProfile" :key="i">
        <div class="textBlue text-center username mt-2">@{{ item.username }}</div>
        <div class="text-center mt-3">
            <!--  -->
            <!-- <img onclick="document.getElementById('fileImage').click();" class="tagImg" :src="`${serverURL}/images/${item.image}`" /> -->
            <img class="tagImg" :src="`${serverURL}/images/${item.image}`" />
            <!-- <input hidden @input="uploadFile($event)" id="fileImage" type="file"><br> --><br>
            <button v-b-modal.my-modalHide class="textBlue btnEdit mt-2">Edit</button>
        </div>
        <!--  -->
        <div class="textName text-center mt-3">{{item.name}}</div>
        <div class="greyText text-center">@{{item.username}}</div>
        <div class="ml-2">
            <div class="textBold mt-2 ml-1">Account</div>
            <div style="font-weight: bold" class="mt-2 ml-1">{{item.phone}}</div><hr>
            <div style="font-weight: bold" class="mt-2 ml-1">{{item.username}}</div>
            <div class="btnEdit greyText mt-1 ml-1">Username</div><hr>
            <div style="font-weight: bold" class="mt-2 ml-1">{{item.email}}</div>
            <div class="btnEdit greyText ml-1 mt-1">Email</div><hr>
            <div style="font-weight: bold;" class="mt-1 ml-1">{{item.bio}}</div><br>
            <div class="btnEdit greyText ml-1 mt-1">Bio</div><hr>
        </div>
        <GoogleMapMaps :center="{lat: parseFloat(item.latitude), lng: parseFloat(item.longitude)}" :zoom="10" class="maps">
          <GoogleMapMarker :position="{lat: parseFloat(item.latitude), lng: parseFloat(item.longitude)}"></GoogleMapMarker>
        </GoogleMapMaps><hr>
            <div style="font-weight: bold;" class="mt-2 ml-1">{{item.latitude}}</div><br>
            <div class="btnEdit greyText ml-1">Latitude</div><hr>
            <div style="border: none; font-weight: bold; width: 100%;" class="mt-2 ml-1">{{item.longitude}}</div><br>
            <div class="btnEdit greyText ml-1">Longitude</div><hr>
            <!-- @click="edit(item.id, item.phone, item.username, item.bio, item.email, item.latitude, item.longitude)" -->
    <b-modal ref="my-modalHide" hide-footer id="my-modalHide" centered title="Edit">
      <div id="bold" class="container">
        <div class="row">
          <div class="col-md-4">
            Username
          </div>
          <input class="col-md-7" v-model="item.username" type="text">
        </div>
        <div class="row mt-2">
          <div class="col-md-4">
            Picture
          </div>
          <input
            @change="uploadFile($event)"
            type="file"
            class="form-control col-md-7"
            placeholder="File"
          />
        </div>
        <div class="row mt-2">
          <div class="col-md-4">
            Phone
          </div>
          <input class="col-md-7" v-model="item.phone" type="text">
        </div>
        <div class="row mt-2">
          <div class="col-md-4">
            Bio
          </div>
          <input class="col-md-7" v-model="item.bio" type="text">
        </div><div class="row mt-2">
          <div class="col-md-4">
            Email
          </div>
          <input class="col-md-7" v-model="item.email" type="text">
        </div><div class="row mt-2">
          <div class="col-md-4">
            Latitude
          </div>
          <input class="col-md-7" v-model="item.latitude" type="text">
        </div><div class="row mt-2">
          <div class="col-md-4">
            Longitude
          </div>
          <input class="col-md-7" v-model="item.longitude" type="text">
        </div>
        <button @click="edit()" class="btnSave mt-4">Save</button>
        <!-- <button @click="hideModal()" class="btnCancel mt-4">Cancel</button> -->
      </div>
    </b-modal>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as VueGoogleMaps from 'vue2-google-maps'
export default {
  components: {
    GoogleMapMaps: VueGoogleMaps.Map,
    GoogleMapMarker: VueGoogleMaps.Marker
  },
  data () {
    return {
      serverURL: process.env.VUE_APP_URL,
      getId: this.$route.query.id_user
    }
  },
  computed: {
    ...mapGetters({
      getUserName: 'auth/getName',
      getProfile: 'auth/getProfile'
      // getIdUser: 'auth/getIdUsers'
    })
  },
  methods: {
    // hideModal () {
    //   this.$refs['my-modalHide'].hide()
    // },
    ...mapActions({
      actionDetail: 'auth/detailProfile',
      actionEdit: 'auth/update'
    }),
    uploadFile (el) {
      this.getProfile[0].image = el.target.files[0]
    },
    edit () {
      const fd = new FormData()
      fd.append('phone', this.getProfile[0].phone)
      fd.append('username', this.getProfile[0].username)
      fd.append('image', this.getProfile[0].image)
      fd.append('bio', this.getProfile[0].bio)
      fd.append('email', this.getProfile[0].email)
      fd.append('latitude', this.getProfile[0].latitude)
      fd.append('longitude', this.getProfile[0].longitude)
      const data = {
        id: this.getId,
        fd: fd
      }
      this.actionEdit(data).then((response) => {
        console.log(response)
      }).catch((err) => {
        console.log(err)
      })
      this.actionDetail(this.getId)
      this.$router.go(`/home?id_user=${this.getId}`)
    }
  },
  mounted () {
    this.actionDetail(this.getId)
  }
}
</script>

<style scoped>
#bold .row .col-md-4{
  font-weight: bold;
}
.btnSave{
  color: white;
  background-color: #7e98df;
  width: 20%;
  padding: 5px;
  border: none;
  border-radius: 6px;
  margin-left: 75%;
}
/* .btnCancel{
  color: white;
  background-color: #0634b3;
  width: 20%;
  padding: 5px;
  border: none;
  border-radius: 6px;
  margin-left: 2%;
} */
.textBlue {
  color: #7e98df;
}
.tagImg {
  width: 80px;
  height: 80px;
  border-radius: 20px;
}
.username {
  font-weight: bold;
  font-size: 18px;
}
.textName{
    color: black;
    font-weight: bold;
    font-size: 24px;
}
.greyText{
    color: #848484;
    font-size: 15px;
}
.textBold{
    font-weight: bold;
    font-size: 20px;
}
button.textBlue{
    border: none;
    outline: none;
    background: none;
}
.btnEdit{
    border: none;
    outline: none;
    background: none;
}
.maps{
  height: 200px;
  width: 100%;
  margin-bottom: 20px;
}
</style>
