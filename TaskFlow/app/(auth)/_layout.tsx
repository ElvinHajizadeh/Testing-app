import React, { useEffect } from 'react';
import { Stack, Redirect } from 'expo-router';
import { useAuthStore } from '@store/auth';

export default function AuthLayout() {
  const { isSignedIn, loading, initializeAuth } = useAuthStore();

  useEffect(() => {
    const unsubscribe = initializeAuth();
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <Stack>
        <Stack.Screen
          name="loading"
          options={{ headerShown: false }}
        />
      </Stack>
    );
  }

  if (isSignedIn) {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
