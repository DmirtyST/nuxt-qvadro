<template>
  <section class="partners">
    <div class="partners_title">
      <UiHeading size="md">{{ $t('partners.title') }} </UiHeading>
    </div>
    <UiContainer width="125">
      <div class="partners_row">
        <div v-for="slide in partnersData" :key="slide.id">
          <div class="partners_item">
            <div class="partners_product">{{ $t(slide.sub) }}</div>
            <div class="partners_names">{{ $t(slide.names) }}</div>
            <div class="partners_location">{{ $t(slide.location) }}</div>
          </div>
        </div>
      </div>
    </UiContainer>
  </section>
</template>

<script setup>
  const partnersData = [
    {
      id: 1,
      sub: 'partners.data[0].sub',
      names: 'partners.data[0].names',
      location: 'partners.data[0].location',
    },
    {
      id: 2,
      sub: 'partners.data[1].sub',
      names: 'partners.data[1].names',
      location: 'partners.data[1].location',
    },
    {
      id: 3,
      sub: 'partners.data[2].sub',
      names: 'partners.data[2].names',
      location: 'partners.data[2].location',
    },
    {
      id: 4,
      sub: 'partners.data[3].sub',
      names: 'partners.data[3].names',
      location: 'partners.data[3].location',
    },
    {
      id: 5,
      sub: 'partners.data[4].sub',
      names: 'partners.data[4].names',
      location: 'partners.data[4].location',
    },
    {
      id: 6,
      sub: 'partners.data[5].sub',
      names: 'partners.data[5].names',
      location: 'partners.data[5].location',
    },
    {
      id: 7,
      sub: 'partners.data[6].sub',
      names: 'partners.data[6].names',
      location: 'partners.data[6].location',
    },
    {
      id: 8,
      sub: 'partners.data[7].sub',
      names: 'partners.data[7].names',
      location: 'partners.data[7].location',
    },
  ];
</script>

<style lang="scss" scoped>
  .partners {
    padding-top: 2rem;
    padding-bottom: 7rem;
    &_title {
      text-align: center;
      margin-bottom: 3rem;
    }

    &_row {
      display: flex;
      justify-content: space-between;
    }

    &_item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: start;
    }

    &_product,
    &_location {
      @include font(1.2rem, 1.8rem, 0.12rem, 300);
      color: $secondary-color;
    }

    &_names {
      @include font(1.8rem, 2.1rem, '', 400);
      color: $blues;
    }

    &_button-next,
    &_button-prev {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 2.6rem;
      color: $blueLight;
      font-weight: 600;
      cursor: pointer;
      z-index: 9999;
    }
    &_button-next {
      left: -3rem;
    }
    &_button-prev {
      right: -2.5rem;
    }
  }

  @include media('max', 'md') {
    .partners {
      padding-top: 2rem;
      padding-bottom: 7rem;
      &_title {
        text-align: center;
        margin-bottom: 3rem;
      }

      &_row {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 3rem;
      }
      &_item {
        text-align: center;
      }
    }
  }

  @include media('max', 'sm') {
    .partners {
      padding-top: 2rem;
      padding-bottom: 4rem;
      &_title {
        text-align: center;
        margin-bottom: 3rem;
      }
      &_product,
      &_location {
        @include font(1rem, 1.5rem, 0.12rem, 300);
        color: $secondary-color;
      }

      &_names {
        @include font(1.4rem, 1.8rem, '', 400);
        color: $blues;
      }
      &_row {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
      }
      &_item {
        text-align: center;
      }
    }
  }
</style>
