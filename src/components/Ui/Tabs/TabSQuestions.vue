<template>
  <div class="tabs-questions">
    <ul class="tabs-menu">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        @click="selectTab(index)"
        :class="{active: selectedTabIndex === index}"
      >
        <div class="tabs-menu-icon">
          <Icon icon="icon-park-outline:loading-one" />
        </div>
        <div class="tabs-menu-title">{{ $t(`questions.categories[${index}]`) }}</div>
      </li>
    </ul>
    <div class="tabs-content" ref="tabsContent">
      <slot :name="tabs[selectedTabIndex].content"></slot>
    </div>
  </div>
</template>

<script setup>
  import {ref, watch} from 'vue';
  import {Icon} from '@iconify/vue';
  const tabs = [
    {content: 'technical'},
    {content: 'details'},
    {content: 'time-work'},
    {content: 'energy'},
  ];
  const tabsContent = ref(null);
  const route = useRoute();
  const router = useRouter();

  const findTabIndex = (path) => tabs.findIndex((tab) => tab.content === path);

  const selectedTabIndex = ref(findTabIndex(route.params.tab || ''));

  watch(
    () => route.params.tab,
    (newTab) => {
      const index = findTabIndex(newTab);
      if (index !== -1) {
        selectedTabIndex.value = index;
      }
    },
  );

  const selectTab = (index) => {
    selectedTabIndex.value = index;
    router.push(`/questions/${tabs[index].content}`);

    if (tabsContent.value) {
      const rect = tabsContent.value.getBoundingClientRect();
      const offset = 70;
      window.scrollTo({
        top: rect.top + window.scrollY - offset,
        behavior: 'smooth',
      });
    }
  };
</script>

<style lang="scss" scoped>
  .tabs-questions {
    display: flex;
    gap: 2rem;
  }
  .tabs-menu {
    display: block;
    min-width: 45rem;
  }

  li {
    @include font(2rem, 2rem, '', 500);
    color: #051441;
    transition: all ease 0.4s;
    padding: 3rem 0;
    display: flex;
    align-items: center;
    gap: 2.4rem;
    cursor: pointer;
    border-bottom: 1px solid rgba(#a6a6a6, 0.5);
  }

  li.active {
    color: #3980ed;
  }

  .tabs-menu-title {
    width: 36rem;
  }

  @include media('max', 'md') {
    .tabs-questions {
      display: block;
      gap: 2rem;
    }
  }

  @include media('max', 'sm') {
    li {
      @include font(1.5rem, 1.5rem, '', 500);
      color: #051441;
      transition: all ease 0.4s;
      padding: 2rem 0;

      gap: 2rem;
      cursor: pointer;
      border-bottom: 1px solid rgba(#a6a6a6, 0.5);
    }
  }
</style>
