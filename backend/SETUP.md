# Astrofit Backend Setup

## Quick Fix for MongoDB Connection Error

The error you're seeing occurs because the MongoDB connection URI is not defined. Follow these steps to fix it:

### 1. Create Environment File

Copy the `env.example` file to `.env`:

```bash
cp env.example .env
```

### 2. Configure MongoDB

You have two options:

#### Option A: Local MongoDB
If you have MongoDB installed locally, the default configuration should work:
```
MONGODB_URI=mongodb://localhost:27017/astrofit
```

#### Option B: MongoDB Atlas (Cloud)
If you want to use MongoDB Atlas, update the `.env` file with your Atlas connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/astrofit?retryWrites=true&w=majority
```

### 3. Update JWT Secret

Generate a secure JWT secret and update the `.env` file:
```
JWT_SECRET=your_secure_jwt_secret_here
```

### 4. Start the Server

```bash
npm run dev
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn

## Installation

```bash
npm install
```

## Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed:*` - Run various seed scripts for database population


