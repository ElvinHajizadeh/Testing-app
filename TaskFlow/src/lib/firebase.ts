import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getFunctions, Functions } from 'firebase/functions';

/**
 * IMPORTANT: Replace these with your Firebase project credentials
 * Get these from: https://firebase.google.com/docs/web/setup#add-sdk-initialize
 */
const FIREBASE_CONFIG = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || 'YOUR_API_KEY',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || 'YOUR_AUTH_DOMAIN',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || 'YOUR_PROJECT_ID',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || 'YOUR_STORAGE_BUCKET',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || 'YOUR_MESSAGING_SENDER_ID',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || 'YOUR_APP_ID',
};

// Validate Firebase config
const isValidConfig = (config: typeof FIREBASE_CONFIG) => {
  return Object.values(config).every(value => value && !value.startsWith('YOUR_'));
};

let app;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;
let functions: Functions;

try {
  if (isValidConfig(FIREBASE_CONFIG)) {
    app = initializeApp(FIREBASE_CONFIG);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    functions = getFunctions(app);
    console.log('✅ Firebase initialized successfully');
  } else {
    console.warn('⚠️  Firebase config incomplete. Add environment variables to continue.');
  }
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
}

export { auth, db, storage, functions, app };

/**
 * Setup Instructions:
 * 
 * 1. Create a Firebase project at https://firebase.google.com
 * 2. Enable Authentication methods:
 *    - Email/Password
 *    - Google Sign-In
 *    - Apple Sign-In (iOS)
 * 3. Create Firestore Database (start in test mode)
 * 4. Create Storage Bucket
 * 5. Copy credentials to .env.local:
 * 
 *    EXPO_PUBLIC_FIREBASE_API_KEY=xxx
 *    EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
 *    EXPO_PUBLIC_FIREBASE_PROJECT_ID=xxx
 *    EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx
 *    EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
 *    EXPO_PUBLIC_FIREBASE_APP_ID=xxx
 */
