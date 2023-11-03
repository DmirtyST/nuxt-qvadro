import { useLanguageSettingsStore } from '../store/languageSettingsStore';
import { useLanguagesStore } from '../store/languagesStore';

export default defineI18nConfig(() => {
  const languageSettingsStore = useLanguageSettingsStore();
  const languagesStore = useLanguagesStore();

  return {
    legacy: false,
    locale: languageSettingsStore.currentLanguage,
    messages: languagesStore.messages,
  };
});


