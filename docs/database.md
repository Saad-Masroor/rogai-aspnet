# ROGAI Database Design

## Users Table
- Id (PK)
- Username (unique)
- PasswordHash
- CreatedAt

## Runs Table
- Id (PK)
- UserId (FK → Users)
- Health
- Gold
- CurrentLevel
- IsAlive (bool)
- StartedAt

## Events Table
- Id (PK)
- RunId (FK → Runs)
- EventType
- Outcome
- Timestamp

## Leaderboard Table
- Id (PK)
- UserId (FK → Users)
- Score
- RunDuration