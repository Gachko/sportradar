# Tech Stack

- React – UI layer. Simple component model and hooks fit the app’s size and complexity.
- Material UI (MUI) – ready-made accessible components (Dialog, Button, List, etc.) for fast, consistent UI
- Zustand – lightweight state management to keep a centralized store (games list + actions) without the overhead of larger solutions; perfect for a small app.
- Jest – unit tests for store and components, focused on user-visible behavior.

# Getting Started

- Install dependencies: npm i
- Start the dev server: npm run dev

App will be available at: http://localhost:5173/

# What’s Implemented

- Start/finish/update game flows, summary, game list

# Possible Improvements

- Dialogs architecture: introduce a Modal Provider (context) with a single modal root, extract tiny reusable hooks
- Validation & error reporting: Show field-specific messages (required, must be integer, must be ≥ 0, teams must differ), disable submit while invalid etc.
- Performance: Memoize list items (React.memo), virtualized list rendering
- Constants & configuration: Extract UI strings, labels, and magic numbers to constants.ts etc.

# Commit Style

Commits are brief and minimal on purpose — this was a solo test task and I kept messages short while coding “for myself.”
