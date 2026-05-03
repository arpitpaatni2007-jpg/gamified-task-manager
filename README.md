# ⚡ Level Up — Gamified Task Manager
### Capstone Project | Education / Productivity Domain
**Made by Arpit Patni**

---

## 📋 Problem Statement

Many students and professionals struggle to stay motivated while managing their daily tasks. Traditional to-do apps are boring and don't encourage consistency. **Level Up** solves this by adding a gamification layer — every completed task earns XP points, users level up as they progress, and a visual progress bar keeps them engaged.

---

## ✅ Features List

### Core CRUD Features
- ➕ Add tasks
- 🗑️ Delete tasks
- ✅ Mark tasks complete / incomplete
- ✏️ Edit task text
- 📋 Task list display

### Gamification Features
- ⭐ +20 XP per completed task
- 🏆 Level system: Level 1 → 5 (Beginner → Legend)
- 📊 Progress bar showing level progress
- 💰 Total XP display in navbar

### Advanced Features (3+ from SOP)
- 🔍 Search tasks (with debounce)
- 🏷️ Filter: All / Pending / Completed
- 📄 Pagination (5 tasks per page)
- 🌙 Dark mode toggle (persists)
- 📊 Recent activity log

### API Integration
- 🌐 Wikipedia REST API for productivity tips
- Axios for API calls
- Loading, error, and success states handled

---

## 📁 Folder Structure

```
gamified-task-manager/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx          ← Entry point
    ├── App.jsx           ← Root component + routing
    ├── index.css         ← Tailwind imports
    ├── components/
    │   ├── Navbar.jsx        ← Top navigation bar
    │   ├── Footer.jsx        ← Footer with credit
    │   ├── LevelCard.jsx     ← XP + Level display
    │   ├── StatsBar.jsx      ← Task count stats
    │   ├── AddTaskForm.jsx   ← Add task input
    │   ├── TaskCard.jsx      ← Single task card
    │   └── TaskList.jsx      ← List with search/filter/pagination
    ├── pages/
    │   ├── Home.jsx          ← Main task dashboard
    │   ├── Tips.jsx          ← Wikipedia API tips
    │   ├── Activity.jsx      ← Completion history
    │   └── NotFound.jsx      ← 404 page
    ├── context/
    │   ├── TaskContext.jsx   ← Global state (Context API)
    │   └── DarkModeContext.jsx ← Dark mode state
    ├── hooks/
    │   └── useDebounce.js    ← Custom debounce hook
    └── services/
        └── wikiService.js    ← Wikipedia API calls
```

---

## ⚙️ Setup Instructions

### Step 1 — Install Node.js
Download from: https://nodejs.org (v18 or above)

### Step 2 — Clone / Download project
```bash
# if using git
git clone <your-repo-url>
cd gamified-task-manager

# or just extract the zip and open folder
```

### Step 3 — Install dependencies
```bash
npm install
```

### Step 4 — Run development server
```bash
npm run dev
```
Open: http://localhost:5173

### Step 5 — Build for production
```bash
npm run build
```
This creates a `dist/` folder ready for deployment.

---

## 🚀 Deployment Steps (Vercel)

1. Push your code to **GitHub**
2. Go to [vercel.com](https://vercel.com) and sign up with GitHub
3. Click **"Add New Project"**
4. Select your GitHub repository
5. Vercel auto-detects Vite — click **"Deploy"**
6. Your live link is ready! Example: `https://your-app.vercel.app`

---

## 🧪 Sample Test Data

Add these tasks to test the app:

```
1. Complete React assignment
2. Read Chapter 5 of JavaScript book
3. Submit project report
4. Practice coding problems on LeetCode
5. Attend online webinar on Web Dev
6. Review Context API notes
7. Make project presentation slides
8. Push code to GitHub
```

Complete 5 tasks → you reach 100 XP → Level 2! 🎉

---

## 🎓 Viva Questions & Answers

**Q1: What is Context API?**
A: Context API is React's built-in way to share data between components without passing props manually at every level. It's like a global variable store that all components can access.

**Q2: What is useReducer?**
A: useReducer is a React hook used instead of useState when state logic is complex. It uses a reducer function that takes current state and an action, then returns new state.

**Q3: What is React Router?**
A: React Router is a library that adds navigation to React apps. It lets us show different pages (components) based on the URL, without reloading the browser.

**Q4: What is Lazy Loading?**
A: Lazy loading means we don't load all code at once. Pages only load when the user visits them. This makes the app start faster. We used React.lazy() and Suspense.

**Q5: What is Debounce?**
A: Debounce means waiting for a pause before running a function. In search, we wait 300ms after the user stops typing before filtering tasks. This prevents too many re-renders.

**Q6: What is localStorage?**
A: localStorage is browser storage that saves data even when you close the tab. We use it to save tasks so they don't disappear on refresh.

**Q7: How does the XP system work?**
A: Each task you complete gives +20 XP. XP is stored in global state. We have level thresholds [0, 100, 250, 450, 700, 1000]. The app checks which threshold your XP crosses to determine your level.

**Q8: What API did you use and why?**
A: We used the Wikipedia REST API. It's free, no API key needed, and returns JSON. We use Axios to fetch summaries about productivity topics like Pomodoro Technique and Time Management.

**Q9: What is useMemo?**
A: useMemo is a React hook for performance optimization. It remembers (caches) the result of a calculation and only recalculates when dependencies change. We use it for filtering tasks so it doesn't recalculate on every render.

**Q10: What is Tailwind CSS?**
A: Tailwind is a utility-first CSS framework. Instead of writing custom CSS, you use small classes like `text-red-500`, `p-4`, `flex` directly in JSX. It makes styling fast and consistent.

---

## 📊 SOP Checklist

| Requirement | Status |
|---|---|
| React (Vite) | ✅ |
| JavaScript ES6+ | ✅ |
| Context API | ✅ |
| React Router | ✅ |
| Axios / Fetch API | ✅ (Axios) |
| Tailwind CSS | ✅ |
| CRUD Operations | ✅ |
| API Integration | ✅ (Wikipedia) |
| Lazy Loading | ✅ |
| Pagination | ✅ |
| Search + Filter | ✅ |
| Dark Mode | ✅ |
| Error Handling | ✅ |
| LocalStorage | ✅ |
| Deployment-ready | ✅ |
| Unique Problem Statement | ✅ |

---

*Made with ❤️ by Arpit Patni*
