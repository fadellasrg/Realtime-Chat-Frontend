<template>
  <div class="mt-3">
    <div v-for="(item, i) in getDetail" :key="i">
        <div class="textBlue text-center username mt-2">@{{ item.username }}</div>
        <div class="text-center mt-3">
            <!--  -->
            <img onclick="document.getElementById('fileImage').click();" class="tagImg" :src="`${serverURL}/images/${item.image}`" />
            <input hidden @input="uploadFile($event)" id="fileImage" type="file"><br>
            <button class="textBlue btnEdit mt-2" @click="edit(item.id, item.phone, item.username, item.bio, item.email, item.latitude, item.longitude)">Save</button>
        </div>
        <!--  -->
        <div class="textName text-center mt-3">{{item.name}}</div>
        <div class="greyText text-center">@{{item.username}}</div>
        <div class="ml-2">
            <div class="textBold mt-2 ml-1">Account</div>
            <input style="border: none; font-weight: bold" class="mt-2 ml-1" v-model="item.phone"/>
            <button @click="edit(item.id, item.phone, item.username, item.bio, item.email, item.latitude, item.longitude)" class="textBlue mt-1">Tap to change phone number</button><hr>
            <input style="border: none; font-weight: bold" class="mt-2 ml-1" v-model="item.username"/><br>
            <button @click="edit(item.id, item.phone, item.username, item.bio, item.email, item.latitude, item.longitude)" class="btnEdit greyText mt-1">Username (tap to change)</button><hr>
            <input style="border: none; font-weight: bold; width: 100%;" class="mt-2 ml-1" v-model="item.email"/><br>
            <button @click="edit(item.id, item.phone, item.username, item.bio, item.email, item.latitude, item.longitude)" class="btnEdit greyText mt-1">Email (tap to change)</button><hr>
            <textarea style="border: none; font-weight: bold; width: 100%;" class="mt-2 ml-1" v-model="item.bio"/><br>
            <button @click="edit(item.id, item.phone, item.username, item.bio, item.email, item.latitude, item.longitude)" class="btnEdit greyText mt-1">Bio (tap to change)</button><hr>
        </div>
        <GoogleMapMaps :center="{lat: parseFloat(item.latitude), lng: parseFloat(item.longitude)}" :zoom="10" class="maps">
          <GoogleMapMarker :position="{lat: parseFloat(item.latitude), lng: parseFloat(item.longitude)}"></GoogleMapMarker>
        </GoogleMapMaps><hr>
            <input style="border: none; font-weight: bold; width: 100%;" class="mt-2 ml-1" v-model="item.latitude"/><br>
            <button @click="edit(item.id, item.phone, item.username, item.bio, item.email, item.latitude, item.longitude)" class="btnEdit greyText mt-1">Latitude (tap to change)</button><hr>
            <input style="border: none; font-weight: bold; width: 100%;" class="mt-2 ml-1" v-model="item.longitude"/><br>
            <button @click="edit(item.id, item.phone, item.username, item.bio, item.email, item.latitude, item.longitude)" class="btnEdit greyText mt-1">Longitude (tap to change)</button><hr>
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
      serverURL: 'http://localhost:4000'
    }
  },
  computed: {
    ...mapGetters({
      getUserName: 'auth/getName',
      getDetail: 'auth/getDetailUser',
      getIdUser: 'auth/getIdUsers'
    })
  },
  methods: {
    ...mapActions({
      actionDetail: 'auth/detail',
      actionEdit: 'auth/update'
    }),
    uploadFile (el) {
      const fd = new FormData()
      fd.append('image', el.target.files[0])
      const data = {
        id: this.getIdUser,
        fd: fd
      }
      this.actionEdit(data).then((response) => {
        if (response.code !== 200) {
          alert(response.data.message)
        }
      }).catch((err) => {
        console.log(err)
      })
      this.actionDetail(this.getIdUser)
    },
    edit (id, phone, username, bio, email, latitude, longitude) {
      const fd = new FormData()
      fd.append('phone', phone)
      fd.append('username', username)
      fd.append('bio', bio)
      fd.append('email', email)
      fd.append('latitude', latitude)
      fd.append('longitude', longitude)
      const data = {
        id: id,
        fd: fd
      }
      this.actionEdit(data).then((response) => {
        console.log(response)
      }).catch((err) => {
        console.log(err)
      })
      this.actionDetail(this.getIdUser)
    }
  },
  mounted () {
    this.actionDetail(this.getIdUser)
  }
}
</script>

<style scoped>
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
