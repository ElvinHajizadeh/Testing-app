import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import {
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth } from '@lib/firebase';
import { User } from '@types/index';

interface AuthStore {
  user: User | null;
  loading: boolean;
  error: string | null;
  isSignedIn: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  signOut: () => Promise<void>;
  initializeAuth: () => void;
}

const mapFirebaseUserToUser = (fbUser: FirebaseUser): User => ({
  uid: fbUser.uid,
  email: fbUser.email || '',
  displayName: fbUser.displayName || undefined,
  photoURL: fbUser.photoURL || undefined,
  createdAt: fbUser.metadata?.creationTime || new Date(),
  updatedAt: new Date(),
});

const secureStorage = {
  getItem: async (name: string) => {
    try {
      return await SecureStore.getItemAsync(name);
    } catch (e) {
      console.error('Error reading from SecureStore:', e);
      return null;
    }
  },
  setItem: async (name: string, value: string) => {
    try {
      await SecureStore.setItemAsync(name, value);
    } catch (e) {
      console.error('Error writing to SecureStore:', e);
    }
  },
  removeItem: async (name: string) => {
    try {
      await SecureStore.deleteItemAsync(name);
    } catch (e) {
      console.error('Error deleting from SecureStore:', e);
    }
  },
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      loading: true,
      error: null,
      isSignedIn: false,

      setUser: (user) => set({ user, isSignedIn: !!user, error: null }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      signOut: async () => {
        try {
          set({ loading: true });
          await signOut(auth);
          set({ user: null, isSignedIn: false, loading: false });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Failed to sign out';
          set({ error: errorMessage, loading: false });
          throw error;
        }
      },

      initializeAuth: () => {
        // Listen to auth state changes
        const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
          if (fbUser) {
            const user = mapFirebaseUserToUser(fbUser);
            set({ user, isSignedIn: true, loading: false });
          } else {
            set({ user: null, isSignedIn: false, loading: false });
          }
        });

        return unsubscribe;
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => secureStorage),
      partialize: (state) => ({
        user: state.user,
        isSignedIn: state.isSignedIn,
      }),
    }
  )
);
