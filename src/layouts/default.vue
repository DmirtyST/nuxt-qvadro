<template>
  <div class="wrapper">
    <AppHeader />
    <main class="page" data-scroll>
      <slot />
    </main>
    <AppFooter />
    <div
      v-if="
        languageSettingsStore.loading && languageSettingsStore.currentLanguage !== locale
      "
      class="loader-wrapper"
    >
      <div class="loader"></div>
    </div>
  </div>
</template>

<script setup>
  import {useLanguageSettingsStore} from '../store/languageSettingsStore';
  const languageSettingsStore = useLanguageSettingsStore();
</script>

<style lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow-y: scroll;
  }
  .page {
    flex: 1 1 auto;
  }

  .loader-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8); /* Полупрозрачный фон */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  .loader {
    border: 4px solid $blueLight;
    border-radius: 50%;
    border-top: 4px solid #000000;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
