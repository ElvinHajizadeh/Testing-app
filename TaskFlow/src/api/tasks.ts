import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
  getDoc,
} from 'firebase/firestore';
import { db } from '@lib/firebase';
import { Task, CreateTaskInput, UpdateTaskInput, TaskStatus } from '@types/index';

const TASKS_COLLECTION = 'tasks';

// Convert Firestore data to Task
const firestoreToTask = (doc: any): Task => ({
  id: doc.id,
  ...doc,
  dueDate: doc.dueDate?.toDate() || undefined,
  createdAt: doc.createdAt?.toDate() || new Date(),
  updatedAt: doc.updatedAt?.toDate() || new Date(),
});

/**
 * Get all tasks for a user
 */
export const getTasks = async (userId: string): Promise<Task[]> => {
  try {
    const q = query(
      collection(db, TASKS_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(firestoreToTask);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

/**
 * Get a single task by ID
 */
export const getTask = async (taskId: string): Promise<Task | null> => {
  try {
    const docRef = doc(db, TASKS_COLLECTION, taskId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? firestoreToTask(docSnap.data()) : null;
  } catch (error) {
    console.error('Error fetching task:', error);
    throw error;
  }
};

/**
 * Create a new task
 */
export const createTask = async (
  userId: string,
  input: CreateTaskInput
): Promise<Task> => {
  try {
    const now = new Date();
    const taskData = {
      userId,
      ...input,
      status: 'pending' as TaskStatus,
      dueDate: input.dueDate ? Timestamp.fromDate(input.dueDate) : null,
      createdAt: Timestamp.fromDate(now),
      updatedAt: Timestamp.fromDate(now),
    };

    const docRef = await addDoc(collection(db, TASKS_COLLECTION), taskData);
    return {
      id: docRef.id,
      ...input,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    } as Task;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

/**
 * Update a task
 */
export const updateTask = async (
  taskId: string,
  input: UpdateTaskInput
): Promise<Task> => {
  try {
    const docRef = doc(db, TASKS_COLLECTION, taskId);
    const updateData = {
      ...input,
      dueDate: input.dueDate ? Timestamp.fromDate(input.dueDate) : null,
      updatedAt: Timestamp.fromDate(new Date()),
    };

    await updateDoc(docRef, updateData);

    const updated = await getTask(taskId);
    if (!updated) throw new Error('Task not found after update');
    return updated;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

/**
 * Delete a task
 */
export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    const docRef = doc(db, TASKS_COLLECTION, taskId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

/**
 * Toggle task completion
 */
export const toggleTask = async (
  taskId: string,
  currentStatus: TaskStatus
): Promise<Task> => {
  const newStatus: TaskStatus = currentStatus === 'completed' ? 'pending' : 'completed';
  return updateTask(taskId, { status: newStatus });
};

/**
 * Get tasks by priority
 */
export const getTasksByPriority = async (userId: string, priority: string): Promise<Task[]> => {
  try {
    const q = query(
      collection(db, TASKS_COLLECTION),
      where('userId', '==', userId),
      where('priority', '==', priority),
      orderBy('dueDate', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(firestoreToTask);
  } catch (error) {
    console.error('Error fetching tasks by priority:', error);
    throw error;
  }
};
