import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/resources/locales/en.json";
import de from "@/resources/locales/de.json";

i18n.use(initReactI18next).init({
  resources: { en: { ...en }, de: { ...de } },
  lng: "de",
});
