<template>
  <button @click="onClick()" :style="{ background: color }" class="btn">
    {{ text }}
    <!-- Add Task -->
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: String,
    color: String,
  },

  methods: {
    onClick() {
      console.log("clicked");
    },
  },
};
</script>

<style>
.btn {
  display: inline-block;
  background: black;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  text-decoration: none;
  font-size: 16px;
  font-family: inherit;
  border-radius: 5px;
}
</style>
