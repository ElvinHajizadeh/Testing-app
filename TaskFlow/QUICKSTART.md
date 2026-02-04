# 🚀 Quick Start Guide - TaskFlow

Get TaskFlow running in **5 minutes** with this step-by-step guide.

## Step 1: Prerequisites (2 min)

Ensure you have:
- ✅ **Node.js 18+** installed ([Download](https://nodejs.org/))
- ✅ **npm** (comes with Node.js)

Verify:
```bash
node --version    # Should be v18 or higher
npm --version     # Should be 8 or higher
```

## Step 2: Install Expo CLI (1 min)

```bash
npm install -g expo-cli
```

Verify:
```bash
expo --version
```

## Step 3: Create Firebase Project (1 min)

1. Go to [firebase.google.com/console](https://firebase.google.com/console)
2. Click **"Create project"**
3. Enter name: `taskflow`
4. Click through setup (accept all defaults)
5. Wait for project to create

## Step 4: Get Firebase Credentials (1 min)

1. In Firebase Console, click **⚙️ Project Settings**
2. Copy these 6 values:
   - API Key
   - Auth Domain
   - Project ID
   - Storage Bucket
   - Messaging Sender ID
   - App ID

3. In `TaskFlow/` folder, create `.env.local` file with:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=paste_api_key_here
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=paste_auth_domain_here
EXPO_PUBLIC_FIREBASE_PROJECT_ID=paste_project_id_here
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=paste_storage_bucket_here
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=paste_sender_id_here
EXPO_PUBLIC_FIREBASE_APP_ID=paste_app_id_here
```

## Step 5: Install Dependencies

From the `TaskFlow/` folder:

```bash
npm install
```

Wait 2-3 minutes for all packages to install...

## Step 6: Enable Firebase Services

In Firebase Console for your project:

1. Click **"Authentication"** → **"Sign-in method"**
   - Enable: Email/Password
   
2. Click **"Firestore Database"**
   - Create database in "Test mode"
   - Choose location (us-central1 is fine)

3. Click **"Storage"**
   - Create bucket (default settings)

## Step 7: Run the App

### Option A: iOS (macOS only)

```bash
npm run ios
```

Wait for simulator to open...

### Option B: Android

```bash
npm run android
```

(Requires Android Studio/Emulator installed)

### Option C: Web (Preview)

```bash
npm start
# Press 'w' for web
```

## Step 8: Test the App

1. **Sign Up**
   - Tap "Sign Up"
   - Enter name, email, password
   - Create account

2. **Create Task**
   - Tap the **+** button
   - Enter task title
   - Set priority, due date
   - Tap "Create Task"

3. **Manage Task**
   - Tap task to view/edit
   - Check checkbox to complete
   - Swipe or tap menu to delete

4. **Explore**
   - Tap each tab (Tasks, Notifications, Profile, Settings)
   - Try signing out
   - Try signing back in

## 🎉 Done!

Your app is now running! Continue with:

- 📖 Read [README.md](./README.md) for feature overview
- 🔧 Read [CONFIGURATION.md](./CONFIGURATION.md) for advanced setup
- 💻 Read [DEVELOPMENT.md](./DEVELOPMENT.md) for development tips

## 🐛 Troubleshooting

**Error: Firebase config incomplete**
- Check `.env.local` has all 6 values
- Restart dev server: Stop (Ctrl+C) and `npm start`

**Error: Module not found**
- Clear cache: `rm -rf node_modules`
- Reinstall: `npm install`

**App shows blank screen**
- Check browser console for errors (if running web)
- Verify Firebase credentials in `.env.local`

**Biometrics not working**
- Only works on real devices, not simulators
- Device must have Face ID/Fingerprint enrolled

## 📞 Need Help?

- Expo Docs: https://docs.expo.dev
- Firebase Docs: https://firebase.google.com/docs
- React Native: https://reactnative.dev

---

**Next Step**: Once running, check [README.md](./README.md) for all features and customization options!
