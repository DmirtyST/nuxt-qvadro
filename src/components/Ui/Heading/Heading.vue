<template>
  <div>
    <component
      :is="responsiveTextComponent"
      :tag="tag"
      :size="size"
      :font="font"
      :wg="wg"
      :sizeMd="sizeMd"
      :sizeSm="sizeSm"
      :line="line"
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
      size: '5.6',
      sizeMd: '5',
      sizeSm: '2.5',
      wg: 600,
      line: '6.7',
    },
    lg: {
      tag: 'h2',
      size: '4',
      sizeMd: '2.2',
      sizeSm: '2',
      wg: 500,
    },
    md: {
      tag: 'h3',
      size: '2.4',
      sizeMd: '2.2',
      sizeSm: '2',
      wg: 500,
    },
    sm: {
      tag: 'h4',
      size: '1.6',
      sizeMd: '1.6',
      sizeSm: '1.3',
      wg: 400,
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
    line,
  } = computed(() => {
    return currentTextAttributes.value;
  }).value;
</script>

<style lang="scss" scoped></style>
