import React from 'react';
import { ListItem, ListItemText, IconButton, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface TodoItemProps {
  id: string;
  text: string;
  category: string;
  priority: '🔴' | '🟡' | '🟢';
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, category, priority, onDelete }) => {
  return (
    <ListItem>
      <ListItemText primary={text} secondary={`Category: ${category}`} />
      <Chip label={priority} color={
        priority === '🔴' ? 'error' :
          priority === '🟡' ? 'warning' : 'success'
      } />
      <IconButton edge="end" aria-label="delete" onClick={() => onDelete(id)}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default TodoItem;