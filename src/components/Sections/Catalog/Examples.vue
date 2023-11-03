<template>
  <section v-if="productData.exampleGallery !== null" class="catalog-examples">
    <UiContainer width="125">
      <div class="catalog-examples_title">
        {{ $t('example.title') }}
      </div>
      <div class="catalog-examples_row">
        <onDeactivated>
          <UiSwiper
            :slidesPerView="3"
            :spaceBetween="20"
            class="catalog-examples_slider"
            nextEl=".catalog-examples_button-next"
            prevEl=".catalog-examples_button-prev"
            :loop="true"
            :breakpoints="{
              240: {
                slidesPerView: 1.5,
                spaceBetween: 5,
              },
              640: {
                slidesPerView: 2.5,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }"
          >
            <swiper-slide v-for="(item, index) in productData.exampleGallery">
              <div class="catalog-examples_slide">
                <nuxt-img
                  quality="100"
                  loading="lazy"
                  format="webp"
                  @click="showImage(index)"
                  provider="cloudinary"
                  :src="item"
                  alt="image"
                />
              </div>
            </swiper-slide>
            <div class="catalog-examples_button-prev">
              <Icon icon="fluent:ios-arrow-24-regular" />
            </div>
            <div class="catalog-examples_button-next">
              <Icon icon="fluent:ios-arrow-24-regular" :horizontalFlip="true" />
            </div>
          </UiSwiper>
        </onDeactivated>
      </div>
    </UiContainer>
    <div v-if="showModal" class="modal-background" @click="closeImage">
      <ul @click.stop="handleSwipe" class="modal-swipe">
        <li data-direction="prev">
          <Icon icon="icons8:down-round" :rotate="1" />
        </li>
        <li data-direction="next">
          <Icon icon="icons8:down-round" :rotate="3" />
        </li>
      </ul>
      <div class="modal-content_close"><Icon icon="ri:close-fill" /></div>
      <div class="modal-content" @click.stop>
        <div
          class="modal-content_wrapper"
          ref="modalImage"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          <nuxt-img
            quality="100"
            loading="lazy"
            format="webp"
            @click="toggleZoom"
            @mousemove="handleMouseMove"
            @wheel="handleWheel"
            provider="cloudinary"
            :src="productData.exampleGallery[selectedIndex]"
            alt="image"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import {ref, onMounted} from 'vue';
  import {SwiperSlide} from 'swiper/vue';
  import {Icon} from '@iconify/vue';

  const props = defineProps({
    productData: {
      type: Object,
      required: true,
    },
  });
  let startX = 0;
  let startY = 0;
  function handleTouchStart(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
  }

  function handleTouchMove(event) {
    if (!isZoomed) {
      // если изображение не увеличено, предотвращаем стандартное действие, чтобы избежать прокрутки страницы во время свайпа
      event.preventDefault();
    }
  }

  function handleTouchEnd(event) {
    if (isZoomed) return; // если изображение увеличено, не делаем свайп

    const moveX = event.changedTouches[0].clientX - startX;
    const moveY = event.changedTouches[0].clientY - startY;

    // Проверка, что движение было по горизонтали
    if (Math.abs(moveX) > Math.abs(moveY)) {
      if (moveX > 50) {
        // Движение влево (предыдущее изображение)
        handleSwipe({target: {getAttribute: () => 'prev'}});
      } else if (moveX < -50) {
        // Движение вправо (следующее изображение)
        handleSwipe({target: {getAttribute: () => 'next'}});
      }
    }
  }
  const showModal = ref(false);
  const selectedIndex = ref(null);
  let zoomLevel = ref(2);

  const modalImage = ref(null); // Добавлено для доступа к элементу DOM

  function showImage(index) {
    selectedIndex.value = index;
    showModal.value = true;
    document.body.style.overflow = 'hidden';
  }

  function closeImage() {
    showModal.value = false;
    document.body.style.overflow = '';
  }

  function handleSwipe(event) {
    resetZoom(); // сбросить увеличение при переключении

    let targetElement = event.target;

    while (targetElement && !targetElement.getAttribute('data-direction')) {
      targetElement = targetElement.parentElement;
    }

    if (!targetElement) return; // Если не найден подходящий элемент, выйти из функции

    const direction = targetElement.getAttribute('data-direction');

    if (direction === 'next') {
      selectedIndex.value =
        (selectedIndex.value + 1) % props.productData.exampleGallery.length;
    } else if (direction === 'prev') {
      selectedIndex.value =
        selectedIndex.value > 0
          ? selectedIndex.value - 1
          : props.productData.exampleGallery.length - 1;
    }
  }

  let isZoomed = false;
  let mouseX = 0;
  let mouseY = 0;
  function resetZoom() {
    if (modalImage.value) {
      modalImage.value.classList.remove('zoomed');
      isZoomed = false;
      zoomLevel.value = 2;
      modalImage.value.style.transform = 'scale(1)';
    }
  }
  function toggleZoom(event) {
    const img = event.target;
    if (isZoomed) {
      img.classList.remove('zoomed');
      img.style.transformOrigin = '';
      isZoomed = false;
      zoomLevel.value = 2; // Возвращаемся к изначальному масштабу
      img.style.transform = 'scale(1)';
    } else {
      img.classList.add('zoomed');
      setTransformOrigin(event);
      isZoomed = true;
      zoomLevel.value = 2; // Устанавливаем начальное масштабирование
      img.style.transform = `scale(${zoomLevel.value})`;
    }
  }

  function setTransformOrigin(event) {
    const img = event.target;
    const rect = img.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
    const posX = (mouseX / rect.width) * 100;
    const posY = (mouseY / rect.height) * 100;
    img.style.transformOrigin = `${posX}% ${posY}%`;
  }

  function handleMouseMove(event) {
    if (isZoomed) {
      setTransformOrigin(event);
    }
  }
  function handleWheel(event) {
    if (!isZoomed) return;

    event.preventDefault();
    const img = event.target;

    if (event.deltaY < 0 && zoomLevel.value < 5) {
      // увеличиваем
      zoomLevel.value += 0.2;
    } else if (event.deltaY > 0 && zoomLevel.value > 2) {
      // уменьшаем, но не меньше 2
      zoomLevel.value -= 0.2;
    }

    img.style.transform = `scale(${zoomLevel.value})`;
  }
  onMounted(() => {
    nextTick(() => {});
    if (modalImage.value) {
      modalImage.value.addEventListener('click', toggleZoom);
      modalImage.value.addEventListener('mousemove', handleMouseMove);
    }
  });
</script>

<style lang="scss" scoped>
  .zoomed {
    transition: transform 0.3s ease;

    transform: scale(
      2
    ); // или любое другое значение, на которое вы хотите увеличить изображение
    cursor: move;
  }
  .catalog-examples {
    padding-bottom: 7rem;

    &_title {
      color: #051441;
      @include font(3.6rem, 3.6rem, '', 400);
      padding-left: 2.5rem;
      margin-bottom: 5rem;
    }
    &_slider {
      height: 30rem;
      position: relative;
    }
    &_slide {
      width: 30rem;
      height: 30rem;
      margin: 0 auto;
      cursor: zoom-in;
      border-radius: 1rem;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
      }
    }

    &_button-next,
    &_button-prev {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 2rem;
      color: $blueLight;
      font-weight: 600;
      cursor: pointer;
      z-index: 900;
    }
    &_button-next {
      right: 0rem;
    }
    &_button-prev {
      left: 0rem;
    }
  }
  .modal-content_close {
    display: none;
    color: white;
    font-size: 2.5rem;
    position: absolute;
    right: 1.2rem;
    top: 1.2rem;
    cursor: pointer;
  }
  .modal-background {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
  }

  .modal-content {
    width: 62rem;
    height: 65rem;
    z-index: 1;
    cursor: zoom-in;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    &_wrapper {
      width: 100%;
      height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
      transform-origin: center center;
    }
  }
  .modal-close {
    font-size: 4rem;
    color: $blueLight;
    position: absolute;
    right: 2rem;
    top: 2rem;
    cursor: pointer;
  }
  .modal-swipe {
    font-size: 5rem;
    position: absolute;
    width: 80rem;
    color: #3980ed;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    gap: 3rem;
    left: 50%;
    transform: translateX(-50%);
  }

  @include media('max', 'md') {
    .catalog-examples {
      padding-bottom: 3rem;

      &_button-next,
      &_button-prev {
        display: none;
      }

      &_title {
        color: #051441;
        @include font(3.6rem, 3.6rem, '', 400);
        padding-left: 0rem;
        margin-bottom: 4rem;
      }
    }
  }

  @include media('max', 'sm') {
    .catalog-examples {
      padding-bottom: 1rem;

      &_title {
        color: #051441;
        @include font(2.2rem, 2.6rem, '', 400);
        padding-left: 0rem;
        margin-bottom: 3rem;
      }

      &_slider {
        height: 23rem;
      }
      &_slide {
        width: 23rem;
        height: 23rem;
      }
    }
    .modal-content_close {
      display: block;
    }
    .modal-content {
      width: 35rem;
      height: 35rem;
      &_wrapper {
        width: 100%;
        height: 100%;
      }
      img {
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
        transform-origin: center center;

        z-index: 2;
      }
    }

    .modal-swipe {
      display: none;
    }
  }
</style>
