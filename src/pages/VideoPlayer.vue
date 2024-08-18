<template>
  <div class="p-container">
    <iframe
      width="100%"
      height="680"
      src="https://www.youtube.com/embed/tgbNymZ7vqY"
    >
    </iframe>
    <div class="Sidebsr">
      <div
        :class="['checkmark', { checked: isChecked }]"
        @click="toggleCheck"
      ></div>
      <Sidebar> </Sidebar>
    </div>
  </div>
</template>

<script>
import MainContent from "../components/MainContent.vue";
import Sidebar from "../components/Sidebar.vue";

export default {
  name: "playlist",
  name: "CheckmarkCheckbox",
  data() {
    return {
      isChecked: false,
    };
  },
  methods: {
    toggleCheck() {
      this.isChecked = !this.isChecked;
    },
  },

  components: {
    MainContent,
    Sidebar,
  },
};
</script>

<style scoped>
.p-container {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.Sidebsr {
  display: flex;
  justify-content: space-between;
  margin-top: 22px;
  margin-left: 10px;
  margin-right: -19px;
}
</style>
