# SpendWise Dashboard

## Week 4 - Dashboard Shell with CSS Grid and Flexbox

SpendWise is a personal finance dashboard designed to help users view and organize their monthly financial information.

This week's project focuses on building the visual dashboard structure using modern CSS layout techniques.

## Project Features

The dashboard contains:

* Sidebar navigation
* Dashboard header
* Monthly budget summary
* Food category card
* Transport category card
* Rent category card
* Entertainment category card
* Savings category card
* Utilities category card

## CSS Grid

CSS Grid is used to create the main dashboard structure.

The page is divided into:

* Sidebar
* Main content area

CSS Grid is also used to arrange the six financial category cards into a responsive dashboard layout.

## Flexbox

Flexbox is used inside different parts of the dashboard, including:

* Sidebar navigation
* Header
* Dashboard cards
* Card headers
* Card footer information

This makes the content easier to align and organize.

## CSS Custom Properties

The project uses CSS custom properties in the `:root` selector to create a consistent theme.

Variables include:

* Brand color
* Accent color
* Background color
* Surface color
* Primary text color
* Secondary text color
* Border color
* Shadow color

## Responsive Design

A media query is included for screens below 768px.

On smaller screens:

* The sidebar and main content become a single-column layout.
* Navigation items wrap appropriately.
* Dashboard cards stack vertically.
* The header changes to a vertical layout.

The responsive layout can be tested using the browser's DevTools Device Toolbar.

## Micro-interactions

Dashboard cards include subtle hover and keyboard-focus effects.

The interaction uses:

* `transform`
* `box-shadow`
* CSS transitions

The transition duration is 200ms, which meets the assignment requirement of 250ms or less.

## Dark Theme

A dark theme is included as a stretch goal using:

```css
@media (prefers-color-scheme: dark)
```

The dark theme changes the CSS custom properties while keeping the same dashboard structure.

## Technologies Used

* HTML5
* CSS3
* CSS Grid
* Flexbox
* CSS Custom Properties
* Responsive Design
* GitHub

## Project Structure

```text
budget-tracker/
│
├── index.html
├── style.css
└── README.md
```

## Project Status

Week 4 SpendWise Dashboard Shell completed with a responsive Grid and Flexbox layout.
