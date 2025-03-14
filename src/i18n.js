import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// ترجمه‌ها
const resources = {
  en: {
    translation: {
      title: "Password Generator",
      passwordPlaceholder: "Click to copy",
      lengthLabel: "Password Length: {{length}}",
      includeUppercase: "Include Uppercase",
      includeLowercase: "Include Lowercase",
      includeNumbers: "Include Numbers",
      includeSymbols: "Include Symbols",
      generateButton: "Generate Password",
      copiedMessage: "Password copied to clipboard!",
    },
  },
  fa: {
    translation: {
      title: "تولید کننده پسورد",
      passwordPlaceholder: "کلیک کنید تا کپی شود",
      lengthLabel: "طول پسورد: {{length}}",
      includeUppercase: "شامل حروف بزرگ",
      includeLowercase: "شامل حروف کوچک",
      includeNumbers: "شامل اعداد",
      includeSymbols: "شامل نمادها",
      generateButton: "تولید پسورد",
      copiedMessage: "!پسورد در کلیپ‌بورد کپی شد ",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // زبان پیش‌فرض
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;