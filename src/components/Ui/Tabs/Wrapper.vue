<template>
  <div class="tab" ref="tabsRef">
    <div class="tab-nav">
      <span
        v-for="(tab, index) in names"
        :key="tab.name"
        :class="['tab-nav__item', {selected: tab.name === selectedTab}]"
        @click="selectedTab = tab.name"
        >{{ $t(tab.label) }}
      </span>
      <div class="active-bar" :style="{top: barTopPosition + 'rem'}"></div>
    </div>
    <div class="tab_line"></div>
    <div class="tab_wrapper-content">
      <div :class="['tab-content', {'fading-out': isFadingOut}]" :key="selectedTab">
        <slot :selectedTab="selectedTab" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import {ref, computed, onMounted, onBeforeUnmount} from 'vue';

  const {names, initialSelectedTab} = defineProps({
    names: {
      type: Array,
      required: true,
    },
    initialSelectedTab: {
      type: String,
      default: '',
    },
  });

  const tabsRef = ref(null);
  const selectedTab = ref(initialSelectedTab || (names[0] && names[0].name));
  const isFadingOut = ref(false);

  const selectedIndex = computed(() => {
    return names.findIndex((tab) => tab.name === selectedTab.value);
  });

  const barTopPosition = computed(() => {
    return selectedIndex.value * 12.5;
  });

  const checkVisibility = () => {
    const tabPosition = tabsRef.value.getBoundingClientRect();

    if (tabPosition.bottom < 0 || tabPosition.top > window.innerHeight) {
      selectedTab.value = names[0] && names[0].name;
    }
  };

  onMounted(() => {
    window.addEventListener('scroll', checkVisibility);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', checkVisibility);
  });
</script>

<style lang="scss" scoped>
  .tab {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50rem;

    &--previous-top .tab-nav__item::before {
      top: 0;
      transform-origin: top;
    }

    &--previous-bottom .tab-nav__item::before {
      bottom: 0;
      transform-origin: bottom;
      top: auto;
    }
    &-nav {
      display: flex;
      flex-direction: column;
      gap: 5rem;
      margin-bottom: 0px;
      position: relative;
      width: 24rem;
      .active-bar {
        content: '';
        position: absolute;
        left: calc(100% + 3.8rem);
        width: 0.4rem;
        height: 7.9rem; // Размер одного таба (можно корректировать)
        background-color: $blueLight;
        z-index: 22;
        transition: top 0.7s ease;
      }
      &__item {
        display: block;
        border-radius: 7px;
        padding: 2.5rem 0;
        cursor: pointer;
        font-size: 1rem;
        color: #a6a6a6;
        transition: all ease 0.4s;

        position: relative;
        @include font(2.4rem, 2.4rem, '', 500);
        &.selected {
          color: #051441;
          transition: all ease 0.4s;
        }
      }
    }
    &_line {
      height: 100%;
      width: 0.4rem;
      background-color: #a6a6a6;
      opacity: 0.5;
      position: relative;
      top: 0.3rem;
    }
    &_wrapper-content {
      width: 90rem;
      height: 100%;
      background-color: $blueLight;
      z-index: 22;
      padding: 9.6rem 2.4rem 7.1rem 2.4rem;
      border-radius: 3.2rem;
      overflow: hidden;
    }
    &-content {
      padding: 0px;
      border-radius: 7px;
      opacity: 0;
      animation: fadeIn 1.5s forwards;
      width: 100%;
      height: 100%;

      &.fading-out {
        animation: fadeOut 1.5s forwards;
      }
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(90%);
    }
    to {
      opacity: 1;
    }
  }

  @include media('max', 'md') {
    .tab {
      display: flex;
      flex-direction: column;
      height: auto;

      &-nav {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 2rem;
        margin-bottom: 2rem;
        position: relative;
        width: 100%;
        .active-bar {
          display: none;
          opacity: 0;
        }
        &__item {
          padding: 1rem 0;
          cursor: pointer;
          padding-right: 2rem;
          @include font(1.7rem, 1.7rem, '', 500);

          &::before {
            content: '';
            position: absolute;
            right: 0;
            top: 0;
            height: 100%;
            width: 0.1rem;
            background-color: #051441;
            opacity: 0.4;
          }
        }
      }

      &_wrapper-content {
        width: 100%;
        height: auto;
        display: flex;
        background-color: $blueLight;
        z-index: 22;
        padding: 4rem 2.4rem 4.1rem 2.4rem;
        border-radius: 3.2rem;
        overflow: hidden;
      }
      &-content {
        padding: 0px;
        border-radius: 7px;
        opacity: 0;
        animation: fadeIn 1.5s forwards;
        width: 100%;
        height: 100%;
        &.fading-out {
          animation: fadeOut 1.5s forwards;
        }
      }
    }
  }

  @include media('max', 'sm') {
    .tab {
      padding-top: 1rem;
      &-nav {
        gap: 1rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        &__item {
          padding: 1rem 0;
          cursor: pointer;
          width: calc(50% - 1rem);
          @include font(1.46rem, 1rem, '', 500);
          text-align: center;
          &::before {
            content: '';
            opacity: 0;
          }
        }
      }
      &_wrapper-content {
        width: 100%;
        height: auto;
        display: flex;
        background-color: $blueLight;
        z-index: 22;
        padding: 2rem 2.4rem 2.1rem 2.4rem;
        border-radius: 3.2rem;
        overflow: hidden;
      }
    }
  }
</style>
