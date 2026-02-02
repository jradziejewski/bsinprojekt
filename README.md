# BSIN + BDAMI - Final Project

- Backend is Express + Prisma + SQLite, all in `backend/`
- Frontend is Expo + React Native + React Navigation, all in `mobile/`
- Passwords are hashed with `bcrypt`
- Token persistence handled with AsyncStorage
- Backend enforces ownership of products
- Frontend only shows Edit/Delete buttons for owner
- `/` route redirects automatically based on authentication

## 🏃 App Flow

1. Go to `/` → redirects based on login:
- Authenticated → `/me`
- Not logged in → `/login`

2. Auth:

- `/login` → Login with username + password

- `/register` → Create account

- JWT token is saved automatically in AsyncStorage

- `/me` → Profile screen

3. Products:

- `/products` → List all products

- Shows who added each product

- Logged-in users can create, edit, delete their own products

- Global products (no owner) are read-only

4. Logout clears token → redirects to `/login`

---

## 💻 Requirements

- Node.js ≥ 18
- npm ≥ 9
- Optional: `yarn`
- Web browser (for Expo web) or Expo Go app on mobile
- (No Android Studio required)

---

## ⚡ Backend Setup

1. Navigate to backend:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Initialize database

```bash
npx prisma migrate dev --name init
```

This creates dev.db and applies migrations.

4. Start the backend server
```bash
node index.js
```

Server runs on `http://localhost:3000`.

Check with 
```bash
curl http://localhost:3000/health
```

Should return `{"ok":true}`

## 📱 Mobile Frontend Setup (Expo)
1. Navigate to mobile folder

```bash
cd mobile
```

2. Install dependencies
```bash
npm install
```

3. Install AsyncStorage (used for JWT persistence)
```bash
npx expo install @react-native-async-storage/async-storage
```

4. Start Expo
```bash
npm start
```

- Press `w` to open in **web browser**
- or scan QR code with Expo Go app on your phone

## ✅ How to Run Everything in One Go

From project root:
```bash
# Start backend
cd backend
node index.js
# Open a new terminal for frontend
cd ../mobile
npm start
# press "w" to open app in browser
```

Backend runs on `http://localhost:3000`

Frontend runs in browser or Expo Go.

##  API Endpoints

Auth
```bash
POST /auth/register
POST /auth/login
GET  /auth/me
```

Products
```
GET    /products          # Anyone
POST   /products          # Authenticated
PUT    /products/:id      # Owner only
DELETE /products/:id      # Owner only
```
