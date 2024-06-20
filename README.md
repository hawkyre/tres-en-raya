# Tres en raya

A simple tic-tac-toe game built with Next.js, Typescript, TailwindCSS, MongoDB and Prisma.

## Getting Started

> This setup assumes you're using [Yarn](https://yarnpkg.com/) as your package manager. Feel free to use npm or pnpm instead.

1. Clone the repository
2. Run `yarn install` to install dependencies
3. Set the DATABASE_URL environment variable to a MongoDB database [*with a replica set deployment for transaction support*](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb-typescript-mongodb)
4. Execute `npx prisma db push` to initialize the database 
5. Run `yarn dev` to start the development server

## The Tic-Tac-Toe algorithm

The board is always represented as a string of the format `"........."` (9 characters) where `.` can be `X`, `O` or `_`. The board is then rendered from top-left to bottom-right, with 3 characters for each row.

The algorithm uses regexes to validate the board, check for endgame positions and find the next move. However, since it's hard to detect row boundaries with regexes, commas are inserted every 3 characters to make it easier to detect these boundaries.

The algorithm isn't perfect to allow for some wins by the human player, namely it lacks a check for diagonal wins or forcing wins for the AI (it just plays defensively, blocking most of the human player's wins).

## Testing

Run `yarn test` to run the tests.
