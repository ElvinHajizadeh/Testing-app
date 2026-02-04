import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthStore } from '@store/auth';
import { useSettingsStore } from '@store/settings';
import * as LocalAuthentication from 'expo-local-authentication';

export default function SettingsScreen() {
  const { signOut } = useAuthStore();
  const { settings, updateSetting, toggleBiometrics, toggleNotifications } =
    useSettingsStore();
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [biometricType, setBiometricType] = useState<string>('');

  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  const checkBiometricAvailability = async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (compatible) {
        const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
        setBiometricAvailable(true);
        if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
          setBiometricType('Face ID');
        } else if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
          setBiometricType('Fingerprint');
        }
      }
    } catch (error) {
      console.error('Error checking biometric:', error);
    }
  };

  const handleTestBiometric = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        reason: 'Test biometric authentication',
        fallbackLabel: 'Use passcode',
        disableDeviceFallback: false,
      });

      if (result.success) {
        Alert.alert('Success', `${biometricType} authentication works!`);
      }
    } catch (error) {
      Alert.alert('Error', 'Biometric authentication failed');
    }
  };

  if (!settings) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading settings...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingLabel}>Enable Notifications</Text>
            <Text style={styles.settingDescription}>Receive task reminders</Text>
          </View>
          <Switch
            value={settings.enableNotifications}
            onValueChange={toggleNotifications}
            trackColor={{ false: '#ccc', true: '#81C784' }}
            thumbColor="#fff"
          />
        </View>
        {settings.enableNotifications && (
          <>
            <View style={styles.settingItem}>
              <View>
                <Text style={styles.settingLabel}>Sound</Text>
                <Text style={styles.settingDescription}>Notification sound</Text>
              </View>
              <Switch
                value={settings.notificationSound}
                onValueChange={(value) =>
                  updateSetting('notificationSound', value)
                }
                trackColor={{ false: '#ccc', true: '#81C784' }}
                thumbColor="#fff"
              />
            </View>
            <View style={styles.settingItem}>
              <View>
                <Text style={styles.settingLabel}>Vibration</Text>
                <Text style={styles.settingDescription}>Notification vibration</Text>
              </View>
              <Switch
                value={settings.notificationVibration}
                onValueChange={(value) =>
                  updateSetting('notificationVibration', value)
                }
                trackColor={{ false: '#ccc', true: '#81C784' }}
                thumbColor="#fff"
              />
            </View>
          </>
        )}
      </View>

      {biometricAvailable && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingLabel}>
                {biometricType} Authentication
              </Text>
              <Text style={styles.settingDescription}>
                Lock app with {biometricType.toLowerCase()}
              </Text>
            </View>
            <Switch
              value={settings.enableBiometrics}
              onValueChange={toggleBiometrics}
              trackColor={{ false: '#ccc', true: '#81C784' }}
              thumbColor="#fff"
            />
          </View>
          {settings.enableBiometrics && (
            <TouchableOpacity
              style={styles.testButton}
              onPress={handleTestBiometric}
            >
              <MaterialCommunityIcons
                name={
                  biometricType === 'Face ID'
                    ? 'face-recognition'
                    : 'fingerprint'
                }
                size={18}
                color="#fff"
              />
              <Text style={styles.testButtonText}>
                Test {biometricType}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Display</Text>
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingLabel}>Theme</Text>
            <Text style={styles.settingDescription}>
              {settings.theme === 'light' ? 'Light mode' : 'Dark mode'}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.themeToggle}
            onPress={() =>
              updateSetting(
                'theme',
                settings.theme === 'light' ? 'dark' : 'light'
              )
            }
          >
            <MaterialCommunityIcons
              name={settings.theme === 'light' ? 'moon-waning-crescent' : 'white-balance-sunny'}
              size={20}
              color="#007AFF"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.dangerButton}
          onPress={() => {
            Alert.alert(
              'Delete Account',
              'This action cannot be undone. All your data will be permanently deleted.',
              [
                { text: 'Cancel' },
                {
                  text: 'Delete',
                  onPress: () => {
                    Alert.alert('Account Deleted', 'Your account has been deleted.');
                    signOut();
                  },
                },
              ]
            );
          }}
        >
          <MaterialCommunityIcons name="delete" size={20} color="#FF3B30" />
          <Text style={styles.dangerButtonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    paddingVertical: 16,
    paddingBottom: 40,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    textTransform: 'uppercase',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  settingDescription: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
  },
  testButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingVertical: 10,
    backgroundColor: '#007AFF',
    borderRadius: 6,
  },
  testButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  themeToggle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  dangerButtonText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
  },
  loading: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 40,
  },
});
