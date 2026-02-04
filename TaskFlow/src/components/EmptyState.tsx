import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewProps,
} from 'react-native';

interface EmptyStateProps extends ViewProps {
  icon?: string;
  title: string;
  description?: string;
  isLoading?: boolean;
}

/**
 * Reusable empty state component
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = undefined,
  title,
  description = undefined,
  isLoading = false,
  style = undefined,
  ...props
}: EmptyStateProps) => {
  return (
    <View style={[styles.container, style]} {...props}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <>
          {icon && <Text style={styles.icon}>{icon}</Text>}
          <Text style={styles.title}>{title}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  icon: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
