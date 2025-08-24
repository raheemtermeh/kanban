import React from "react";
import { PRIORITIES } from "../data/constants";
import { differenceInDays, format } from "date-fns-jalali";

const TaskCard = ({ task, onDelete, onDragStart, onDragEnd, onClick }) => {
  const priority = PRIORITIES[task.priority];
  const subtasksCompleted =
    task.subtasks?.filter((st) => st.completed).length || 0;
  const totalSubtasks = task.subtasks?.length || 0;
  const progress =
    totalSubtasks > 0 ? (subtasksCompleted / totalSubtasks) * 100 : 0;

  const getDueDateInfo = () => {
    if (!task.dueDate) return null;
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    const daysLeft = differenceInDays(dueDate, today);

    let color = "text-gray-500 dark:text-gray-400";
    let text = `سررسید: ${format(dueDate, "yyyy/MM/dd")}`;

    if (daysLeft < 0) {
      color = "text-red-500 dark:text-red-400";
      text = `دیرکرد (${Math.abs(daysLeft)} روز)`;
    } else if (daysLeft <= 3) {
      color = "text-yellow-600 dark:text-yellow-500";
      text = `سررسید نزدیک (${daysLeft + 1} روز)`;
    }
    return { text, color };
  };

  const dueDateInfo = getDueDateInfo();

  return (
    <div
      draggable
      onClick={onClick}
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragEnd={onDragEnd}
      className="group bg-white dark:bg-gray-800 border dark:border-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md cursor-pointer active:cursor-grabbing transition-all duration-200"
    >
      <div className="flex justify-between items-start gap-2">
        <p className="font-medium text-gray-800 dark:text-gray-100">
          {task.text}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          className="text-gray-400 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100 flex-shrink-0"
        >
          🗑️
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs font-medium text-gray-600 dark:text-gray-400">
        <span
          className={`px-2 py-1 rounded-full text-white text-[10px] ${priority.color}`}
        >
          {priority.text}
        </span>
        {dueDateInfo && (
          <span className={`font-semibold ${dueDateInfo.color}`}>
            {dueDateInfo.text}
          </span>
        )}
      </div>

      {totalSubtasks > 0 && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1 text-xs text-gray-500 dark:text-gray-400">
            <span>زیرتسک‌ها</span>
            <span>
              {subtasksCompleted}/{totalSubtasks}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
            <div
              className="bg-blue-500 h-1.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
