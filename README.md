# 📈 Smart Attendance Tracker

> A modern, real-time attendance forecasting tool.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-2.0-purple.svg)

This project has been completely revamped to provide a seamless user experience, allowing students and professionals to predict their attendance percentage for the upcoming month (28 days) based on current data, planned leaves, and holidays.

## ✨ Key Features

### 🎨 Premium User Interface
- **Glassmorphism Design**: Sleek, dark, semi-transparent aesthetics with dynamic background animations.
- **Deep Color Palette**: Carefully curated deep blue and purple gradients for a comfortable yet striking dark mode.
- **Responsive Layout**: Fully optimized for mobile, tablet, and desktop screens.

### ⚡ Smart & Efficient
- **Instant Calculation**: Logic runs instantly to project attendance over a rolling 28-day window.
- **Data Persistence**: Uses **LocalStorage** to automatically save your input. Your data remains safe even if you close the browser.
- **Auto-Sunday Detection**: Intelligent algorithm automatically detects Sundays and excludes them from working days.
- **Visual Analytics**: Integrated **Chart.js** to render a beautiful area chart showing your attendance trend over the projected period.

## 🛠️ How to Use

1.  **Inputs**:
    *   **Periods Per Day**: Configurable daily schedule (4-10 periods).
    *   **Current Status**: Input your current *Attended* vs *Total Held* classes.
    *   **Smart Date Parsing**: Simply enter dates (e.g., `12 15`) for Leaves or Holidays.
2.  **Processing**:
    *   The algorithm iterates through the next 28 days.
    *   It checks each day against Holidays, Sundays, and Planned Leaves.
    *   It dynamically updates the running total and percentage.
3.  **Output**:
    *   Generates a daily breakdown card indicating status.
    *   Plots a live graph for visual analysis.

## 👥 Author

**Siddem Anil Kumar**

*   📧 Email: [siddemanilkumar@gmail.com](mailto:siddemanilkumar@gmail.com)
*   💻 GitHub: [Anil2995](https://github.com/Anil2995)

---

## 📦 Tech Stack

- **Core**: HTML5, CSS3 (Glassmorphism), JavaScript (ES6+)
- **Libraries**: [Chart.js](https://www.chartjs.org/) (Visualization), [FontAwesome](https://fontawesome.com/) (Icons), [Outfit Font](https://fonts.google.com/specimen/Outfit) (Typography).

---
*Built with ❤️ & Smart Logic.*
