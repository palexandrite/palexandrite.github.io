const { createApp, computed, ref } = Vue;

const isRussian = new URLSearchParams(window.location.search).get("lang") === "ru";
const messages = {
  en: {
    back: "Back to the website",
    switchToLight: "Switch to light theme",
    switchToDark: "Switch to dark theme",
    lightTheme: "Light",
    darkTheme: "Dark",
    eyebrow: "A tiny Vue 3 project",
    title: "Make room for tasks",
    intro: "A calm place to collect today's tasks, keep your focus, and see what you've already finished.",
    boardLabel: "Task board",
    workspace: "Your workspace",
    today: "Today",
    completed: "completed",
    taskPlaceholder: "What needs your attention?",
    addTask: "Add task",
    filterTasks: "Filter tasks",
    all: "All",
    open: "Open",
    done: "Done",
    design: "Design",
    build: "Build",
    personal: "Personal",
    markComplete: "Mark task complete",
    markIncomplete: "Mark task incomplete",
    deleteTask: "Delete task",
    empty: "Nothing here yet. Add a task to get started.",
    savedLocally: "Your session, your pace",
    reset: "Reset demo",
    note: "A small Vue 3 demo — add, complete, filter, and remove tasks.",
    progress: "{done} of {total} tasks completed",
    samples: [
      { title: "Sketch the first screen", category: "design", done: true },
      { title: "Build a responsive task card", category: "build", done: false },
      { title: "Take a proper coffee break", category: "personal", done: false },
    ],
  },
  ru: {
    back: "Вернуться на сайт",
    switchToLight: "Включить светлую тему",
    switchToDark: "Включить тёмную тему",
    lightTheme: "Светлая",
    darkTheme: "Тёмная",
    eyebrow: "Небольшой проект на Vue 3",
    title: "Время для задач",
    intro: "Спокойное место, чтобы собрать задачи на сегодня, сохранить фокус и увидеть свой прогресс.",
    boardLabel: "Доска задач",
    workspace: "Ваше пространство",
    today: "Сегодня",
    completed: "готово",
    taskPlaceholder: "Что требует внимания?",
    addTask: "Добавить",
    filterTasks: "Фильтр задач",
    all: "Все",
    open: "Активные",
    done: "Готовые",
    design: "Дизайн",
    build: "Разработка",
    personal: "Личное",
    markComplete: "Отметить задачу выполненной",
    markIncomplete: "Вернуть задачу в активные",
    deleteTask: "Удалить задачу",
    empty: "Пока здесь пусто. Добавьте первую задачу.",
    savedLocally: "Ваш ритм, ваша сессия",
    reset: "Сбросить демо",
    note: "Небольшая демонстрация Vue 3: добавление, выполнение, фильтрация и удаление задач.",
    progress: "Выполнено задач: {done} из {total}",
    samples: [
      { title: "Набросать первый экран", category: "design", done: true },
      { title: "Сверстать адаптивную карточку задачи", category: "build", done: false },
      { title: "Сделать перерыв на кофе", category: "personal", done: false },
    ],
  },
};

const copy = isRussian ? messages.ru : messages.en;
document.documentElement.lang = isRussian ? "ru" : "en";
document.title = isRussian ? "Доска задач на Vue" : "Vue Task Board";
let nextTaskId = 4;
const makeSampleTasks = () =>
  copy.samples.map((task, index) => ({ ...task, id: index + 1 }));

createApp({
  setup() {
    const isDark = ref(document.documentElement.classList.contains("dark"));
    const tasks = ref(makeSampleTasks());
    const newTask = ref("");
    const activeFilter = ref("all");
    const filters = [
      { value: "all", label: "all" },
      { value: "open", label: "open" },
      { value: "done", label: "done" },
    ];

    const completedCount = computed(
      () => tasks.value.filter((task) => task.done).length,
    );
    const visibleTasks = computed(() =>
      tasks.value.filter((task) => {
        if (activeFilter.value === "open") return !task.done;
        if (activeFilter.value === "done") return task.done;
        return true;
      }),
    );
    const progressLabel = computed(() =>
      copy.progress
        .replace("{done}", String(completedCount.value))
        .replace("{total}", String(tasks.value.length)),
    );

    function t(key) {
      return copy[key] ?? key;
    }

    function toggleTheme() {
      applyTheme(!isDark.value);
      localStorage.setItem("theme", isDark.value ? "dark" : "light");
    }

    function applyTheme(dark) {
      isDark.value = dark;
      document.documentElement.classList.toggle("dark", dark);
      document.querySelector('meta[name="theme-color"]').content = dark
        ? "#1c1c1c"
        : "#f5f4f0";
    }

    applyTheme(isDark.value);

    window.addEventListener("storage", (event) => {
      if (event.key !== "theme") return;

      applyTheme(
        event.newValue === "dark" ||
          (event.newValue === null &&
            window.matchMedia("(prefers-color-scheme: dark)").matches),
      );
    });

    function filterCount(filter) {
      if (filter === "open") return tasks.value.length - completedCount.value;
      if (filter === "done") return completedCount.value;
      return tasks.value.length;
    }

    function addTask() {
      const title = newTask.value.trim();
      if (!title) return;

      tasks.value.push({
        id: nextTaskId++,
        title,
        category: "personal",
        done: false,
      });
      newTask.value = "";
      activeFilter.value = "all";
    }

    function toggleTask(id) {
      const task = tasks.value.find((item) => item.id === id);
      if (task) task.done = !task.done;
    }

    function deleteTask(id) {
      tasks.value = tasks.value.filter((task) => task.id !== id);
    }

    function resetTasks() {
      tasks.value = makeSampleTasks();
      nextTaskId = 4;
      newTask.value = "";
      activeFilter.value = "all";
    }

    return {
      t,
      isDark,
      toggleTheme,
      tasks,
      newTask,
      activeFilter,
      filters,
      completedCount,
      visibleTasks,
      progressLabel,
      filterCount,
      addTask,
      toggleTask,
      deleteTask,
      resetTasks,
    };
  },
}).mount("#app");
