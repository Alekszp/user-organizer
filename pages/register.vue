<template>
  <v-layout fill-height ma-3 align-center>
    <v-layout column>
      <v-card width="400" color="grey lighten-2" class="mx-auto pa-5">
        <v-card-title>Please register</v-card-title>
        <v-form v-model="isValid">
          <v-text-field v-model="name" :rules="nameRules" label="Name" required></v-text-field>
          <v-text-field v-model="email" :rules="emailRules" label="Email" required></v-text-field>
          <v-text-field v-model="password" :rules="passwordRules" label="Password" required></v-text-field>
          <v-layout justify-center>
            <v-btn color="primary" @click="registerUser" :disabled="!isValid">Register</v-btn>
          </v-layout>
        </v-form>
      </v-card>
    </v-layout>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { regForEmail, regForLetters } from "../const/regexHelper";
import { emailRules, nameRules, passwordRules } from "../const/validationRules";
export default {
  middleware: "notAuth",
  data: () => ({
    emailRules: [],
    nameRules: [],
    passwordRules: [],
    isValid: false,
    name: "",
    email: "",
    password: "",
  }),
  computed: {
    ...mapGetters(["getAuth"]),
  },
  watch: {
    getAuth(val) {
      if (this.getAuth) {
        this.$router.push("/");
      } else {
        this.$router.push("/register");
      }
    },
  },
  created() {
    this.isAuth();
    this.emailRules = emailRules;
    this.nameRules = nameRules;
    this.passwordRules = passwordRules;
  },
  methods: {
    ...mapActions(["register", "isAuth"]),
    async registerUser() {
      let validEmail = this.email.match(regForEmail);
      let validName = this.name.match(regForLetters);
      let validPassword = this.password.length >=6
      if (validEmail && validName && validPassword) {
        await this.register({
          username: this.name,
          email: this.email,
          password: this.password,
        });
      }
    },
  },
};
</script>

<style>
</style>