<template>
  <component
    :is="tag"
    class="responsive-text"
    :style="[
      computedStyle,
      {'--size-md': `${sizeMd}rem`},
      {'--size-sm': `${sizeSm}rem`},
      {'--spacing-md': `${spacingMd}rem`},
      {'--spacing-sm': `${spacingSm}rem`},
      {'--wg-md': wgMd},
      {'--wg-sm': wgSm},
    ]"
  >
    <slot />
  </component>
</template>

<script setup>
  const props = defineProps({
    tag: {
      type: String,
      default: 'p',
    },
    line: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '1.5rem',
    },
    color: {
      type: String,
      default: '',
    },
    font: {
      type: String,
      default: '',
    },
    sizeMd: {
      type: String,
      default: '1.6',
    },
    sizeSm: {
      type: String,
      default: '1.6',
    },
    wg: {
      type: [String, Number],
      default: 400,
    },
    wgMd: {
      type: [String, Number],
      default: null,
    },
    wgSm: {
      type: [String, Number],
      default: null,
    },
    spacing: {
      type: String,
      default: '0.01',
    },
    spacingMd: {
      type: String,
      default: null,
    },
    spacingSm: {
      type: String,
      default: null,
    },
  });
  const computedStyle = {
    fontSize: `${props.size}rem`,
    lineHeight: props.line ? `${props.line}rem` : `${props.size}rem`,
    fontFamily: props.font,
    fontWeight: props.wg,
    letterSpacing: `${props.spacing}rem`,
    color: `var(--${props.color}-color)`,
  };
  const wgMd = computed(() => (props.wgMd === null ? props.wg : props.wgMd));
  const wgSm = computed(() => (props.wgSm === null ? props.wg : props.wgSm));
  const spacingMd = computed(() =>
    props.spacingMd === null ? props.spacing : props.spacingMd,
  );
  const spacingSm = computed(() =>
    props.spacingSm === null ? props.spacing : props.spacingSm,
  );
</script>

<style lang="scss" scoped>
  .responsive-text {
    @include media('max', 'lg') {
      @include font(
        var(--size-md) !important,
        var(--size-md) !important,
        var(--spacing-md) !important,
        var(--wg-md) !important
      );
    }
    @include media('max', 'sm') {
      @include font(
        var(--size-sm) !important,
        var(--size-sm) !important,
        var(--spacing-sm) !important,
        var(--wg-sm) !important
      );
    }
  }
</style>
