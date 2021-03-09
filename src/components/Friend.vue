<template>
  <div>
  <b-sidebar id="sidebar-right" right shadow>
    <div class="card">
      <div class="card-body" v-for="(item, i) in getDetailFriend" :key="i">
        <div class="row">
          <div class="col-md-1 col-1 mr-2">
              <router-link to="/home"><b-icon class="icon" icon="chevron-left" aria-hidden="true"></b-icon></router-link>
          </div>
          <div class="col-md-8 col-8 uName">
            @{{item.username}}
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 col-4 mt-4 mr-2">
            <img class="imgProfile" :src="`${serverURL}/images/${item.image}`" alt="">
          </div>
          <div class="name col-md-7 col-7 mt-5">
            <div style="font-weight: bold;">{{item.name}}</div>
          <div style="font-size: 16px; color: #7e98df;">{{item.bio}}</div>
          </div>
        </div>
        <div style="font-size: 16px; font-weight: bold;" class="name mt-3">Phone Number</div>
        <div>{{item.phone}}</div><hr>
        <div id="btnBlue">
          <button class="location">Location</button>
          <button>Image</button>
          <button>Documents</button>
        </div><hr>
          <GoogleMapMaps :center="{lat: parseFloat(item.latitude), lng: parseFloat(item.longitude)}" :zoom="10" class="maps">
            <GoogleMapMarker :position="{lat: parseFloat(item.latitude), lng: parseFloat(item.longitude)}"></GoogleMapMarker>
          </GoogleMapMaps>
      </div>
    </div>
  </b-sidebar>
  </div>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    GoogleMapMaps: VueGoogleMaps.Map,
    GoogleMapMarker: VueGoogleMaps.Marker
  },
  data () {
    return {
      serverURL: process.env.VUE_APP_URL
    }
  },
  computed: {
    ...mapGetters({
      to_id: 'auth/getToId',
      getDetailFriend: 'auth/getDetailUser'
    })
  },
  methods: {
    ...mapActions({
      actionDetailFriend: 'auth/detail'
    })
  },
  mounted () {
    this.actionDetailFriend(this.to_id)
  }
}
</script>

<style scoped>
#btnBlue button{
  font-weight: bold;
  border-radius: 15px;
  padding: 10px;
  border: none;
  background: none
}
#btnBlue .location{
  color: white;
  background-color: #7e98df;
}
.maps{
  height: 300px;
  width: 100%;
}
.icon {
  color: #7e98df;
  width: 40px;
  height: 30px;
  margin-top: 2px;
}
.uName{
  color: #7e98df;
  font-weight: bold;
  font-size: 18px;
  margin-top: 4px;
  margin-left: 10px;
}
.imgProfile{
  width: 80px;
  height: 80px;
  border-radius: 20px;
  margin-top: 20px;
}
.name{
  font-size: 20px;
}
/* .box{
  width: 380px;
  position: absolute;
  left: 32%;
} */
</style>
