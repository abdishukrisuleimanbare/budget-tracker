```javascript
// ==========================================
// SpendWise - JavaScript Foundation
// Week 6 Assignment
// ==========================================


// ==========================================
// 1. APPLICATION VARIABLES
// ==========================================

// Store basic application information.
let appName = "SpendWise";
let currency = "KSh";

// Store default budgeting information.
let monthlyBudget = 50000;
let totalExpenses = 0;
let remainingBalance = monthlyBudget;

// Store example expense data.
let foodExpense = 7500;
let transportExpense = 4200;
let rentExpense = 12000;
let entertainmentExpense = 2300;
let savingsExpense = 8000;
let utilitiesExpense = 3500;


// ==========================================
// 2. EXPENSE CALCULATION
// ==========================================

// Calculate the total of the example expenses.
totalExpenses =
    foodExpense +
    transportExpense +
    rentExpense +
    entertainmentExpense +
    savingsExpense +
    utilitiesExpense;


// ==========================================
// 3. REUSABLE BUDGET FUNCTION
// ==========================================

// This function calculates the remaining budget.
function calculateRemainingBudget(budget, expenses) {
    return budget - expenses;
}


// Calculate the remaining balance using the function.
remainingBalance = calculateRemainingBudget(
    monthlyBudget,
    totalExpenses
);


// ==========================================
// 4. COLLECT USER INPUT
// ==========================================

// Ask the user for their monthly budget.
let userBudgetInput = prompt(
    "Enter your monthly budget in KSh:"
);


// Ask the user for their total expenses.
let userExpenseInput = prompt(
    "Enter your total expenses in KSh:"
);


// Convert the input from text into numbers.
let userBudget = Number(userBudgetInput);
let userExpenses = Number(userExpenseInput);


// ==========================================
// 5. VALIDATE USER INPUT
// ==========================================

if (
    userBudgetInput !== null &&
    userExpenseInput !== null &&
    !isNaN(userBudget) &&
    !isNaN(userExpenses) &&
    userBudget >= 0 &&
    userExpenses >= 0
) {

    // Calculate the user's remaining balance.
    let userRemainingBalance =
        calculateRemainingBudget(
            userBudget,
            userExpenses
        );


    // ======================================
    // 6. DISPLAY USER RESULTS
    // ======================================

    console.log("========== SpendWise Budget Report ==========");

    console.log("Application:", appName);

    console.log("Monthly Budget:", currency, userBudget);

    console.log("Total Expenses:", currency, userExpenses);

    console.log(
        "Remaining Balance:",
        currency,
        userRemainingBalance
    );


    // Display whether the user stayed within budget.
    if (userRemainingBalance > 0) {

        console.log(
            "Budget Status: You are within your budget."
        );

    } else if (userRemainingBalance === 0) {

        console.log(
            "Budget Status: You have used your full budget."
        );

    } else {

        console.log(
            "Budget Status: You have exceeded your budget."
        );
    }

    console.log("=============================================");


} else {

    // Display an error when invalid information is entered.
    console.log(
        "SpendWise Error: Please enter valid positive numbers for your budget and expenses."
    );
}


// ==========================================
// 7. DISPLAY DEFAULT APPLICATION DATA
// ==========================================

console.log("========== Default SpendWise Data ==========");

console.log(
    "Default Monthly Budget:",
    currency,
    monthlyBudget
);

console.log(
    "Default Total Expenses:",
    currency,
    totalExpenses
);

console.log(
    "Default Remaining Balance:",
    currency,
    remainingBalance
);

console.log("=============================================");
```
