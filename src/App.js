<<<<<<< HEAD
// src/App.jsx
import React, { useState, useMemo } from 'react';
import './App.css';
=======
import React, { useState, useMemo, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { STATUSES, initialTasks } from "./data/constants";
import Header from "./components/Header";
import KanbanColumn from "./components/KanbanColumn";
import AddTaskModal from "./components/AddTaskModal";
import TaskDetailModal from "./components/TaskDetailModal";
>>>>>>> 18c1326 (new update)

const STATUSES = {
  todo: 'شروع نشده',
  inprogress: 'در حال انجام',
  done: 'انجام شده',
};

function App() {
<<<<<<< HEAD
  const [tasks, setTasks] = useState([
    { id: 'task-1', text: 'طراحی رابط کاربری', status: 'done', dependsOn: null },
    { id: 'task-2', text: 'توسعه کامپوننت‌ها', status: 'inprogress', dependsOn: 'task-1' },
    { id: 'task-3', text: 'اتصال به API', status: 'todo', dependsOn: 'task-2' },
    { id: 'task-4', text: 'نوشتن تست‌ها', status: 'todo', dependsOn: 'task-3' },
    { id: 'task-5', text: 'دیپلوی کردن پروژه', status: 'todo', dependsOn: 'task-4' },
  ]);

  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const newTask = { id: `task-${Date.now()}`, text: newTaskText, status: 'todo', dependsOn: null };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleSetDependency = (taskId, dependencyId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, dependsOn: dependencyId || null } : task
    ));
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
    e.currentTarget.classList.add('dragging');
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    const draggedTaskId = e.dataTransfer.getData('taskId');
    
    const dropTargetElement = e.target.closest('.todo-item');
    const targetTaskId = dropTargetElement ? dropTargetElement.dataset.taskId : null;

    document.querySelectorAll('.dragging').forEach(el => el.classList.remove('dragging'));
    
    const taskToMove = tasks.find(t => t.id === draggedTaskId);
    if (!taskToMove || taskToMove.status === targetStatus) return;

    let newTasks = tasks.filter(t => t.id !== draggedTaskId);
    taskToMove.status = targetStatus;

    let insertIndex = newTasks.findIndex(t => t.id === targetTaskId);

    if (insertIndex !== -1) {
      newTasks.splice(insertIndex, 0, taskToMove);
    } else {
      const lastTaskInColumnIndex = newTasks.map(t => t.status).lastIndexOf(targetStatus);
      if(lastTaskInColumnIndex !== -1) {
        newTasks.splice(lastTaskInColumnIndex + 1, 0, taskToMove);
      } else {
        newTasks.push(taskToMove);
      }
    }
    
    setTasks(newTasks);
  };
  
  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove('dragging');
  };

  return (
    <div className="app-container">
      <h1>Todo List</h1>

      <form onSubmit={handleAddTask} className="add-task-form">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="یک تسک جدید اضافه کنید..."
        />
        <button type="submit">افزودن تسک</button>
      </form>

      <div className="kanban-board">
        {Object.entries(STATUSES).map(([statusKey, statusValue]) => (
          <div
            key={statusKey}
            className="kanban-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, statusKey)}
          >
            <h2 className={`column-header status-${statusKey}`}>
              {statusValue}
            </h2>
            <div className="column-tasks">
              {tasks
                .filter((task) => task.status === statusKey)
                .map((task) => {
                  const dependency = task.dependsOn
                    ? tasks.find((t) => t.id === task.dependsOn)
                    : null;
                  const isDisabled = dependency && dependency.status !== "done";

                  return (
                    <div
                      key={task.id}
                      className={`todo-item status-${task.status} ${
                        isDisabled ? "disabled" : ""
                      }`}
                      draggable={!isDisabled}
                      onDragStart={(e) => handleDragStart(e, task.id)}
                      onDragEnd={handleDragEnd}
                      data-task-id={task.id}
                    >
                      <div className="todo-item-content">
                        <span>{task.text}</span>
                      </div>
                      <div className="todo-item-actions">
                        <select
                          value={task.dependsOn || ""}
                          onChange={(e) =>
                            handleSetDependency(task.id, e.target.value)
                          }
                          className="dependency-select"
                          title="انتخاب وابستگی"
                        >
                          <option value="">وابستگی</option>
                          {tasks
                            .filter((t) => t.id !== task.id)
                            .map((t) => (
                              <option key={t.id} value={t.id}>
                                {t.text.substring(0, 20)}...
                              </option>
                            ))}
                        </select>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          title="حذف تسک"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
=======
  const [tasks, setTasks] = useLocalStorage("ziBaziTasks", initialTasks);
  // State برای مدیریت حالت تاریک، با استفاده از هوک سفارشی برای ذخیره‌سازی
  const [isDarkMode, setIsDarkMode] = useLocalStorage("ziBaziDarkMode", false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeModal, setActiveModal] = useState(null);

  // این useEffect کلاس 'dark' را به تگ <html> اضافه یا حذف می‌کند
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const updateTask = (taskId, updatedProps) => {
    setTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, ...updatedProps } : t))
    );
  };

  const handleDragDrop = (e, targetStatus) => {
    const draggedTaskId = e.dataTransfer.getData("taskId");
    updateTask(draggedTaskId, { status: targetStatus });
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tasks, searchTerm]);

  return (
    // نیازی به اضافه کردن کلاس dark در اینجا نیست، چون به تگ html اضافه شده
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 sm:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <Header
          onAddTask={() => setActiveModal("add")}
          setSearchTerm={setSearchTerm}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {Object.entries(STATUSES).map(([key, value]) => (
            <KanbanColumn
              key={key}
              status={{ key, value }}
              tasks={filteredTasks.filter((t) => t.status === key)}
              onDelete={(taskId) =>
                setTasks(tasks.filter((t) => t.id !== taskId))
              }
              onDragStart={(e, taskId) =>
                e.dataTransfer.setData("taskId", taskId)
              }
              onDragEnd={() => {}}
              onDrop={handleDragDrop}
              onTaskClick={(task) => setActiveModal(task)}
            />
          ))}
        </main>
      </div>

      {activeModal === "add" && (
        <AddTaskModal
          onClose={() => setActiveModal(null)}
          onAddTask={(task) => setTasks([...tasks, task])}
        />
      )}

      {typeof activeModal === "object" && activeModal !== null && (
        <TaskDetailModal
          task={activeModal}
          onClose={() => setActiveModal(null)}
          onUpdateTask={updateTask}
          onDeleteTask={(taskId) => {
            setTasks(tasks.filter((t) => t.id !== taskId));
            setActiveModal(null);
          }}
        />
      )}
>>>>>>> 18c1326 (new update)
    </div>
  );
}

export default App;
