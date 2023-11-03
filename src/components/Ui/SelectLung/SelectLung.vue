<template>
  <div class="language-switch">
    <div
      @click="setLocale('ua')"
      :class="{active: locale === 'ua'}"
      class="language-switch-option"
    >
      ua
    </div>
    <div class="language-line"></div>
    <div
      @click="setLocale('ru')"
      :class="{active: locale === 'ru'}"
      class="language-switch-option"
    >
      ru
    </div>
  </div>
</template>

<script setup>
  import {useI18n} from 'vue-i18n';
  import {useLanguageSettingsStore} from '../../../store/languageSettingsStore.js';
  import {onMounted} from 'vue';

  const {locale} = useI18n();
  const languageSettingsStore = useLanguageSettingsStore();

  onMounted(() => {
    const savedLocale = localStorage.getItem('selectedLanguage') || 'ru';
    locale.value = savedLocale;
  });

  const setLocale = (value) => {
    languageSettingsStore.setLanguage(value, (newLocale) => {
      locale.value = newLocale;
    });
  };
</script>

<style lang="scss" scoped>
  .language-switch {
    display: flex;
    align-items: center;
    gap: 0.05rem;
    height: 1.5rem;
  }

  .language-switch-option {
    cursor: pointer;
    padding: 5px 10px;
    font-family: Roboto;
    text-transform: uppercase;

    @include font(1.4rem, 1.4rem, '', 500);
    opacity: 0.5;
  }

  .language-switch-option.active {
    color: #3980ed;
    opacity: 1;
  }
  .language-line {
    background: rgba(5, 20, 65, 0.5);
    width: 0.12rem;
    height: 100%;
  }

  @include media('max', 'sm') {
    .language-switch-option {
      cursor: pointer;
      padding: 0.5rem 0.9rem;
      font-family: Roboto;
      text-transform: uppercase;

      @include font(1.2rem, 1.2rem, '', 500);
      opacity: 0.5;
    }
  }
</style>
