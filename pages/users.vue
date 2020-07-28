<template>
  <v-layout column ma-3>
    <v-data-table
      class="elevation-1"
      :headers="headers"
      @click:row="selectUser"
      item-key="name"
      :items="getUsers"
      :items-per-page="15"
    ></v-data-table>
    <v-layout justify-center mt-5>
      <v-btn color="primary" @click="createUser">Create user</v-btn>
    </v-layout>

    <user-modal v-if="getDialogState" :user="selectedUser" />
  </v-layout>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import userModal from "../components/Modal";
export default {
  middleware: "auth",
  components: {
    userModal,
  },
  data: () => ({
    headers: [
      {
        text: "User name",
        align: "start",
        sortable: false,
        value: "username",
      },
      { text: "Email", value: "email" },
      { text: "Date of Birth", value: "dob" },
      { text: "Position", value: "position" },
      { text: "Salary", value: "salary" },
    ],
    selectedUser: {},
  }),
  computed: {
    ...mapGetters(["getUsers", "getDialogState"]),
  },
  methods: {
    ...mapMutations(["setDialogState"]),
    selectUser(user) {
      this.selectedUser = user;
      this.setDialogState(true);
    },
    createUser(){
      this.selectedUser = {};
      this.setDialogState(true);
    }
  },
};
</script>
