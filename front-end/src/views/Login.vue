<template>
  <v-container>
    <img class="center" src="../assets/logo.png" alt="cct-logo" width="125" height="125">
    <div class="title-content">
      <h1 class="center">Login</h1>
      <p class="center">Umfragetool</p>
    </div>

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
