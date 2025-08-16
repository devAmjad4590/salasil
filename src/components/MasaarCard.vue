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
          <h2 class="card-title">{{ this.course.الاسم }}</h2>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "MasaarCard",
  props: {
    course: Object,
  },
};
</script>

<style scoped>
.card-link {
  text-decoration: none;
  color: inherit;
}

.card {
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  width: 450px;
  height: 250px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.image-container {
  width: 100%;
  height: 100%;
}

.centered-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card:hover .centered-img {
  transform: scale(1.1);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.card-title {
  color: white;
  font-size: 32px;
  font-family: 'Tajawal', sans-serif;
  font-weight: 700;
  text-align: center;
  padding: 0 20px;
}
</style>
