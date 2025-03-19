# 🚀 Sue bot Platform

Sue bot is a Telegram bot for a Ukrainian cosmetics company [Sue](https://suemade.com), built using **NestJS** and **Telegraf**.

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
    ├── src/                   
    │   ├── core/              
    │   ├── shared/           
    │   ├── scenes/           
    │   ├── app.module.ts      
    │   ├── main.ts            
    │   └── ...
    └── ...
libs/
└── api/                       # Shared API library
    ├── src/                   
    └── ...
```

## 📝 TODO

-   [ ] Implement database-based storage and retrieval for skin type test results.
-   [ ] Finalize migration to an Nx workspace with separate bot and API projects for better scalability and maintainability.

