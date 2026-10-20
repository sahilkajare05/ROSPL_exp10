// ==================== STATE & DATA ====================
const state = {
  monthlyBudget: 5000,
  expenses: [
    { id: 1, title: "College Canteen Lunch", amount: 120, category: "🍔 Food", date: "Today" },
    { id: 2, title: "Semester Reference Books", amount: 850, category: "📚 Books", date: "Yesterday" },
    { id: 3, title: "Monthly Bus & Metro Pass", amount: 480, category: "🚌 Travel", date: "Oct 18" },
    { id: 4, title: "Project Discussion Cafe", amount: 90, category: "☕ Snacks", date: "Oct 16" }
  ]
};

// ==================== DOM ELEMENTS ====================
const screens = {
  login: document.getElementById("loginScreen"),
  home: document.getElementById("homeScreen"),
  profile: document.getElementById("profileScreen")
};

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginMessage = document.getElementById("loginMessage");

const themeToggleBtn = document.getElementById("themeToggleBtn");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");

const viewProfileBtn = document.getElementById("viewProfileBtn");
const backToHomeBtn = document.getElementById("backToHomeBtn");
const logoutBtn = document.getElementById("logoutBtn");

const budgetDisplay = document.getElementById("budgetDisplay");
const spentDisplay = document.getElementById("spentDisplay");
const remainingDisplay = document.getElementById("remainingDisplay");
const spentCountSub = document.getElementById("spentCountSub");
const budgetPercent = document.getElementById("budgetPercent");

const addExpenseForm = document.getElementById("addExpenseForm");
const expenseTitle = document.getElementById("expenseTitle");
const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");
const expensesList = document.getElementById("expensesList");

// ==================== SCREEN NAVIGATION ====================
function navigateTo(screenKey) {
  Object.values(screens).forEach(screen => {
    screen.classList.remove("active");
  });
  if (screens[screenKey]) {
    screens[screenKey].classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// ==================== EXPENSE CALCULATIONS & RENDER ====================
function formatCurrency(num) {
  return "₹" + Number(num).toLocaleString("en-IN");
}

function updateFinancialStats() {
  const totalSpent = state.expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const remaining = state.monthlyBudget - totalSpent;
  const percentLeft = Math.max(0, Math.round((remaining / state.monthlyBudget) * 100));

  budgetDisplay.textContent = formatCurrency(state.monthlyBudget);
  spentDisplay.textContent = formatCurrency(totalSpent);
  remainingDisplay.textContent = formatCurrency(remaining);

  spentCountSub.textContent = `${state.expenses.length} item${state.expenses.length === 1 ? "" : "s"}`;
  budgetPercent.textContent = `${percentLeft}% left`;

  // Color warning if budget is running low
  if (remaining < 1000) {
    remainingDisplay.style.color = "#ef4444";
  } else {
    remainingDisplay.style.color = "";
  }
}

function renderExpenses() {
  expensesList.innerHTML = "";

  if (state.expenses.length === 0) {
    expensesList.innerHTML = `
      <div style="text-align:center; padding: 24px; color: var(--text-muted); font-size: 13px;">
        No expenses recorded yet. Add your first item above!
      </div>
    `;
    updateFinancialStats();
    return;
  }

  state.expenses.forEach(item => {
    const card = document.createElement("div");
    card.className = "expense-item";

    const [icon, ...catNameParts] = item.category.split(" ");
    const catName = catNameParts.join(" ") || item.category;

    card.innerHTML = `
      <div class="expense-left">
        <div class="expense-icon">${icon || "💸"}</div>
        <div class="expense-info">
          <h4>${escapeHTML(item.title)}</h4>
          <span>${catName} • ${item.date}</span>
        </div>
      </div>
      <div class="expense-right">
        <span class="expense-amount">-${formatCurrency(item.amount)}</span>
        <button class="delete-btn" aria-label="Delete expense" data-id="${item.id}" title="Delete">
          ✕
        </button>
      </div>
    `;

    expensesList.appendChild(card);
  });

  // Attach delete handlers
  expensesList.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = Number(e.currentTarget.getAttribute("data-id"));
      deleteExpense(id);
    });
  });

  updateFinancialStats();
}

function deleteExpense(id) {
  state.expenses = state.expenses.filter(item => item.id !== id);
  renderExpenses();
}

function escapeHTML(str) {
  const p = document.createElement("p");
  p.textContent = str;
  return p.innerHTML;
}

// ==================== EVENT LISTENERS ====================

// 1. Login Form Validation (Dynamic Feature 1)
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  loginMessage.textContent = "";

  if (!email || !password) {
    loginMessage.textContent = "Please fill in both email and password.";
    return;
  }

  // Basic email pattern check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    loginMessage.textContent = "Please enter a valid email address.";
    return;
  }

  if (password.length < 6) {
    loginMessage.textContent = "Password must be at least 6 characters long.";
    return;
  }

  // Success: Clear fields and navigate to dashboard
  loginMessage.textContent = "";
  navigateTo("home");
});

// 2. Light / Dark Theme Toggle (Dynamic Feature 2)
themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeIcon.textContent = isDark ? "☀️" : "🌙";
  themeLabel.textContent = isDark ? "Light" : "Dark";
});

// 3. Add Expense Handler (Dynamic Feature 3)
addExpenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = expenseTitle.value.trim();
  const amount = Number(expenseAmount.value);
  const category = expenseCategory.value;

  if (!title || isNaN(amount) || amount <= 0) {
    return;
  }

  const newExpense = {
    id: Date.now(),
    title: title,
    amount: amount,
    category: category,
    date: "Just now"
  };

  state.expenses.unshift(newExpense);
  renderExpenses();

  expenseTitle.value = "";
  expenseAmount.value = "";
  expenseTitle.focus();
});

// 4. Navigation Buttons
viewProfileBtn.addEventListener("click", () => navigateTo("profile"));
backToHomeBtn.addEventListener("click", () => navigateTo("home"));
logoutBtn.addEventListener("click", () => {
  emailInput.value = "";
  passwordInput.value = "";
  navigateTo("login");
});

// Initial Render on startup
renderExpenses();
