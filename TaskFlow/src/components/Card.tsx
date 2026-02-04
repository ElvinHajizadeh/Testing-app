import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewProps,
} from 'react-native';

export interface CardProps extends ViewProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
}

/**
 * Reusable card component
 */
export const Card: React.FC<CardProps> = ({
  children = undefined,
  title = undefined,
  subtitle = undefined,
  style = undefined,
  ...props
}: CardProps) => {
  return (
    <View style={[styles.card, style]} {...props}>
      {title && (
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#007AFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  subtitle: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
  },
});
