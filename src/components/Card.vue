<template>
  <router-link
    :to="{
      name: 'Playlist',
      params: { id: this.course['معرف قائمة التشغيل'] },
    }"
    class="card-link"
  >
    <div class="card">
      <div class="image-container">
        <img
          :src="course['الفيديوهات'][0]['صورة مصغرة']"
          class="centered-img"
        />
        <div class="overlay">
          <div class="rectangle" :style="{ width: rectangleWidth }">
            <span class="rectangle-text">{{ formattedDuration }}</span>
          </div>
        </div>
      </div>
      <div class="card-content">
        <h2 class="card-title">{{ this.course.الاسم }}</h2>
        <p class="text-right">
          {{ truncatedText }}
        </p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "Card",
  props: {
    course: Object,
  },
  computed: {
    truncatedText() {
      const description = this.course["وصف مختصر"];
      return description.length > 150
        ? description.substring(0, 140) + "..."
        : description;
    },
    formattedDuration() {
      const duration = this.course["المدة الإجمالية (بالساعات)"];
      const hours = parseFloat(duration.split(":")[0]);
      if (hours < 1) {
        return "اقل من ساعة";
      } else if (hours == 2) {
        return "ساعتين";
      } else if (hours <= 10 && hours > 2) {
        return `${hours} ساعات`;
      } else {
        return `${hours} ساعة`;
      }
    },
    rectangleWidth() {
      const duration = this.course["المدة الإجمالية (بالساعات)"];
      const hours = parseFloat(duration.split(":")[0]);
      if (hours < 1) {
        return "119px";
      } else if (hours == 2) {
        return "80px";
      } else if (hours >= 10 && hours <= 99) {
        return "85px";
      } else if (hours > 100) {
        return "100px";
      }
    },
  },
};
</script>

<style scoped>
.card-link {
  text-decoration: none;
  color: inherit;
}

.card {
  border: 1px solid #e0e0e0;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  width: 350px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card:hover .centered-img {
  transform: scale(1.05);
}

.card:hover .card-title,
.card:hover .text-right {
  color: #157536;
}

.image-container {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
}

.centered-img {
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
}

.rectangle {
  background-color: #990000;
  padding: 1.9px 14px;
  height: 29px;
  border-radius: 3px;
}

.rectangle-text {
  font-family: "Zain", sans-serif;
  color: white;
  font-size: 18px;
  text-align: right;
}

.card-content {
  padding: 12px 4px 4px 4px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-title {
  text-align: right;
  font-size: 18px;
  font-family: 'Tajawal', sans-serif;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
  transition: color 0.3s;
}

.text-right {
  text-align: right;
  font-size: 14px;
  font-family: 'Tajawal', sans-serif;
  font-weight: 400;
  color: #666;
  line-height: 1.5;
  flex-grow: 1;
  transition: color 0.3s;
}
</style>
