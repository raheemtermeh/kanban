import React from "react";
import TaskCard from "./TaskCard";

const KanbanColumn = ({
  status,
  tasks,
  onDelete,
  onDragStart,
  onDragEnd,
  onDrop,
  onTaskClick,
}) => {
  return (
    <div
      className="bg-gray-100 dark:bg-gray-800/50 rounded-xl p-4 flex flex-col"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, status.key)}
    >
      <h2
        className={`text-lg font-semibold mb-4 flex items-center justify-between p-2 rounded-md text-white ${status.value.color}`}
      >
        <span>{status.value.title}</span>
        <span className="text-sm font-normal bg-white/20 rounded-full px-2 py-0.5">
          {tasks.length}
        </span>
      </h2>
      <div className="flex-grow space-y-4 min-h-[150px] transition-all duration-300">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onClick={() => onTaskClick(task)}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
