import React from 'react';
import { List } from '@mui/material';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: { id: string; text: string }[];
  onDelete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete }) => {
  return (
    <List>
      {todos.map((todo) => (
        <TodoItem key={todo.id} id={todo.id} text={todo.text} onDelete={onDelete} />
      ))}
    </List>
  );
};

export default TodoList;