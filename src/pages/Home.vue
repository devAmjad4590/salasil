<template>
  <div>
    <NavBar @filters-changed="updateFilters"></NavBar>
  </div>
  <div class="pa-4">
    <v-container>
      <v-row no-gutters>
        <v-col
          v-for="course in filtreredCourses"
          :key="course['معرف قائمة التشغيل']"
          class="pa-6"
          sm="4"
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

export default {
  created() {
    fetch("/db/salasil.json")
      .then((response) => response.json())
      .then((data) => {
        this.courses = data.courses.map((course) => {
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
        ;
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
    };
  },
  components: {
    NavBar,
    Card,
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
          const hasMatchingCategory = this.filters.التصانيف.every(
            (filterCategory) => courseCategories.includes(filterCategory)
          );
          if (!hasMatchingCategory) {
            return false;
          }
        }

        // Filter by subtitle_languages
        // if (this.filters.subtitle_languages && this.filters.subtitle_languages.length > 0) {
        //     if (!this.filters.subtitle_languages.includes(course.اللغة)) {
        //       return false;
        //     }
        //   }

        // Filter by المدة
        const duration = this.filters.المدة || Number.POSITIVE_INFINITYs;
        if (course.المدة > duration) {
          return false;
        }

        // if(this.filters.sorting === "الاقصر"){
        //   course.sort((a, b) => a.المدة - b.المدة);
        // } else if(this.filters.sorting === "الاطول"){
        //   filteredCourses.sort((a, b) => b.المدة - a.المدة);
        // }

        return true;
      });

      // Sort the filtered courses
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

<style>
</style>