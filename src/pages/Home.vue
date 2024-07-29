<template>
  <div>
    <NavBar></NavBar>
  </div>
  <div class="pa-4">
    <v-container>
      <v-row no-gutters>
        <v-col
          v-for="i in 10"
          :key="i"
          class="pa-6"
          sm="7"
          xs="12"
          md="6"
          lg="4"
        >
          <Card></Card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import Card from "../components/Card.vue";

export default {
  components: {
    NavBar,
    Card,
  },
};
</script>

<style>
</style>