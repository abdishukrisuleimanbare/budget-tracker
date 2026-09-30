````markdown
# SpendWise Budget Tracker

SpendWise is a personal budget tracking dashboard designed to help users understand their monthly budget, expenses, and remaining balance.

This project is being developed progressively as part of the PLP Software Development/Web Development capstone.

## Week 6: JavaScript Foundation

This week transforms SpendWise from a static visual dashboard into a JavaScript-powered application that can collect user information and perform basic budget calculations.

## What SpendWise Does

The current JavaScript version allows a user to:

- Enter a monthly budget.
- Enter total expenses.
- Calculate the remaining balance.
- Determine whether the user is within or over their budget.
- Display the calculated results in the browser console.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- CSS Grid
- CSS Flexbox
- CSS Custom Properties
- Responsive Design

## JavaScript Concepts Implemented

### 1. Variables

JavaScript variables are used to store important application data.

Examples include:

```javascript
let appName = "SpendWise";
let monthlyBudget = 50000;
let totalExpenses = 0;
let remainingBalance = monthlyBudget;
````

Variables are also used to store user-provided budget and expense values.

### 2. Data Types

The project uses different JavaScript data types, including:

* Strings for application names and messages.
* Numbers for budgets and expenses.

User input from `prompt()` is converted from text into numbers using:

```javascript
Number(userBudgetInput);
```

### 3. User Input

SpendWise collects user information using JavaScript `prompt()`.

The user provides:

* Monthly budget.
* Total expenses.

Example:

```javascript
let userBudgetInput = prompt(
    "Enter your monthly budget in KSh:"
);
```

The information is then stored in variables for processing.

### 4. Calculations

SpendWise calculates the remaining balance using:

```text
Remaining Balance = Monthly Budget - Total Expenses
```

For example:

```text
Monthly Budget = KSh 50,000
Total Expenses = KSh 37,500

Remaining Balance = KSh 12,500
```

### 5. Functions

A reusable function is used to organize the budget calculation:

```javascript
function calculateRemainingBudget(budget, expenses) {
    return budget - expenses;
}
```

The function accepts the budget and expenses as parameters and returns the remaining balance.

Using a function avoids repeating the same calculation and makes the program easier to maintain.

### 6. Conditional Logic

The application uses conditional statements to determine the budget status.

The program identifies whether:

* The user is within the budget.
* The user has used the full budget.
* The user has exceeded the budget.

### 7. Console Output

Calculated results are displayed in the browser console using `console.log()`.

The output includes:

* Application name.
* Monthly budget.
* Total expenses.
* Remaining balance.
* Budget status.

## Project Files

```text
budget-tracker/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

### index.html

Contains the SpendWise dashboard structure and links the JavaScript file.

### style.css

Contains the visual design, CSS Grid and Flexbox layout, responsive design, CSS variables, and dashboard styling.

### script.js

Contains the JavaScript variables, user input, calculations, reusable functions, validation, conditional logic, and console output.

### README.md

Documents the project and explains the JavaScript concepts implemented.

## Testing

The application was tested using different budget and expense values, including:

* Expenses lower than the budget.
* Expenses equal to the budget.
* Expenses greater than the budget.
* Invalid user input.

The results are displayed clearly in the browser console.

## Future Improvements

Future versions of SpendWise can add:

* Transaction entry forms.
* Automatic expense categorization.
* Dynamic dashboard updates.
* Local storage.
* Budget progress indicators.
* Charts and reports.
* More advanced JavaScript functionality.

## Conclusion

The Week 6 JavaScript foundation provides the basic programming logic required to develop SpendWise from a static dashboard into an interactive budget tracking application.

```
```
