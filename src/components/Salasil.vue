<template>
  <div class="salasil-section">
    <h2 class="section-title">سلاسل</h2>
    <div class="card-grid">
      <div
        v-for="course in filtreredCourses"
        :key="course['معرف قائمة التشغيل']"
        class="card-container"
      >
        <Card :course="course"></Card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";
import { get } from "../db";

export default {
  props: {
    courses: Array,
    filters: Object,
  },
  components: {
    Card,
  },
  computed: {
    filtreredCourses() {
      let filteredCourses = this.courses.filter((course) => {
        // Filter by التصانيف
        if (this.filters.التصانيف && this.filters.التصانيف.length > 0) {
          const courseCategories = Array.isArray(course.التصانيف)
            ? course.التصانيف
            : [course.التصانيف];
          const hasMatchingCategory = this.filters.التصانيف.some(
            (filterCategory) => courseCategories.includes(filterCategory)
          );
          if (!hasMatchingCategory) {
            return false;
          }
        }

        // Filter by audio_language
        if (this.filters.audio_language && this.filters.audio_language.length > 0) {
            if (!this.filters.audio_language.includes(course.اللغة)) {
              return false;
            }
          }

        // Filter by المدة
        const duration = this.filters.المدة || Number.POSITIVE_INFINITYs;
        if (course.المدة > duration) {
          return false;
        }

        return true;
      });

      if (this.filters.sorting === "الاقصر") {
        filteredCourses = filteredCourses.sort((a, b) => a.المدة - b.المدة);
      } else if (this.filters.sorting === "الاطول") {
        filteredCourses = filteredCourses.sort((a, b) => b.المدة - a.المدة);
        
      }
      
      window.scrollTo(0, 0);
      return filteredCourses;
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap');

.salasil-section {
  background-color: #fafafa;
  padding: 32px;
}

.section-title {
  font-size: 32px;
  font-family: 'Tajawal', sans-serif;
  font-weight: 700;
  text-align: center;
  margin-bottom: 24px;
  color: #333;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.card-container {
  display: flex;
  justify-content: center;
}
</style>
