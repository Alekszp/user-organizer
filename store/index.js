import axios from 'axios'
import jwtDecode from 'jwt-decode'

export const state = () => {
  return {
    loading: false,
    auth: null,
    currentUser: {},
    users: [],
    dialog: false
  }
}

export const getters = {
  getLoading(state) {
    return state.loading
  },
  getAuth(state) {
    return state.auth
  },
  getUser(state) {
    return state.currentUser
  },
  getUsers(state) {
    return state.users
  },
  getDialogState(state) {
    return state.dialog
  }
}
export const mutations = {
  setAuth(state, auth) {
    state.auth = auth
  },
  setUser(state, user) {
    state.currentUser = user
  },
  setLoading(state, loading) {
    state.loading = loading
  },
  setUsers(state, users) {
    state.users = users
  },
  setDialogState(state, dialog) {
    state.dialog = dialog
  },
}
export const actions = {
  async isAuth({commit}) {
    commit('setLoading', true)
    await axios.post('/api/authentication')
      .then((res) => {
        commit('setUser', res.data.currentUser)
        commit('setAuth', true)
        commit('setUsers', res.data.users)
      }).catch((err) => {
        console.log('UnauthorizedState')
      }).finally(() => {
        commit('setLoading', false)
      })
  },
  async register({commit}, {username, email, password}) {
    commit('setLoading', true)
    await axios.post('/api/register', {
        username,
        email,
        password
      })
      .then((res) => {
        commit('setAuth', true)
        commit('setUsers', res.data)
        this.$router.push('/')

      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        commit('setLoading', false)
      })
  },
  async login({commit}, { email, password }) {
    commit('setLoading', true)
    await axios.post('/api/login', {
        email,
        password
      })
      .then((res) => {
        commit('setAuth', true)
        commit('setUsers', res.data)
        this.$router.push('/')
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        commit('setLoading', false)
      })
  },
  async logout({commit}) {
    await axios.post('/api/logout')
      .then((res) => {
        commit('setAuth', false)
        commit('setUsers', [])
        commit('setUser', {})
        this.$router.push('/')
      }).catch((err) => {
        console.log(err)
      })
  },
  async createUser({commit}, editedUser) {
    commit('setLoading', true)
    await axios.post('/api/createUser', editedUser)
      .then((res) => {
        commit('setUsers', res.data)
        commit('setDialogState', false)
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        commit('setLoading', false)
      })
  },
  async editUser({commit}, editedUser) {
    commit('setLoading', true)
    await axios.post('/api/updateUser', editedUser)
      .then((res) => {
        commit('setUsers', res.data)
        commit('setDialogState', false)
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        commit('setLoading', false)
      })
  },
}
