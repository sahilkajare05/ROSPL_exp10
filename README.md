# FinWise — Student Budget & Expense Tracker
### Recent Open Source Lab (ROSPL) — Experiment No. 10

**Department of Information Technology**  
**A. P. Shah Institute of Technology**  
**Academic Year:** 2026-27 | **Semester:** VII | **Class:** BE IT  
**Student Name:** Sahil Kajare | **Roll No / Student ID:** 23104059  

---

## 📌 Project Overview
**FinWise** is a lightweight, responsive student budgeting and daily expense management prototype designed to help college students track monthly allowances, categorize spends (food, books, travel, coffee), and calculate remaining balances in real time.

This project was developed as part of **Experiment 10**, demonstrating:
1. High-fidelity UI/UX design and clickable prototype in **Figma**.
2. Functional, responsive coded prototype in **HTML5, CSS3, and Vanilla JavaScript**.
3. Version control and open-source contribution workflow using **Git and GitHub**.

---

## 📱 App Screens
The prototype consists of three interconnected mobile screens (390×844 device frame):
1. **Login Screen**:
   - Institutional email & password authentication.
   - Real-time client-side form validation.
2. **Dashboard / Home Screen**:
   - Live financial metric cards: *Monthly Budget*, *Total Spent*, and *Remaining Balance*.
   - Interactive quick-add expense form with category selection.
   - Recent expenses list with item deletion and automatic recalculation.
   - Light/Dark mode toggle switch.
3. **Student Profile Screen**:
   - Student avatar badge, academic branch, roll number, and department.
   - Budget targets and practical submission details.
   - Smooth navigation controls back to the dashboard.

---

## ✨ Dynamic Interactive Features
- **Form Validation**: Validates email format and password length requirements before screen transition.
- **Dynamic State Management**: Adding or deleting expense items instantly updates the *Total Spent*, *Remaining Balance*, and *Budget Utilization %* metrics.
- **Theme Toggle**: Real-time switch between clean Light Mode and sleek Dark Mode with tailored CSS variables.
- **SPA Screen Routing**: Seamless transitions between Login, Dashboard, and Profile screens without page reloads.

---

## 🎨 Figma Prototype
Wireframe vector assets are stored in the [`figma_assets/`](./figma_assets/) directory:
- `Login.svg`
- `Home.svg`
- `Profile.svg`

### Figma Prototype Link:
[View Interactive FinWise Figma Prototype](https://www.figma.com/proto/1XX6LYmXFbkfRHavFQU0VX/Untitled?node-id=0-1&t=3N8gdzINimB9EP2u-1)

Direct URL:
```
https://www.figma.com/proto/1XX6LYmXFbkfRHavFQU0VX/Untitled?node-id=0-1&t=3N8gdzINimB9EP2u-1
```

---

## 🚀 How to Run the Coded Prototype Locally

### Option 1: Direct Browser Access
Double-click on `coded_prototype/index.html` to open it in your web browser (Chrome, Firefox, Edge).

### Option 2: Local HTTP Server (Python)
```bash
cd coded_prototype
python -m http.server 8000
```
Open `http://localhost:8000` in your web browser.

---

## 🛠️ Git & GitHub Submission Workflow

Initialize Git, commit your files, and push to your GitHub repository:

```bash
# 1. Initialize local repository
git init

# 2. Stage all project files
git add .

# 3. Create initial commit
git commit -m "Initial commit: FinWise UI prototype for Exp 10"

# 4. Set main branch
git branch -M main

# 5. Connect your remote GitHub repository
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/FinWise_Exp10.git

# 6. Push to GitHub
git push -u origin main
```
