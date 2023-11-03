<template>
  <div class="container" :style="{'max-width': `${width}rem`}">
    <slot></slot>
  </div>
</template>

<script setup>
  const props = defineProps({
    width: {
      type: String,
      default: '100',
    },
  });
</script>

<style lang="scss" scoped>
  .container {
    margin: 0 auto;
    width: 100%;
    padding: 0 1.5rem;
  }
</style>
