<template>
  <div class="grid-sidebar">
    <div class="date">
      <p class="right">التقدم: ١/٤</p>
      <p class="left">تاريخ البدء: 2024/2/2</p>
    </div>
    <div class="list-box">
      <div v-for="episode in episodes" :key="episode.id" class="card">
        <p class="episode">{{ episode.id }}</p>
        <p>{{ episode.description }}</p>
        <p class="time">٢٠د</p>
        <span class="icon-wrapper">
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
      episodes: [
        {
          id: "١",
          description:
            "فهم | سلسلة تذوق العبادات - (4) الذكر | 42 فاه | مع د. أحمد العربي",
        },
        {
          id: "٢",
          description:
            "فهم | سلسلة تذوق العبادات - (4) الذكر | 42 فاه | مع د. أحمد العربي",
        },
        {
          id: "٣",
          description:
            "فهم | سلسلة تذوق العبادات - (4) الذكر | 42 فاه | مع د. أحمد العربي",
        },
        {
          id: "٤",
          description:
            "فهم | سلسلة تذوق العبادات - (4) الذكر | 42 فاه | مع د. أحمد العربي",
        },
      ],
    };
  },
  components: {
    IconClockHour9Filled,
  },
};
</script>

<style scoped>
.grid-sidebar {
  display: grid;
  display: flex;
  flex-direction: column;

  grid-gap: px;
  width: 150%;
  padding: 0;

  background-color: #fff;
  padding: 20px;
  margin-left: -30px;
  margin-right: 0;
  border-radius: 0px;
  margin-top: -20px;
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
  justify-content: space-between;
  height: 60px;
  border-bottom: 1px solid #eee;
  line-height: 0;
  border-radius: 5px;
  box-shadow: 0 0 1px 1px black;
  text-align: center;
}

.card:last-child {
  border-bottom: none;
}

.time {
  font-size: 18px;
  margin-left: 10px;
  margin-right: 200px;
}

.episode {
  font-size: 20px;
  color: #b30000;
  justify-items: first baseline;
  margin-right: 20px;
  margin-left: -75px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-weight: bold;
}

.list-box {
  display: grid;
  justify-items: auto;
}

.icon-wrapper {
  margin-right: -107px;
  margin-left: 30px;
}
</style>
