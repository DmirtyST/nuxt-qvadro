<template>
  <section class="catalog-info">
    <UiContainer width="125">
      <div class="catalog-info_row">
        <UiTabsComponent>
          <template v-slot:technical>
            <ul class="catalog-info_lists technical-lists">
              <li
                class="catalog-info_list"
                v-for="(value, key) in productData.specs"
                :key="key"
              >
                <div class="catalog-info_list-label">
                  {{
                    $t(`catalogItem${productData.id}.${productData.specsLabels[key]}`)
                  }}:
                </div>
                <div class="catalog-info_list-info">
                  {{ $t(`catalogItem${productData.id}.${value}`) }}
                </div>
              </li>
            </ul>
          </template>
          <template v-slot:details>
            <ul class="catalog-info_lists details-lists">
              <li
                class="catalog-info_list"
                v-for="(value, key) in productData.details"
                :key="key"
              >
                <div class="catalog-info_list-label">
                  {{
                    $t(`catalogItem${productData.id}.${productData.detailsLabels[key]}`)
                  }}:
                </div>
                <div class="catalog-info_list-info">
                  {{ $t(`catalogItem${productData.id}.${value}`) }}
                </div>
              </li>
            </ul>
          </template>
          <template v-slot:options>
            <ul class="catalog-info_lists options-lists">
              <li
                class="catalog-info_list"
                v-for="(value, key) in productData.options"
                :key="key"
              >
                <div class="catalog-info_list-label">
                  {{
                    $t(`catalogItem${productData.id}.${productData.optionsLabels[key]}`)
                  }}:
                </div>
                <div class="catalog-info_list-info">
                  {{ $t(`catalogItem${productData.id}.${value}`) }}
                </div>
              </li>
            </ul>
          </template>
        </UiTabsComponent>
      </div>
    </UiContainer>
  </section>
</template>

<script setup>
  const props = defineProps({
    productData: {
      type: Object,
      required: true,
    },
  });
</script>

<style lang="scss" scoped>
  .catalog-info {
    margin-top: 5rem;
    padding: 5rem 0;
    background-color: #f1f4ff;
    margin-bottom: 5rem;

    &_lists {
      @include flex(column, '', '');
      gap: 3rem;
    }

    &_list {
      display: flex;
      gap: 3rem;
    }

    &_list-label {
      color: #051441;

      @include font(1.8rem, 1.8rem, '', 700);
    }

    &_list-info {
      color: #051441;
      @include font(1.6rem, 1.6rem, '', 400);
      font-style: normal;
      font-weight: normal;
      font-family: Roboto;

      &::first-letter {
        text-transform: uppercase;
      }
    }
  }

  .technical-lists {
    .catalog-info_list-label {
      width: 21rem;
    }
  }

  .details-lists {
    .catalog-info_list-label {
      width: 32rem;
    }
  }

  .options-lists {
    .catalog-info_list-label {
      width: 26rem;
    }
  }

  @include media('max', 'md') {
    .catalog-info {
      &_lists {
        @include flex(column, '', '');
        gap: 2rem;
      }

      &_list {
        display: flex;
        gap: 2rem;
      }

      &_list-label {
        color: #051441;
        @include font(1.6rem, 1.6rem, '', 700);
      }

      &_list-info {
        color: #051441;
        @include font(1.5rem, 1.5rem, '', 400);
        width: 100%;
      }
    }
  }

  @include media('max', 'sm') {
    .catalog-info {
      padding: 3rem 0;
      &_lists {
        @include flex(column, '', '');
        gap: 2rem;
      }

      &_list {
        display: flex;
        gap: 2rem;
        min-width: 70rem;
      }

      &_list-label {
        color: #051441;
        @include font(1.3rem, 1.3rem, '', 700);
      }

      &_list-info {
        color: #051441;
        @include font(1.2rem, 1.2rem, '', 400);
        width: 100%;
      }
    }
  }
</style>
