# 🚀 SoftwareMeta task


## 🌐 Live API

```
https://software-meta-u9dn.vercel.app
```

---

## 📌 Project Overview

This project implements a backend system where users can:

* Register and log in securely
* Create, update, and delete their own  posts
* View all public posts
---

## 🛠 Tech Stack

* **Backend Framework:** NestJS (Node.js)
* **Database:** PostgreSQL (Neon)
* **ORM:** TypeORM
* **Authentication:** JWT 
* **Security:** bcrypt, helmet - cors
* **Validation:** class-validator / ValidationPipe

---


## 🔐 Authentication & Security

* Secure user registration and login
* Passwords are hashed using **bcrypt**
* JWT-based authentication system
* Protected routes for creating, updating, and deleting posts
* Only post owners can modify or delete their posts

---

## 📡 API Endpoints

### 🔑 Auth

* `POST /auth/register` → Register new user
* `POST /auth/login` → Login and get JWT token

---

### 📄 Posts

* `GET /posts` → Get all posts (public)
* `POST /posts` → Create post (protected)
* `PUT /posts/:id` → Update post (owner only)
* `DELETE /posts/:id` → Delete post (owner only)

---


## 📚 API Documentation

### Swagger

* Swagger is fully working in **local environment**
* It provides complete API documentation and testing UI

⚠️ **Note:**
Swagger UI has an issue on the deployed version due to Vercel static file handling limitations.

👉 Therefore, Swagger works locally only:

```
http://localhost:3000/api-docs
```

---

## 📬 Postman Collection

A complete Postman collection is included in the project for easy testing of all endpoints.

👉 You can import it from:

```
in folder postman-docs
```

---

## ⚙️ Environment Variables

Create a `.env` file:

```
DATABASE_URL=your_database_url
ACCESS_TOKEN_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_secret
PORT=3000
```

---

## 🏗 Project Structure

```
src/
 ├── auth/
 │    ├── auth.controller.ts
 │    ├── auth.service.ts
 │    ├── auth.module.ts
 │
 ├── posts/
 │    ├── posts.controller.ts
 │    ├── posts.service.ts
 │    ├── posts.module.ts
 │
 ├── DB
 │
 ├── common/
 │    ├── guards/
 │    ├── decorators/
 │    ├── utils/
 │    ├── enums/
 │    ├── interface/
 │

```

---

## 🚀 How to Run Locally

```bash
npm install
npm run start:dev
```

Then open:

```
http://localhost:3000/api-docs
```

---

## 👨‍💻 Notes

* Clean architecture with modular structure
* Secure JWT authentication system
* Role/ownership-based authorization for posts
* Production-ready code structure

---
