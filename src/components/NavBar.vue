<template>
  <v-app-bar color="#2EBC2E" :elevation="2" class="app-bar">
    <v-app-bar-nav-icon @click.stop="drawer=!drawer">
      <IconMenu2 size="35" color="white" />
    </v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <h1 class="title">سلاسل</h1>
    <v-spacer></v-spacer>
  </v-app-bar>
  <v-navigation-drawer class="pa-5" v-model="drawer" location="right">
    <h3 class="drawer-title">غربلة السلاسل</h3>
    <h4 class="mt-5 drawer-subtitle">اللغة</h4>
    <h5 class="mt-3 drawer-subtitle2">اللغة المسموعة</h5>

    <v-select
      label="اختر اللغة"
      class="mt-3"
      rounded
      :items="available_languages"
      variant="solo"
    ></v-select>

    <h5 class="mt-3 drawer-subtitle2">اللغة المقروءة</h5>
    <div v-for="lang in available_languages" :key="lang" >
      <CustomCheckbox :value="lang" v-model:modelValue="اللغات_المقروءة" >
      {{ lang }}
     </CustomCheckbox>
    </div>

    <h5 class="mt-7 drawer-subtitle">التصنيف</h5>
    <div v-for="category in categories" :key="category" >
      <CustomCheckbox :value="category" v-model:modelValue="التصنيف" >
      {{ category }}
     </CustomCheckbox>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { IconMenu2 } from "@tabler/icons-vue";
import CustomCheckbox from "./CustomCheckBox.vue";
export default {
  data() {
    return {
      drawer: false,
      available_languages: ["English", "العربية"],
      categories: ['فقه', "دعوة", "حديث", "تفسير"],
      اللغات_المقروءة: [],
      اللغة_المسموعة: false,
      التصنيف: [],
      المدة: {
        من: 0,
        الى: 0,
      },
    };
  },
  components: {
    IconMenu2,
    CustomCheckbox,
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Zain:wght@400;800&display=swap");

.title {
  font-size: 35px;
  font-family: "Zain", sans-serif;
  font-weight: 400;
  font-style: normal;
  margin-left: 50px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.app-bar {
  padding: 0 16px;
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