<template>
  <div>
    <button
      :disabled="isDisabled"
      @click="toggleAccordion"
      :aria-expanded="isOpen.toString()"
      :aria-controls="'accordion-' + uniqueID"
      class="accordion-header"
    >
      <div class="accordion_title">
        <slot name="title"></slot>
      </div>
      <span class="icon-wrapper" :class="{active: isOpen}">
        <slot name="icon"></slot>
      </span>
    </button>

    <div class="accordion-wrapper">
      <div
        ref="content"
        :class="{'accordion-content': true, visible: isOpen}"
        :id="'accordion-' + uniqueID"
        :aria-hidden="isOpen ? 'false' : 'true'"
        :aria-labelledby="'accordion-button-' + uniqueID"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {v4 as uuidv4} from 'uuid';
  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    section: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
    autoClose: {
      type: Boolean,
      default: true,
    },
    defaultOpen: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  });

  const uniqueID = ref(uuidv4());
  const emit = defineEmits(['update:modelValue']);
  const isOpen = ref(props.modelValue);
  watch(isOpen, (newValue) => {
    emit('update:modelValue', newValue);
  });

  const content = ref(null);

  const toggleAccordion = () => {
    if (!props.isDisabled) {
      if (isOpen.value) {
        isOpen.value = false;
        content.value.style.maxHeight = '0';
      } else {
        if (props.autoClose) {
          const openedAccordion = document.querySelector('.accordion-content.visible');

          if (openedAccordion) {
            openedAccordion.dispatchEvent(
              new CustomEvent(`${props.section}-accordion-opened`, {bubbles: true}),
            );
          }
        }
        isOpen.value = true;
        content.value.style.maxHeight = `${content.value.scrollHeight}px`;
      }
    }
  };

  onMounted(() => {
    const eventHandler = () => {
      isOpen.value = false;
      content.value.style.maxHeight = '0';
    };
    // Listen for the event emitted by the UiAccordion component
    window.addEventListener(`${props.section}-accordion-opened`, eventHandler);

    // Remove the event listener when the component is unmounted
    onUnmounted(() => {
      window.removeEventListener(`${props.section}-accordion-opened`, eventHandler);
    });

    if (props.defaultOpen) {
      isOpen.value = true;
      content.value.style.maxHeight = `${content.value.scrollHeight}px`;
    }
  });
</script>

<style scoped lang="scss">
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .accordion-wrapper {
    overflow: hidden;
  }
  .accordion-header {
    width: 100%;
  }

  .accordion-content {
    max-height: 0;
    opacity: 0;
    transform: translateY(-20px);
    transition: all 0.3s ease, max-height 0.4s ease;
  }

  .icon-wrapper {
    transition: all ease 0.4s;
  }
  .active {
    transform: rotate(90deg);
    transition: all ease 0.4s;
  }
  .accordion-content.visible {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.4s ease;
  }
</style>
