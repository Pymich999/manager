# Quick Start Guide

Get your Post Planner app running in minutes.

## Step 1: Start MongoDB

Make sure MongoDB is installed and running on your system.

```bash
# Windows: Start MongoDB service
# Or if installed manually:
mongod
```

## Step 2: Start the Backend

```bash
cd backend
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB connected successfully
```

## Step 3: Test Backend (Optional)

Open browser and visit: `http://localhost:5000`

You should see: `{"message":"Post Planner API is running"}`

## Step 4: Update Frontend API URL

If testing on a **physical device**, update the API URL:

1. Open `frontend/src/services/api.js`
2. Find your computer's IP address:
   - Windows: `ipconfig` (look for IPv4)
   - Mac/Linux: `ifconfig` or `ip addr`
3. Change the API_URL:
```javascript
const API_URL = 'http://YOUR_IP:5000/api';
// Example: 'http://192.168.1.10:5000/api'
```

## Step 5: Start the Frontend

```bash
cd frontend
npx expo start
```

## Step 6: Run the App

Choose your platform:
- Press `a` for Android emulator
- Press `i` for iOS simulator (Mac only)
- Scan QR code with **Expo Go** app on your phone

## First Time Setup

1. Register a new account
2. Create your first client
3. Create a post and schedule it
4. View it in the calendar

## Common Issues

**Cannot connect to backend from phone:**
- Use your computer's IP instead of localhost
- Make sure both devices are on the same WiFi network
- Check Windows Firewall settings

**MongoDB connection error:**
- Make sure MongoDB is running
- Check the MONGO_URI in backend/.env

**Expo app not loading:**
- Run `npx expo start -c` to clear cache
- Make sure you're using Expo Go app on your phone

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Customize the app colors and branding
- Add your Cloudinary credentials for media uploads
- Build and deploy to Play Store

Enjoy building! 🚀
