import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import './i18n'; // import i18n

function App() {
  const { t, i18n } = useTranslation();
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // تابع برای بهم ریختن رشته
  const shuffleString = (str) => {
    const array = str.split('');
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // جابجایی عناصر
    }
    return array.join('');
  };

  // تابع تولید پسورد بهبود یافته
  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

    // بررسی اینکه حداقل یک گزینه انتخاب شده باشد
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      setIncludeLowercase(true); // حداقل یک گزینه باید انتخاب شود
      toast.warning(t('selectOneOption'), {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    let characters = '';
    let generatedPassword = '';
    
    // مجموعه کاراکترها برای انتخاب تصادفی
    if (includeUppercase) characters += uppercase;
    if (includeLowercase) characters += lowercase;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    // لیستی از انواع کاراکترهایی که باید حتماً استفاده شوند
    const requiredTypes = [];
    if (includeUppercase) requiredTypes.push(uppercase);
    if (includeLowercase) requiredTypes.push(lowercase);
    if (includeNumbers) requiredTypes.push(numbers);
    if (includeSymbols) requiredTypes.push(symbols);

    // بررسی اینکه طول پسورد کمتر از تعداد انواع کاراکترها نباشد
    if (length < requiredTypes.length) {
      setLength(requiredTypes.length);
      toast.info(t('lengthAdjusted', { newLength: requiredTypes.length }), {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    // اول حداقل یک کاراکتر از هر نوع انتخابی اضافه کنید
    for (const charType of requiredTypes) {
      const randomIndex = Math.floor(Math.random() * charType.length);
      generatedPassword += charType[randomIndex];
    }

    // سپس بقیه کاراکترها را به صورت تصادفی اضافه کنید
    for (let i = generatedPassword.length; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }

    // برای جلوگیری از پیش‌بینی پذیری، پسورد را بهم بریزید
    generatedPassword = shuffleString(generatedPassword);
    
    setPassword(generatedPassword);
  };

  // تابع کپی کردن پسورد
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      toast.success(t('copiedMessage'), {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };

  // تغییر زبان
  const changeLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fa' : 'en';
    i18n.changeLanguage(newLang);
  };
  
  // تغییر حالت دارک مود
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  // با لود شدن سایت، یک پسورد رندوم ایجاد شود و حالت دارک مود بررسی شود
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    generatePassword();
  }, []);

  // با تغییر گزینه‌ها، پسورد جدید تولید شود
  useEffect(() => {
    if (includeUppercase || includeLowercase || includeNumbers || includeSymbols) {
      generatePassword();
    }
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${darkMode ? 'bg-[#1E1E1E] text-white' : 'bg-[#F5F5F5] text-[#333333]'}`}>
      {/* دکمه تغییر زبان */}
      <button
        onClick={changeLanguage}
        className="fixed top-4 right-4 p-2 bg-[#E95420] text-white rounded-full shadow-lg hover:bg-[#D3461D] transition-all"
      >
        {i18n.language === 'fa' ? 'English' : 'فارسی'}
      </button>

      {/* دکمه حالت دارک مود */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 left-4 p-2 bg-[#E95420] text-white rounded-full shadow-lg hover:bg-[#D3461D] transition-all"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      <div className={`bg-${darkMode ? '[#333333]' : 'white'} p-8 rounded-2xl shadow-lg w-96 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h1 className="text-2xl font-bold mb-4 text-center">{t('title')}</h1>
        
        {/* نمایش پسورد زیر عنوان */}
        <div className="mb-4">
          <input
            type="text"
            value={password}
            readOnly
            onClick={copyToClipboard}
            className={`w-full p-3 border ${darkMode ? 'border-gray-700 bg-[#1E1E1E] text-white' : 'border-gray-300 bg-white text-[#333333]'} rounded-xl text-center cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#E95420] focus:border-transparent transition-all`}
          />
          <p className="text-sm text-gray-500 mt-1 text-center">{t('passwordPlaceholder')}</p>
        </div>

        {/* تنظیم طول پسورد */}
        <div className="mb-4">
          <label className="block mb-2">{t('lengthLabel', { length })}</label>
          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg accent-[#E95420]"
          />
        </div>

        {/* گزینه‌های انتخاب */}
        <div className="mb-4 space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="mr-2 w-5 h-5 accent-[#E95420]"
            />
            {t('includeUppercase')}
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="mr-2 w-5 h-5 accent-[#E95420]"
            />
            {t('includeLowercase')}
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="mr-2 w-5 h-5 accent-[#E95420]"
            />
            {t('includeNumbers')}
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="mr-2 w-5 h-5 accent-[#E95420]"
            />
            {t('includeSymbols')}
          </label>
        </div>

        {/* دکمه تولید پسورد */}
        <button
          onClick={generatePassword}
          className="w-full bg-[#E95420] text-white py-3 rounded-xl hover:bg-[#D3461D] focus:outline-none focus:ring-2 focus:ring-[#E95420] focus:ring-offset-2 transition-all"
        >
          {t('generateButton')}
        </button>
      </div>

      {/* Toast Container برای نمایش پیام‌ها */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName={`${darkMode ? 'bg-[#333333] text-white' : 'bg-white text-[#333333]'}`}
        progressClassName="bg-[#E95420]"
      />
    </div>
  );
}

export default App;