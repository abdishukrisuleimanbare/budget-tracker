# SpendWise Dashboard Shell

## Project Overview

SpendWise is a personal budgeting dashboard designed to provide a clear visual overview of monthly financial spending.

For Week 4, I rebuilt the SpendWise tracker as a responsive dashboard shell using CSS Grid and Flexbox.

The dashboard contains a sidebar navigation menu, a header, and six financial category cards with realistic static financial information.

## Technologies Used

* HTML5
* CSS3
* CSS Grid
* CSS Flexbox
* CSS Custom Properties
* Responsive Media Queries

## Dashboard Components

### 1. Sidebar

The sidebar contains the SpendWise branding and navigation links for:

* Dashboard
* Budget
* Expenses
* Savings
* Reports

### 2. Header

The dashboard header contains a welcome message, the dashboard title, and the monthly budget summary.

### 3. Financial Category Cards

The dashboard includes six category cards:

* Food
* Transport
* Rent
* Entertainment
* Savings
* Utilities

Each card displays realistic static financial information including spending, budget or savings targets, and percentage progress.

## CSS Grid

CSS Grid is used for the overall dashboard structure and for arranging the financial category cards.

The main dashboard uses two columns on larger screens:

* Sidebar
* Main content

The category cards are arranged in a three-column grid on larger screens.

## Flexbox

Flexbox is used inside the dashboard components.

It is used for:

* Sidebar navigation
* Header layout
* Card content
* Card headers
* Card footers

## CSS Custom Properties

The project uses CSS variables in the `:root` selector to create a reusable visual theme.

Variables include:

* Brand color
* Accent color
* Background color
* Surface color
* Primary text color
* Secondary text color
* Border color

## Responsive Design

A media query is used below 768px to create a single-column responsive layout.

The sidebar, header, navigation, and dashboard cards adapt to smaller screen sizes.

The layout was designed to be checked using the browser's DevTools Device Toolbar.

## Micro-interactions

Dashboard cards include hover and keyboard-focus interactions.

The interactions use:

* `transform`
* `box-shadow`
* CSS transitions

The transition duration is 200ms, which is within the required 250ms limit.

## Dark Theme

As a stretch goal, the project includes a dark theme using:

```css
@media (prefers-color-scheme: dark)
```

The dark theme changes the CSS custom property values while keeping the same dashboard structure.

## Project Files

```text
index.html
style.css
README.md
```

## Author

Abdishukri Suleiman Bare

## Project Status

Week 4 SpendWise Dashboard Shell completed with CSS Grid, Flexbox, responsive design, CSS custom properties, micro-interactions, and a dark-theme stretch goal.
