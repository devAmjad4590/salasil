<template>
  <div>
    <NavBar :button="true" @filters-changed="updateFilters"></NavBar>
    <loading-spinner v-if="loading"></loading-spinner>
  </div>
  <div class="pa-4" v-if="!loading">
    <v-container>
      <v-row no-gutters>
        <v-col
          v-for="course in filtreredCourses"
          :key="course['معرف قائمة التشغيل']"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="pa-4"
        >
          <Card :course="course"></Card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import Card from "../components/Card.vue";
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
    Card,
    LoadingSpinner,
  },
  methods: {
    updateFilters() {
      this.filters = get().filters;
    },
    
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
      
      

      // return the user to the top page
      window.scrollTo(0, 0);
      return filteredCourses;
    },
  },
};
</script>

<style></style>
