# Deployment Guide - Google Play Store

Step-by-step guide to deploy your Post Planner app to Google Play Store.

## Prerequisites

1. Google Play Developer Account ($25 one-time fee)
2. EAS CLI installed: `npm install -g eas-cli`
3. Expo account (free)

## Step 1: Configure Your App

### Update app.json

```json
{
  "expo": {
    "name": "PostPlanner",
    "slug": "post-planner",
    "version": "1.0.0",
    "android": {
      "package": "com.yourcompany.postplanner",
      "versionCode": 1,
      "permissions": []
    }
  }
}
```

Update:
- `name` - Your app's display name
- `package` - Unique identifier (reverse domain: com.yourname.appname)
- `version` - App version (increment for updates)
- `versionCode` - Build number (increment for each build)

## Step 2: Login to EAS

```bash
cd frontend
eas login
```

## Step 3: Configure EAS Build

```bash
eas build:configure
```

This creates `eas.json` with build profiles.

## Step 4: Build Production APK/AAB

For internal testing (APK):
```bash
eas build --platform android --profile preview
```

For Play Store submission (AAB):
```bash
eas build --platform android --profile production
```

Build process takes 10-20 minutes. You'll get a download link when done.

## Step 5: Prepare Store Assets

Create these assets before submitting:

### Required Graphics
1. **App Icon** (512x512 PNG)
2. **Feature Graphic** (1024x500 PNG)
3. **Screenshots** (at least 2)
   - Phone: 1080x1920 or similar
   - Tablet: 2048x1536 or similar

### Store Listing Text
1. **App Title** (max 50 characters)
   - Example: "PostPlanner - Social Media Manager"

2. **Short Description** (max 80 characters)
   - Example: "Plan and schedule social media posts for multiple clients"

3. **Full Description** (max 4000 characters)
```
PostPlanner is a comprehensive social media content management tool designed for agencies, freelancers, and social media managers.

Key Features:
• Multi-client management
• Post scheduling across all major platforms
• Visual calendar view
• Client notes and strategy tracking
• Instagram, Facebook, Twitter, LinkedIn, TikTok, YouTube support

Perfect for:
- Social media managers
- Marketing agencies
- Freelance content creators
- Small business owners

Never miss a post again with PostPlanner's intuitive scheduling system!
```

## Step 6: Google Play Console Setup

1. Go to [Google Play Console](https://play.google.com/console)
2. Click "Create app"
3. Fill in app details:
   - App name
   - Default language
   - App or game: App
   - Free or paid: Free
4. Accept declarations

## Step 7: Upload Your Build

1. In Play Console, go to **Production** > **Create new release**
2. Upload the AAB file you downloaded from EAS
3. Fill in release notes:
```
Initial release
- Client management
- Post scheduling
- Calendar view
- Multi-platform support
```

## Step 8: Complete Store Listing

### Main Store Listing
1. Upload app icon
2. Upload feature graphic
3. Upload at least 2 screenshots
4. Write app description
5. Select app category: **Business** or **Productivity**
6. Add contact details (email required)
7. Privacy policy URL (if applicable)

### Content Rating
1. Go to **Content rating**
2. Fill out questionnaire
3. Submit for rating

### Target Audience
1. Select target age groups
2. Confirm app details

### App Content
1. Privacy policy (required for apps with user accounts)
2. Ads declaration
3. Other declarations as needed

## Step 9: Set Up Pricing

1. Go to **Pricing and distribution**
2. Select countries to distribute
3. Confirm it's free
4. Accept content guidelines

## Step 10: Submit for Review

1. Review all sections (should have green checkmarks)
2. Click **Send for review**
3. Review typically takes 1-7 days

## Step 11: Backend Deployment

For production, deploy your backend to:

### Option 1: Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
cd backend
railway init
railway up
```

### Option 2: Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login and deploy
heroku login
cd backend
heroku create your-app-name
git push heroku main
```

### Option 3: DigitalOcean / AWS / Azure
- Use their respective deployment guides
- Ensure MongoDB connection string is updated
- Set environment variables

## Step 12: Update Frontend API URL

Before production build, update API URL in `frontend/src/services/api.js`:

```javascript
const API_URL = 'https://your-backend-url.com/api';
```

Then rebuild:
```bash
eas build --platform android --profile production
```

## Post-Launch Checklist

- [ ] Test app thoroughly on multiple devices
- [ ] Verify backend is stable and accessible
- [ ] Set up error tracking (Sentry, Bugsnag)
- [ ] Monitor user reviews
- [ ] Prepare for updates (plan v1.1, v1.2, etc.)
- [ ] Set up analytics (Google Analytics, Mixpanel)

## Update Process

When releasing updates:

1. Update version in app.json:
```json
{
  "version": "1.1.0",
  "android": {
    "versionCode": 2
  }
}
```

2. Build new version:
```bash
eas build --platform android --profile production
```

3. Upload to Play Console
4. Submit update

## Troubleshooting

**Build failed:**
- Check eas.json configuration
- Ensure all dependencies are compatible
- Review build logs

**App rejected:**
- Review Google's content policies
- Fix issues mentioned in rejection
- Resubmit

**Backend connection issues:**
- Verify backend is running
- Check CORS settings
- Ensure API URL is correct

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [EAS Build Guide](https://docs.expo.dev/build/introduction/)
- [Play Console Help](https://support.google.com/googleplay/android-developer)
- [React Native Performance](https://reactnative.dev/docs/performance)

Good luck with your launch! 🚀
