import React from "react";

const Header = ({ onAddTask, setSearchTerm, isDarkMode, setIsDarkMode }) => {
  return (
    <header className="mb-10">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">
          ziBazi 🚀
        </h1>
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="جستجوی تسک..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button
            onClick={onAddTask}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
          >
            <span>+</span>
            <span className="hidden sm:inline">تسک جدید</span>
          </button>
          {/* دکمه تغییر تم */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 w-12 h-10 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
