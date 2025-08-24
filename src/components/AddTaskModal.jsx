import React, { useState } from "react";
import { PRIORITIES } from "../data/constants";

const AddTaskModal = ({ onClose, onAddTask }) => {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const newTask = {
      id: `task-${Date.now()}`,
      text,
      priority,
      dueDate,
      status: "todo",
      subtasks: [],
    };
    onAddTask(newTask);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
          ایجاد تسک جدید
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="task-text"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              عنوان تسک
            </label>
            <input
              id="task-text"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="مثلا: طراحی صفحه اصلی..."
              autoFocus
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="task-dueDate"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              تاریخ سررسید (اختیاری)
            </label>
            <input
              id="task-dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              اولویت
            </label>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(PRIORITIES).map(([key, value]) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => setPriority(key)}
                  className={`px-2 py-2 rounded-lg text-sm font-semibold transition-all ${
                    priority === key
                      ? `ring-2 ring-offset-2 dark:ring-offset-gray-800 ring-blue-500 text-white ${value.color}`
                      : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  {value.text}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors font-semibold"
            >
              لغو
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-semibold shadow-md transition-colors"
            >
              ایجاد
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
