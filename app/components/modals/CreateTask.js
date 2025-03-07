import { useState } from 'react';
import {
  Typography,
  Box,
  Button,
  TextField,
  Stack,
  Modal,
} from '@mui/material';

const CreateTask = ({ open, onClose, handleSubmit }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-task-modal"
      aria-describedby="add-task-form"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add a New Task
        </Typography>
        <form onSubmit={(e) => handleSubmit(e, newTaskTitle, newTaskDescription)}>
          <Stack spacing={2}>
            <TextField
              label="Title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Description"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              fullWidth
              multiline
              rows={4}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Add Task
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateTask;
