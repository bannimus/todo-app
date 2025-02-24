import React, { useState } from 'react';
import { TextField, Button, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

interface TodoFormProps {
  onAdd: (text: string, category: string, priority: '🔴' | '🟡' | '🟢') => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState<'🔴' | '🟡' | '🟢'>('🔴');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() !== '') {
      onAdd(text, category, priority);
      setText('');
      setCategory('');
      setPriority('🔴');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            label="Add Todo"
            variant="outlined"
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as string)}
              label="Category"
            >
              <MenuItem value="General">General</MenuItem>
              <MenuItem value="Personal">Personal</MenuItem>
              {/* Add more categories as needed */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as '🔴' | '🟡' | '🟢')}
              label="Priority"
            >
              <MenuItem value="🔴">🔴 Acil</MenuItem>
              <MenuItem value="🟡">🟡 Orta</MenuItem>
              <MenuItem value="🟢">🟢 Düşük</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TodoForm;