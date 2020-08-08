# react-hexagonal-sample
- Sample project to describe React + Hexagonal architecture

# Todo
- tags
- error handling
  - fp-ts is coming in here to rescue shitty code!
- writequery, readquery wont be atomic once its put inside async
  - not a problem, but better be solved

# Models

```
- Todo
  - properties
    - id: string
    - title: string
    - done: boolean
    - createdAt: Datetime
    - updatedAt: Datetime

- Notification
  - properties
    - id: string
    - message: string
    - createdAt: Datetime
    - updatedAt: Datetime
```
