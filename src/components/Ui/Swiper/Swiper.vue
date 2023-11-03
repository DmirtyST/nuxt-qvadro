<template>
  <swiper
    :slidesPerView="slidesPerView"
    :spaceBetween="spaceBetween"
    :modules="modules"
    :loop="loop"
    class="mySwiper"
    :navigation="{nextEl: nextEl, prevEl: prevEl}"
    :thumbs="thumbs"
    @swiper="swipeFn"
    :direction="direction"
    @slideChange="handleSlideChange"
    :allowTouchMove="allowTouchMove"
    :breakpoints="breakpoints"
  >
    <slot></slot>
  </swiper>
</template>

<script setup>
  import {Swiper} from 'swiper/vue';
  import 'swiper/scss';
  import 'swiper/scss/pagination';
  import 'swiper/scss/navigation';
  import {Navigation, Thumbs, FreeMode} from 'swiper/modules';
  const emit = defineEmits();
  const handleSlideChange = () => {
    emit('slideChange');
  };
  const props = defineProps({
    slidesPerView: {
      type: Number,
      default: 2,
    },
    allowTouchMove: {
      type: Boolean,
      default: true,
    },
    spaceBetween: {
      type: Number,
      default: 30,
    },
    loop: {
      type: Boolean,
      default: true,
    },
    swipeFn: {
      type: Function,
    },
    nextEl: {
      type: String,
      default: '.swiper-button-next',
    },
    prevEl: {
      type: String,
      default: '.swiper-button-prev',
    },
    thumbs: {
      type: Object,
      default: undefined,
    },
    direction: {
      type: String,
    },
    breakpoints: {
      type: Object,
    },
  });

  const modules = [Navigation, Thumbs, FreeMode];
</script>
<style lang="scss"></style>
