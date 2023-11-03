<template>
  <div :class="activeBurger === !false ? 'header-mobile' : 'header-mobile active'">
    <div class="header-mobile_close" @click="activeBurgerMenu">
      <Icon icon="gg:close-r" />
    </div>
    <div class="header-mobile_row">
      <div class="header-mobile_menu">
        <ul class="header-mobile_lists">
          <li
            class="header-mobile_list"
            v-for="(item, index) in headerLinks"
            :key="index"
          >
            <!-- Если путь равен '/#products', используем div -->
            <div
              v-if="item.path === '/#products'"
              class="header-mobile_link"
              @click="toggleDropdown(item.path)"
            >
              {{ $t(`header.nav[${index}]`) }}
              <ul
                class="header-mobile_dropdown"
                :class="{active: showDropdown && item.path === '/#products'}"
              >
                <div class="dropdown-content">
                  <li
                    @click="activeBurgerMenu"
                    v-for="(item, index) in cotalog.cotalogData"
                    :key="index"
                  >
                    <NuxtLink :to="`/products/${item.path}`" exact>
                      <div class="header-mobile_link-dropdown">
                        <Icon icon="game-icons:vending-machine" />
                        <p>{{ $t(`header.dropdown[${index}]`) }}</p>
                      </div>
                    </NuxtLink>
                  </li>
                </div>
              </ul>
            </div>

            <!-- Для всех остальных путей используем NuxtLink -->
            <NuxtLink v-else :to="item.path" exact>
              <div @click="activeBurgerMenu" class="header-mobile_link">
                {{ $t(`header.nav[${index}]`) }}
              </div>
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="header-mobile_subst" @click="activeBurgerMenu"></div>
    </div>
  </div>
</template>

<script setup>
  import {useCatalogStore} from '../../store/catalog';
  import {Icon} from '@iconify/vue';

  const props = defineProps({
    activeBurger: {
      type: Boolean,
      default: false,
    },
    activeBurgerMenu: {
      type: Function,
      default: () => {},
    },
  });
  const cotalog = useCatalogStore();
  const showDropdown = ref(false);
  const toggleDropdown = (path) => {
    if (path === '/#products') {
      showDropdown.value = !showDropdown.value;
    } else {
      showDropdown.value = false;
    }
  };

  const headerLinks = [
    {path: '/#products'},
    {path: '/#benefits'},
    {path: '/#about'},
    {path: '/#faq'},
    {path: '/#footer'},
  ];
</script>

<style lang="scss" scoped>
  .header-mobile {
    height: 100vh;
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    transition: all ease 0.4s;
    visibility: visible;
    &_dropdown {
      overflow: hidden;
      height: 0;
      transition: all ease 0.4s;

      .dropdown-content {
        height: auto;
        transform: translateY(-100%);
        transition: all ease 0.4s;
        padding-top: 2.5rem;
        @include flex(column, '', '');
        gap: 1.5rem;
      }
      &.active {
        height: 18.5rem;
        .dropdown-content {
          transform: translateY(-0%);
        }
      }
    }
    &.active {
      visibility: hidden;
      transition: all ease 0.4s;
      background-color: transparent;
      .header-mobile_menu {
        transform: translateX(-30rem);
      }
      .header-mobile_subst {
        opacity: 0;
      }
      .header-mobile_close {
        opacity: 0;
      }
    }
    &_lists {
      @include flex(column, '', '');
      gap: 3rem;
    }
    &_link {
      overflow: hidden;
      position: relative;
      z-index: 22;
      @include font(2rem, 2rem, 0, 500);
      color: $white;
    }
    &_link-dropdown {
      @include flex(row, '', center);
      @include font(1.4rem, 1rem, 0, 400);
      color: rgb(255, 255, 255);
      opacity: 0.7;
      gap: 0.5rem;
    }
    &_close {
      position: absolute;
      right: 1.8rem;
      top: 2rem;
      font-size: 3rem;
      color: white;
      cursor: pointer;
    }
    &_row {
      width: 100%;
      height: 100vh;
      display: grid;
      grid-template-columns: 30rem 1fr;
      grid-template-rows: 100% 100%;
    }
    &_menu {
      width: 30rem;
      height: 100%;
      background-color: $blueLight;
      transition: all ease 0.4s;
      padding: 4rem 3rem;
      overflow-y: auto;
    }
  }

  @include media('max', 'sm') {
    .header-mobile {
      background-color: transparent;
      &_row {
        grid-template-columns: 1fr;
      }

      &_menu {
        width: 100%;
        height: 100%;
        background-color: $blueLight;
        padding: 3rem 3rem;

        @include flex(row, center, center);
        margin: 0 auto;
      }
      &_lists {
        @include flex(column, center, center);
        gap: 2.5rem;
        text-align: center;
      }
      &_link {
        @include font(1.5rem, 1.5rem, 0, 500);
      }
      &_close {
        position: absolute;
        right: 1.8rem;
        top: 2rem;
        font-size: 2rem;
        color: white;
        cursor: pointer;
        display: inline-block;
      }
      &_link-dropdown {
        @include flex(row, center, center);
        @include font(1.2rem, 1rem, 0, 400);
        color: rgb(255, 255, 255);
        text-align: center;
        opacity: 0.7;
        gap: 0.5rem;
      }
      &_subst {
        display: none;
      }

      &.active {
        visibility: hidden;
        transition: all ease 0.4s;
        background-color: transparent;
        .header-mobile_menu {
          transform: translateX(-100%);
        }

        .header-mobile_close {
          opacity: 0;
          display: none;
        }
      }
    }
  }
</style>
