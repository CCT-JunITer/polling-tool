<template>
  <v-container class="login-form">
    <v-row center>
      <v-col c6>
        <div class="input-control">
          <label class="font-normal">E-Mail</label>
          <input type="email" @input="checkChange" v-model="email">
        </div>
      </v-col>
    </v-row>
    <v-row center>
      <v-col c6>
        <div class="input-control">
          <label class="font-normal">Passwort</label>
          <input type="password" @input="checkChange" v-model="password">
        </div>
      </v-col>
    </v-row>

    <v-space />

    <v-row center>
      <v-btn class="submit" :disabled="disabled" :onClick="handleLoginClick" large>Login</v-btn>
    </v-row>

    <v-row center>
      <v-col c6>
        <v-toast center error id="feedback" style="visibility: hidden;">
          Falsche Login Informationen!
        </v-toast>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data: () => {
    return {
      disabled: true,
      email: '',
      password: '',
    };
  },
  methods: {
    checkChange() {
      if (this.email.length !== 0 && this.password.length !== 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    handleLoginClick() {
      axios.post('http://localhost:3000/login', {
        username: this.email,
        password: this.password,
      }).then((res) => {
        if (res.data.success) {
          this.$cookies.set('access_token', res.data.token);
          if (res.data.admin) {
            this.$router.push('create');
          } else {
            this.$router.push('poll');
          }
        } else {
          document.getElementById('feedback').style.visibility = 'visible';
        }
      });
    },
  },
};
</script>

<style lang="scss">
.login-form {
  img {
    margin-bottom: -10px;
  }
  .title-content {
    h1 {
      margin-bottom: 0 !important;
    }
    p {
      margin-bottom: 30px !important;
    }
  }
}
</style>
