// SpendWise - Interactive Budget Tracker
// Demonstrates arrays, loops, conditionals, DOM manipulation, and events.

"use strict";

const appName = "SpendWise";
const currency = "KSh";
let monthlyBudget = 50000;

// Expense records are stored as objects inside an array.
let expenses = [
    { id: 1, description: "Groceries and meals", category: "Food", amount: 7500 },
    { id: 2, description: "Travel and commuting", category: "Transport", amount: 4200 },
    { id: 3, description: "Monthly rent", category: "Rent", amount: 12000 },
    { id: 4, description: "Leisure and activities", category: "Entertainment", amount: 2300 },
    { id: 5, description: "Monthly savings", category: "Savings", amount: 8000 },
    { id: 6, description: "Electricity and internet", category: "Utilities", amount: 3500 }
];

const categoryDetails = [
    { name: "Food", icon: "🍽️", description: "Groceries and meals" },
    { name: "Transport", icon: "🚌", description: "Travel and commuting" },
    { name: "Rent", icon: "🏠", description: "Home accommodation" },
    { name: "Entertainment", icon: "🎬", description: "Leisure and activities" },
    { name: "Savings", icon: "💰", description: "Monthly savings goal" },
    { name: "Utilities", icon: "💡", description: "Electricity and internet" },
    { name: "Other", icon: "🧾", description: "Other spending" }
];

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

function formatMoney(amount) {
    return `${currency} ${amount.toLocaleString("en-KE", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    })}`;
}

// Loop through the expense array to calculate the total.
function calculateTotalExpenses() {
    let total = 0;

    for (const expense of expenses) {
        total += expense.amount;
    }

    return total;
}

function calculateRemainingBudget(budget, total) {
    return budget - total;
}

// Conditional statements decide which budget message to show.
function getBudgetStatus(remainingBalance) {
    if (remainingBalance < 0) {
        return {
            text: `Over budget by ${formatMoney(Math.abs(remainingBalance))}`,
            className: "over-budget",
            message: "Budget exceeded. Review your spending or increase your budget."
        };
    } else if (remainingBalance === 0) {
        return {
            text: "Budget fully used",
            className: "at-limit",
            message: "You have reached your monthly budget limit."
        };
    }

    return {
        text: "Within budget",
        className: "within-budget",
        message: `You still have ${formatMoney(remainingBalance)} available.`
    };
}

function showFeedback(message, type = "info") {
    elements.feedbackMessage.textContent = message;
    elements.feedbackMessage.className = `feedback ${type}`;
}

// Render category cards from the expense records.
function renderCategoryCards() {
    elements.categoryGrid.replaceChildren();

    for (const category of categoryDetails) {
        let categoryTotal = 0;

        // Loop over all expenses and add records matching this category.
        for (const expense of expenses) {
            if (expense.category === category.name) {
                categoryTotal += expense.amount;
            }
        }

        const card = document.createElement("article");
        card.className = "category-card";

        const top = document.createElement("div");
        top.className = "card-top";

        const icon = document.createElement("div");
        icon.className = "category-icon";
        icon.textContent = category.icon;

        const count = expenses.filter(item => item.category === category.name).length;
        const status = document.createElement("span");
        status.className = "status";
        status.textContent = count === 0 ? "No records" : `${count} record${count === 1 ? "" : "s"}`;

        top.append(icon, status);

        const content = document.createElement("div");
        content.className = "card-content";

        const heading = document.createElement("h3");
        heading.textContent = category.name;

        const description = document.createElement("p");
        description.textContent = category.description;

        content.append(heading, description);

        const bottom = document.createElement("div");
        bottom.className = "card-bottom";

        const amount = document.createElement("strong");
        amount.textContent = formatMoney(categoryTotal);

        const share = document.createElement("span");
        const total = calculateTotalExpenses();
        const percent = total > 0 ? Math.round((categoryTotal / total) * 100) : 0;
        share.textContent = `${percent}% of expenses`;

        bottom.append(amount, share);

        const progress = document.createElement("div");
        progress.className = "progress";
        progress.setAttribute("role", "progressbar");
        progress.setAttribute("aria-label", `${category.name} share of total expenses`);
        progress.setAttribute("aria-valuemin", "0");
        progress.setAttribute("aria-valuemax", "100");
        progress.setAttribute("aria-valuenow", String(percent));

        const progressFill = document.createElement("span");
        progressFill.style.width = `${percent}%`;
        progress.append(progressFill);

        card.append(top, content, bottom, progress);
        elements.categoryGrid.append(card);
    }
}

// Render the expense array as rows in the webpage.
function renderExpenseList() {
    elements.expenseList.replaceChildren();

    for (const expense of expenses) {
        const row = document.createElement("tr");

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = expense.description;

        const categoryCell = document.createElement("td");
        categoryCell.textContent = expense.category;

        const amountCell = document.createElement("td");
        amountCell.textContent = formatMoney(expense.amount);

        const actionCell = document.createElement("td");
        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "remove-button";
        removeButton.textContent = "Remove";
        removeButton.setAttribute("aria-label", `Remove ${expense.description}`);
        removeButton.addEventListener("click", () => removeExpense(expense.id));
        actionCell.append(removeButton);

        row.append(descriptionCell, categoryCell, amountCell, actionCell);
        elements.expenseList.append(row);
    }

    elements.emptyExpenses.hidden = expenses.length !== 0;
}

function updateDashboard() {
    const total = calculateTotalExpenses();
    const remaining = calculateRemainingBudget(monthlyBudget, total);
    const status = getBudgetStatus(remaining);

    elements.sidebarBudget.textContent = formatMoney(monthlyBudget);
    elements.monthlyBudget.textContent = formatMoney(monthlyBudget);
    elements.totalExpenses.textContent = formatMoney(total);
    elements.remainingBalance.textContent = formatMoney(remaining);
    elements.budgetStatus.textContent = status.text;
    elements.budgetStatus.className = `status-text ${status.className}`;
    renderCategoryCards();
    renderExpenseList();
}

function addExpense(event) {
    event.preventDefault();

    const description = elements.expenseDescription.value.trim();
    const category = elements.expenseCategory.value;
    const amount = Number(elements.expenseAmount.value);

    if (description === "") {
        showFeedback("Please enter an expense description.", "error");
        elements.expenseDescription.focus();
        return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
        showFeedback("Enter an expense amount greater than zero.", "error");
        elements.expenseAmount.focus();
        return;
    }

    const nextId = expenses.length > 0
        ? Math.max(...expenses.map(expense => expense.id)) + 1
        : 1;

    expenses.push({
        id: nextId,
        description,
        category,
        amount
    });

    elements.expenseForm.reset();
    updateDashboard();

    const remaining = calculateRemainingBudget(monthlyBudget, calculateTotalExpenses());
    showFeedback(`Expense added. ${getBudgetStatus(remaining).message}`, remaining < 0 ? "error" : "success");
}

function removeExpense(expenseId) {
    const originalLength = expenses.length;
    expenses = expenses.filter(expense => expense.id !== expenseId);

    if (expenses.length === originalLength) {
        showFeedback("That expense could not be found.", "error");
        return;
    }

    updateDashboard();
    showFeedback("Expense removed and dashboard updated.", "success");
}

function updateBudget(event) {
    event.preventDefault();

    const newBudget = Number(elements.budgetInput.value);

    if (!Number.isFinite(newBudget) || newBudget <= 0) {
        showFeedback("Enter a monthly budget greater than zero.", "error");
        elements.budgetInput.focus();
        return;
    }

    monthlyBudget = newBudget;
    updateDashboard();

    const remaining = calculateRemainingBudget(monthlyBudget, calculateTotalExpenses());
    showFeedback(`Budget updated. ${getBudgetStatus(remaining).message}`, remaining < 0 ? "error" : "success");
}

// Event listeners connect user actions to JavaScript functions.
elements.expenseForm.addEventListener("submit", addExpense);
elements.budgetForm.addEventListener("submit", updateBudget);

// Draw the initial dashboard when the page loads.
updateDashboard();
showFeedback(`${appName} is ready. Add, remove, or categorize expenses below.`);
