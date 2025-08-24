import React, { useState } from "react";
import { PRIORITIES, STATUSES } from "../data/constants";

const TaskDetailModal = ({ task, onClose, onUpdateTask, onDeleteTask }) => {
  const [newSubtaskText, setNewSubtaskText] = useState("");

  const handleSubtaskChange = (subtaskId, completed) => {
    const newSubtasks = task.subtasks.map((st) =>
      st.id === subtaskId ? { ...st, completed } : st
    );
    onUpdateTask(task.id, { subtasks: newSubtasks });
  };

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (!newSubtaskText.trim()) return;
    const newSubtask = {
      id: `sub-${Date.now()}`,
      text: newSubtaskText,
      completed: false,
    };
    onUpdateTask(task.id, { subtasks: [...(task.subtasks || []), newSubtask] });
    setNewSubtaskText("");
  };

  const handleDeleteSubtask = (subtaskId) => {
    const newSubtasks = task.subtasks.filter((st) => st.id !== subtaskId);
    onUpdateTask(task.id, { subtasks: newSubtasks });
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 pb-4 border-b dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {task.text}
          </h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-800 dark:hover:text-white"
          >
            &times;
          </button>
        </div>
        <div className="flex-grow overflow-y-auto pr-2">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                وضعیت
              </label>
              <select
                value={task.status}
                onChange={(e) =>
                  onUpdateTask(task.id, { status: e.target.value })
                }
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              >
                {Object.entries(STATUSES).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                اولویت
              </label>
              <select
                value={task.priority}
                onChange={(e) =>
                  onUpdateTask(task.id, { priority: e.target.value })
                }
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              >
                {Object.entries(PRIORITIES).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.text}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">
              چک‌لیست زیرتسک‌ها
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {task.subtasks?.map((st) => (
                <div
                  key={st.id}
                  className="flex items-center justify-between p-2 rounded-md bg-gray-100 dark:bg-gray-700/50"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={st.completed}
                      onChange={(e) =>
                        handleSubtaskChange(st.id, e.target.checked)
                      }
                      className="w-5 h-5 rounded text-blue-500 focus:ring-blue-500 bg-gray-200 dark:bg-gray-600 border-gray-300 dark:border-gray-500"
                    />
                    <span
                      className={`${
                        st.completed
                          ? "line-through text-gray-500 dark:text-gray-400"
                          : "dark:text-gray-200"
                      }`}
                    >
                      {st.text}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteSubtask(st.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
            <form onSubmit={handleAddSubtask} className="flex gap-2 mt-4">
              <input
                type="text"
                value={newSubtaskText}
                onChange={(e) => setNewSubtaskText(e.target.value)}
                placeholder="زیرتسک جدید..."
                className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              />
              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                +
              </button>
            </form>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t dark:border-gray-700 flex justify-end">
          <button
            onClick={() => onDeleteTask(task.id)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold shadow-md hover:bg-red-700 transition-all"
          >
            <span>حذف تسک اصلی</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;
