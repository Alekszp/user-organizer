<template>
  <v-layout fill-height v-if="getAuth">
    <v-layout v-if='getLoading' fill-height align-center justify-center gray lighten-4>
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-layout>
    <users v-else />
  </v-layout>
  <v-layout v-else justify-center align-center fill-height>
    Please &nbsp;
    <NuxtLink to="/login">login</NuxtLink>.
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import users from './users'

export default {
  
  components: {
    users
  },
  computed: {
    ...mapGetters(["getAuth", 'getLoading']),
  },
  created(){
    this.isAuth()
  },
  methods: {
    ...mapActions(['isAuth']),
    
  },
};
</script>

<style>

</style>

