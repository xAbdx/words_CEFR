# Vocabulary Word Cards

A responsive English vocabulary practice app with randomly selected word cards for all six CEFR levels: A1, A2, B1, B2, C1, and C2.

## Features

- Displays one random card for each CEFR level by default.
- Choose a level and show six random cards at that level.
- Filter the displayed cards by CEFR level.
- Shuffle to get a new set of cards.
- View each word's part of speech, definition, and example sentences.
- Hear a word pronounced using the browser's built-in speech synthesis when supported.
- Responsive layout for desktop, tablet, and mobile.

## Getting started

You need Node.js and npm installed.

1. Install the project dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

| Command | Description |
| --- | --- |
| `npm start` | Starts the local development server. |
| `npm test -- --watchAll=false` | Runs the test suite once. |
| `npm run build` | Creates an optimized production build in `build/`. |

## Vocabulary data

Vocabulary is loaded from [`src/vocabulary_600.json`](./src/vocabulary_600.json). Each entry includes a word, part of speech, CEFR level, definition, and example sentences.

## Deployment

The app can be deployed to static hosting providers such as Vercel. For Vercel, import the repository and use the default Create React App settings:

- **Build command:** `npm run build`
- **Output directory:** `build`

No server-side environment variables are required.
