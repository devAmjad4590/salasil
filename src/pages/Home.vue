<template>
<<<<<<< HEAD
<<<<<<< HEAD
    <h1>Home page</h1>

    <h2>This is 3mak amjad </h2>
    <h3> And shehk Nabel</h3>
=======
    <NavBar></NavBar>
>>>>>>> 1bcad58c8284ec22abe878a510f25bc626d6b8db
=======
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
>>>>>>> fc9da7166f557e96207f7e0389c0c7d627e9771f
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