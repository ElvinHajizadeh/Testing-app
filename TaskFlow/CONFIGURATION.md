# TaskFlow Configuration Guide

## Environment Variables (.env.local)

Create this file in the project root with your Firebase credentials:

```env
# Firebase Configuration
# Get these from Firebase Console → Project Settings → General

EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key_here
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Firestore Database Structure

### Collection: `users`
Stores user profile information.
```
{
  userId (document): {
    uid: string (user ID),
    email: string,
    displayName: string,
    photoURL?: string,
    createdAt: Timestamp,
    updatedAt: Timestamp
  }
}
```

### Collection: `tasks`
Stores all user tasks.
```
{
  taskId (document): {
    userId: string,
    title: string,
    description?: string,
    priority: "high" | "medium" | "low",
    status: "pending" | "completed" | "archived",
    dueDate?: Timestamp,
    tags?: array,
    createdAt: Timestamp,
    updatedAt: Timestamp
  }
}
```

### Collection: `settings`
Stores user app preferences.
```
{
  userId (document): {
    userId: string,
    enableBiometrics: boolean,
    enableNotifications: boolean,
    theme: "light" | "dark",
    language: "en" | "es" | "fr",
    notificationSound: boolean,
    notificationVibration: boolean
  }
}
```

### Collection: `notifications` (optional)
Stores push notification history.
```
{
  notificationId (document): {
    userId: string,
    title: string,
    body: string,
    taskId?: string,
    read: boolean,
    createdAt: Timestamp
  }
}
```

## Firebase Security Rules

For development (test mode):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write for authenticated users only
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

For production (restrict to user's own data):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /tasks/{taskId} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
    match /settings/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

## Push Notifications Setup

### Server-side Cloud Function Example

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.sendTaskReminder = functions.firestore
  .document('tasks/{taskId}')
  .onWrite(async (change, context) => {
    const task = change.after.data();
    const userId = task.userId;

    // Get user's FCM token from custom claims or separate collection
    const userDoc = await admin.firestore().collection('users').doc(userId).get();
    const tokens = userDoc.data().fcmTokens;

    if (!tokens || tokens.length === 0) return;

    const message = {
      notification: {
        title: 'Task Reminder',
        body: task.title,
      },
      data: {
        taskId: context.params.taskId,
      },
      tokens: tokens,
    };

    return admin.messaging().sendMulticast(message);
  });
```

## App Icons & Assets

Place these in an `assets/` folder at project root:

- `icon.png` (1024x1024px)
- `splash.png` (1242x2436px)
- `adaptive-icon.png` (1024x1024px, Android)
- `favicon.png` (48x48px, web)
- `notification-icon.png` (48x48px, Android)

## TypeScript Path Aliases

Already configured in `tsconfig.json`:

```
@components/ → src/components/
@lib/       → src/lib/
@store/     → src/store/
@api/       → src/api/
@types/     → src/types/
```

Use like: `import { Button } from '@components/Button'`

## Development Servers

### Expo Dev Server
```bash
npm start
```

Runs on `http://localhost:19000` (web preview available)

### Firebase Local Emulator (optional)
```bash
firebase emulators:start
```

For testing without hitting production Firebase.

## EAS Build Configuration

See `eas.json` for:
- iOS build profiles (dev, preview, production)
- Android build profiles
- Submit profiles for App Store/Play Store

Basic usage:
```bash
eas build --platform ios --profile production
eas submit --platform ios
```
