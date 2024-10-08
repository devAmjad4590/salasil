<template>
  <NavBar :back="true" :button="false" @back="goBack"></NavBar>
  <div class="p-container">
    <h1 v-if="this.error">انت زول عوير ولا شنو؟ داير شنو يا مكنه</h1>
    <div v-if="!this.loading" class="video-frame">
      <video id="playerjs" class="video-js vjs-default-skin vjs-big-play-centered"
      ></video>
    </div>


    <Sidebar
      @course-selected="fetchCourse"
      v-if="!this.loading && !this.error"
      :course="selectedCourse"
      class="video-bar"
    >
    </Sidebar>
  </div>
</template>

<script>
import MainContent from "../components/MainContent.vue";
import Sidebar from "../components/Sidebar.vue";
import NavBar from "../components/NavBar.vue";

import videojs from "video.js";
import "video.js/dist/video-js.css";
import 'videojs-youtube';
import 'videojs-http-source-selector';

export default {
  name: "playlist",
  mounted(){
    this.fetchCourse();
    setTimeout(() => {
      this.initializePlayer();
    }, 500);
  },
  beforeDestroy(){
    this.destroyPlayer();
  },
  watch: {
    videoLink(newVal, oldVal){
      if(newVal !== oldVal && oldVal !== null){
        this.$router.go(0);
    }
  }},
  data() {
    return {
      isChecked: false,
      videoId: null,
      videoLink: null,
      playlistId: null, // hereeeeeeeeeeeeeeeeeee
      selectedCourse: null,
      selectedVideo: null,
      loading: true,
      error: false,
      player: null,
    };
  },
  methods: {
    toggleCheck() {
      this.isChecked = !this.isChecked;
    },
    initializePlayer(){
      if (this.player) {
        this.player.dispose();
      }
      this.player = videojs(document.getElementById('playerjs'), {
        techOrder: ['youtube'],
        sources: [{
          type: 'video/youtube',
          src: this.videoLink
        }],
        controls: true,
        playbackRates: [0.5, 1, 1.5, 2], // Speed settings
      });

      // Add quality selector plugin
      this.player.httpSourceSelector();

      this.player.on('ended', () => {
        // const id = this.playlistId;
       // here is the function mr nasr !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      })
    },
    destroyPlayer(){
      if(this.player){
        this.player.dispose();
      }
    },
    async fetchCourse() {
      window.scrollTo(0, 0);
      try {
        const response = await fetch("/db/salasil.json");
        const data = await response.json();
        this.selectedCourse = await data.courses.find(
          (course) =>
            course["معرف قائمة التشغيل"] == this.$route.params.playlistId
        );
        this.selectedVideo = await this.selectedCourse["الفيديوهات"].find(
          (video) => video["معرف الفيديو"] == this.$route.params.videoId
        );
        if (this.selectedVideo) {
          this.videoLink = `https://www.youtube.com/embed/${this.selectedVideo["معرف الفيديو"]}?rel=0&modestbranding=0&controls=1&showinfo=0&autoplay=0`;
        } else {
          this.error = true;
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        this.loading = false;
      }
    },
    goBack() {
      this.$router.push("/playlist/" + this.$route.params.playlistId);
    },
  },

  components: {
    MainContent,
    Sidebar,
    NavBar,
  },
};
</script>

<style scoped>
.p-container {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.video-bar {
  margin-left: 0.5px;
  margin-right: 0.5px;
}

.Sidebsr {
  display: flex;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: -19px;
}

.video-frame {
  width: 100%;
  height: 76vh;
  aspect-ratio: 16/9;
}

.vjs-big-play-centered .vjs-big-play-button {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.video-js {
  width: 100%;
  height: 100%;
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