<template>
  <div class="erorr">
    <slot></slot>
    <transition-group name="error-transition">
      <div v-for="element of error" :key="element.$uid">
        <div class="error-message">
          {{ element.$message }}
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
  const props = defineProps({
    error: {
      type: Array,
      required: false,
    },
  });
</script>

<style lang="scss" scoped>
  .erorr {
    position: relative;
    height: auto;
  }
  .error-message {
    color: red;
    font-size: 1.2rem;
    position: absolute;
    top: 110%;
    left: 1rem;
    z-index: 55;
  }

  .error-transition-enter-active,
  .error-transition-leave-active {
    transition: opacity 0.3s ease-in-out;
  }
  .error-transition-enter-from,
  .error-transition-leave-to {
    opacity: 0;
  }
</style>
