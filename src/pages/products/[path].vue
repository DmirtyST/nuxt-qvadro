<template>
  <div class="catalog" v-if="productData">
    <UiContainer width="125">
      <div class="catalog_path">
        <div class="catalog_path">
          <div class="catalog_path-link">
            <router-link to="/">{{ $t('catalog.path[0]') }}</router-link>
          </div>
          <div>{{ '>' }}</div>
          <div class="catalog_path-link">
            <router-link to="/#products">{{ $t('catalog.path[1]') }}</router-link>
          </div>
          <div>{{ '>' }}</div>
          <div class="catalog_path-link active">
            {{ $t(`catalogItem${productData.id}.${productData.names}`) }}
          </div>
        </div>
      </div>
      <div class="catalog_row">
        <div class="catalog_slider">
          <UiSwiper
            class="catalog_slider-main"
            :spaceBetween="10"
            :slidesPerView="1"
            :swipeFn="setMainSwiper"
            nextEl=".catalog_slider-main_button-next"
            prevEl=".catalog_slider-main_button-prev"
            :breakpoints="{
              240: {
                direction: 'horizontal',
                slidesPerView: 1,
                spaceBetween: 0,
                loop: false,
                allowTouchMove: false,
              },
              640: {
                direction: 'vertical',
                slidesPerView: 1,
                spaceBetween: 10,
                allowTouchMove: false,
              },
            }"
          >
            <swiper-slide v-for="(item, index) in productData.sliderMainBig">
              <div class="catalog_slider-main_slide">
                <!-- Проверка наличия "youtube.com" в URL -->
                <template v-if="isYouTubeLink(item)">
                  <!-- Встраиваемое видео с YouTube -->

                  <iframe
                    referrerpolicy="no-referrer"
                    :id="'ytplayer' + index"
                    :src="getEmbedURL(item)"
                    frameborder="0"
                    allowfullscreen
                  ></iframe>
                </template>
                <template v-else>
                  <!-- Изображение -->
                  <nuxt-img
                    quality="100"
                    loading="lazy"
                    format="webp"
                    class="home-screen_bg"
                    provider="cloudinary"
                    :src="item"
                    alt="image"
                  />
                </template>
              </div>
            </swiper-slide>
          </UiSwiper>

          <UiSwiper
            :thumbs="{swiper: thumbsSwiper}"
            :spaceBetween="10"
            :slidesPerView="6"
            class="catalog_slider-thumb"
            :direction="'vertical'"
            :breakpoints="{
              240: {
                direction: 'horizontal',
                slidesPerView: 3,
                spaceBetween: 12,
              },
              640: {
                direction: 'vertical',
                slidesPerView: 6,
                spaceBetween: 10,
              },
            }"
          >
            <swiper-slide
              v-for="(item, index) in productData.sliderMainSmall"
              @click="switchMainSlide(index)"
            >
              <div class="catalog_slider-thumb_slide">
                <nuxt-img
                  v-if="item.type === 'image'"
                  quality="100"
                  loading="lazy"
                  format="webp"
                  class="home-screen_bg"
                  provider="cloudinary"
                  :src="item.src"
                  alt="image"
                />
                <div v-if="item.type === 'video'">
                  <Icon class="catalog_slider-thumb_icon" icon="octicon:play-24" />
                </div>
              </div>
            </swiper-slide>
          </UiSwiper>
        </div>
        <div class="catalog_details">
          <div class="catalog_details-title">
            <div>{{ $t(`catalogItem${productData.id}.${productData.names}`) }}</div>
            <p class="catalog_details-sub" v-if="productData.namesSub !== null">
              {{ $t(`catalogItem${productData.id}.${productData.namesSub}`) }}
            </p>
          </div>

          <div class="catalog_details-price">
            <div class="catalog_details-price-label">{{ $t('catalog.price') }}</div>
            <div
              v-if="productData.notAvailable !== true"
              class="catalog_details-price-value"
            >
              us {{ productData.price }} $
            </div>
            <div class="catalog_details-price-value no-available" v-else>
              Нет в наличии
            </div>
          </div>
          <ul class="catalog_details-lists">
            <li
              class="catalog_details-list"
              v-for="item in productData.detailsList"
              :key="item.id"
            >
              {{ $t(`catalogItem${productData.id}.${item}`) }}
            </li>
          </ul>
        </div>
      </div>
    </UiContainer>
    <SectionsCatalogInfo :productData="productData" />
    <SectionsCatalogSpecification :productData="productData" />
    <SectionsCatalogExamples :productData="productData" />
  </div>
  <div v-else>
    <h1>Продукт не найден</h1>
  </div>
</template>

<script setup>
  import {ref, onMounted, onBeforeUnmount, watchEffect} from 'vue';
  import {useRoute} from 'vue-router';
  import {useCatalogStore} from '~/store/catalog';
  import {SwiperSlide} from 'swiper/vue';
  import {Icon} from '@iconify/vue';

  const route = useRoute();
  const catalogStore = useCatalogStore();
  let productData = ref(null);
  const mainSwiper = ref(null);
  const thumbsSwiper = ref(null);
  const players = ref([]);
  const videoReady = ref([]);
  const activeSlideIsVideo = ref(false);

  const setMainSwiper = (swiper) => {
    mainSwiper.value = swiper;
  };

  function pauseVideo(index) {
    const player = players.value[index];
    if (videoReady.value[index] && player?.getPlayerState() === YT.PlayerState.PLAYING) {
      player.pauseVideo();
      player.seekTo(0);
    }
  }

  const switchMainSlide = (index) => {
    mainSwiper.value?.slideTo(index);
    players.value.forEach((_, idx) => pauseVideo(idx));
  };

  function isYouTubeLink(url) {
    return url?.includes('youtube.com');
  }

  function getEmbedURL(url) {
    if (url?.includes('youtube.com/embed/')) {
      return url.includes('?') ? `${url}&enablejsapi=1` : `${url}?enablejsapi=1`;
    }
    return null;
  }

  function initPlayer() {
    productData.value?.sliderMainBig.forEach((url, index) => {
      if (isYouTubeLink(url)) {
        const player = new YT.Player(`ytplayer${index}`, {
          events: {
            onReady: () => {
              videoReady.value[index] = true;
            },
          },
        });
        players.value.push(player);
      } else {
        players.value.push(null);
      }
    });
  }

  watchEffect(() => {
    const productPath = route.params?.path;
    if (productPath) {
      productData.value = catalogStore.cotalogData.find(
        (item) => item.path === productPath,
      );
      if (mainSwiper.value) {
        const activeSlideURL =
          productData.value?.sliderMainBig[mainSwiper.value.activeIndex];
        activeSlideIsVideo.value = isYouTubeLink(activeSlideURL);
      }
    }
  });

  let observer;

  onMounted(() => {
    if (productData.value) {
      if (window.YT && window.YT.Player) {
        initPlayer();
      } else {
        window.onYouTubeIframeAPIReady = initPlayer;
      }

      const sliderElement = document.querySelector('.catalog_slider');
      if (sliderElement) {
        observer = new IntersectionObserver((entries) => {
          if (!entries[0].isIntersecting) {
            players.value.forEach((_, idx) => pauseVideo(idx));
            mainSwiper.value?.slideTo(0);
          }
        });
        observer.observe(sliderElement);
      }
    }
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
  });
</script>
<style lang="scss" scoped>
  .catalog {
    min-height: 100vh;
    padding-top: 10.6rem;
    padding-bottom: 5rem;
    gap: 1rem;

    &_slider-main_buttons {
      position: absolute;
      top: 5rem;
      left: 2rem;
      background-color: red;
      z-index: 9999;
      padding: 5rem;
    }

    &_row {
      @include flex(row, '', '');
      gap: 4.2rem;
      padding-top: 6rem;
    }
    &_title {
      color: #051441;
      @include font(3.6rem, 3.6rem, '', 400);
      margin-bottom: 5rem;
      padding-left: 3.5rem;
    }
    &_path {
      @include flex(row, '', center);
      color: #a6a6a6;
      @include font(1.4rem, 1.4rem, '', 400);
      margin-bottom: 1rem;
      gap: 1rem;
      a {
        color: #a6a6a6;
      }
    }
    &_catalog_path-link {
      opacity: 0.5;
    }
    &_slider {
      width: 55rem;
      height: auto;
      @include flex(row, '', '');
      flex-direction: row-reverse;
      gap: 2rem;
    }
    &_slider-main {
      width: 39rem;
      height: 57rem;
      border-radius: 10px;
      border: 1px solid rgba(169, 174, 193, 0.5);
    }

    &_slider-main_slide {
      width: 39rem;
      height: 57rem;
    }
    &_slider-thumb {
      height: 57rem;
      cursor: pointer;

      &_icon {
        font-size: 3rem;
        color: $blueLight;
      }
    }
    &_slider-thumb_slide {
      border-radius: 10px;
      border: 1px solid rgba(169, 174, 193, 0.5);
      @include size(8rem, 8rem);
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      z-index: 1;
      img {
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        padding: 0.2rem;
      }
    }
    &_details {
      width: 60rem;
    }
    &_slider-main_slide,
    &_slider-main {
      img,
      iframe {
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
      }

      img {
        padding: 7.9rem 5.9rem;
        object-fit: cover;
      }
    }

    &_details-title {
      @include font(4.8rem, 4.8rem, '', 500);
      margin-bottom: 5rem;
      padding-bottom: 3rem;
      width: 68rem;
      color: #051441;
      border-bottom: 1px solid rgba(#a6a6a6, 0.5);
    }
    &_details-sub {
      color: #a6a6a6;
      @include font(3.2rem, 3.5rem, '', 500);
    }
    &_details-price {
      @include flex(row, '', center);
      gap: 2.3rem;
      @include font(3.2rem, 3.2rem, '', 700);
      margin-bottom: 8rem;
      border-radius: 10px;
      display: inline-flex;
      border: 1px solid rgba(169, 174, 193, 0.5);
      padding: 1rem;
    }
    &_details-price-label {
      color: #a6a6a6;
    }

    &_details-price-value {
      font-weight: 400;
      text-transform: uppercase;
      &.no-available {
        color: $btn-danger-color;
        @include font(2.2rem, 2.2rem, '', 500);
        position: relative;
        top: 0.3rem;
      }
    }

    &_details-lists {
      @include flex(column, '', '');
      gap: 3rem;
    }

    &_details-list {
      @include font(1.6rem, 2.4rem, '', 400);
      padding-left: 5.7rem;
      color: #051441;
      position: relative;
      font-family: Roboto;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        @include size(0.7rem, 0.7rem);
        background-color: #051441;
        border-radius: 50%;
      }
    }
  }
  .active {
    opacity: 1;
    color: #051441;
  }

  @include media('max', 'md') {
    .catalog {
      &_slider {
        width: 100%;
        height: auto;
        @include flex(row, '', '');
        flex-direction: row-reverse;
        gap: 1rem;
        margin-bottom: 3rem;
      }
      &_slider-main {
        width: 85%;
        height: 57rem;
      }

      &_slider-main_slide {
        width: 39rem;
        height: 57rem;
        margin: 0 auto;

        iframe {
          position: absolute;
          object-fit: cover;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          max-width: 100%;
          max-height: 100%;
        }
      }
      &_slider-thumb {
        width: 20%;
        display: flex;
      }
      &_slider-thumb_slide {
        width: 100%;
      }
      &_row {
        @include flex(column, '', '');

        gap: 0rem;
        padding-top: 4rem;
      }
      &_details {
        width: 100%;
      }
      &_details-title {
        @include font(3.8rem, 3.8rem, '', 500);
        margin-bottom: 3rem;
        padding-bottom: 3rem;
        width: 100%;
      }
      &_details-price {
        @include flex(row, '', center);
        gap: 2.3rem;
        @include font(3rem, 3rem, '', 700);
        margin-bottom: 4rem;
        display: inline-flex;
      }
    }
  }

  @include media('max', 'sm') {
    .catalog {
      padding-top: 7rem;
      &_row {
        padding-top: 1rem;
      }
      &_slider {
        display: block;
        gap: 0rem;
        margin-bottom: 3rem;
      }
      &_slider-main {
        width: 100%;
        height: 25rem;
        margin-bottom: 1rem;
      }
      &_path {
        @include flex(row, '', center);
        color: #a6a6a6;
        @include font(1rem, 1rem, '', 400);
        margin-bottom: 1rem;
        gap: 1rem;
        a {
          color: #a6a6a6;
        }
      }
      &_slider-main_slide {
        width: 25rem;
        height: 25rem;
        margin: 0 auto;
        img {
          padding: 3.9rem 3.9rem;
          width: 100%;
          height: 100%;
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
      }
      &_slider-thumb {
        width: 100%;
        height: 8rem;
      }
      &_slider-thumb_slide {
        width: 100%;
      }

      &_details-lists {
        gap: 2rem;
      }
      &_details-title {
        @include font(2.4rem, 2.8rem, '', 500);
        margin-bottom: 2rem;
        padding-bottom: 2rem;
      }
      &_details-price {
        gap: 2rem;
        @include font(2rem, 2rem, '', 700);
        margin-bottom: 2rem;
        display: inline-flex;
      }
      &_details-list {
        @include font(1.4rem, 2rem, '', 400);
        padding-left: 0rem;

        &::before {
          display: none;
        }
      }
    }
  }
</style>
