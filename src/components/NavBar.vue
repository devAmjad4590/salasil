<template>
  <v-app-bar color="#2EBC2E" :elevation="2" class="app-bar">
    <v-spacer></v-spacer>
    <h1 class="title">سلاسل</h1>
    <v-spacer></v-spacer>
    <v-app-bar-nav-icon>
      <IconMenu2 size="35" color="white" />
    </v-app-bar-nav-icon>
  </v-app-bar>
</template>

<script>
import { IconMenu2 } from "@tabler/icons-vue";

export default {
  components: {
    IconMenu2,
  },
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Zain:wght@400;800&display=swap');

.title {
  font-size: 35px;
  font-family: "Zain", sans-serif;
  font-weight: 400;
  font-style: normal;
  margin-left: 32px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.app-bar {
  padding: 0 16px;
}
</style>