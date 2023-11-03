<template>
  <div>
    <div class="tabs-menu">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="selectTab(index)"
        :class="{active: selectedTabIndex === index}"
      >
        {{ $t(`${tab.name}[${index}]`) }}
      </button>
    </div>
    <div class="tabs-content">
      <slot :name="tabs[selectedTabIndex].content"></slot>
    </div>
  </div>
</template>

<script setup>
  import {ref} from 'vue';

  const tabs = [
    {name: 'info.title', content: 'technical'},
    {name: 'info.title', content: 'details'},
    {name: 'info.title', content: 'options'},
  ];

  const selectedTabIndex = ref(0);

  const selectTab = (index) => {
    selectedTabIndex.value = index;
  };
</script>

<style lang="scss" scoped>
  .tabs-menu {
    display: flex;
    justify-content: flex-start;
  }

  button {
    @include size(28rem, 5.4rem);
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
    color: #051441;
    @include font(2rem, 2rem, '', 400);
    transition: all ease 0.4s;

    position: relative;
    overflow: hidden;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 0rem;
      height: 0.4rem;
      background-color: #3980ed;
      transition: all ease 0.4s;
    }
  }

  button.active {
    background-color: white;
    transition: all ease 0.4s;
    &::before {
      width: 30rem;
      transition: all ease 0.4s;
      background-color: #3980ed;
    }
  }

  .tabs-content {
    padding-top: 5rem;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-bottom: 3rem;
    background-color: white;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }
  @include media('max', 'md') {
    button {
      @include size(28rem, 5.4rem);
      @include font(1.8rem, 1.8rem, '', 400);
    }
  }
  @include media('max', 'sm') {
    .tabs-content {
      padding-top: 2.5rem;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      padding-bottom: 2.5rem;

      overflow-x: auto;
    }

    button {
      @include size(28rem, 3.3rem);
      @include font(1.3rem, 2rem, '', 400);

      &::before {
        height: 0.2rem;
      }
    }
  }
</style>
