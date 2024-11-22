import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteTodo, getTodo, getTodos, updateTodo } from 'services/todo';

// Get list todos
export const useGetTodos = (props?: { enabled?: boolean }) => {
  const { enabled = true } = props || {};

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
    select: (response) => response.data, // transform data
    enabled,
  });

  return { data: data || [], isLoading, isError, refetch };
};

// Get a todo
export const useGetTodo = (props: { id?: string; enabled?: boolean }) => {
  const { id, enabled = false } = props || {};

  return useQuery({
    queryKey: ['todo', id],
    queryFn: () => getTodo(id),
    select: (response) => response.data,
    enabled,
  });
};

// Update a todo
export const useUpdateTodo = () => {
  return useMutation({
    mutationKey: ['updateTodo'],
    mutationFn: updateTodo,
  });
};

// Delete a todo
export const useDeleteTodo = () => {
  return useMutation({
    mutationKey: ['deleteTodo'],
    mutationFn: deleteTodo,
  });
};
