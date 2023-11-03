<template>
  <section id="home" class="home-screen">
    <UiContainer width="125">
      <div class="home-screen_row">
        <div class="home-screen_eclips first"></div>
        <div class="home-screen_eclips two"></div>

        <div class="home-screen_item">
          <div class="home-screen_title">
            <UiHeading size="xl">
              <div>{{ $t('homeScreen.title[0]') }}</div>
              <span class="home-screen_title-color">{{ $t('homeScreen.title[1]') }}</span>
              <span> {{ $t('homeScreen.title[2]') }}</span></UiHeading
            >
          </div>
          <div class="home-screen_sub">
            <UiTypography size="lg"> {{ $t('homeScreen.sub[0]') }} </UiTypography>
            <UiTypography size="lg">
              {{ $t('homeScreen.sub[1]') }}
            </UiTypography>
          </div>
          <!-- Send email form start -->
          <UiSectionsFormStep />
          <div class="home-screen_send">
            <UiTypography size="sm">
              {{ $t('homeScreen.talk') }}
            </UiTypography>
          </div>

          <!-- Send email form end -->
        </div>
        <!-- Slider start -->
        <div class="home-screen_right">
          <nuxt-img
            quality="100"
            format="webp"
            class="home-screen_bg"
            provider="cloudinary"
            src="screenRight_ae7thi.png"
            alt="image"
          />
          <nuxt-img
            quality="100"
            format="webp"
            class="home-screen_image"
            provider="cloudinary"
            src="screenImg_ti3ipq.png"
            alt="image"
          />
        </div>
        <!-- Slider end -->
      </div>
    </UiContainer>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped>
  .item {
    width: 10rem;
    height: 10rem;
    background-color: red;
  }
  .home-screen {
    padding-top: 0rem;

    &_row {
      @include flex(row, space-between, center);
      height: 70rem;
      padding-top: 12rem;
      position: relative;
    }

    &_item {
      width: 55rem;
    }

    &_eclips {
      position: absolute;
      display: none;
      width: 15rem;
      height: 15rem;
      border-radius: 50%;
      background-color: $blueLight;
      &.first {
        left: -8rem;
        bottom: -8rem;
      }
      &.two {
        right: -8rem;
        top: -3rem;
      }
    }
    &_title {
      margin-bottom: 3rem;
      color: var(--text-color, #051441);
    }
    &_title-color {
      color: $blueLight;
      padding-right: 0.5rem;
    }
    &_sub {
      margin-bottom: 4rem;
      gap: 1rem;
      display: flex;
      flex-direction: column;
    }

    &_right {
      position: relative;
      width: 58rem;
      height: 45rem;
      top: 1rem;
      z-index: 1;
      display: flex;
      justify-content: center;
    }

    &_bg {
      position: absolute;
      top: 0rem;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
    }

    &_image {
      width: 30rem;
      height: 44rem;
      bottom: 2rem;
      left: 1rem;
      position: relative;
    }
  }

  @include media('max', 'md') {
    .home-screen {
      padding-top: 0rem;
      overflow: hidden;
      &_row {
        @include flex(column, '', center);
        height: 102rem;
        padding-top: 12rem;
      }

      &_item {
        width: 55rem;
        text-align: center;
        @include flex(column, center, center);
      }

      &_title {
        margin-bottom: 2rem;
        color: var(--text-color, #051441);
      }

      &_right {
        top: 0rem;
        z-index: 1;
        display: flex;
        justify-content: flex-end;
        width: 58rem;
        height: 45rem;
      }

      &_bg {
        top: 5rem;
        left: 20rem;
      }

      &_image {
        bottom: 5rem;
        left: 3rem;
      }
    }
  }

  @include media('max', 'sm') {
    .home-screen {
      &_eclips {
        position: absolute;
        display: block;
        width: 15rem;
        height: 15rem;
        border-radius: 50%;
        background-color: $blueLight;
        &.first {
          left: -8rem;
          bottom: -8rem;
        }
        &.two {
          right: -8rem;
          top: -3rem;
        }
      }
      padding-top: 0rem;
      &_row {
        @include flex(column, center, center);
        height: 55rem;
        padding-top: 12rem;
        padding-bottom: 4rem;
      }

      &_right {
        display: none;
      }
    }
  }
</style>
