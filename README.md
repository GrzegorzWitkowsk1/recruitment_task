# React + TypeScript + Vite + shadcn/ui

Recruitment task application.

## Running locally

1) Install dependencies

```bash
npm install
```

2) Run project

```bash
npm run dev
```

## Decisions

### Files structure

I decided to keep everything in folders like in a real project.

config - configuration of values in selects like categories etc. 

mocks - Mocks of default values of the table. In a production project it will probably be used only for tests

store - store with products, pagination, actions on products. In production it would probably be server state (TanStack Query, etc.)

views - views in the app. In production I will probably divide views into Auth and Unauth. There are files/folders like schema.tsx, types.ts, components folder etc. When I'm working, I split the code into as small parts as possible/necessary

### Code decisions not supported by task requirements 
- store for products - In normal app it would be server state probably. I wanted to put all the actions and data in one place to have easy access to properties 
- Field required - In the form I placed text and the `*` character in the fields which are required. In my opinion we need to inform the user as clearly as possible whether each field is required, so I decided to add this 
- default values - I did not add any default values to the form, as per the requirements. If it were a real project, I would probably add a default tax rate. 
- net price/gross price calculating - It was not specified so I decided that when the user fills net price and gross price without tax rate, and then fills tax rate, the prices will recalculate based on the last touched price. The same scenario runs every time the tax rate changes
- Clearing the tax rate - When the user clears the VAT field, the already calculated price stays untouched and is only recalculated after a new tax rate is entered

### Hosting

Project is hosted on Vercel. 
URL: 
https://recruitment-task-flame-eight.vercel.app

## What would I add? 

If this project were in production, I would add tests and maybe try to handle more data in the product table. I would move pagination to the backend (as it scales), and maybe add search for products. I will probably move some thing as a global too like toast logic - I will add handling toasts as a context for example. I hope I met all the requirements of the task.

