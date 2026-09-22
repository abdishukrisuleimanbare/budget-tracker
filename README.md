
# SpendWise Dashboard Shell

## Week 4: Rebuild the Tracker's Layout with Flexbox and Grid

### Project Overview
SpendWise is a personal finance dashboard shell designed to provide a clear visual overview of monthly budgeting and spending categories.

This project was developed as part of the PLP Web Development capstone. It focuses on responsive layout, modern CSS techniques, accessibility, and visual design. All financial information is static demonstration content.

## Technologies Used
- HTML5
- CSS3
- CSS Grid
- CSS Flexbox
- CSS Custom Properties
- Media Queries
- Google Fonts (Inter)

## Project Files

### 1. index.html
Contains the dashboard structure, including:
- Sidebar navigation
- Dashboard header and profile
- Monthly financial summary
- Six financial category cards
- Progress indicators
- Footer

Semantic HTML elements such as `header`, `nav`, `main`, `section`, `article`, and `footer` organize the content.

### 2. style.css
Controls the dashboard's design and responsive behavior.

- CSS Grid creates the overall dashboard layout and card grids.
- Flexbox arranges the sidebar, header, navigation, and card content.
- CSS custom properties define the theme colors.
- Media queries adapt the layout to smaller screens.
- Hover and keyboard-focus transitions add subtle card interactions.
- A dark theme is supported through `prefers-color-scheme: dark`.

## Responsive Design
The dashboard uses a two-column layout on larger screens. Below 768px, the page changes to a single-column layout, with the sidebar above the main content.

The layout can be tested using the browser's DevTools Device Toolbar.

## Accessibility
- Semantic HTML structure
- Accessible navigation label
- Descriptive page title
- Keyboard-focusable category cards
- Visible keyboard-focus styles
- Text labels alongside financial information

## Dashboard Categories
1. Food & Groceries
2. Transport
3. Rent & Housing
4. Entertainment
5. Savings
6. Utilities

## How to Run
1. Clone or download this repository.
2. Open the project folder in Visual Studio Code.
3. Open `index.html` in a browser, or use the VS Code Live Server extension.

## Learning Outcomes
This project demonstrates practical use of CSS Grid, Flexbox, responsive media queries, CSS variables, and interactive focus states to build a modern dashboard shell.

## Author
Abdishukri Suleiman Bare

## Project Repository
https://github.com/abdishukrisuleimanbare/budget-tracker
