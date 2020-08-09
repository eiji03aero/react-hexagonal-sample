# react-hexagonal-sample
- Sample project to describe React + Hexagonal architecture

# Todo
- error handling
  - fp-ts is coming in here to rescue shitty code!
  - utilize notification to give feedback for user
- todos filter
  - search by keyword
  - search by tag
  - sort

# Models

```
- Todo
  - properties
    - id: string
    - title: string
    - done: boolean
    - tagIds: string[]
    - createdAt: Datetime
    - updatedAt: Datetime

- Notification
  - properties
    - id: string
    - message: string
    - createdAt: Datetime
    - updatedAt: Datetime

- Tag
  - properties
    - id: string
    - name: string
    - color: string
    - createdAt: Datetime
    - updatedAt: Datetime
```
