<template>
  <div class="mt-5 box">
    <div style="border-radius: 20px;" class="card">
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
          <div class="col-md-3 col-3 mt-4 mr-2">
            <img class="imgProfile" :src="`${serverURL}/images/${item.image}`" alt="">
          </div>
          <div class="name col-md-5 col-5 mt-5">
            {{item.name}}
          </div>
        </div>
        <div style="font-size: 16px;" class="name mt-3">Phone Number</div>
        <div>{{item.phone}}</div><hr>
        <div id="btnBlue">
          <button class="location">Location</button>
          <button>Image</button>
          <button>Documents</button>
        </div><hr>
          <GoogleMapMaps :center="{lat: 3.596046803488549, lng: 98.67275547271525}" :zoom="10" class="maps"></GoogleMapMaps>
      </div>
    </div>
  </div>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    GoogleMapMaps: VueGoogleMaps.Map
  },
  data () {
    return {
      serverURL: 'http://localhost:4000'
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
  margin: 5px;
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
  font-weight: bold;
  font-size: 20px;
}
.box{
  width: 380px;
  position: absolute;
  left: 32%;
}
</style>
