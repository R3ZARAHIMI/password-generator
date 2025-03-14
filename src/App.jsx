import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  // تابع تولید پسورد
  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

    let characters = '';
    if (includeUppercase) characters += uppercase;
    if (includeLowercase) characters += lowercase;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }

    setPassword(generatedPassword);
  };

  // تابع کپی کردن پسورد
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      toast.success('Password copied to clipboard!', {
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

  // با لود شدن سایت، یک پسورد رندوم ایجاد شود
  useEffect(() => {
    generatePassword();
  }, []); // آرایه وابستگی خالی برای اجرا فقط یک بار

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F5F5]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 border border-gray-200">
        <h1 className="text-2xl font-bold mb-4 text-center text-[#333333]">Password Generator</h1>
        
        {/* نمایش پسورد زیر عنوان */}
        <div className="mb-4">
          <input
            type="text"
            value={password}
            readOnly
            onClick={copyToClipboard}
            className="w-full p-3 border border-gray-300 rounded-xl text-center cursor-pointer bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#E95420] focus:border-transparent transition-all"
          />
          <p className="text-sm text-gray-500 mt-1 text-center">Click to copy</p>
        </div>

        {/* تنظیم طول پسورد */}
        <div className="mb-4">
          <label className="block mb-2 text-[#333333]">Password Length: {length}</label>
          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg accent-[#E95420]"
          />
        </div>

        {/* گزینه‌های انتخاب */}
        <div className="mb-4 space-y-2">
          <label className="flex items-center text-[#333333]">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="mr-2 w-5 h-5 accent-[#E95420]"
            />
            Include Uppercase
          </label>
          <label className="flex items-center text-[#333333]">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="mr-2 w-5 h-5 accent-[#E95420]"
            />
            Include Lowercase
          </label>
          <label className="flex items-center text-[#333333]">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="mr-2 w-5 h-5 accent-[#E95420]"
            />
            Include Numbers
          </label>
          <label className="flex items-center text-[#333333]">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="mr-2 w-5 h-5 accent-[#E95420]"
            />
            Include Symbols
          </label>
        </div>

        {/* دکمه تولید پسورد */}
        <button
          onClick={generatePassword}
          className="w-full bg-[#E95420] text-white py-3 rounded-xl hover:bg-[#D3461D] focus:outline-none focus:ring-2 focus:ring-[#E95420] focus:ring-offset-2 transition-all"
        >
          Generate Password
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
        toastClassName="bg-[#333333] text-white"
        progressClassName="bg-[#E95420]"
      />
    </div>
  );
}

export default App;