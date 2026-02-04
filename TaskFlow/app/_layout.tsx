import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAuthStore } from '@store/auth';
import * as Notifications from 'expo-notifications';

// Create a client for React Query
const queryClient = new QueryClient();

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function RootLayout() {
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    // Initialize auth on app load
    const unsubscribe = initializeAuth();
    return unsubscribe;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
        }}
      >
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="task"
          options={{
            animationEnabled: true,
            presentation: 'card',
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
