import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useQuery } from 'react-query';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthStore } from '@store/auth';
import { getTasks, toggleTask } from '@api/tasks';
import { Task } from '@types/index';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const { data: allTasks = [], isLoading, refetch } = useQuery(
    ['tasks', user?.uid],
    () => (user?.uid ? getTasks(user.uid) : Promise.resolve([])),
    { enabled: !!user?.uid }
  );

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])
  );

  const filteredTasks = allTasks.filter((task) => {
    if (selectedFilter === 'pending') return task.status === 'pending';
    if (selectedFilter === 'completed') return task.status === 'completed';
    return true;
  });

  const handleToggleTask = async (task: Task) => {
    try {
      await toggleTask(task.id, task.status);
      refetch();
    } catch (error) {
      Alert.alert('Error', 'Failed to update task');
    }
  };

  const handleDeleteTask = (task: Task) => {
    Alert.alert('Delete Task', `Are you sure you want to delete "${task.title}"?`, [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            // Delete task logic here
            refetch();
          } catch (error) {
            Alert.alert('Error', 'Failed to delete task');
          }
        },
      },
    ]);
  };

  const renderTaskItem = ({ item }: { item: Task }) => (
    <TouchableOpacity
      style={styles.taskCard}
      onPress={() => router.push(`/task/${item.id}`)}
    >
      <View style={styles.taskHeader}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => handleToggleTask(item)}
        >
          <MaterialCommunityIcons
            name={
              item.status === 'completed'
                ? 'checkbox-marked'
                : 'checkbox-blank-outline'
            }
            size={24}
            color={item.status === 'completed' ? '#007AFF' : '#ccc'}
          />
        </TouchableOpacity>
        <View style={styles.taskInfo}>
          <Text
            style={[
              styles.taskTitle,
              item.status === 'completed' && styles.completedText,
            ]}
          >
            {item.title}
          </Text>
          {item.description && (
            <Text style={styles.taskDescription} numberOfLines={1}>
              {item.description}
            </Text>
          )}
        </View>
        <View style={[styles.priority, { borderColor: getPriorityColor(item.priority) }]}>
          <Text style={[styles.priorityText, { color: getPriorityColor(item.priority) }]}>
            {item.priority.charAt(0).toUpperCase()}
          </Text>
        </View>
      </View>
      {item.dueDate && (
        <Text style={styles.dueDate}>
          Due: {new Date(item.dueDate).toLocaleDateString()}
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterBar}>
        {(['all', 'pending', 'completed'] as const).map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : filteredTasks.length === 0 ? (
        <View style={styles.centerContainer}>
          <MaterialCommunityIcons name="inbox" size={48} color="#ccc" />
          <Text style={styles.emptyText}>
            {selectedFilter === 'all'
              ? 'No tasks yet. Create one to get started!'
              : `No ${selectedFilter} tasks`}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredTasks}
          renderItem={renderTaskItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/task/create')}
      >
        <MaterialCommunityIcons name="plus" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return '#FF3B30';
    case 'medium':
      return '#FF9500';
    case 'low':
      return '#34C759';
    default:
      return '#999';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  filterBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: '#999',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#007AFF',
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    padding: 4,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  completedText: {
    color: '#999',
    textDecorationLine: 'line-through',
  },
  taskDescription: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
  },
  priority: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priorityText: {
    fontWeight: '600',
    fontSize: 12,
  },
  dueDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
});
