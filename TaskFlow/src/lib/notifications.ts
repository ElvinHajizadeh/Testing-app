import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { db } from '@lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

/**
 * Request permission for push notifications
 */
export const requestNotificationPermission = async () => {
  if (!Device.isDevice) {
    console.warn('Must use physical device for push notifications');
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === 'granted';
};

/**
 * Get push notification token for this device
 */
export const getPushToken = async () => {
  try {
    if (!Device.isDevice) {
      console.warn('Must use physical device for push notifications');
      return null;
    }

    const projectId = Constants.expoConfig?.extra?.projectId;
    if (!projectId) {
      console.warn('Project ID not found in expo config');
      return null;
    }

    const token = (
      await Notifications.getExpoPushTokenAsync({
        projectId,
      })
    ).data;

    return token;
  } catch (error) {
    console.error('Error getting push token:', error);
    return null;
  }
};

/**
 * Register push token for user
 */
export const registerPushToken = async (userId: string, token: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(
      userRef,
      {
        fcmTokens: [token],
        updatedAt: new Date(),
      },
      { merge: true }
    );
    console.log('✅ Push token registered');
  } catch (error) {
    console.error('Error registering push token:', error);
  }
};

/**
 * Setup notification listener
 */
export const setupNotificationListener = () => {
  const notificationListener = Notifications.addNotificationReceivedListener(
    (notification: any) => {
      console.log('📱 Notification received:', notification);
    }
  );

  const responseListener = Notifications.addNotificationResponseReceivedListener(
    (response: any) => {
      console.log('👆 Notification response:', response);
      // Handle notification tap here
      // e.g., navigate to task detail screen
    }
  );

  return () => {
    Notifications.removeNotificationSubscription(notificationListener);
    Notifications.removeNotificationSubscription(responseListener);
  };
};

/**
 * Send local test notification
 */
export const sendLocalNotification = (title: string, body: string) => {
  Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: true,
      badge: 1,
    },
    trigger: { seconds: 2 },
  });
};
