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

.checkmark {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid black;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkmark.checked {
  background-color: lightgreen;
  border-color: green;
}

.checkmark::after {
  content: "";
  width: 0;
  height: 0;
  border-right: 5px solid transparent;
  border-bottom: 5px solid transparent;
  transform: rotate(45deg);
  position: absolute;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.checkmark.checked::after {
  width: 25px;
  height: 45px;
  border-right: 5px solid green;
  border-bottom: 5px solid green;
  opacity: 1;
}
</style>
