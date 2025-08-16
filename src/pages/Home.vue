<template>
  <div>
    <NavBar :button="true" @filters-changed="updateFilters"></NavBar>
    <loading-spinner v-if="loading"></loading-spinner>
    <div v-if="!loading" class="pa-4">
      <Masaar />
      <Salasil :courses="courses" :filters="filters" />
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import Masaar from "../components/Masaar.vue";
import Salasil from "../components/Salasil.vue";
import { get } from "../db";
import LoadingSpinner from "../components/LoadingSpinner.vue";

export default {
  created() {
    this.loading = true;
    fetch("/db/salasil.json")
      .then((response) => response.json())
      .then((data) => {
        this.courses = data.courses
          .map((course) => {
            // Split التصانيف by comma and trim whitespace
            if (course.التصانيف) {
              course.التصانيف = course.التصانيف
                .split("،")
                .map((cat) => cat.trim());
            }

            // Convert المدة الإجمالية (بالساعات) to a number
            if (course["المدة الإجمالية (بالساعات)"]) {
              const [hours, minutes, seconds] = course[
                "المدة الإجمالية (بالساعات)"
              ]
                .split(":")
                .map(Number);
              course.المدة = hours + minutes / 60 + seconds / 3600;
            }
            return course;
          })
          .sort((a, b) => a.المدة - b.المدة); // Sort courses by duration from short to long
          // initially filter courses to arabic
        this.loading = false;
      });
  },
  data() {
    return {
      courses: [],
      filters: {
        التصانيف: [],
        subtitle_languages: [],
        audio_language: "",
        المدة: 0,
      },
      loading: false,
    };
  },
  components: {
    NavBar,
    Masaar,
    Salasil,
    LoadingSpinner,
  },
  methods: {
    updateFilters() {
      this.filters = get().filters;
    },
  },
};
</script>

<style></style>
