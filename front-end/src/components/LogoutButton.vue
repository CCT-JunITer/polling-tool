<template>
  <v-btn small :onClick="handleLogout">Logout</v-btn>
</template>

<script>
export default {
  methods: {
    handleLogout() {
      this.$cookies.remove('access_token');
      this.$cookies.remove('logged_in');
      this.$router.push('/');
    },
  },
};
</script>
