import React from 'react';
import { List } from '@mui/material';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: { id: string; text: string; category: string; priority: '🔴' | '🟡' | '🟢' }[];
  onDelete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete }) => {
  return (
    <List>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          category={todo.category}
          priority={todo.priority}
          onDelete={onDelete}
        />
      ))}
    </List>
  );
};

export default TodoList;