<template>
      <NavBar :button="false"></NavBar>
  <div class="p-container">
    <h1 v-if="this.error" >انت زول عوير ولا شنو؟ داير شنو يا مكنه</h1>
    <iframe
      v-if="!this.loading"
      width="100%"
      height="620"
      :src="videoLink"
      allowfullscreen
      frameborder="0"
    >
    </iframe>

      <Sidebar @course-selected="fetchCourse" v-if="!this.loading && !this.error" :course="selectedCourse" class="video-bar"> </Sidebar>
    </div>
</template>

<script>
import MainContent from "../components/MainContent.vue";
import Sidebar from "../components/Sidebar.vue";
import NavBar from "../components/NavBar.vue";

export default {
  name: "playlist",
  created() {
    this.fetchCourse();
  },
  data() {
    return {
      isChecked: false,
      videoId: null,
      videoLink: null,
      playlistId: null,
      selectedCourse: null,
      selectedVideo: null,
      loading: true,
      error: false,
    };
  },
  methods: {
    toggleCheck() {
      this.isChecked = !this.isChecked;
      console.log(videoId)
    },
    async fetchCourse(){      
      window.scrollTo(0, 0);
      try {
        const response = await fetch('/db/salasil.json');
        const data = await response.json();
        this.selectedCourse = await data.courses.find(course => course['معرف قائمة التشغيل'] == this.$route.params.playlistId);
        this.selectedVideo = await this.selectedCourse['الفيديوهات'].find(video => video['معرف الفيديو'] == this.$route.params.videoId);
        if(this.selectedVideo){
          this.videoLink = `https://www.youtube.com/embed/${this.selectedVideo['معرف الفيديو']}?rel=0&modestbranding=1&controls=1&showinfo=1`;        }
        else{
          this.error = true;
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally{
        this.loading = false;
      }
    }
  },

  components: {
    MainContent,
    Sidebar,
    NavBar
  },
};
</script>

<style scoped>
.p-container {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.video-bar{
  margin-left: 0.5px;
  margin-right: 0.5px;
}

.Sidebsr {
  display: flex;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: -19px;
}

.checkmark {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid black;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkmark.checked {
  background-color: lightgreen;
  border-color: green;
}

.checkmark::after {
  content: "";
  width: 0;
  height: 0;
  border-right: 5px solid transparent;
  border-bottom: 5px solid transparent;
  transform: rotate(45deg);
  position: absolute;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.checkmark.checked::after {
  width: 25px;
  height: 45px;
  border-right: 5px solid green;
  border-bottom: 5px solid green;
  opacity: 1;
}
</style>
