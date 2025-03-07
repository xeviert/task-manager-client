import {
  Typography,
  Box,
  Button,
  Modal,
} from '@mui/material';

const DeleteTask = ({ open, onClose, task, handleDelete }) => {
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
        <Typography variant="h6">
          Delete task <span style={{ fontStyle: 'italic' }}>{task.title}</span> ?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDelete} sx={{ ml: 2 }}>
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteTask;
