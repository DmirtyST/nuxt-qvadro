import ru from '../i18n/ru.json';
import ua from '../i18n/ua.json';
import { defineStore } from 'pinia';

export const useLanguagesStore = defineStore('languages', () => {
  const messages = { ru, ua };

  return { messages };
});
