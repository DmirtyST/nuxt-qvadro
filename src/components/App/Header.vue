<template>
  <div class="header" :class="{'hidden-header': isHidden, 'is-top': isTop}">
    <UiContainer width="124">
      <div class="header_row">
        <NuxtLink to="/#home">
          <div class="header_logo">
            <nuxt-img
              quality="100"
              loading="lazy"
              format="webp"
              provider="cloudinary"
              src="qvadro-logo.png"
              alt="logo"
            />
          </div>
        </NuxtLink>
        <div class="header_right">
          <nav class="header_nav">
            <ul class="header_lists">
              <li
                @mouseover="hoverHandler(item.path, true)"
                @mouseleave="hoverHandler(item.path, false)"
                class="header_list"
                v-for="(item, index) in headerLinks"
                :key="index"
              >
                <NuxtLink :to="item.path" exact>
                  <div
                    class="header_link"
                    v-bind:class="{
                      active: showDropdown && item.path === '/#products',
                    }"
                  >
                    {{ $t(`header.nav[${index}]`) }}
                  </div>
                </NuxtLink>
              </li>
            </ul>
            <div
              v-bind:style="{
                opacity: showDropdown ? '1' : '0',
                visibility: showDropdown ? 'visible' : 'hidden',
              }"
              @mouseover="dropdownHoverHandler(true)"
              @mouseleave="dropdownHoverHandler(false)"
              :class="{visible: showDropdown}"
              class="header_dropdown"
            >
              <ul class="header_dropdow-lists">
                <li
                  @click="dropdownHoverHandler(false)"
                  v-for="(item, index) in cotalog.cotalogData"
                  :key="index"
                  class="header_dropdow-list"
                >
                  <NuxtLink :to="`/products/${item.path}`" exact>
                    <div class="header_dropdow-link">
                      <Icon icon="game-icons:vending-machine" />
                      <p>{{ $t(`header.dropdown[${index}]`) }}</p>
                    </div>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </nav>
          <UiSelectLung />
          <div @click="activeBurgerMenu" class="header_burger">
            <Icon icon="iconamoon:menu-burger-horizontal-light" />
          </div>
        </div>
      </div>
    </UiContainer>

    <AppHeaderAsideMobile
      :activeBurger="activeBurger"
      :activeBurgerMenu="activeBurgerMenu"
    />
  </div>
</template>

<script setup>
  import {useCatalogStore} from '../../store/catalog';
  import {Icon} from '@iconify/vue';
  const cotalog = useCatalogStore();
  const showDropdown = ref(false);
  let timeoutId = null;
  const activeBurger = ref(false);
  const activeBurgerMenu = () => {
    activeBurger.value = !activeBurger.value;

    if (activeBurger.value) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  };
  const hoverHandler = (path, isHover) => {
    if (path === '/#products' && isHover) {
      showDropdown.value = true;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    } else if (path === '/#products' && !isHover) {
      timeoutId = setTimeout(() => {
        showDropdown.value = false;
      }, 300);
    }
  };

  // Добавляем обработчик, чтобы отменять задержку при наведении на dropdown
  const dropdownHoverHandler = (isHover) => {
    if (isHover && timeoutId) {
      clearTimeout(timeoutId);
    } else if (!isHover) {
      showDropdown.value = false;
    }
  };

  onUnmounted(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  });
  const headerLinks = [
    {path: '/#products'},
    {path: '/#benefits'},
    {path: '/#about'},
    {path: '/#faq'},
    {path: '/#footer'},
  ];

  let lastScrollPosition = 0;
  const isHidden = ref(false);
  const isTop = ref(true);
  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  function handleScroll() {
    const currentScrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (currentScrollPosition > lastScrollPosition) {
      // Скроллим вниз
      isHidden.value = true;
      showDropdown.value = false;
    } else {
      // Скроллим вверх
      isHidden.value = false;
    }

    // Проверка, находится ли хедер в верхней позиции
    isTop.value = currentScrollPosition === 0;

    lastScrollPosition = currentScrollPosition;
  }
</script>

<style lang="scss" scoped>
  .header_link.active {
    transition: all ease 0.4s;
    box-shadow: 0px -1px 6px 0px rgba(92, 107, 192, 0.2);
    color: #3980ed;
  }
  .header {
    position: fixed;
    width: 100%;
    height: 7.7rem;
    padding: 1rem 0rem;
    background-color: $white;
    z-index: 9999;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    @include flex(column, center, '');

    &_row {
      @include flex(row, space-between, center);
    }
    &_burger {
      z-index: 9999;
      position: relative;
      display: none;
      font-size: 3rem;
      height: 3.3rem;
      cursor: pointer;
    }

    &_nav {
      position: relative;
      width: auto;
      padding-left: 1rem;
    }
    &_lists {
      @include flex(row, center, center);
      gap: 4rem;
    }

    &_link {
      @include font(1.4rem, 1.4rem, -0.56px, 500);
      color: $blues;
      padding: 1rem;
      transition: all ease 0.4s;
      &:hover {
        color: $blueLight;
        transition: all ease 0.4s;
      }
    }
    &_dropdown {
      position: absolute;
      top: 100%;
      left: 1rem;
      min-height: 20rem;
      width: auto;
      z-index: 999;
      background-color: white;
      opacity: 1;
      transition: 0.4s ease;
      padding: 1rem;
      border-radius: 0px 0px 1rem 1rem;
      box-shadow: 0px 4px 8px 0px rgba(92, 107, 192, 0.2);
    }
    &_dropdow-lists {
      @include flex(column, center, '');
    }

    &_dropdow-link {
      @include font(1.4rem, 1.4rem, 0px, 400);
      @include flex(row, '', center);
      padding: 1.4rem 0;
      gap: 0.7rem;
      color: #051441;
      transition: all ease 0.4s;
      &:hover {
        background: rgba(188, 221, 254, 0.5);
        color: #3980ed;
        transition: all ease 0.4s;
      }
    }
    &_right {
      @include flex(row, center, center);
      gap: 1rem;
    }
    &_logo {
      position: relative;
      width: 12.4rem;
      height: 4.7rem;

      img {
        position: absolute;
        @include size(100%, 100%);
        object-fit: contain;
        left: 0;
        top: 0;
      }
    }
  }
  .hidden-header {
    transform: translateY(-100%);
    background-color: $white;
  }
  .header:not(.is-top):not(.hidden-header) {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  @include media('max', 'md') {
    .header {
      &_nav {
        display: none;
      }
      &_burger {
        z-index: 9999;
        position: relative;
        display: inline-block;
      }
    }
    .hidden-header {
      transform: translateY(-0%);
      background-color: $white;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
  }

  @include media('max', 'sm') {
    .header {
      height: 5rem;
      &_logo {
        position: relative;
        width: 8.4rem;
        height: 3.7rem;
      }

      &_burger {
        z-index: 9999;
        position: relative;

        font-size: 2rem;
        height: 2rem;
        cursor: pointer;
      }
    }
  }
</style>
