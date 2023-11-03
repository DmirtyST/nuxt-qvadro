<template>
  <section class="banner">
    <UiContainer width="125">
      <div class="banner_row">
        <div class="banner_img">
          <nuxt-img
            quality="100"
            loading="lazy"
            format="webp"
            provider="cloudinary"
            src="bannerImg.png"
            alt="image"
          />
        </div>
        <div class="banner_item">
          <div class="banner_item-title">{{ $t('banner.title') }}</div>
          <div class="banner_item-text">{{ $t('banner.text') }}</div>
          <UiSectionsFormBanner />
        </div>
      </div>
    </UiContainer>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped>
  .banner {
    padding: 5rem 0;
    background-color: #3980ed;
    &_row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &_img {
      width: 60rem;
      height: 43rem;

      img {
        width: auto; // это позволит изображению сохранять свои оригинальные размеры
        height: auto;
        max-width: 100%; // это ограничит максимальную ширину изображения шириной контейнера
        max-height: 100%; // аналогично для высоты
        object-fit: contain;
      }
    }

    &_item {
      width: 50rem;

      color: $white;
      @include flex(column, '', '');
      gap: 5rem;
    }

    &_item-title {
      @include font(4.4rem, 4.4rem, '', 700);
    }

    &_item-text {
      @include font(1.8rem, 2.7rem, '', 400);
      width: 43rem;
    }
  }

  @include media('max', 'md') {
    .banner {
      position: relative;
      overflow: hidden;
      &_img {
        width: 35rem;
        height: 25rem;
        position: absolute;
        right: -9rem;
        top: -5rem;
        img {
          position: absolute;
          width: auto; // это позволит изображению сохранять свои оригинальные размеры
          height: auto;
          max-width: 100%; // это ограничит максимальную ширину изображения шириной контейнера
          max-height: 100%; // аналогично для высоты
          object-fit: contain;
        }
      }
    }
  }

  @include media('max', 'sm') {
    .banner {
      position: relative;
      overflow: hidden;
      padding: 3rem 0;
      z-index: 1;
      &_item {
        width: 100%;
        gap: 1rem;
      }

      &_item-title {
        @include font(2.3rem, 2.5rem, '', 700);
        width: 30rem;
      }

      &_item-text {
        @include font(1.4rem, 2.2rem, '', 400);
        width: 100%;
        margin-bottom: 1rem;
      }
      &_img {
        width: 22rem;
        height: 22rem;
        position: absolute;
        top: -6.5rem;
        right: -7rem;
        z-index: -1;
      }
    }
  }
</style>
