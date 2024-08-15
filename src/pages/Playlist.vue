<template>
  <div class="container">
    <div>
      <NavBar :button="false"></NavBar>

      <div class="p-container">
        <MainContent></MainContent>
        <Sidebar></Sidebar>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import MainContent from "../components/MainContent.vue";
import NavBar from "../components/NavBar.vue";

export default {
  name: "playlist",

  components: {
    Sidebar,
    MainContent,
    NavBar,
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  direction: rtl;
  background-color: #f8f8f8;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.header {
  background-color: #4caf50;
  color: white;
  width: 110%;
  padding: 15px;
  text-align: center;
  margin-bottom: 20px;
}

.p-container {
  display: flex;
  flex-direction: row;
}
</style>
