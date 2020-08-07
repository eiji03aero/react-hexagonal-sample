# react-hexagonal-sample
- Sample project to describe React + Hexagonal architecture

# Todo
- edit todo title
- notifications
  - add models
    - success
    - error
  - service exposes event emitter
  - integrate with ui
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
