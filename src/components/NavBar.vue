<template>
  <v-app-bar :color="color" :elevation="2" class="app-bar">
    <v-app-bar-nav-icon @click.stop="drawer = !drawer">
      <IconMenu2 v-if="button" size="35" color="#2c3e50" />
    </v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <router-link to="/" class="title-link" @click="handleTitleClick">
      <h1 class="title">سلاسل</h1>
    </router-link>
    <v-spacer></v-spacer>
    <v-app-bar-nav-icon class="ml-3">
      <IconArrowBack v-if="back" @click="$emit('back')"  size="35" color="#2c3e50" />
    </v-app-bar-nav-icon>
  </v-app-bar>
  <v-navigation-drawer
    v-if="button"
    class="pa-5"
    v-model="drawer"
    location="right"
  >
    <h3 class="drawer-title mb-4">ترتيب</h3>
    <v-select
      label="اختر التريب"
      class="mt-3"
      rounded
      :items="['الاقصر', 'الاطول']"
      variant="solo"
      v-model="sorting"
      @update:modelValue="handleChange"
    ></v-select>
    <h3 class="drawer-title">فلتر</h3>
    <h4 class="mt-5 drawer-subtitle">اللغة</h4>
    <h5 class="mt-3 drawer-subtitle2">اللغة المسموعة</h5>

    <v-select
      label="اختر اللغة"
      class="mt-3"
      rounded
      :items="available_languages"
      variant="solo"
      v-model="اللغة_المسموعة"
      @update:modelValue="handleChange"
    ></v-select>

    <h5 class="mt-3 drawer-subtitle2">اللغة المقروءة</h5>
    <div v-for="lang in available_languages" :key="lang">
      <CustomCheckbox
        :value="lang"
        v-model:modelValue="اللغات_المقروءة"
        @update:modelValue="handleChange"
      >
        {{ lang }}
      </CustomCheckbox>
    </div>

    <h5 class="mt-7 drawer-subtitle">التصنيف</h5>
    <div v-for="category in displayedCategories" :key="category">
      <CustomCheckbox
        :value="category"
        v-model:modelValue="التصنيف"
        @update:modelValue="handleChange"
      >
        {{ category }}
      </CustomCheckbox>
    </div>
    <v-btn
      variant="plain"
      :ripple="false"
      v-if="!showAllCategories"
      @click="showMoreCategories"
      >عرض المزيد...</v-btn
    >
    <v-btn variant="plain" :ripple="false" v-else @click="showMoreCategories"
      >عرض أقل...</v-btn
    >
    <h5 class="mt-7 drawer-subtitle">المدة</h5>
    <v-btn
      variant="plain"
      @click="handleClick(10)"
      style="display: block"
      :ripple="false"
      >10 ساعة</v-btn
    >
    <v-btn
      variant="plain"
      @click="handleClick(20)"
      style="display: block"
      :ripple="false"
      >20 ساعة</v-btn
    >
    <v-btn
      variant="plain"
      @click="handleClick(30)"
      style="display: block"
      :ripple="false"
      >30 ساعة</v-btn
    >
    <v-btn
      variant="plain"
      @click="handleClick(Number.POSITIVE_INFINITY)"
      class="mb-6"
      style="display: block"
      :ripple="false"
      >30+ ساعة</v-btn
    >
  </v-navigation-drawer>
</template>

<script>
import { IconMenu2, IconArrowBack } from "@tabler/icons-vue";
import CustomCheckbox from "./CustomCheckBox.vue";
import { set, get } from "../db";
export default {
  data() {
    return {
      drawer: false,
      available_languages: ["English", "العربية"],
      categories: ["فقه", "دعوة", "حديث", "تفسير", "وثائقيات"],
      اللغات_المقروءة: [],
      اللغة_المسموعة: "",
      التصنيف: [],
      showAllCategories: false,
      sorting: "الاقصر",
      timeStamp: 0,
    };
  },
  components: {
    IconMenu2,
    CustomCheckbox,
    IconArrowBack,
  },
  computed: {
    displayedCategories() {
      return this.showAllCategories
        ? this.categories
        : this.categories.slice(0, 3);
    },
  },

  props: {
    button: Boolean,
    back: Boolean,
    color: {
      type: String,
      default: "#F5F5F5",
    },
  },
  methods: {
    showMoreCategories() {
      this.showAllCategories = !this.showAllCategories;
    },
    handleTitleClick(event) {
      if (this.$route.path === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        event.preventDefault();
      } else {
        this.$router.push('/');
      }
    },
    handleChange() {
      set({
        filters: {
          التصانيف: this.التصنيف,
          subtitle_languages: this.اللغات_المقروءة,
          audio_language: this.اللغة_المسموعة,
          sorting: this.sorting,
        },
      });
      this.$emit("filters-changed");
    },
    handleClick(value) {
      this.timeStamp = value;
      set({
        filters: {
          التصانيف: this.التصنيف,
          subtitle_languages: this.اللغات_المقروءة,
          audio_language: this.اللغة_المسموعة,
          المدة: this.timeStamp,
        },
      });
      this.$emit("filters-changed");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Zain:wght@400;800&display=swap");

.title {
  font-size: 35px;
  font-family: "Zain", sans-serif;
  font-weight: 800;
  font-style: normal;
  margin-left: 50px;
  color: #2c3e50;
}

.app-bar {
  padding: 0 16px;
}

.title-link {
  text-decoration: none;
  color: inherit;
  transition: color 0.3s ease;
}

.title-link:hover {
  color: #7785dc;
}

.drawer-title {
  font-size: 25px;
  font-family: "Zain", sans-serif;
  font-weight: 400;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.drawer-subtitle {
  font-size: 22px;
  font-family: "Zain", sans-serif;
  font-weight: 400;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.drawer-subtitle2 {
  font-size: 18px;
  font-family: "Zain", sans-serif;
  font-weight: 400;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
</style>
