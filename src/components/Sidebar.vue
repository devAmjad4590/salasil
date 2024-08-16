<template>
  <div class="grid-sidebar">
    <div class="date">
      <p class="right">التقدم: ١/٤</p>
      <p class="left">تاريخ البدء: 2024/2/2</p>
    </div>
    <div class="list-box">
      <div v-for="(episode, index) in episodes" :key="index" class="card">
        <p class="episode">{{ index + 1}}</p>
        <p class="episode-title">{{ truncatedText(episode["عنوان"]) }}</p>
        <span class="icon-wrapper">
          <p class="time flex-left">{{ episode["مدة"] }}</p>
          <IconClockHour9Filled size="32" color="black" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { IconClockHour9Filled } from "@tabler/icons-vue";

export default {
  data() {
    return {
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
      default: () => ({})
    },
    
  },
  methods: {
    truncatedText(text) {
      return text.length > 97 ? text.slice(0, 97) + "..." : text;

    },
  },
};
</script>

<style scoped>
.grid-sidebar {
  display: grid;
  display: flex;
  flex-direction: column;

  width: 100%;

  background-color: #fff;
  padding: 20px;
  margin-left: -30px;
  border-radius: 0px;
  margin-top: -17px;
}

.date {
  display: flex;

  justify-content: space-between;
  align-items: center;
  background-color: #f0f0f0;
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

.episode-title{
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
}

.icon-wrapper {
  margin-right: 20px;
  margin-left: 25px;
  display: flex;
}
</style>
