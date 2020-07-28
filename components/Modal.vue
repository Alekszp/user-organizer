<template>
  <v-row justify="center">
    <v-dialog v-model="getDialogState" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Name" v-model="name" :rules="nameRules" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Email" v-model="email" :rules="emailRules" required></v-text-field>
              </v-col>
              <v-col v-if='!user.hasOwnProperty("_id")' cols="12" sm="6" md="4">
                <v-text-field label="Password" v-model="password" :rules="passwordRules" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-menu
                  ref="datamenu"
                  v-model="datamenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dob"
                      label="Date of birth"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="dob" no-title @input="datamenu = false"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Position" v-model="position" :rules="nameRules"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Salary" v-model="salary" :rules="onlyNumberRules"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="setDialogState(false)">Close</v-btn>
          <v-btn color="blue darken-1" text @click="userEdit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { clone } from "lodash";
import { regForEmail, regForLetters, regForNumbers } from "../const/regexHelper";
import { emailRules, nameRules, passwordRules, onlyNumberRules } from "../const/validationRules";

export default {
  data: () => ({
    name: "",
    email: "",
    dob: "",
    position: "",
    salary: 0,
    password: '',
    datamenu: false,

    emailRules: [],
    nameRules: [],
    passwordRules: [],
    onlyNumberRules: [],
    isValid: false,
  }),
  created() {
    const clonedUser = clone(this.user);
    this.name = clonedUser.username || '';
    this.email = clonedUser.email || '';
    this.dob = clonedUser.dob || '';
    this.position = clonedUser.position || '';
    this.salary = clonedUser.salary || 0;

    this.emailRules = emailRules;
    this.nameRules = nameRules;
    this.passwordRules = passwordRules;
    this.onlyNumberRules = onlyNumberRules;
    
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["getDialogState"]),
  },
  methods: {
    ...mapMutations(["setDialogState"]),
    ...mapActions(['editUser', 'createUser']),
    userEdit() {
      let validEmail = this.email.match(regForEmail);
      let validName = this.name.match(regForLetters);
      let validPassword = this.password.length >=6
      let validPosition = this.position.match(regForLetters);
      let validSalary = this.salary.match(regForNumbers);



        let hasId = this.user.hasOwnProperty("_id")
        let editedUser = {
            id: this.user._id || null,
            username: this.name,
            email: this.email,
            password: hasId ? this.user.password : this.password,
            dob: this.dob,
            position: this.position,
            salary: this.salary
        }
        
        if(this.user._id == null && validEmail && validName && validPassword && validPosition && validSalary) {
            this.createUser(editedUser)
        } else if(validEmail && validName && validPosition && validSalary){
            this.editUser(editedUser)
        }
        
    },
    
  },
};
</script>