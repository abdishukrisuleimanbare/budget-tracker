# SpendWise Budget Tracker

SpendWise is an interactive personal budgeting dashboard built with HTML, CSS, and JavaScript. It helps a user record expenses, change a monthly budget, and see the remaining balance update on the webpage.

## Improvements made this week

- Added a form to record an expense description, category, and amount.
- Added a form to update the monthly budget.
- Added a transaction table with a Remove button for each record.
- Updated the budget summary and category cards dynamically after changes.
- Added feedback messages and input validation.
- Preserved a responsive dashboard layout using CSS Grid and Flexbox.

## Conditional statements

The `getBudgetStatus()` function uses `if`, `else if`, and `else` to compare the remaining budget with zero:

- If the remaining balance is below zero, the application reports that the budget has been exceeded.
- If the remaining balance is exactly zero, it reports that the budget has been fully used.
- Otherwise, it reports that the user is within budget.

Conditionals also validate descriptions and amounts before an expense is saved.

## Arrays and multiple records

The `expenses` array stores expense objects. Each object has an `id`, `description`, `category`, and `amount`. For example:

```javascript
{ id: 1, description: "Groceries and meals", category: "Food", amount: 7500 }
```

The `categoryDetails` array stores the category names, icons, and descriptions used to render the category cards. New expenses are added with `expenses.push()`. Removing a record uses `filter()` to create an array without the selected expense.

## Loops

`calculateTotalExpenses()` uses a `for...of` loop to add every expense amount. Other loops process the expense array to calculate category totals and create the table rows and category cards. This means the display changes as the array changes rather than relying on individually named expense variables.

## DOM manipulation

JavaScript selects webpage elements using `document.querySelector()`. It updates their text using `textContent`, creates rows and cards with `document.createElement()`, and inserts them into the page. `updateDashboard()` recalculates totals and refreshes the summary, category cards, and expense list.

## Events and user interaction

Event listeners respond to form submissions:

- Submitting the expense form validates and adds a new expense.
- Submitting the budget form validates and updates the monthly budget.
- Clicking a Remove button deletes that expense and refreshes the dashboard.

`event.preventDefault()` prevents a form submission from reloading the page. Feedback messages explain whether an action succeeded or needs correction.

## Challenges and solutions

- **Keeping the totals accurate:** The totals are recalculated from the `expenses` array each time a record is added or removed.
- **Handling invalid values:** Required fields and JavaScript checks prevent blank descriptions and zero, negative, or invalid amounts from being accepted.
- **Keeping the dashboard in sync:** A shared `updateDashboard()` function updates the budget summary, category cards, and transaction table after every successful change.
- **Displaying user-provided text safely:** The application uses `textContent` when placing descriptions on the page.

## Project files

- `index.html` — dashboard structure, budget and expense forms, and display areas.
- `style.css` — layout, dashboard styling, responsive rules, and status styles.
- `script.js` — sample records, calculations, conditionals, loops, DOM updates, and event listeners.
- `README.md` — project overview and documentation of this week's JavaScript concepts.

## How to run and test

1. Open `index.html` in a modern browser, or use the Live Server extension in Visual Studio Code.
2. Check that the initial budget is KSh 50,000, total expenses are KSh 37,500, and remaining balance is KSh 12,500.
3. Add an expense with a description, category, and positive amount. Confirm the total, remaining balance, category card, and transaction table update.
4. Remove an expense. Confirm the totals update again.
5. Set a lower budget, such as KSh 30,000. The application should show an over-budget message because the sample expenses total KSh 37,500.
6. Try a blank description or an amount of zero. Confirm that validation feedback appears and the record is not added.

## Technologies

HTML5, CSS3, and JavaScript (no external libraries required).
