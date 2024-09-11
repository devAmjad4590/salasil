<template>
  <div class="grid-sidebar">
    <div class="date">
      <p class="right">التقدم: ١/٤</p>
      <p class="left">تاريخ البدء: 2024/2/2</p>
    </div>
    <div class="list-box">
      <v-card
        link
        v-for="(episode, index) in episodes"
        :key="index"
        class="card"
        :to="{
          name: 'VideoPlayer',
          params: {
            playlistId: course['معرف قائمة التشغيل'],
            videoId: episode['معرف الفيديو'],
          },
        }"
        @click="handleClick"
      >
        <p class="episode">{{ toArabic(index + 1) }}</p>
        <p class="episode-title">{{ truncatedText(episode["عنوان"]) }}</p>

        <span class="icon-wrapper">
          <p class="time flex-left">{{ formatDuration(episode["مدة"]) }}</p>

          <IconClockHour9Filled size="32" color="black" />
          <div
            :class="['checkmark', { checked: isChecked }]"
            @click="toggleCheck"
          ></div>
        </span>
      </v-card>
    </div>
  </div>
</template>

<script>
import { IconClockHour9Filled } from "@tabler/icons-vue";

export default {
  name: "CheckmarkCheckbox",

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

      episodes: this.course["الفيديوهات"],
    };
  },
  components: {
    IconClockHour9Filled,
  },
  props: {
    course: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  methods: {
    truncatedText(text) {
      return text.length > 97 ? text.slice(0, 97) + "....." : text;
    },

    toggleCheck() {
      this.isChecked = !this.isChecked;
    },
    
      handleClick() {
        this.$emit("course-selected");
      },
      formatDuration(duration) {
    const parts = duration.split(":").map(Number);
    let hours = 0, minutes = 0, seconds = 0;

    if (parts.length === 2) {
      [minutes, seconds] = parts;
    } else if (parts.length === 3) {
      [hours, minutes, seconds] = parts;
    }


    const totalMinutes = hours * 60 + minutes + seconds / 60;

    const toArabicNumerals = (num) => {
      return num.toString().replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);
    };

    if (totalMinutes >= 60) {
      const totalHours = Math.floor(totalMinutes / 60);
      return `${toArabicNumerals(totalHours)}س`;
    } else {
      return `${toArabicNumerals(Math.floor(totalMinutes))}د`;
    }
  },

  toArabic(num){
    return num.toString().replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);
  }
  },
};
</script>

<style scoped>
.grid-sidebar {
  display: grid;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.date {
  display: flex;

  justify-content: space-between;
  align-items: center;
  background-color: #d9d9d9;
  padding: 0;
  margin: 0;
  gap: 0;
  line-height: 0;
  border-radius: 4px;
  box-shadow: 0 0 1px 1px black;
  height: 60px;
}

.left {
  display: flex;
  margin-left: 20px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
.right {
  font-family: 20px "Zain", sans-serif;
  display: flex;
  margin-right: 20px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.right {
  color: #b30000;
}

.card {
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  height: 60px;
  border-bottom: 1px solid #eee;
  line-height: 0;
  border-radius: 5px;
  box-shadow: 0 0 1px 1px black;
  width: 100%; /* Ensure the card takes full width */
}

.card:last-child {
  border-bottom: none;
}

.time {
  font-size: 18px;
  margin-top: 15px;
  margin-left: 5px;
}

.episode-title {
  text-align: right;
  margin-right: 20px;
  flex: 1; /* Allow the title to take available space */
}

.episode {
  font-size: 20px;
  color: #b30000;
  justify-items: first baseline;
  margin-right: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-weight: bold;
}

.list-box {
  display: grid;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1); /* Add shadow to the image */
}

.icon-wrapper {
  margin-right: 20px;
  margin-left: 25px;
  display: flex;
}

.checkmark {
  margin-right: 20px;
  width: 25px;
  height: 25px;
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
  width: 10px;
  height: 27px;
  border-right: 5px solid green;
  border-bottom: 5px solid green;
  opacity: 1;
}
</style>
