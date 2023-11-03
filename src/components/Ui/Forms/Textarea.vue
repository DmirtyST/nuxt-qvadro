<template>
  <div class="input-component">
    <label v-if="label" :for="id" class="input-label">{{ label }}</label>
    <textarea
      :id="id"
      :value="modelValue"
      @input="handleInput"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      class="textar"
      :style="inputStyle"
    ></textarea>
  </div>
</template>

<script setup>
  // Props
  const props = defineProps({
    modelValue: String,
    label: String,
    id: String,
    placeholder: String,
    disabled: Boolean,
    readonly: Boolean,
    inputStyle: String,
  });

  // Emit
  const emit = defineEmits(['update:modelValue']);

  // Event
  const handleInput = (event) => {
    emit('update:modelValue', event.target.value);
  };
</script>

<style lang="scss" scoped>
  .textar {
    width: 100%;
    min-height: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    padding: 1rem;
  }
</style>
