import React, { useState } from 'react';
import { User } from './types';

interface AddTodoFormProps {
  users: User[];
  onAddTodo: (newTodo: { title: string; userId: number }) => void;
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({
  users,
  onAddTodo,
}) => {
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      hasError = true;
    }

    if (!selectedUserId) {
      setUserError('Please choose a user');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    onAddTodo({
      title: title.trim(),
      userId: Number(selectedUserId),
    });

    // Limpa o formulário
    setTitle('');
    setSelectedUserId('');
    setTitleError('');
    setUserError('');
  };

  return (
    <form onSubmit={handleSubmit} data-cy="addTodoForm">
      <div className="field">
        <label htmlFor="todo-title">Título</label>
        <input
          id="todo-title"
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={e => {
            setTitle(e.target.value);
            if (titleError) {
              setTitleError('');
            }
          }}
          placeholder="O que precisa ser feito?"
          aria-describedby={titleError ? 'title-error' : undefined}
        />
        {titleError && (
          <span id="title-error" className="error">
            {titleError}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="user-select">Usuário</label>
        <select
          id="user-select"
          data-cy="userSelect"
          value={selectedUserId}
          onChange={e => {
            setSelectedUserId(e.target.value);
            if (userError) {
              setUserError('');
            }
          }}
          aria-describedby={userError ? 'user-error' : undefined}
        >
          <option value="">Choose a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id.toString()}>
              {user.name}
            </option>
          ))}
        </select>
        {userError && (
          <span id="user-error" className="error">
            {userError}
          </span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Adicionar
      </button>
    </form>
  );
};
