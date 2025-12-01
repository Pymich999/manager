# Deploy to Render + Google Play Store

Complete step-by-step guide to deploy your backend to Render and your app to Play Store.

---

## Part 1: Deploy Backend to Render (Free Tier)

### Step 1: Create GitHub Repository

1. **Initialize Git in backend folder:**
```bash
cd backend
git init
git add .
git commit -m "Initial commit - Post Planner backend"
```

2. **Create GitHub repo:**
   - Go to [github.com](https://github.com) and login
   - Click "New repository"
   - Name: `post-planner-backend`
   - Make it **Private** (important - contains sensitive code)
   - Click "Create repository"

3. **Push to GitHub:**
```bash
git remote add origin https://github.com/YOUR_USERNAME/post-planner-backend.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Render

1. **Go to [render.com](https://render.com)**
   - Sign up with your GitHub account (free)

2. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select `post-planner-backend` repository
   - Click "Connect"

3. **Configure Service:**
   - **Name:** `post-planner-api` (or any name you want)
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Root Directory:** Leave blank
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`

4. **Add Environment Variables:**
   Click "Advanced" → "Add Environment Variable" and add these:

   ```
   PORT=5000
   MONGO_URI=mongodb+srv://Michael:Juicewrld999@cluster0.k2hrp.mongodb.net/postplanner
   JWT_SECRET=Juicewrld999mike
   CLOUDINARY_CLOUD_NAME=dubb7rhoy
   CLOUDINARY_API_KEY=(leave empty for now)
   CLOUDINARY_API_SECRET=(leave empty for now)
   ```

   **IMPORTANT:** Add a database name to your MONGO_URI (I added `postplanner` at the end)

5. **Deploy:**
   - Click "Create Web Service"
   - Wait 3-5 minutes for deployment
   - You'll get a URL like: `https://post-planner-api.onrender.com`

6. **Test Backend:**
   - Visit: `https://post-planner-api.onrender.com`
   - You should see: `{"message":"Post Planner API is running"}`

### Step 3: Update Frontend with Backend URL

1. **Open:** `frontend/src/services/api.js`

2. **Replace the API_URL:**
```javascript
const API_URL = 'https://post-planner-api.onrender.com/api';
```

3. **Save the file**

---

## Part 2: Build App for Google Play Store

### Step 1: Install EAS CLI

```bash
npm install -g eas-cli
```

### Step 2: Login to Expo

```bash
cd frontend
eas login
```

Create a free Expo account if you don't have one.

### Step 3: Configure EAS Build

```bash
eas build:configure
```

This creates `eas.json`. Update it to:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "aab"
      }
    }
  }
}
```

### Step 4: Update app.json for Production

Make sure these are set in `frontend/app.json`:

```json
{
  "expo": {
    "name": "PostPlanner",
    "slug": "post-planner",
    "version": "1.0.0",
    "android": {
      "package": "com.postplanner.app",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "permissions": []
    }
  }
}
```

### Step 5: Build for Play Store (AAB)

```bash
cd frontend
eas build --platform android --profile production
```

**What happens:**
- EAS will ask you to create a new project - say **Yes**
- It will ask about generating a new Android keystore - say **Yes**
- Build takes 10-20 minutes
- You'll get a download link when done

### Step 6: Download Your AAB File

When build completes:
- Click the download link in terminal
- OR go to [expo.dev](https://expo.dev) → your project → Builds
- Download the `.aab` file

---

## Part 3: Submit to Google Play Store

### Step 1: Create Google Play Developer Account

1. Go to [Google Play Console](https://play.google.com/console)
2. Sign up ($25 one-time fee)
3. Complete your account details

### Step 2: Create App

1. Click "Create app"
2. Fill in:
   - **App name:** PostPlanner
   - **Default language:** English
   - **App or game:** App
   - **Free or paid:** Free
3. Accept declarations
4. Click "Create app"

### Step 3: Set Up Store Listing

Go to **Store presence** → **Main store listing**:

**App name:** PostPlanner - Social Media Manager

**Short description (80 chars):**
Plan and schedule social media posts for multiple clients

**Full description:**
```
PostPlanner helps you manage social media content across multiple clients and platforms.

KEY FEATURES:
• Manage multiple clients in one place
• Schedule posts across Instagram, Facebook, Twitter, LinkedIn, TikTok, and YouTube
• Visual calendar view of all scheduled content
• Client notes for strategy tracking
• Clean, intuitive mobile interface

PERFECT FOR:
- Social media managers
- Marketing agencies
- Freelance content creators
- Small business owners

Never miss a post with PostPlanner's easy-to-use scheduling system. Keep all your clients organized and your content calendar full.

Download now and streamline your social media workflow!
```

**App category:** Business

**Email:** your_email@example.com

### Step 4: Upload Assets

You need these graphics (create with Canva or Figma):

1. **App icon** (512x512 PNG)
   - Simple icon with "PP" or calendar symbol

2. **Feature graphic** (1024x500 PNG)
   - Banner showing app name and key feature

3. **Screenshots** (at least 2, max 8)
   - Take screenshots from your phone:
     - Login screen
     - Posts list
     - Calendar view
     - Create post screen
   - Use Android: 1080x1920 or similar

**Quick way to create assets:**
- Use [Canva](https://canva.com) - free templates available
- Or use phone screenshots and add text overlay

### Step 5: Content Rating

1. Go to **Content rating**
2. Start questionnaire
3. Answer questions (select No for violence, etc.)
4. Get your rating (likely E for Everyone)

### Step 6: Target Audience

1. Go to **Target audience and content**
2. Select age groups: 18-65+
3. Save

### Step 7: Upload AAB

1. Go to **Production** → **Create new release**
2. Upload your `.aab` file from EAS build
3. Add release notes:
```
Initial release
- Client management
- Post scheduling
- Calendar view
- Multi-platform support
```
4. Click "Next" → "Save"

### Step 8: Set Countries

1. Go to **Countries/regions**
2. Select countries to publish (or select all)
3. Save

### Step 9: Submit for Review

1. Go to **Dashboard**
2. Check all sections have green checkmarks
3. Click "Send for review"

**Review takes 1-7 days.**

---

## Quick Checklist

### Backend Deployment ✓
- [ ] Push backend to GitHub
- [ ] Deploy on Render
- [ ] Add environment variables
- [ ] Test API URL
- [ ] Update frontend API URL

### App Build ✓
- [ ] Install EAS CLI
- [ ] Login to Expo
- [ ] Update app.json
- [ ] Build production AAB
- [ ] Download AAB file

### Play Store ✓
- [ ] Create Google Play account ($25)
- [ ] Create app listing
- [ ] Upload app icon (512x512)
- [ ] Upload feature graphic (1024x500)
- [ ] Upload screenshots (min 2)
- [ ] Complete content rating
- [ ] Upload AAB file
- [ ] Submit for review

---

## Important Notes

### Render Free Tier
- Backend sleeps after 15 min of inactivity
- First request after sleep takes 30-60 seconds
- 750 hours/month free (enough for one service)

### MongoDB Atlas
- Already configured in your .env
- Free tier: 512MB storage
- Make sure IP whitelist is set to `0.0.0.0/0` (allow all)

### Play Store Review
- Usually takes 1-3 days
- May ask for privacy policy (use a generator)
- May ask for demo video (optional)

### After Approval
- App goes live automatically
- Check Play Console for crash reports
- Monitor user reviews
- Update regularly for better ranking

---

## Troubleshooting

**Render build fails:**
- Check logs in Render dashboard
- Ensure all dependencies in package.json
- Check Node version compatibility

**EAS build fails:**
- Run `eas build:configure` again
- Clear cache: `eas build --clear-cache`
- Check app.json for syntax errors

**Play Store rejection:**
- Read rejection reason carefully
- Common: Need privacy policy
- Common: Need better screenshots
- Fix and resubmit

**App crashes after deployment:**
- Check API URL is correct (HTTPS, not HTTP)
- Verify backend is running on Render
- Check MongoDB connection

---

## What's Your Backend URL?

After deploying to Render, your backend URL will be:
`https://YOUR-APP-NAME.onrender.com`

Update this in `frontend/src/services/api.js` before building!

---

## Need Help?

- Render Docs: [render.com/docs](https://render.com/docs)
- EAS Build: [docs.expo.dev/build/introduction](https://docs.expo.dev/build/introduction/)
- Play Console: [support.google.com/googleplay/android-developer](https://support.google.com/googleplay/android-developer)

Good luck with your deployment! 🚀
