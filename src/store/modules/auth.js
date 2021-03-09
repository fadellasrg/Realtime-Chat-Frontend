import axios from 'axios'
const moduleAuth = {
  namespaced: true,
  state: () => {
    return {
      token: localStorage.getItem('token') || '',
      room_id: localStorage.getItem('room_id') || '',
      id_user: localStorage.getItem('id_user') || '',
      name: localStorage.getItem('name') || '',
      // room_id: '',
      // id_user: '',
      // name: '',
      detailUser: {},
      detailProfile: {},
      to_id: '',
      stateUsers: []
    }
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    },
    setRoom (state, payload) {
      state.room_id = payload
    },
    setIdUser (state, payload) {
      state.id_user = payload
    },
    setName (state, payload) {
      state.name = payload
    },
    setDetail (state, payload) {
      state.detailUser = payload
    },
    setProfile (state, payload) {
      state.detailProfile = payload
    },
    setToId (state, payload) {
      state.to_id = payload
    },
    setListUsers (state, payload) {
      state.stateUsers = payload
    }
  },
  actions: {
    register (context, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${context.rootState.setURL}/api/register`, data).then((response) => {
          resolve(response.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    login (context, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${context.rootState.setURL}/api/login`, data).then((response) => {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('room_id', response.data.room_id)
          localStorage.setItem('id_user', response.data.id)
          localStorage.setItem('name', response.data.name)
          context.commit('setToken', response.data.token)
          context.commit('setRoom', response.data.room_id)
          context.commit('setIdUser', response.data.id)
          context.commit('setName', response.data.name)
          resolve(response.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    logout (context) {
      return new Promise((resolve) => {
        localStorage.removeItem('token')
        localStorage.removeItem('room_id')
        localStorage.removeItem('id_user')
        localStorage.removeItem('name')
        context.commit('setToken', null)
        context.commit('setRoom', null)
        context.commit('setIdUser', null)
        context.commit('setName', null)
        resolve(true)
      })
    },
    detail (context, id) {
      axios.get(`${context.rootState.setURL}/api/user/${id}`, { headers: { token: context.rootState.auth.token } }).then((response) => {
        context.commit('setDetail', response.data.data)
      }).catch((err) => {
        console.log(err)
      })
    },
    detailProfile (context, id) {
      axios.get(`${context.rootState.setURL}/api/user/${id}`, { headers: { token: context.rootState.auth.token } }).then((response) => {
        context.commit('setProfile', response.data.data)
      }).catch((err) => {
        console.log(err)
      })
    },
    update (context, data) {
      return new Promise((resolve, reject) => {
        axios.patch(`${context.rootState.setURL}/api/user/${data.id}`, data.fd, { headers: { token: context.rootState.auth.token } }).then((response) => {
          console.log(response.data)
        }).catch((err) => {
          console.log(err)
        })
      })
    },
    friendDetail (context, data) {
      context.commit('setToId', data)
    },
    listUsers (context) {
      axios.get(`${context.rootState.setURL}/api/users`, { headers: { token: context.rootState.auth.token } }).then((response) => {
        context.commit('setListUsers', response.data.data)
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  getters: {
    getToken (state) {
      return state.token
    },
    getRoomId (state) {
      return state.room_id
    },
    getIdUsers (state) {
      return state.id_user
    },
    getName (state) {
      return state.name
    },
    getDetailUser (state) {
      return state.detailUser
    },
    getProfile (state) {
      return state.detailProfile
    },
    getToId (state) {
      return state.to_id
    },
    getUserList (state) {
      return state.stateUsers
    }
  }
}

export default moduleAuth
