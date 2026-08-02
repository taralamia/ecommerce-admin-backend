# Ecommerce Admin Backend

## Tech Stack

* Node.js
* Express.js
* TypeScript
* PostgreSQL
* TypeORM
* JWT Authentication
* bcrypt
* Docker

---

## Completed Features

### Project Setup

* Express + TypeScript project initialized
* PostgreSQL running with Docker
* TypeORM configured
* Environment validation
* Global error handling
* Logger middleware
* Standard API response formatter

### Database

Implemented and migrated the following entities:

* Permission Group
* Permission
* Role
* Role Permission
* User

All migrations have been generated and executed successfully.

---

## Authentication

Implemented JWT based authentication.

### Features

* User login
* Password hashing using bcrypt
* Access Token generation
* Refresh Token generation
* Authentication middleware
* `/auth/me` endpoint
* Password and refresh token are never returned in API responses

---

## Role Based Access Control (RBAC)

Implemented the RBAC foundation.

### Access Model

User → Role → Permissions

### Features

* Authentication middleware
* Permission middleware
* Route protection using permissions
* Super Administrator has full access
* Catalog Manager has limited catalog permissions
* Unauthorized requests return **401**
* Forbidden requests return **403**

---

## Database Seeding

Seed script creates:

* 9 Permission Groups
* 41 Permissions
* Super Administrator Role
* Catalog Manager Role
* Super Administrator User
* Catalog Manager User

### Seeded Accounts

#### Super Administrator

| Field    | Value                               |
| -------- | ----------------------------------- |
| Email    | `admin@example.com`                 |
| Password | `Admin@1234`                        |
| Role     | Super Administrator                 |
| Access   | Full system access (41 permissions) |

#### Catalog Manager

| Field    | Value                                                                 |
| -------- | --------------------------------------------------------------------- |
| Email    | `catalog@example.com`                                                 |
| Password | `Catalog@1234`                                                        |
| Role     | Catalog Manager                                                       |
| Access   | Catalog modules only (no Role, User, or Permission management access) |


---

## API Tested

Successfully tested with Postman.

* Login
* Protected routes
* `/auth/me`
* RBAC authorization
* Super Admin access
* Catalog Manager access restrictions

---

## Current Progress

✅ Project setup

✅ Database design

✅ Authentication

✅ RBAC foundation

✅ Database seeding

✅ Role management (basic)

---

## Remaining Work

* Refresh Token Rotation
* Logout
* Complete Permission CRUD
* Complete Role CRUD
* Complete User CRUD
* Media Module
* Category Module
* Brand Module
* Attribute Module
* Product Module
* Final API testing and documentation
