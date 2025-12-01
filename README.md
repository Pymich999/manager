# Post Planner - Social Media Content Management App

A full-stack MERN application for managing social media posts across multiple clients and platforms. Built with React Native (Expo) for mobile and Express + MongoDB for the backend.

## Features

- User authentication (signup/login with JWT)
- Client management (CRUD operations)
- Post planning and scheduling
- Calendar view for visualizing scheduled posts
- Multi-platform support (Instagram, Facebook, Twitter, LinkedIn, TikTok, YouTube)
- Media support via URLs (works out of the box)
- Optional direct file uploads via Cloudinary (if you configure it)
- Client notes for strategy tracking
- Cross-platform mobile app (iOS and Android)

## Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (media uploads)
- bcryptjs (password hashing)

### Frontend
- React Native
- Expo + Expo Router
- React Query (data fetching)
- AsyncStorage (token storage)
- React Native Calendars

## Project Structure

```
manager/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── cloudinary.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Client.js
│   │   ├── Post.js
│   │   └── Note.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── clients.js
│   │   ├── posts.js
│   │   └── notes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── package.json
└── frontend/
    ├── app/
    │   ├── (auth)/
    │   │   ├── login.jsx
    │   │   └── register.jsx
    │   ├── (tabs)/
    │   │   ├── posts.jsx
    │   │   ├── calendar.jsx
    │   │   ├── clients.jsx
    │   │   └── profile.jsx
    │   ├── post/
    │   │   └── create.jsx
    │   ├── client/
    │   │   └── create.jsx
    │   ├── _layout.jsx
    │   └── index.jsx
    ├── src/
    │   ├── context/
    │   │   └── AuthContext.js
    │   └── services/
    │       └── api.js
    └── package.json
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Expo CLI (`npm install -g expo-cli`)
- Android Studio / Xcode (for emulators) or Expo Go app on your phone

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies (already done):
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/post-planner
JWT_SECRET=your_super_secret_jwt_key_change_this

# Optional: Cloudinary for media uploads (NOT required for basic functionality)
# The app works fine with media URLs - only needed for direct file uploads
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Note:** Cloudinary is **optional**. The app works perfectly without it - users can paste image/video URLs. Only set up Cloudinary if you want direct file upload functionality.

5. Start MongoDB (if running locally):
```bash
mongod
```

6. Run the backend server:
```bash
npm run dev
```

The backend should now be running on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Dependencies are already installed. If needed:
```bash
npm install
```

3. Update the API URL in `src/services/api.js`:
```javascript
// For testing on physical device, replace localhost with your computer's IP
const API_URL = 'http://YOUR_IP_ADDRESS:5000/api';
// Example: 'http://192.168.1.10:5000/api'
```

4. Start the Expo development server:
```bash
npx expo start
```

5. Run the app:
   - Press `a` for Android emulator
   - Press `i` for iOS simulator (Mac only)
   - Scan QR code with Expo Go app on your phone

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Clients
- `GET /api/clients` - Get all clients
- `GET /api/clients/:id` - Get single client
- `POST /api/clients` - Create client
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client
- `GET /api/clients/:id/notes` - Get client notes

### Posts
- `GET /api/posts` - Get all posts (with optional filters)
- `GET /api/posts/:id` - Get single post
- `GET /api/posts/calendar/view` - Get posts grouped by date
- `POST /api/posts` - Create post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/upload` - Upload media file

### Notes
- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get single note
- `POST /api/notes` - Create note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

## Building for Production

### Android APK/AAB

1. Configure your app.json with proper package name and version
2. Build the app:
```bash
npx expo build:android
```

3. Or create a production build with EAS:
```bash
npm install -g eas-cli
eas build --platform android
```

### iOS Build (Mac only)

```bash
eas build --platform ios
```

## Deploy to Play Store

1. Create a Google Play Developer account
2. Build a release AAB:
```bash
eas build --platform android --profile production
```
3. Download the AAB file
4. Upload to Google Play Console
5. Fill in store listing details
6. Submit for review

## Features Roadmap

- [ ] Post editing functionality
- [ ] Client details view with notes
- [ ] Filter posts by client/platform
- [ ] Push notifications for upcoming posts
- [ ] Image picker for direct media uploads
- [ ] Post templates
- [ ] Analytics dashboard
- [ ] Team collaboration features

## Development Notes

- Backend runs on port 5000
- MongoDB runs on port 27017 (default)
- Frontend uses Expo development server
- JWT tokens expire in 30 days
- All API endpoints (except auth) require authentication

## Troubleshooting

### Cannot connect to backend from mobile device
- Replace `localhost` with your computer's IP address in `frontend/src/services/api.js`
- Ensure both devices are on the same network
- Check firewall settings

### MongoDB connection issues
- Ensure MongoDB is running
- Check MONGO_URI in .env file
- For Atlas, ensure IP is whitelisted

### Expo build errors
- Clear cache: `npx expo start -c`
- Delete node_modules and reinstall
- Check for version conflicts

## License

MIT

## Author

Built for rapid deployment to Play Store.
