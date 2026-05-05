# PPL Exam Frontend

A responsive Next.js exam practice application built with React, Redux Toolkit, and TailwindCSS.

## Features

- Login and registration with name and email only.
- Users, exams, sessions, answers, and results are stored locally in Redux.
- Dummy exam data is initialized in the Redux exam slice.
- Protected exam pages redirect unauthenticated users to login.
- Functional exam flow: exam list, chapter selection, setup, exam taking, submit, and immediate result review.
- Result screen shows score, wrong answers, unanswered count, duration, and correct answer review.
- UI components are organized with Atomic Design:
  - `components/atoms`
  - `components/molecules`
  - `components/organisms`
  - `components/templates`
  - `app/*` pages

## Tech Stack

- Next.js
- React
- Redux Toolkit
- React Redux
- TailwindCSS
- TypeScript

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm run lint
npx tsc --noEmit
```

`npm run build` requires Node.js `>=20.9.0` because this project uses Next.js 16.
