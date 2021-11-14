# react-hexagonal-sample
- Sample project to describe React + Hexagonal architecture
- Write qiita article on this: https://qiita.com/eiji03aero/items/8fba76877132467611cd

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
