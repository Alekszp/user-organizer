<template>
  <v-layout fill-height ma-3 align-center>
    <v-layout column>
      <v-card width="400" color="grey lighten-2" class="mx-auto pa-5">
        <v-card-title>Please login</v-card-title>
        <v-container>
          <v-text-field v-model="email" :rules="emailRules" label="Email" required></v-text-field>
          <v-text-field v-model="password" :rules="passwordRules" label="Password" required></v-text-field>
          <v-layout justify-center>
            <v-btn color="primary" @click="userLogin">Login</v-btn>
          </v-layout>
        </v-container>
      </v-card>
    </v-layout>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {regForEmail} from '../const/regexHelper'
import {emailRules, nameRules, passwordRules} from '../const/validationRules'
export default {
  middleware: "notAuth",
  data: () => ({
    email: "",
    password: "",
    emailRules: [],
    passwordRules: [],
  }),
  computed: {
    ...mapGetters(["getAuth"]),
  },
  watch: {
    getAuth(val) {
      if (this.getAuth) {
        this.$router.push("/");
      } else {
        this.$router.push("/login");
      }
    },
  },
  created() {
    this.isAuth();
    this.emailRules = emailRules
    this.passwordRules = passwordRules
  },
  methods: {
    ...mapActions(["login", "isAuth"]),
    userLogin() {
      let validEmail = this.email.match(regForEmail)
      let validPassword = this.password.length >=6
      if(validEmail && validPassword){
        this.login({ email: this.email, password: this.password });
      }
      
    },
  },
};
</script>
