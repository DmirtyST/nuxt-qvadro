<template>
  <div class="input-component">
    <label v-if="label" :for="id" class="input-label">{{ label }}</label>
    <input
      :id="id"
      :value="modelValue"
      @input="handleInput"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      class="input"
      :style="inputStyle"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup>
  const props = defineProps({
    modelValue: String,
    label: String,
    id: String,
    type: {
      type: String,
      default: 'text',
    },
    placeholder: String,
    disabled: Boolean,
    readonly: Boolean,
    inputStyle: String,
  });

  const emit = defineEmits(['update:modelValue']);

  const handleInput = (event) => {
    emit('update:modelValue', event.target.value);
  };
</script>

<script>
  export default {
    inheritAttrs: false,
  };
</script>
<style scoped lang="scss">
  .input {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    padding: 1rem;
    font-size: 1.4rem;
  }
  @include media('max', 'sm') {
    .input {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      padding: 1rem;
      font-size: 1.2rem;
    }
  }
</style>
