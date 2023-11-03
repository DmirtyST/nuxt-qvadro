<template>
  <button :class="classes" :type="type" @click="onClick">
    <slot></slot>
  </button>
</template>
<script setup>
  const props = defineProps({
    variant: {
      type: String,
      default: 'primary',
    },
    size: {
      type: String,
      default: 'medium',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function,
      default: () => {},
    },
    type: {
      type: String,
      default: 'button',
    },
  });

  const classes = computed(() => [
    'btn',
    `btn--${props.variant}`,
    `btn--${props.size}`,
    {'btn--disabled': props.disabled},
    props.class,
  ]);
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/buttons.scss';
</style>
