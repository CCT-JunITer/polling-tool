<template>
  <v-container>
    <img class="u-center" src="../assets/logo.png" alt="cct-logo" width="125" height="125">
    <h1 class="u-center">Login</h1>
    <p class="u-center">Umfragetool</p>

    <LoginForm />
  </v-container>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';

export default {
  components: {
    LoginForm,
  },

  mounted() {
    if (this.$cookies.get('access_token') && this.$cookies.get('logged_in')) {
      this.$router.push('/poll');
    }
  },
};
</script>
