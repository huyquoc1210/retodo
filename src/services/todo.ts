import Endpoints from 'constants/endpoints';
import type { HttpResponse } from 'types/http';
import type { Todo } from 'types/todo';
import HttpClient from 'utils/HttpClient';

// Get list todo
export const getTodos = async () => {
  return HttpClient.get<HttpResponse<Todo[]>>(Endpoints.todo.index);
};

// Get a todo
export const getTodo = async (id?: string) => {
  return HttpClient.get<HttpResponse<Todo>>(`${Endpoints.todo.index}/${id}`);
};

// Create todo
interface CreateTodoPayload {
  title: string;
  description: string | null;
  isCompleted: boolean;
}
export const createTodo = async (payload: CreateTodoPayload) => {
  return HttpClient.post<typeof payload, HttpResponse<Todo>>(
    Endpoints.todo.index,
    payload
  );
};

// Update todo
export const updateTodo = async (props: {
  id: string;
  payload: CreateTodoPayload;
}) => {
  const { id, payload } = props;
  return HttpClient.put<typeof payload, HttpResponse<Todo>>(
    `${Endpoints.todo.index}/${id}`,
    payload
  );
};

// Delete todo
export const deleteTodo = async (id: string) => {
  return HttpClient.delete<HttpResponse<Todo>>(`${Endpoints.todo.index}/${id}`);
};
