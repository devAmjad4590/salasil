<template>
  <NavBar :back="true" :button="false" @back="goHome" color="#2EBC2E"></NavBar>
  <div class="container">
    <loading-spinner v-if="loading"></loading-spinner>
    <div v-if="!loading">
      <div class="p-container">
        <MainContent v-if="!loading" :course="selectedCourse"></MainContent>
        <div class="scroller">
          <Sidebar
            class="pa-4"
            v-if="!loading"
            :course="selectedCourse"
            maxWidth="100vw"
          ></Sidebar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import MainContent from "../components/MainContent.vue";
import NavBar from "../components/NavBar.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";

export default {
  name: "playlist",
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
  components: {
    Sidebar,
    MainContent,
    NavBar,
    LoadingSpinner,
  },
  async created() {
    const courseId = this.$route.params.id;
    try {
      const response = await fetch("/db/salasil.json");
      const data = await response.json();
      this.selectedCourse = await data.courses.find(
        (course) => course["معرف قائمة التشغيل"] == courseId
      );
    } catch (error) {
      console.error("Error fetching course data:", error);
    } finally {
      this.loading = false;
    }
  },
  data() {
    return {
      selectedCourse: null,
      loading: true,
    };
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

.scroller {
  overflow-y: auto;
  height: 85vh;
  margin-right: -100px;
}

.p-container {
  display: grid;
  grid-template-columns: 40% 60%;
  gap: 0; /* Remove the gap between columns */
}
</style>
