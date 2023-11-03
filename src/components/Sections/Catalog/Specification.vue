<template>
  <section
    :class="
      productData.exampleGallery === null
        ? 'catalog-specification reserve'
        : 'catalog-specification'
    "
  >
    <div class="catalog-specification_wrapper">
      <div class="catalog-specification_title">{{ $t('specification.title') }}</div>
      <div class="catalog-specification_row">
        <div class="catalog-specification_table">
          <div class="catalog-specification_table-header">
            <div class="catalog-specification_table-category">
              {{ $t('specification.category[0]') }}
            </div>
            <div class="catalog-specification_table-category">
              {{ $t('specification.category[1]') }}
            </div>
            <div class="catalog-specification_table-category">
              {{ $t('specification.category[2]') }}
            </div>
            <div class="catalog-specification_table-category">
              {{ $t('specification.category[3]') }}
            </div>
          </div>
          <div class="catalog-specification_table-body">
            <ul
              :class="
                item.header !== true
                  ? 'catalog-specification_table-row '
                  : 'catalog-specification_table-row blue'
              "
              v-for="(item, index) in productData.components"
              :key="item.name"
            >
              <li class="catalog-specification_table-cell">
                <span>
                  {{ $t(`catalogItem${productData.id}.${item.name}[${index}]`) }}</span
                >
              </li>
              <li class="catalog-specification_table-cell">
                {{ $t(`catalogItem${productData.id}.${item.params}[${index}]`) }}
              </li>
              <li style="line-height: 2rem" class="catalog-specification_table-cell">
                <span class="quantity">{{ item.quantity }}</span>
              </li>
              <li class="catalog-specification_table-cell">
                <Icon class="icon" v-if="item.hasIcon" icon="mdi:done" />
                <span v-else-if="item.quantity === null"></span>
                <span class="empty" v-else>-</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import {Icon} from '@iconify/vue';

  const props = defineProps({
    productData: {
      type: Object,
      required: true,
    },
  });
</script>

<style lang="scss" scoped>
  .catalog-specification {
    padding-bottom: 4rem;
    border-bottom: 1px solid rgba(#a6a6a6, 0.5);
    margin-bottom: 5rem;
    &_title {
      color: #051441;
      @include font(3.6rem, 3.6rem, '', 400);
      padding-left: 2.5rem;
      margin-bottom: 3rem;
    }
    &_table-header {
      padding: 2rem 2.5rem;
      background: #3980ed;
      display: grid;
      align-items: center;
      grid-template-columns: 37.2rem 43rem 30.2rem 24.4rem;
      border-radius: 5px;
      width: 100%;
    }
    &_wrapper {
      max-width: 125rem;
      width: 100%;
      padding: 0 1.5rem;
      margin: 0 auto;
    }
    &_table-row {
      padding: 1.1rem 2.5rem;
      display: grid;
      align-items: center;
      grid-template-columns: 37.2rem 40rem 15.9rem 21.8rem;
      box-shadow: 0px -1px 0px 0px rgba(219, 219, 219, 0.5) inset;
      border-bottom: 1px solid rgba(219, 219, 219, 0.5);

      &.blue {
        background: rgba(57, 128, 237, 0.1);
        box-shadow: 0px -1px 0px 0px rgba(219, 219, 219, 0.5) inset;
      }
    }

    &_table-cell {
      @include font(1.6rem, 2rem, '', 400);
      white-space: pre-line;

      span {
        @include font(1.8rem, 1.8rem, '', 400);
        max-width: 35rem;
        display: inline-block;
      }
      font-family: Roboto;
      color: #051441;
      .icon {
        color: #3980ed;
        font-size: 2rem;
      }
      .empty {
        color: var(--text-color, #051441);
        @include font(1.4rem, 1.4rem, '', 400);
        right: 1rem;
        position: relative;
      }

      &:nth-child(3) {
        display: flex;
        justify-content: center;
      }
      &:last-child {
        text-align: end;
        display: flex;
        justify-content: flex-end;
      }
    }

    &_table-category {
      color: #fff;
      @include font(2rem, 2rem, '', 400);
    }
  }
  .reserve {
    margin-bottom: 0rem;
    border-bottom: none;
    padding-bottom: 0rem;
  }

  @include media('max', 'md') {
    .catalog-specification {
      overflow-x: scroll;

      &_wrapper {
        width: 130rem;
        padding: 0 1.5rem;
        margin: unset;
        overflow: hidden;
      }
      &_table-header {
        padding: 2rem 2.5rem;
        background: #3980ed;
        display: grid;
        align-items: center;
        grid-template-columns: 37.2rem 43rem 30.2rem 24.4rem;
        border-radius: 5px;
      }

      &_table-row {
        padding: 1.1rem 2.5rem;
        display: grid;
        align-items: center;
        grid-template-columns: 37.2rem 40rem 15.9rem 21.8rem;
        box-shadow: 0px -1px 0px 0px rgba(219, 219, 219, 0.5) inset;
        border-bottom: 1px solid rgba(219, 219, 219, 0.5);

        &.blue {
          background: rgba(57, 128, 237, 0.1);
          box-shadow: 0px -1px 0px 0px rgba(219, 219, 219, 0.5) inset;
        }
      }
    }
  }

  @include media('max', 'sm') {
    .catalog-specification {
      margin-bottom: 2.5rem;
      &_title {
        color: #051441;
        @include font(2.2rem, 2.6rem, '', 400);
        padding-left: 2.5rem;
        margin-bottom: 3rem;
      }

      &_table-cell {
        @include font(1.2rem, 1.2rem, '', 400);

        span {
          @include font(1.2rem, 1.2rem, '', 400);
        }

        .icon {
          font-size: 1.4rem;
          position: relative;
          right: 0.4rem;
        }
        .empty {
          color: var(--text-color, #051441);
          @include font(1.2rem, 1.2rem, '', 400);
        }
      }
      .quantity {
        position: relative;
        right: 1.2rem;
      }
      &_table-category {
        @include font(1.5rem, 1.5rem, '', 400);
        &:last-child {
          position: relative;
          left: 1rem;
        }
      }
    }
  }
</style>
