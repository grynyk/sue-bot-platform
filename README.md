# 🚀 Sue bot Platform

Sue bot is a Telegram bot for a Ukrainian cosmetics company [Sue](https://suemade.com), built using **NestJS** and **Telegraf**.

> Get started with the bot: [@mysuebot](https://t.me/mysuebot)

## 📌 Project Details

-   **Language:** TypeScript
-   **Framework:** NestJS
-   **Telegram Bot Library:** Telegraf
-   **Database:** PostgreSQL
-   **ORM:** TypeORM
-   **Architecture:** Monorepo

## 📌 Project Structure

```
apps/
├── bot/                       # Telegram bot application
│   ├── src/
│   │   ├── crons/             # Cron jobs
│   │   ├── models/            # Data models
│   │   ├── scenes/            # Telegram bot scenes
│   │   ├── shared/            # Shared modules and utilities
│   │   ├── utils/             # Utility functions
│   │   ├── bot.module.ts      # Bot module
│   │   ├── main.ts            # Entry point
│   │   └── ...
│   └── ...
libs/
├── api/                       # Shared API library
│   ├── modules/               # Database management modules
│   ├── api.module.ts          # API module
│   └── ...
└── core/                      # Core library
    ├── config/                # Configs
    ├── utils/                 # Utility functions
    ├── core.module.ts         # Core module
    └── ...
```

## 🚀 Getting Started

To run the project locally, follow these steps:

1.  Clone the repository.

2.  Install dependencies:

    ```bash
    yarn install
    ```
3.  Create .env file with variables listed in GLOBAL_VARIABLES enum (`libs/core/src/lib/config/config-keys.ts`)
4.  Start the bot:

    ```bash
    yarn start:bot
    ```

## 📝 TODO

-   [ ] Store messages id to delete at the end of the day in platform context
-   [ ] Implement serum builder
-   [ ] Add email to subscription scene
-   [ ] Implement database-based storage and retrieval for skin type test scene.
-   [ ] Implement database-based storage and retrieval for recipes scene.
-   [ ] Implement database-based storage and retrieval for tips scene.
