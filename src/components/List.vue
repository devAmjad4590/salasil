<template>

    <v-card>
        <v-img
          v-if="image"
          :src="image"
          aspect-ratio="1.7"
        ></v-img>
        <v-card-subtitle>
          {{ subtitle }}
        </v-card-subtitle>
        <v-card-title>
          {{ title }}
        </v-card-title>
        <v-card-subtitle v-if="author">
          {{ author }}
        </v-card-subtitle>
        <v-card-text>
          {{ text }}
        </v-card-text>
        <v-divider v-if="hasDivider"></v-divider>
        <v-card-subtitle v-if="category">
          التصنيف: {{ category }}
        </v-card-subtitle>
        <v-card-subtitle v-if="language">
          اللغة: {{ language }}
        </v-card-subtitle>
        <v-card-subtitle v-if="presenter">
          المقدم: {{ presenter }}
        </v-card-subtitle>
        <v-card-subtitle v-if="duration">
          المدة: {{ duration }}
        </v-card-subtitle>
        <v-card-subtitle v-if="date">
          التاريخ: {{ date }}
        </v-card-subtitle>
      </v-card>


<header>

    <h2>
        <!-- {{ title }} -->
    </h2>
    
    <!-- <Button text="Add Task" color="red"/>
    <Button text="Delete Task" color="green"/>
    <Button text="Apdate Task" color="blue"/>
    <Button text="Add Task" color="red"/> -->






</header>

</template>

<script>
// import Button from './Button.vue'
// import List from './List.vue';
export default {
    
    name: "List",
    props: {
        
        title: String,
        image: String,
      subtitle: String,
      title: String,
      author: String,
      text: String,
      hasDivider: Boolean,
      category: String,
      language: String,
      presenter: String,
      duration: String,
      date: String,
},

components: {
    
    
    
}

}


</script>





<style scoped>

.v-card {
  margin-bottom: 20px;
  padding: 20px;
}

header{

    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    color: blue;

}




</style>