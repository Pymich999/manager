# Cloudinary Setup (Optional)

## Do You Need Cloudinary?

**Short answer: NO, not required for basic functionality.**

### The App Works WITHOUT Cloudinary

✅ Users can add media URLs (paste links to images/videos)
✅ Posts display media from URLs
✅ No file size limits (external hosting)
✅ Faster to set up and launch

### Why Add Cloudinary?

Only needed if you want:
- Direct file uploads from the mobile app
- User-uploaded images/videos stored in your cloud
- Image transformation/optimization features
- Better user experience (no need to find URLs)

## How Media Works Now (Without Cloudinary)

When creating a post, users see a "Media URL" field where they can paste:
- Image links (e.g., `https://example.com/image.jpg`)
- Video links (e.g., `https://youtube.com/watch?v=...`)
- Any public media URL

This is **perfectly fine** for most use cases, especially for social media planning where content often comes from external sources anyway.

## Setting Up Cloudinary (If You Want It)

### Step 1: Create Account
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for free account
3. Verify email

### Step 2: Get Credentials
1. Go to Dashboard
2. Copy these values:
   - Cloud Name
   - API Key
   - API Secret

### Step 3: Update Backend
Edit `backend/.env`:
```env
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
```

### Step 4: Restart Backend
```bash
cd backend
npm run dev
```

### Step 5: Use Upload Endpoint
The API endpoint `/api/posts/upload` will now work for direct uploads.

## Frontend Integration (Future Enhancement)

Currently, the create post screen has a media URL field. To enable direct uploads:

1. Add expo-image-picker to pick images
2. Create FormData with the selected image
3. Call `postAPI.uploadMedia(formData)`
4. Use returned URL in post creation

This is a **future enhancement** - not needed for launch.

## Recommendations

### For Quick Launch
- **Skip Cloudinary** for now
- Use media URLs
- Launch faster
- Add Cloudinary later if needed

### For Production
- Set up Cloudinary if you want professional image hosting
- Implement image picker in frontend
- Better UX with direct uploads

## Free Tier Limits

Cloudinary free tier includes:
- 25 GB storage
- 25 GB bandwidth/month
- Image/video transformations
- More than enough for testing and small-scale use

## Current Status

Your app currently:
- ✅ Has Cloudinary integration in backend (configured but not required)
- ✅ Has upload endpoint ready (`/api/posts/upload`)
- ✅ Works perfectly with media URLs
- ⚪ Needs frontend image picker (optional enhancement)

## Bottom Line

**The app is 100% functional without Cloudinary.**

Only set it up if:
1. You want direct file uploads
2. You have time to add image picker to frontend
3. You prefer cloud hosting over URL links

For initial launch and testing, **media URLs are sufficient**.
