<template>
  <v-toolbar color="grey darken-2" class="white--text">
    <v-toolbar-title v-if="getAuth">{{`Hello, ${getUser.username}`}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="getAuth" @click="logout">Logout</v-btn>
    <v-layout v-else justify-end>
      <v-btn class="mr-3">
        <NuxtLink to="/login">Login</NuxtLink>
      </v-btn>
      <v-btn>
        <NuxtLink to="/register">Register</NuxtLink>
      </v-btn>
    </v-layout>
  </v-toolbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["getAuth", "getUser"]),
  },
  created(){
    this.isAuth()
  },
  methods: {
    ...mapActions(["logout", "isAuth"]),
  },
};
</script>

<style>
</style>