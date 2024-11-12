# Univer GUI tools

## Available Scripts

In the project directory, you can run:

### `npm run schema`

Build json schema for validation. Need to build json schema after any change in `IDocumentData` type.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run deploy`

Deploy to github pages.

### How to add more tools

1. Add a tool information in `tools.ts`, which will be added to the homepage list
2. Create a new folder in the `pages` directory to write tool routes, and add the routes to `App.tsx`
3. Import the component into `App.tsx`