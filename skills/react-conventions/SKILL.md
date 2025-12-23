---
name: react-conventions
description: Apply common React conventions for this codebase when creating or editing components, hooks, services, and UI. Use when asked to follow React best practices, keep patterns consistent, or define project conventions.
---

# React Conventions

## Project structure

- Use feature folders under `src/features/<feature>` for feature-specific UI, hooks, and logic.
- Use `src/ui` for reusable, feature-agnostic UI components.
- Use `src/hooks` for shared hooks and `src/services` for API/supabase access.
- Use `src/utils` for helpers and shared constants like React Query keys.

## Naming and file types

- Use `PascalCase` for React components and `camelCase` for hooks/utilities.
- Use `.jsx` for React components and `.js` for non-React modules.
- Prefer named exports for services and hooks; default export for single UI components is acceptable.

## Components and hooks

- Use functional components and React hooks; avoid class components.
- Keep components small and focused; extract reusable UI into `src/ui`.
- Follow the Rules of Hooks; keep hook usage at the top level of components.

## Data fetching and state

- Use `@tanstack/react-query` for server state and caching.
- Keep API calls in `src/services` and expose them via `use*` hooks in `src/hooks`.
- Store query keys in `src/utils/queryKeys.js`.

## Styling

- Use `styled-components` for component styling.
- Prefer component-scoped styles and shared design tokens from CSS variables.

## Error handling and docs

- Handle API errors in services and surface readable messages.
- Use concise JSDoc for service functions when it improves clarity.
