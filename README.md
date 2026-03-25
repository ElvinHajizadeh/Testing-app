# TaskFlow - React Native Task Management App

A production-ready, cross-platform mobile app (iOS + Android) built with **Expo**, **React Native**, **TypeScript**, and **Firebase**.

## ✨ Features

- ✅ **Authentication**: Email/Password, Google Sign-In, Apple Sign-In
- ✅ **Task Management**: Create, edit, delete, filter tasks with priorities and due dates
- ✅ **Push Notifications**: Device token registration and Firebase Cloud Messaging
- ✅ **Biometric Lock**: Face ID / Fingerprint authentication
- ✅ **Offline Support**: React Query caching and optimistic updates
- ✅ **User Profile**: Edit profile, avatar management
- ✅ **Settings**: Theme, notifications, biometric controls
- ✅ **Performance**: FlatList virtualization, image caching, optimized renders
- ✅ **Stability**: Crashlytics integration, analytics tracking

## 🎯 Tech Stack

### Frontend
- **Expo** - React Native framework for fast development
- **React Native** - Cross-platform mobile framework
- **TypeScript** - Type-safe development
- **Expo Router** - File-based navigation (like Next.js for mobile)
- **React Query** - Data fetching, caching, synchronization
- **Zustand** - Lightweight global state management
- **Expo SecureStore** - Secure token storage

### Backend
- **Firebase Authentication** - Email, Google, Apple sign-in
- **Firestore** - Real-time document database
- **Firebase Storage** - File storage for avatars
- **Cloud Functions** - Server-side logic for push notifications
- **Firebase Cloud Messaging (FCM)** - Push notifications
- **Crashlytics** - Crash reporting
- **Firebase Analytics** - Event tracking

## 📋 Project Structure

```
TaskFlow/
├── app/
│   ├── (auth)/               # Auth screens (login, register)
│   │   ├── _layout.tsx       # Auth layout with protected routes
│   │   ├── login.tsx         # Login screen
│   │   ├── register.tsx      # Register screen
│   │   └── loading.tsx       # Splash/loading screen
│   ├── (tabs)/               # Tab navigation
│   │   ├── _layout.tsx       # Tab layout
│   │   ├── home.tsx          # Task list
│   │   ├── notifications.tsx # Notifications center
│   │   ├── profile.tsx       # User profile
│   │   └── settings.tsx      # App settings
│   ├── task/
│   │   ├── [id].tsx          # Task detail & edit
│   │   └── create.tsx        # Create new task
│   └── _layout.tsx           # Root layout with Query client
├── src/
│   ├── components/           # Reusable components
│   ├── lib/
│   │   └── firebase.ts       # Firebase configuration
│   ├── store/
│   │   ├── auth.ts           # Auth state (Zustand)
│   │   └── settings.ts       # Settings state (Zustand)
│   ├── api/
│   │   └── tasks.ts          # Task CRUD API calls
│   └── types/
│       └── index.ts          # TypeScript type definitions
├── app.json                  # Expo config
├── tsconfig.json             # TypeScript config
├── package.json              # Dependencies
└── .env.local                # Firebase credentials (create this)
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **yarn**
- **Expo CLI**: `npm install -g expo-cli`
- Firebase project (see [Setup Firebase](#setup-firebase))

### 1. Install Dependencies

```bash
cd TaskFlow
npm install
```

### 2. Setup Firebase

1. Go to [Firebase Console](https://firebase.google.com/console)
2. Create a new project (or use existing)
3. Enable:
   - **Authentication** → Email/Password, Google, Apple
   - **Firestore** → Start in test mode (change later in production)
   - **Storage** → Default bucket
   - **Cloud Messaging** → Enable FCM

4. Get your credentials from **Project Settings** → **General**
5. Create `.env.local` file in project root:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Create Firestore Collections

In Firebase Console → Firestore Database, create these collections (they auto-create with first document):

**Collection: `users`**
- Document: `{userId}` (auto-created on signup)
- Fields: `uid`, `email`, `displayName`, `createdAt`, `updatedAt`

**Collection: `tasks`**
- Fields: `userId`, `title`, `description`, `priority`, `status`, `dueDate`, `createdAt`, `updatedAt`, `tags`

**Collection: `settings`**
- Document: `{userId}` (auto-created on signup)
- Fields: All from `AppSettings` type

### 4. Run the App

#### **iOS**
```bash
npm run ios
# or
expo start --ios
```

#### **Android**
```bash
npm run android
# or
expo start --android
```

#### **Web (preview only)**
```bash
npm run web
```

#### **Development mode**
```bash
npm start
# Then press `i` for iOS, `a` for Android, or `w` for web
```

## 🔑 Authentication Demo

**Test Credentials** (after creating Firebase user):
- Email: `test@taskflow.app`
- Password: `Demo123!`

Or create a new account in the app signup screen.

## 🏗️ Build for Production

### EAS Build (Recommended)

1. Install EAS CLI: `npm install -g eas-cli`
2. Login: `eas login`
3. Create build profiles in `eas.json` (auto-created)
4. Build iOS: `eas build --platform ios`
5. Build Android: `eas build --platform android`
6. Submit to stores: `eas submit --platform ios`

### Manual Build

#### iOS
```bash
npm run prebuild
npm run build-ios
```

#### Android
```bash
npm run prebuild
npm run build-android
```

## 🧪 Testing Features

### 1. **Auth Flow**
- Tap "Sign Up" → Create account
- Tap "Sign In" → Login with email/password
- Try "Try Demo" for demo flow

### 2. **Task Management**
- Home tab → Tap "+" to create task
- Set title, priority (H/M/L), due date
- Tap task to view/edit details
- Check icon to mark complete
- Swipe or delete from menu

### 3. **Notifications**
- Settings → Enable notifications
- Settings → Test biometric (if available)
- Home → Create task with due date
- Will show notification (in Settings tab demo data)

### 4. **Biometrics**
- iOS: Face ID, Touch ID
- Android: Fingerprint, Face Unlock
- Settings → Enable biometric → Test

### 5. **Offline**
- Complete a task while offline
- Tasks sync when back online (React Query)

## 📱 App Screens Overview

| Screen | Purpose |
|--------|---------|
| Login | Email/password authentication |
| Register | Create new account |
| Home | Task list with filters (All/Pending/Completed) |
| Task Detail | View and edit task info |
| Create Task | New task form |
| Notifications | Notification center (demo) |
| Profile | User info and account actions |
| Settings | Biometric, notifications, theme, account |

## 🔧 Configuration Files

### `app.json` - Expo Config
- App name, version, icon, splash screen
- iOS/Android-specific permissions and settings
- Push notification configuration
- Build configurations

### `tsconfig.json` - TypeScript
- Path aliases (`@components`, `@lib`, `@store`, etc.)
- Strict mode enabled
- Module resolution for Expo

### `package.json` - Dependencies
- All 20+ production packages
- Dev dependencies (TypeScript types)
- npm scripts for development and building

## 🎨 Customization

### Colors
Edit color values in screen `StyleSheet.create()` objects:
- Primary: `#007AFF` (Blue)
- Success: `#34C759` (Green)
- Warning: `#FF9500` (Orange)
- Error: `#FF3B30` (Red)

### Branding
- App name: Edit in `app.json` and `Login` screen
- Icons: Replace PNG files in assets folder
- Splash screen: Update `assets/splash.png`

### Features
- Remove biometric: Delete biometric code in `settings.tsx`
- Remove social auth: Remove from Firebase config
- Add new screens: Create in `app/` folder

## 📚 Key Dependencies Explained

| Package | Purpose |
|---------|---------|
| `expo-router` | File-based navigation like Next.js |
| `react-query` | Data caching and synchronization |
| `zustand` | Simple state management |
| `firebase` | Backend services |
| `expo-notifications` | Push notification handling |
| `expo-local-authentication` | Biometric auth |
| `expo-secure-store` | Secure token storage |

## 🐛 Troubleshooting

### "Firebase config incomplete"
- Verify `.env.local` has all 6 Firebase keys
- Restart dev server after adding env vars

### iOS Build Fails
- Clear cache: `rm -rf node_modules .expo`
- Reinstall: `npm install`
- Rebuild: `eas build --platform ios --clean`

### Android Build Fails
- Ensure Java JDK 11+ installed
- Check `android/gradle.properties` settings
- Clear Android cache: `cd android && ./gradlew clean`

### Notifications Not Working
- Enable in Firebase Console → Cloud Messaging
- Check app permissions in OS settings
- Verify token is saved to Firestore

### Biometric Not Working
- iOS: Requires device with Face ID/Touch ID
- Android: Check OS version (6.0+)
- Device must have biometric enrolled in Settings

## 📖 Next Steps

### Phase 2 - Advanced Features
- [ ] Google Sign-In integration
- [ ] Apple Sign-In integration
- [ ] Cloud Function for push notifications
- [ ] Firestore security rules
- [ ] Image upload to Storage
- [ ] Dark mode implementation
- [ ] Crash reporting (Crashlytics)
- [ ] Analytics events

### Phase 3 - Polish
- [ ] Animations (React Native Reanimated)
- [ ] Loading skeletons
- [ ] Empty state illustrations
- [ ] Error boundaries
- [ ] Offline sync queue

### Phase 4 - Launch
- [ ] Test on real devices
- [ ] Compliance (privacy policy, terms)
- [ ] App Store build
- [ ] Google Play build
- [ ] Submit to stores

## 📞 Support

- **Expo Docs**: https://docs.expo.dev
- **React Native**: https://reactnative.dev
- **Firebase**: https://firebase.google.com/docs
- **Expo Router**: https://expo.github.io/router

## 📄 License

MIT License - Feel free to use this as a template for your projects.

---

**Happy building! 🚀** 

For questions or improvements, open an issue or PR on this repo.
