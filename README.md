# react-hexagonal-sample
- Sample project to describe React + Hexagonal architecture

# Todo
- validations
  - add validte function on entities
  - utilize notification to give feedback for user
- edit tags on todo
  - should have dropdown to select
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
