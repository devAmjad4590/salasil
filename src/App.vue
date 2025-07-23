<template>
  <v-app>
    <v-main>
      <router-view v-slot="{ Component }">
        <transition name="slide-fade">
          <component :is="Component" :key="$route.fullPath" />
        </transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "A",
  data: () => ({
    //
  }),
};
</script>
