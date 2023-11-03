<template>
  <div>
    <component
      :is="responsiveTextComponent"
      :tag="tag"
      :font="font"
      :size="size"
      :wg="wg"
      :sizeMd="sizeMd"
      :sizeSm="sizeSm"
    >
      <slot></slot>
    </component>
  </div>
</template>

<script setup>
  import UiResponsiveText from '~~/src/components/Ui/ResponsiveText/ResponsiveText.vue';
  const props = defineProps({
    size: {
      type: String,
      default: 'sm',
    },
  });
  const responsiveTextComponent = computed(() => {
    return UiResponsiveText;
  });
  const textAttributes = {
    xl: {
      tag: 'h1',
      size: '4',
      sizeMd: '3',
      sizeSm: '2',
      wg: 600,
      font: 'Roboto',
    },
    lg: {
      tag: 'p',
      size: '1.8',
      sizeMd: '1.6',
      sizeSm: '1.5',
      wg: 500,
    },
    md: {
      tag: 'p',
      size: '1.8',
      sizeMd: '1.6',
      sizeSm: '1.45',
      wg: 400,
    },
    sm: {
      tag: 'p',
      size: '1.4',
      sizeMd: '1.4',
      sizeSm: '1.3',
      wg: 300,
    },
    // Добавьте другие вариации здесь
  };
  const currentTextAttributes = computed(() => textAttributes[props.size]);
  const {
    tag,
    size,
    sizeMd,
    sizeSm,
    wg,
    wgMd,
    wgSm,
    spacing,
    spacingMd,
    spacingSm,
    font,
  } = computed(() => {
    return currentTextAttributes.value;
  }).value;
</script>

<style lang="scss" scoped></style>
