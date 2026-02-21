# ROGAI Architecture

Browser (frontend)
  ↓ (HTTP Requests)
ASP.NET Core Razor Pages (backend)
  ↓ (Business Logic / Services)
SQL Server Database (persistent storage)

Responsibilities:

- **Browser:** Displays UI, sends requests, receives responses
- **ASP.NET Core:** Handles requests, runs game logic, communicates with database
- **Database:** Stores users, runs, events, and leaderboard data