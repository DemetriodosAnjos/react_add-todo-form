import React, { useState, useMemo } from 'react';
import './App.scss';
import { Todo, User } from './types';
import { AddTodoForm } from './AddTodoForm';
import { TodoList } from './components/TodoList';

// Importa exatamente os mesmos arrays que o teste usa
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [users] = useState<User[]>(usersFromServer);

  const todosWithUsers = useMemo(() => {
    return todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));
  }, [todos, users]);

  const addTodo = (newTodo: { title: string; userId: number }) => {
    const maxId = Math.max(...todos.map(todo => todo.id), 0);
    const user = users.find(u => u.id === newTodo.userId);

    if (!user) {
      return;
    }

    const todoToAdd: Todo = {
      id: maxId + 1,
      title: newTodo.title,
      userId: newTodo.userId,
      completed: false,
      user,
    };

    setTodos(current => [...current, todoToAdd]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <AddTodoForm users={users} onAddTodo={addTodo} />
      <TodoList todos={todosWithUsers} />
    </div>
  );
};
