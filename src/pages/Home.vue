<template>
  <div>
    <NavBar></NavBar>  
  </div>
  <div class="pa-4">
    <v-container>
      <v-row no-gutters>
        <v-col
          v-for="course in this.courses"
          :key="course['معرف قائمة التشغيل']"
          class="pa-6"
          sm="4"
          
        >
          <Card :course="course" ></Card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import Card from "../components/Card.vue";

export default {
  created(){
    fetch('/db/salasil.json')
    .then(response => response.json())
    .then(data => {
      this.courses = data.courses
    })
    
  },
  data(){
    return{
      courses: []
    }
  },
  components: {
    NavBar,
    Card,
  },
};
</script>

<style>
</style>