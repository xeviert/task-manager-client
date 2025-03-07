import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Grid,
} from '@mui/material';
import { TaskDescription } from '../../utils/helpers';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

export const TaskColumn = ({ title, tasks, onTaskClick, onDelete }) => (
  <Grid item xs={12} md={4}>
    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
      {title}
    </Typography>
    <List>
      {tasks.map((task) => (
        <ListItem
          key={task.id}
          onClick={() => onTaskClick(task)}
          sx={{
            cursor: 'pointer',
            border: 'solid',
            borderWidth: 'thin',
            borderRadius: 2,
            mb: 2,
            bgcolor: 'background.paper',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: 2,
            }
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ListItemText
                primary={task.title}
                secondary={`Status: ${task.status}`}
                sx={{ pr: 2 }}
              />
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(task);
                }}
                sx={{ color: 'error.main', '&:hover': { bgcolor: 'error.light' } }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
            <TaskDescription text={task.description} limit={50} />
          </Box>
        </ListItem>
      ))}
      {tasks.length === 0 && (
        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          No tasks here
        </Typography>
      )}
    </List>
  </Grid>
);