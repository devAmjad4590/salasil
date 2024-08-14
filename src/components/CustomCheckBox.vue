<template>
    <label class="checkbox mb-1">
      <input type="checkbox" :value="value" :checked="isChecked" @change="toggleCheckbox" />
      <IconSquareCheckFilled
        size="20"
        v-if="isChecked"
        class="ml-3 checkbox-icon"
      />
      <IconSquare size="20" v-else class="ml-3 checkbox-icon" />
      <slot></slot>
    </label>
  </template>
  
  <script>
  import { IconSquare, IconSquareCheckFilled } from "@tabler/icons-vue";
  
  export default {
    props: {
      value: {
        type: String,
        required: true,
      },
      modelValue: {
        type: Array,
        required: true,
      },
    },
    computed: {
      isChecked() {
        return this.modelValue.includes(this.value);
      },
    },
    methods: {
      toggleCheckbox() {
        const newValue = this.isChecked
          ? this.modelValue.filter(item => item !== this.value)
          : [...this.modelValue, this.value];
        this.$emit('update:modelValue', newValue);
      },
    },
    components: {
      IconSquare,
      IconSquareCheckFilled,
    },
  };
  </script>
  
  <style scoped>
  .checkbox {
    display: block;
    margin-top: 10px;
    user-select: none; /* Prevent text selection */
  }
  
  .checkbox input {
    display: none;
    user-select: none; /* Prevent text selection */
  }
  
  .checkbox-icon {
    margin-top: 3px;
    cursor: pointer;
  }
  </style>