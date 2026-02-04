# Development Instructions

## Environment Setup

1. **Install Node.js** (v18+): https://nodejs.org/
2. **Install Expo CLI**: `npm install -g expo-cli`
3. **Install project dependencies**: `npm install` (from TaskFlow directory)
4. **Create `.env.local`** with Firebase credentials

## Running the App

```bash
# Start development server
npm start

# iOS simulator
npm run ios

# Android emulator
npm run android

# Web (preview)
npm run web
```

## Firebase Setup Checklist

- [ ] Create Firebase project
- [ ] Enable Authentication (Email/Password)
- [ ] Create Firestore Database
- [ ] Create Storage Bucket
- [ ] Get credentials from Project Settings
- [ ] Create `.env.local` file with credentials
- [ ] Create `users`, `tasks`, and `settings` collections (optional - auto-created on first use)

## Project Commands

```json
{
  "start": "expo start",
  "android": "expo start --android",
  "ios": "expo start --ios",
  "web": "expo start --web",
  "prebuild": "expo prebuild --clean",
  "build-android": "eas build --platform android",
  "build-ios": "eas build --platform ios",
  "build-submit": "eas submit --platform android --latest"
}
```

## File Structure Quick Reference

- **Auth**: `app/(auth)/` - Login, Register, Auth logic
- **Main App**: `app/(tabs)/` - Home, Notifications, Profile, Settings
- **Task Management**: `app/task/` - Create, View, Edit tasks
- **State**: `src/store/` - Zustand stores for auth & settings
- **API**: `src/api/` - Firebase CRUD operations
- **Types**: `src/types/` - TypeScript interfaces
- **Config**: `src/lib/firebase.ts` - Firebase initialization

## Testing Checklist

1. **Auth**: Signup → Login → Logout
2. **Tasks**: Create → View → Edit → Delete
3. **Navigation**: All tabs accessible
4. **Offline**: Complete a task offline → Reconnect
5. **Biometrics**: Enable/Test in Settings (device only)
6. **Notifications**: Check center in app

## Common Issues & Fixes

**Error: "Firebase config incomplete"**
- Add all 6 env vars to `.env.local`
- Restart dev server

**Error: "Cannot find module @lib"**
- Path aliases need restart: `npm start`

**Blank screen on startup**
- Check auth store initialization in `app/_layout.tsx`
- Verify Firebase credentials

**Build fails**
- Clear cache: `rm -rf node_modules`
- Reinstall: `npm install`

## Next Development Phase

1. Add Google/Apple Sign-In
2. Implement Cloud Functions for push
3. Add image upload functionality
4. Firestore security rules
5. Crash reporting integration
6. Dark mode support
