import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import translationEnglish from "../public/locales/en/translation.json";
import translationRussian from "../public/locales/ru/translation.json";
import translationTajik from "../public/locales/tj/translation.json";

const resources = {
  en: {
    translation: translationEnglish,
  },
  ru: {
    translation: translationRussian,
  },
  tj: {
    translation: translationTajik,
  },
};
i18next.use(initReactI18next).init({ resources, lng: "en" });

export default i18next;
