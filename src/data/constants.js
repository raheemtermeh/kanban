export const STATUSES = {
  todo: { title: "شروع نشده", color: "bg-gray-500" },
  inprogress: { title: "در حال انجام", color: "bg-yellow-500" },
  done: { title: "انجام شده", color: "bg-green-500" },
};

export const PRIORITIES = {
  low: { text: "پایین", color: "bg-gray-500" },
  medium: { text: "متوسط", color: "bg-blue-500" },
  high: { text: "بالا", color: "bg-yellow-500" },
  urgent: { text: "فوری", color: "bg-red-500" },
};

export const initialTasks = [
  {
    id: "task-1",
    text: "طراحی رابط کاربری با Figma",
    status: "done",
    priority: "high",
    dueDate: "2025-08-20",
    subtasks: [
      { id: "sub-1-1", text: "طراحی وایرفریم", completed: true },
      { id: "sub-1-2", text: "انتخاب پالت رنگی", completed: true },
    ],
  },
  {
    id: "task-2",
    text: "توسعه کامپوننت‌های اصلی",
    status: "inprogress",
    priority: "urgent",
    dueDate: "2025-08-28",
    subtasks: [
      { id: "sub-2-1", text: "ساخت کامپوننت کارت", completed: true },
      { id: "sub-2-2", text: "ساخت مودال", completed: false },
    ],
  },
];
