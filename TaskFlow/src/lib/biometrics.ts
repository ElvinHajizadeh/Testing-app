import * as LocalAuthentication from 'expo-local-authentication';

/**
 * Check if device supports biometric authentication
 */
export const isBiometricAvailable = async (): Promise<boolean> => {
  try {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    return compatible;
  } catch (error) {
    console.error('Error checking biometric availability:', error);
    return false;
  }
};

/**
 * Get supported biometric types
 */
export const getSupportedBiometricTypes = async (): Promise<string[]> => {
  try {
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    const supported: string[] = [];

    if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
      supported.push('Face ID');
    }
    if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
      supported.push('Fingerprint');
    }
    if (types.includes(LocalAuthentication.AuthenticationType.IRIS)) {
      supported.push('Iris');
    }

    return supported;
  } catch (error) {
    console.error('Error getting supported biometric types:', error);
    return [];
  }
};

/**
 * Authenticate user with biometric
 */
export const authenticateWithBiometric = async (
  reason: string = 'Authenticate to unlock TaskFlow'
): Promise<boolean> => {
  try {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      console.warn('Device does not support biometric authentication');
      return false;
    }

    const result = await LocalAuthentication.authenticateAsync({
      reason,
      fallbackLabel: 'Use passcode',
      disableDeviceFallback: false,
    });

    return result.success;
  } catch (error) {
    console.error('Error during biometric authentication:', error);
    return false;
  }
};

/**
 * Check if biometric is currently enrolled on device
 */
export const isBiometricEnrolled = async (): Promise<boolean> => {
  try {
    return await LocalAuthentication.isEnrolledAsync();
  } catch (error) {
    console.error('Error checking biometric enrollment:', error);
    return false;
  }
};
