# 🚀 Quick Deployment Guide

Follow these steps in order. Total time: ~2 hours.

---

## Step 1: Deploy Backend to Render (30 mins)

```bash
# 1. Setup Git
cd backend
git init
git add .
git commit -m "Initial commit"

# 2. Create GitHub repo at github.com
# Name: post-planner-backend
# Private repository

# 3. Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/post-planner-backend.git
git branch -M main
git push -u origin main
```

**4. Deploy on Render:**
- Go to [render.com](https://render.com) → Sign up
- New → Web Service → Connect GitHub
- Select `post-planner-backend`
- Build: `npm install`
- Start: `npm start`
- Add environment variables:
  ```
  PORT=5000
  MONGO_URI=mongodb+srv://Michael:Juicewrld999@cluster0.k2hrp.mongodb.net/postplanner
  JWT_SECRET=Juicewrld999mike
  ```
- Deploy!

**5. Get your backend URL:**
Example: `https://post-planner-api.onrender.com`

---

## Step 2: Update Frontend (5 mins)

**Edit:** `frontend/src/services/api.js`

Change this line:
```javascript
const API_URL = 'https://YOUR-RENDER-URL.onrender.com/api';
```

Replace `YOUR-RENDER-URL` with your actual Render URL.

---

## Step 3: Build for Play Store (30 mins)

```bash
# 1. Install EAS
npm install -g eas-cli

# 2. Login
cd frontend
eas login

# 3. Configure
eas build:configure

# 4. Build production AAB
eas build --platform android --profile production
```

Wait 10-20 minutes. Download the `.aab` file when done.

---

## Step 4: Submit to Play Store (1 hour)

**1. Create Google Play Developer account:**
- [play.google.com/console](https://play.google.com/console)
- Pay $25 one-time fee

**2. Create app:**
- App name: PostPlanner
- Free app
- Category: Business

**3. Upload required assets:**

Create these (use Canva or screenshots):
- App icon: 512x512 PNG
- Feature graphic: 1024x500 PNG
- Screenshots: At least 2 phone screenshots

**4. Fill store listing:**
```
Short description:
Plan and schedule social media posts for multiple clients

Full description:
PostPlanner helps you manage social media content across multiple clients and platforms.

KEY FEATURES:
• Manage multiple clients
• Schedule posts for Instagram, Facebook, Twitter, LinkedIn, TikTok, YouTube
• Visual calendar view
• Client notes

Perfect for social media managers and agencies!
```

**5. Upload AAB file:**
- Production → New release
- Upload your `.aab` file

**6. Submit for review**

---

## Quick Reference
 
### Your MongoDB URI (already set):
```
mongodb+srv://Michael:Juicewrld999@cluster0.k2hrp.mongodb.net/postplanner
```

### Environment Variables for Render:
```
PORT=5000
MONGO_URI=mongodb+srv://Michael:Juicewrld999@cluster0.k2hrp.mongodb.net/postplanner
JWT_SECRET=Juicewrld999mike
CLOUDINARY_CLOUD_NAME=dubb7rhoy
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### Package name (in app.json):
```
com.postplanner.app
```

---

## After Deployment

✅ **Backend URL:** https://your-app.onrender.com
✅ **Test it:** Visit URL, should see: `{"message":"Post Planner API is running"}`
✅ **App:** Submitted to Play Store
✅ **Review:** 1-7 days

---

## Common Issues

**Backend not responding:**
- Render free tier sleeps after 15 min
- First request takes 30-60 sec to wake up

**Build fails:**
- Check app.json syntax
- Run: `eas build --clear-cache`

**Play Store rejection:**
- Add privacy policy (use generator)
- Better screenshots needed
- Read rejection email carefully

---

## Next Steps After Approval

1. Share Play Store link
2. Monitor crash reports in Play Console
3. Update app regularly
4. Respond to user reviews
5. Add more features!

---

**Full details in [DEPLOY_RENDER.md](DEPLOY_RENDER.md)**

Good luck! 🎉


git remote add origin https://github.com/Pymich999/manager.git