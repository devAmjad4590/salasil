<template>
  <div class="mb-8">
    <h2 class="section-title">مسار</h2>
    <div class="slider-container">
      <button @click="scrollRight" class="arrow right-arrow">&#10094;</button>
      <div class="slider" ref="slider">
        <div v-for="item in masaarItems" :key="item['معرف قائمة التشغيل']" class="slide-item">
          <Card :course="item" class="ma-4"></Card>
        </div>
      </div>
      <button @click="scrollLeft" class="arrow left-arrow">&#10095;</button>
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";

export default {
  components: {
    Card,
  },
  data() {
    return {
      masaarItems: [],
    };
  },
  created() {
    fetch("/db/salasil.json")
      .then((response) => response.json())
      .then((data) => {
        this.masaarItems = data.courses.slice(0, 10);
      });
  },
  methods: {
    scrollLeft() {
      this.$refs.slider.scrollBy({ left: -300, behavior: 'smooth' });
    },
    scrollRight() {
      this.$refs.slider.scrollBy({ left: 300, behavior: 'smooth' });
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap');

.section-title {
  font-size: 32px;
  font-family: 'Tajawal', sans-serif;
  font-weight: 700;
  text-align: center;
  margin-bottom: 24px;
  color: #333;
}

.slider-container {
  position: relative;
}

.slider {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
}

.slider::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
}

.slide-item {
  flex: 0 0 auto;
  margin: 16px;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: #157536;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  z-index: 10;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: background-color 0.3s;
}

.arrow:hover {
  background-color: #105a28;
}

.left-arrow {
  left: 10px;
}

.right-arrow {
  right: 10px;
}
</style>
