# 🚀 START HERE - Post Planner Setup

## Your App is Ready!

Everything has been built and configured. Follow these steps to get running.

## ✅ What's Already Done

- ✅ Backend with Express + MongoDB
- ✅ Frontend with React Native + Expo
- ✅ All dependencies installed
- ✅ Authentication system
- ✅ Client management
- ✅ Post scheduling
- ✅ Calendar view
- ✅ Complete documentation

## 📋 Quick Setup (3 Steps)

### Step 1: Start MongoDB

**Option A - If you have MongoDB installed locally:**
```bash
# Windows: MongoDB service should auto-start
# Or manually start:
mongod
```

**Option B - Use MongoDB Atlas (Cloud - Free):**
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create cluster (takes 3-5 min)
4. Get connection string
5. Update `backend/.env`:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/post-planner
```

### Step 2: Start Backend

Open a terminal:
```bash
cd backend
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB connected successfully
```

### Step 3: Start Frontend

Open a NEW terminal:
```bash
cd frontend
npx expo start
```

Then:
- Press `a` for Android emulator
- Press `i` for iOS simulator (Mac only)
- Scan QR with **Expo Go** app on your phone

## 📱 Testing on Physical Device

If using your phone instead of emulator:

1. Install **Expo Go** app from Play Store/App Store
2. Find your computer's IP address:
   - Windows: Run `ipconfig` → Look for IPv4 (e.g., 192.168.1.10)
   - Mac: Run `ifconfig` → Look for inet
3. Update API URL in `frontend/src/services/api.js`:
```javascript
const API_URL = 'http://192.168.1.10:5000/api';  // Use YOUR IP
```
4. Make sure phone and computer are on same WiFi
5. Scan QR code from Expo

## 🎯 First Use

1. Open the app
2. Click "Register"
3. Create account (name, email, password)
4. Go to "Clients" tab → Click + → Add a client
5. Go to "Posts" tab → Click + → Create a post
6. Go to "Calendar" tab → See your scheduled post!

## 📁 Project Files

```
manager/
├── backend/          ← Node.js API
├── frontend/         ← React Native app
├── README.md         ← Full documentation
├── QUICKSTART.md     ← 5-minute guide
├── DEPLOY.md         ← Play Store guide
└── START_HERE.md     ← This file
```

## 🔧 Troubleshooting

**MongoDB connection error:**
```bash
# Check if MongoDB is running
mongo
```
If not installed, use MongoDB Atlas (cloud option above)

**Backend won't start:**
```bash
cd backend
npm install
npm run dev
```

**Frontend errors:**
```bash
cd frontend
npm install
npx expo start -c  # -c clears cache
```

**Can't connect from phone:**
- Use your computer's IP instead of localhost
- Check firewall (allow port 5000)
- Ensure same WiFi network

## 📸 Media Uploads (Optional - Cloudinary)

The app is **fully functional without Cloudinary**. Posts can use media URLs (links to images/videos).

**Current Setup:**
- ✅ Posts support media URLs (paste image/video links)
- ✅ Works out of the box - no setup needed
- ⚪ Direct file uploads require Cloudinary (optional)

**If you want direct file uploads:**
- Read [CLOUDINARY_SETUP.md](CLOUDINARY_SETUP.md) for full guide
- Free tier: 25GB storage, more than enough for testing
- **Recommendation:** Skip for now, add later if needed

## 🎨 Next Steps

Once it's running:

1. **Customize**: Change colors, branding in component styles
2. **Add Features**: Check PROJECT_SUMMARY.md for ideas
3. **Deploy**: Follow DEPLOY.md to publish to Play Store
4. **Backend Deploy**: Use Railway/Heroku (see DEPLOY.md)
5. **(Optional)** Set up Cloudinary for direct uploads

## 📚 Documentation

- **README.md** - Complete project docs
- **QUICKSTART.md** - Get running fast
- **DEPLOY.md** - Full deployment guide
- **PROJECT_SUMMARY.md** - What was built
- **CLOUDINARY_SETUP.md** - Optional media uploads guide

## 🆘 Need Help?

Common issues and fixes:

| Problem | Solution |
|---------|----------|
| MongoDB error | Use MongoDB Atlas cloud |
| Port 5000 in use | Change PORT in backend/.env |
| Expo errors | Run `npx expo start -c` |
| Phone can't connect | Update API URL with your IP |
| Build errors | Delete node_modules, reinstall |

## ✨ Features Built

- ✅ User authentication
- ✅ Client management
- ✅ Post scheduling
- ✅ Calendar view
- ✅ Multi-platform support
- ✅ Beautiful mobile UI
- ✅ Pull-to-refresh
- ✅ Profile management

## 🚀 Ready to Launch?

When you're ready to deploy:

1. Read **DEPLOY.md** (complete guide)
2. Build with `eas build --platform android`
3. Submit to Google Play Store
4. Deploy backend to Railway/Heroku

---

**Everything is ready. Just follow Step 1, 2, 3 above and you're live!**

Happy building! 🎉
