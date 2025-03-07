import { useState, useEffect } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle,
  Button, Box, Typography, CircularProgress, TextField,
  FormControl, InputLabel, Select, MenuItem, Modal
} from '@mui/material';

const TaskDetails = ({ open, onClose, task, onSave, openSnackbar }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title !== undefined ? task.title : '');
      setDescription(task.description !== undefined ? task.description : '');
      setStatus(task.status !== undefined ? task.status : '');

      setIsEditing(false);
    } else {
      setTitle('');
      setDescription('');
      setStatus('');
      setIsEditing(false);
    }
  }, [task]);

  const TaskStatusOptions = {
    PENDING: 'pending',
    IN_PROGRESS: 'in-progress',
    COMPLETED: 'completed',
  }

  const getStatusOptions = () => {
    const options = Object.values(TaskStatusOptions).filter(option => option !== status);
    return [
      <MenuItem key={status} value={status} sx={{ padding: '6px 16px' }}>
        {status}
      </MenuItem>,
      ...options.map(option => (
        <MenuItem key={option} value={option} sx={{ padding: '6px 16px' }}>
          {option}
        </MenuItem>
      ))
    ];
  };

  const handleInputMode = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setStatus(task.status || '');
    }
    setIsEditing(false);
  };

  const handleSave = () => {
    const taskChanges = {
      ...(task.title !== title && { title }),
      ...(task.description !== description && { description }),
      ...(task.status !== status && { status }),
    };

    if (Object.keys(taskChanges).length > 0) {
      onSave({ ...taskChanges, id: task.id });
      setIsEditing(false);
    } else {
      openSnackbar('No changes detected', 'warning');
    }
  };

  if (!task) {
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Loading Task...</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="task-detail-modal"
      aria-describedby="task-edit-form"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 450,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        {isEditing ? (
          <>
            <DialogTitle sx={{ textAlign: 'center' }}>Edit Task</DialogTitle>
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}>
              <TextField
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                variant="outlined"
                size="small"
                label='Title'
                sx={{ mb: 3 }}
              />
              <Box
                sx={{ mb: 3 }}
              >
                <FormControl>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
                    sx={{ height: 38 }}
                  >
                    {getStatusOptions()}
                  </Select>
                </FormControl>
              </Box>
              <TextField
                label='Description'
                variant="outlined"
                fullWidth
                multiline
                minRows={4}
                maxRows={10}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>
          </>
        ) : (
          <>
            <DialogTitle sx={{ textAlign: 'center' }}>
              <Typography>{title}</Typography>
            </DialogTitle>
            <DialogTitle>
              <Typography>
                Status: <i>{status.toUpperCase()}</i>
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 6 }}>
                <Typography gutterBottom>
                  Details:
                </Typography>
                <Typography variant="body1">{description}</Typography>
              </Box>
            </DialogContent>

          </>
        )}

        <DialogActions sx={{ pt: 2 }}>
          {!isEditing ? (
            <>
              <Button onClick={onClose} color="secondary">
                Close
              </Button>
              <Button onClick={handleInputMode} color="primary" variant="contained">
                Edit Task
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleCancel} color="secondary">
                Cancel Edit
              </Button>
              <Button onClick={handleSave} color="primary" variant="contained">
                Save Changes
              </Button>
            </>
          )}
        </DialogActions>
      </Box>
    </Modal>
  );
};

export default TaskDetails;
