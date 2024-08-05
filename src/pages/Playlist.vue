<template>

    <div>
        <h1> </h1>
        <NavBar> </NavBar>

        <div class="container">

            <List title="Playlist"/>
           

    </div>
</div>

    
   
</template>



<script>
import NavBar from "../components/NavBar.vue";
import List from "../components/List.vue";
// import Card1 from "../components/Card1.vue";

export default {
  created(){
    fetch('/db/salasil.json')
    .then(response => response.json())
    .then(data => {
    //   this.courses = data.courses
    //   console.log(this.courses)
    })
  },
  data(){
    return{
      courses: []
    }
  },
  components: {
    NavBar,
    List,
    
  },
};


</script>

<style>




/* Add global CSS styles here */





</style>