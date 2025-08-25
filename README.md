# My Project

> Assignment-4: Library / Book Management System (Frontend + Backend)

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

This project is a **Library Management System** that allows users to:

- View available books
- Borrow books
- Track total borrowed books
- Show availability status of books  

The project has **frontend** built with **React & TypeScript**, and **backend** with **Node.js, Express, and MongoDB**.

---

## Features

- Borrow books with quantity and due date
- Show list of borrowed books and total quantity per book
- Track book availability (if copies reach 0 → unavailable)
- Toast notifications for actions
- Responsive and interactive UI

---

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, React-Toastify
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **State Management:** Redux Toolkit (RTK Query)
- **Others:** ESLint, Prettier

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ItsWahid/Assignment-4.git


cd my-project/frontend
npm install
cd my-project/backend
npm install

DB_URL=mongodb+srv://assignment-4:assignment-4@cluster0.pwxh5lm.mongodb.net/Bookstore?retryWrites=true&w=majority&appName=Cluster0
PORT=2000

