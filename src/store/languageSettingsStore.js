// languageSettingsStore.js
import { defineStore } from 'pinia';

export const useLanguageSettingsStore = defineStore('languageSettings', () => {
  let currentLanguage = ref('ru'); // Значение по умолчанию
  let loading = ref(false);

  function setLanguage(language, callback) {
    document.body.style.overflowY = 'hidden';
    loading.value = true;
    localStorage.setItem('selectedLanguage', language);
    setTimeout(() => {
      currentLanguage.value = language;
      loading.value = false;
      callback(language); 

      document.body.style.overflowY = 'scroll';
    }, 800);
  }

  return {
    currentLanguage,
    loading,
    setLanguage,
  };
});



