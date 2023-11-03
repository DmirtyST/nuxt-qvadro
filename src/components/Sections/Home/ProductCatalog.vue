<template>
  <section id="products" class="product-catalog">
    <UiContainer width="100.5">
      <div class="product-catalog_titles">
        <div class="product-catalog_title">
          <UiHeading size="lg">{{ $t('catalog.title') }} </UiHeading>
        </div>
        <div class="product-catalog_sub">
          <UiTypography size="md"
            ><span>{{ $t('catalog.sub') }} </span>
          </UiTypography>
        </div>
      </div>
      <div class="product-catalog_row">
        <div
          class="product-catalog_item"
          v-for="(item, index) in cotalog.cotalogData"
          :key="item.id"
        >
          <NuxtLink :to="`/products/${item.path}`">
            <div class="product-catalog_item-img">
              <nuxt-img
                quality="100"
                loading="lazy"
                format="webp"
                provider="cloudinary"
                :src="item.img"
                alt="image"
              />
            </div>
            <div class="product-catalog_item-center">
              <div class="product-catalog_item-title">
                {{ $t(`${item.title}[${index}]`) }}
              </div>
              <div class="product-catalog_item-price">${{ item.price }}</div>
            </div>
            <div class="product-catalog_item-bottom">
              <div class="product-catalog_item-description">
                {{ $t(`${item.decs}[${index}]`) }}
              </div>
              <div class="product-catalog_item-sub">
                {{ $t(`${item.subDesc}[${index}]`) }}
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </UiContainer>
  </section>
</template>

<script setup>
  import {useCatalogStore} from '../../../store/catalog';
  const cotalog = useCatalogStore();
</script>

<style lang="scss" scoped>
  .product-catalog {
    background-color: $gray;
    padding-top: 5rem;
    padding-bottom: 4rem;
    &_titles {
      text-align: center;
      width: 90rem;
      margin: 0 auto;
      margin-bottom: 5rem;
    }

    &_title {
      margin-bottom: 0.7rem;
    }
    &_sub {
      span {
        line-height: 2.4rem;
      }
    }

    &_row {
      @include flex(row, space-between, '');
      flex-wrap: wrap;
      gap: 5rem;
    }

    &_item {
      box-shadow: 0px 4px 8px 0px rgba(92, 107, 192, 0.2),
        0px 2px 4px 0px rgba(59, 69, 123, 0.2);
      padding: 1rem;
      width: 24.6rem;
      height: 37rem;
      background-color: $white;
      cursor: pointer;
      border-radius: 0.8rem;
      font-family: 'Inter';
      transition: all ease 0.4s;

      &:hover {
        box-shadow: 0px 6px 12px 0px rgba(48, 78, 251, 0.3),
          0px 3px 6px 0px rgba(59, 69, 123, 0.3);
        transform: translateY(-5px);
      }
    }

    &_item-img {
      width: 12rem;
      height: 14rem;
      margin: 0 auto;
      margin-bottom: 4.5rem;
      margin-top: 4rem;
      img {
        max-width: 100%;
        max-height: 100%;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    &_item-title {
      @include font(1.6rem, 1.9rem, 0.44px, 400);
      color: #19191d;
      margin-bottom: 0.5rem;
    }

    &_item-price {
      @include font(2.4rem, 2.8rem, 0.44px, 700);
      color: #19191d;
    }

    &_item-center {
      height: 9rem;
    }
    &_item-description,
    &_item-sub {
      @include font(1.4rem, 1.6rem, 0.252px, 500);
      color: #787885;
    }
    &_item-sub {
      margin-top: 0.3rem;
    }
  }
  @include media('max', 'md') {
    .product-catalog {
      &_row {
        @include flex(row, center, '');
        flex-wrap: wrap;
        gap: 2rem;
      }
      &_item-img {
        width: 16rem;
        height: 16rem;
        margin-bottom: 3.5rem;
        margin-top: 2rem;
      }
      &_item-center {
        height: 10rem;
      }
      &_titles {
        text-align: center;
        width: auto;
        margin: 0 auto;
        margin-bottom: 5rem;
      }
      &_item {
        width: calc(50% - 2rem);
      }
    }
  }

  @include media('max', 'sm') {
    .product-catalog {
      &_row {
        @include flex(row, space-between, '');
        flex-wrap: wrap;
        gap: 2rem;
      }
      &_item-center {
        height: auto;
        margin-bottom: 2rem;
      }
      &_item-img {
        width: 12rem;
        height: 12rem;
        margin-bottom: 3.5rem;
        margin-top: 2rem;
      }
      &_item {
        width: calc(100% - 0rem);
        height: auto;

        margin: 0 auto;
      }
      &_item-price {
        @include font(2rem, 2.3rem, 0.44px, 700);
        color: #19191d;
      }
    }
  }

  @include media('max', 'xs') {
    .product-catalog {
      &_item {
        width: calc(100% - 0rem);
        height: auto;
        min-height: 10rem;
        margin: 0 auto;
      }
    }
  }
</style>
