<template>
  <NavBar :back="true" :button="false" @back="goBack"></NavBar>
  <div class="p-container">
    <h1 v-if="this.error">انت زول عوير ولا شنو؟ داير شنو يا مكنه</h1>
    <div v-if="!this.loading" class="video-frame">
      <video id="playerjs" class="video-js vjs-default-skin vjs-big-play-centered"
      ></video>
    </div>

    <div class="sidebar-wrapper">
      <Sidebar
        @course-selected="fetchCourse"
        v-if="!this.loading && !this.error"
        :course="selectedCourse"
        :full-width="true"
        :selected-video-id="$route.params.videoId"
      >
      </Sidebar>
    </div>
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
  async mounted(){
    await this.fetchCourse();
    this.initializePlayer();
  },
  beforeDestroy(){
    this.destroyPlayer();
  },
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
        autoplay: true,
        muted: true,
        playbackRates: [0.5, 1, 1.5, 2], // Speed settings
      });

      console.log("Player initialized");

      // Add quality selector plugin
      this.player.httpSourceSelector();

      this.player.on('pause', () => {
        console.log("Video paused");
      });

      this.player.on('ended', () => {
        console.log("Video ended");
        const videoIndex = this.selectedCourse["الفيديوهات"].findIndex(
          (video) => video["معرف الفيديو"] == this.$route.params.videoId
        );
        if (videoIndex === -1) return;

        const progressKey = `salasil-progress-${this.$route.params.playlistId}`;
        const progress = JSON.parse(localStorage.getItem(progressKey)) || {
          completedIndex: -1,
        };

        if (videoIndex > progress.completedIndex) {
          progress.completedIndex = videoIndex;
          localStorage.setItem(progressKey, JSON.stringify(progress));
          console.log("Progress saved:", progress);
        }

        const nextVideoIndex = videoIndex + 1;
        if (nextVideoIndex < this.selectedCourse["الفيديوهات"].length) {
          const nextVideo = this.selectedCourse["الفيديوهات"][nextVideoIndex];
          this.$router.push({
            name: 'VideoPlayer',
            params: {
              playlistId: this.$route.params.playlistId,
              videoId: nextVideo["معرف الفيديو"],
            },
          });
        }
      });
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
          this.videoLink = `https://www.youtube.com/embed/${this.selectedVideo["معرف الفيديو"]}?rel=0&modestbranding=0&controls=1&showinfo=0&autoplay=1`;
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

.sidebar-wrapper {
  width: 100%;
}

.video-frame {
  width: 100%;
  height: 75vh;
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