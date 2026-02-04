// User types
export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Task types
export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskStatus = 'pending' | 'completed' | 'archived';

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate?: Date;
  tags?: string[];
}

export interface UpdateTaskInput extends Partial<CreateTaskInput> {
  status?: TaskStatus;
}

// Auth types
export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Settings types
export interface AppSettings {
  userId: string;
  enableBiometrics: boolean;
  enableNotifications: boolean;
  theme: 'light' | 'dark';
  language: 'en' | 'es' | 'fr';
  notificationSound: boolean;
  notificationVibration: boolean;
}

// Notification types
export interface PushNotification {
  id: string;
  userId: string;
  title: string;
  body: string;
  taskId?: string;
  read: boolean;
  createdAt: Date;
}
