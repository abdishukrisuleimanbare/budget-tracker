
/* =========================================================
   SPENDWISE - INTERACTIVE PERSONAL BUDGET TRACKER

   Assignment concepts:
   1. Variables and data types
   2. Arrays and objects
   3. Loops and conditionals
   4. Functions
   5. DOM manipulation
   6. Event listeners
   7. Input validation
   8. Browser localStorage
========================================================= */

"use strict";

/* =========================================================
   1. APPLICATION CONFIGURATION
========================================================= */

const appName = "SpendWise";
const currency = "KSh";

const DEFAULT_MONTHLY_BUDGET = 50000;

const STORAGE_KEYS = {
    expenses: "spendwise_expenses",
    budget: "spendwise_monthly_budget"
};

let monthlyBudget = DEFAULT_MONTHLY_BUDGET;

/* =========================================================
   2. INITIAL EXPENSE DATA
========================================================= */

const defaultExpenses = [
    {
        id: 1,
        description: "Groceries and meals",
        category: "Food",
        amount: 7500
    },
    {
        id: 2,
        description: "Travel and commuting",
        category: "Transport",
        amount: 4200
    },
    {
        id: 3,
        description: "Monthly rent",
        category: "Rent",
        amount: 12000
    },
    {
        id: 4,
        description: "Leisure and activities",
        category: "Entertainment",
        amount: 2300
    },
    {
        id: 5,
        description: "Monthly savings",
        category: "Savings",
        amount: 8000
    },
    {
        id: 6,
        description: "Electricity and internet",
        category: "Utilities",
        amount: 3500
    }
];

let expenses = [...defaultExpenses];

/* =========================================================
   3. BUDGET CATEGORY INFORMATION
========================================================= */

const categoryDetails = [
    {
        name: "Food",
        icon: "🍽️",
        description: "Groceries and meals"
    },
    {
        name: "Transport",
        icon: "🚌",
        description: "Travel and commuting"
    },
    {
        name: "Rent",
        icon: "🏠",
        description: "Home accommodation"
    },
    {
        name: "Entertainment",
        icon: "🎬",
        description: "Leisure and activities"
    },
    {
        name: "Savings",
        icon: "💰",
        description: "Monthly savings goal"
    },
    {
        name: "Utilities",
        icon: "💡",
        description: "Electricity and internet"
    },
    {
        name: "Other",
        icon: "🧾",
        description: "Other spending"
    }
];

/* =========================================================
   4. SELECT HTML ELEMENTS
========================================================= */

const elements = {
    sidebarBudget: document.querySelector("#sidebar-budget"),

    monthlyBudget: document.querySelector("#monthly-budget"),
    totalExpenses: document.querySelector("#total-expenses"),
    remainingBalance: document.querySelector("#remaining-balance"),
    budgetStatus: document.querySelector("#budget-status"),

    budgetForm: document.querySelector("#budget-form"),
    budgetInput: document.querySelector("#budget-input"),

    expenseForm: document.querySelector("#expense-form"),
    expenseDescription: document.querySelector("#expense-description"),
    expenseCategory: document.querySelector("#expense-category"),
    expenseAmount: document.querySelector("#expense-amount"),

    categoryGrid: document.querySelector("#category-grid"),
    expenseList: document.querySelector("#expense-list"),
    emptyExpenses: document.querySelector("#empty-expenses"),

    feedbackMessage: document.querySelector("#feedback-message")
};

/* =========================================================
   5. CHECK REQUIRED HTML ELEMENTS
========================================================= */

function validatePageElements() {
    for (const [name, element] of Object.entries(elements)) {
        if (!element) {
            console.error(
                `SpendWise error: HTML element "${name}" was not found.`
            );

            return false;
        }
    }

    return true;
}

/* =========================================================
   6. LOAD SAVED DATA FROM LOCAL STORAGE
========================================================= */

function loadSavedData() {
    try {
        const savedExpenses = localStorage.getItem(STORAGE_KEYS.expenses);
        const savedBudget = localStorage.getItem(STORAGE_KEYS.budget);

        if (savedExpenses !== null) {
            const parsedExpenses = JSON.parse(savedExpenses);

            if (
                Array.isArray(parsedExpenses) &&
                parsedExpenses.every(expense =>
                    expense !== null &&
                    typeof expense === "object" &&
                    Number.isInteger(expense.id) &&
                    typeof expense.description === "string" &&
                    typeof expense.category === "string" &&
                    Number.isFinite(expense.amount) &&
                    expense.amount > 0
                )
            ) {
                expenses = parsedExpenses;
            }
        }

        if (savedBudget !== null) {
            const parsedBudget = Number(savedBudget);

            if (Number.isFinite(parsedBudget) && parsedBudget > 0) {
                monthlyBudget = parsedBudget;
            }
        }

    } catch (error) {
        console.error("Unable to load saved SpendWise data:", error);

        expenses = [...defaultExpenses];
        monthlyBudget = DEFAULT_MONTHLY_BUDGET;
    }
}

/* =========================================================
   7. SAVE DATA TO LOCAL STORAGE
========================================================= */

function saveData() {
    try {
        localStorage.setItem(
            STORAGE_KEYS.expenses,
            JSON.stringify(expenses)
        );

        localStorage.setItem(
            STORAGE_KEYS.budget,
            String(monthlyBudget)
        );

    } catch (error) {
        console.error("Unable to save SpendWise data:", error);

        showFeedback(
            "Your changes are displayed, but browser storage is unavailable.",
            "error"
        );
    }
}

/* =========================================================
   8. FORMAT CURRENCY
========================================================= */

function formatMoney(amount) {
    return `${currency} ${Number(amount).toLocaleString("en-KE", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    })}`;
}

/* =========================================================
   9. CALCULATE TOTAL EXPENSES
========================================================= */

function calculateTotalExpenses() {
    let total = 0;

    for (const expense of expenses) {
        total += expense.amount;
    }

    return total;
}

/* =========================================================
   10. CALCULATE REMAINING BUDGET
========================================================= */

function calculateRemainingBudget(budget, total) {
    return budget - total;
}

/* =========================================================
   11. DETERMINE BUDGET STATUS
========================================================= */

function getBudgetStatus(remainingBalance) {

    if (remainingBalance < 0) {
        return {
            text: `Over budget by ${formatMoney(
                Math.abs(remainingBalance)
            )}`,

            className: "over-budget",

            message:
                "Budget exceeded. Review your spending or increase your budget."
        };

    } else if (remainingBalance === 0) {
        return {
            text: "Budget fully used",

            className: "at-limit",

            message:
                "You have reached your monthly budget limit."
        };
    }

    return {
        text: "Within budget",

        className: "within-budget",

        message:
            `You still have ${formatMoney(remainingBalance)} available.`
    };
}

/* =========================================================
   12. DISPLAY FEEDBACK MESSAGES
========================================================= */

function showFeedback(message, type = "info") {
    elements.feedbackMessage.textContent = message;
    elements.feedbackMessage.className = `feedback ${type}`;
}

/* =========================================================
   13. RENDER CATEGORY CARDS
========================================================= */

function renderCategoryCards() {

    elements.categoryGrid.replaceChildren();

    const totalExpenses = calculateTotalExpenses();

    for (const category of categoryDetails) {

        let categoryTotal = 0;

        // Calculate spending for the current category.
        for (const expense of expenses) {

            if (expense.category === category.name) {
                categoryTotal += expense.amount;
            }
        }

        // Count expenses in this category.
        const count = expenses.filter(
            item => item.category === category.name
        ).length;

        // Create category card.
        const card = document.createElement("article");
        card.className = "category-card";

        // Card top section.
        const top = document.createElement("div");
        top.className = "card-top";

        const icon = document.createElement("div");
        icon.className = "category-icon";
        icon.textContent = category.icon;

        const status = document.createElement("span");
        status.className = "status";

        status.textContent = count === 0
            ? "No records"
            : `${count} record${count === 1 ? "" : "s"}`;

        top.append(icon, status);

        // Card content.
        const content = document.createElement("div");
        content.className = "card-content";

        const heading = document.createElement("h3");
        heading.textContent = category.name;

        const description = document.createElement("p");
        description.textContent = category.description;

        content.append(heading, description);

        // Card bottom section.
        const bottom = document.createElement("div");
        bottom.className = "card-bottom";

        const amount = document.createElement("strong");
        amount.textContent = formatMoney(categoryTotal);

        const share = document.createElement("span");

        const percentage = totalExpenses > 0
            ? Math.round((categoryTotal / totalExpenses) * 100)
            : 0;

        share.textContent = `${percentage}% of expenses`;

        bottom.append(amount, share);

        // Progress bar.
        const progress = document.createElement("div");

        progress.className = "progress";

        progress.setAttribute("role", "progressbar");
        progress.setAttribute(
            "aria-label",
            `${category.name} share of total expenses`
        );

        progress.setAttribute("aria-valuemin", "0");
        progress.setAttribute("aria-valuemax", "100");
        progress.setAttribute("aria-valuenow", String(percentage));

        const progressFill = document.createElement("span");

        progressFill.style.width = `${percentage}%`;

        progress.append(progressFill);

        // Add all elements to the category card.
        card.append(top, content, bottom, progress);

        elements.categoryGrid.append(card);
    }
}

/* =========================================================
   14. RENDER EXPENSE LIST
========================================================= */

function renderExpenseList() {

    elements.expenseList.replaceChildren();

    for (const expense of expenses) {

        const row = document.createElement("tr");

        // Expense description.
        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = expense.description;

        // Expense category.
        const categoryCell = document.createElement("td");
        categoryCell.textContent = expense.category;

        // Expense amount.
        const amountCell = document.createElement("td");
        amountCell.textContent = formatMoney(expense.amount);

        // Remove button.
        const actionCell = document.createElement("td");

        const removeButton = document.createElement("button");

        removeButton.type = "button";
        removeButton.className = "remove-button";
        removeButton.textContent = "Remove";

        removeButton.setAttribute(
            "aria-label",
            `Remove ${expense.description}`
        );

        removeButton.addEventListener("click", function () {
            removeExpense(expense.id);
        });

        actionCell.append(removeButton);

        // Add cells to the row.
        row.append(
            descriptionCell,
            categoryCell,
            amountCell,
            actionCell
        );

        elements.expenseList.append(row);
    }

    // Display the empty message when there are no expenses.
    elements.emptyExpenses.hidden = expenses.length !== 0;
}

/* =========================================================
   15. UPDATE THE COMPLETE DASHBOARD
========================================================= */

function updateDashboard() {

    const total = calculateTotalExpenses();

    const remaining = calculateRemainingBudget(
        monthlyBudget,
        total
    );

    const status = getBudgetStatus(remaining);

    // Update summary information.
    elements.sidebarBudget.textContent = formatMoney(monthlyBudget);

    elements.monthlyBudget.textContent = formatMoney(monthlyBudget);

    elements.totalExpenses.textContent = formatMoney(total);

    elements.remainingBalance.textContent = formatMoney(remaining);

    // Update budget status.
    elements.budgetStatus.textContent = status.text;

    elements.budgetStatus.className =
        `status-text ${status.className}`;

    // Refresh category cards and expense table.
    renderCategoryCards();

    renderExpenseList();

}

/* =========================================================
   16. ADD A NEW EXPENSE
========================================================= */

function addExpense(event) {

    event.preventDefault();

    const description = elements.expenseDescription.value.trim();

    const category = elements.expenseCategory.value;

    const amount = Number(elements.expenseAmount.value);

    // Validate description.
    if (description === "") {

        showFeedback(
            "Please enter an expense description.",
            "error"
        );

        elements.expenseDescription.focus();

        return;
    }

    // Validate category.
    const validCategory = categoryDetails.some(
        item => item.name === category
    );

    if (!validCategory) {

        showFeedback(
            "Please select a valid expense category.",
            "error"
        );

        elements.expenseCategory.focus();

        return;
    }

    // Validate amount.
    if (!Number.isFinite(amount) || amount <= 0) {

        showFeedback(
            "Enter an expense amount greater than zero.",
            "error"
        );

        elements.expenseAmount.focus();

        return;
    }

    // Generate a unique numeric ID.
    const nextId = expenses.length > 0
        ? Math.max(...expenses.map(expense => expense.id)) + 1
        : 1;

    // Create a new expense object.
    const newExpense = {
        id: nextId,
        description: description,
        category: category,
        amount: amount
    };

    // Add the object to the expenses array.
    expenses.push(newExpense);

    // Save changes.
    saveData();

    // Clear the form.
    elements.expenseForm.reset();

    // Refresh the dashboard.
    updateDashboard();

    // Display feedback.
    const remaining = calculateRemainingBudget(
        monthlyBudget,
        calculateTotalExpenses()
    );

    showFeedback(
        `Expense added successfully. ${getBudgetStatus(remaining).message}`,
        remaining < 0 ? "error" : "success"
    );
}

/* =========================================================
   17. REMOVE AN EXPENSE
========================================================= */

function removeExpense(expenseId) {

    const originalLength = expenses.length;

    // Create a new array without the selected expense.
    expenses = expenses.filter(
        expense => expense.id !== expenseId
    );

    // Check whether an expense was removed.
    if (expenses.length === originalLength) {

        showFeedback(
            "That expense could not be found.",
            "error"
        );

        return;
    }

    // Save the updated array.
    saveData();

    // Refresh all dashboard calculations.
    updateDashboard();

    showFeedback(
        "Expense removed and dashboard updated.",
        "success"
    );
}

/* =========================================================
   18. UPDATE MONTHLY BUDGET
========================================================= */

function updateBudget(event) {

    event.preventDefault();

    const newBudget = Number(elements.budgetInput.value);

    // Validate budget input.
    if (!Number.isFinite(newBudget) || newBudget <= 0) {

        showFeedback(
            "Enter a monthly budget greater than zero.",
            "error"
        );

        elements.budgetInput.focus();

        return;
    }

    // Update the monthly budget.
    monthlyBudget = newBudget;

    // Save the new budget.
    saveData();

    // Refresh dashboard calculations.
    updateDashboard();

    // Display updated budget status.
    const remaining = calculateRemainingBudget(
        monthlyBudget,
        calculateTotalExpenses()
    );

    showFeedback(
        `Monthly budget updated successfully. ${getBudgetStatus(remaining).message}`,
        remaining < 0 ? "error" : "success"
    );
}

/* =========================================================
   19. REGISTER EVENT LISTENERS
========================================================= */

function registerEventListeners() {

    // Listen for expense form submission.
    elements.expenseForm.addEventListener(
        "submit",
        addExpense
    );

    // Listen for monthly budget form submission.
    elements.budgetForm.addEventListener(
        "submit",
        updateBudget
    );
}

/* =========================================================
   20. INITIALIZE SPENDWISE
========================================================= */

function initializeSpendWise() {

    // Check that the HTML elements exist.
    if (!validatePageElements()) {
        return;
    }

    // Load previously saved data.
    loadSavedData();

    // Connect user actions to JavaScript functions.
    registerEventListeners();

    // Display the initial dashboard.
    updateDashboard();

    // Display welcome message.
    showFeedback(
        `${appName} is ready. Add, remove, or categorize expenses below.`,
        "success"
    );

    console.log(`${appName} initialized successfully.`);
}

/* =========================================================
   21. START APPLICATION
========================================================= */

initializeSpendWise();

/* =========================================================
   END OF SPENDWISE JAVASCRIPT
========================================================= */
