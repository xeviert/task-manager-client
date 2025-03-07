"use client";
import { useEffect, useState } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  Container,
} from '@mui/material';
import CreateTask from './modals/createTask';
import TaskDetails from './modals/TaskDetails';
import { useSnackbar } from '../../utils/alert';
import TasksApiServices from '../../services/tasks-api-services';
import { TaskDescription } from '../../utils/helpers';

interface Task {
  id: string;
  title: string;
  status: string;
}

export default function TaskList({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [addTask, setAddTask] = useState(false);
  const [taskDetails, setTaskDetails] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const { handleOpenSnackbar, SnackbarComponent } = useSnackbar();

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    title: string,
    description: string
  ) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      status: 'pending',
    };

    try {
      const createdTask = await TasksApiServices.createTask(newTask);
      handleOpenSnackbar('Task updated successfully!', 'success');
      setTasks((prevTasks) => [...prevTasks, createdTask]);
      setAddTask(false);
    } catch (error) {
      console.error('Error creating task:', error);
      handleOpenSnackbar('Error creating task', 'error')
    }
  };

  const handleSaveEdits = async (changes) => {
    try {
      const data = await TasksApiServices.updateTask(changes)

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === data.id ? data : task))
      );
      handleOpenSnackbar('Task updated successfully!', 'success')
      setSelectedTask(null)
    } catch (error) {
      console.error('Error updating task:', error);
      handleOpenSnackbar('Failed to update task!', 'error');
    }
  };

  return (
    <>
      {SnackbarComponent}
      <Container sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
          Task List
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.3)',
              },
            }}
            onClick={() => setAddTask(true)}
          >
            + Task
          </Button>
        </Box>
        <Box sx={{ width: '40%' }}>
          <List>
            {tasks.map((task) => (
              <ListItem
                key={task.id}
                onClick={() => {
                  setSelectedTask(task)
                  setTaskDetails(true)
                }}
                sx={{ cursor: 'pointer', border: 'solid', borderWidth: 'thin', borderRadius: 2, mb: 2, }}
              ><Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <ListItemText primary={task.title} secondary={`Status: ${task.status}`} />
                  <TaskDescription text={task.description} limit={100} />
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>

        <CreateTask
          open={addTask}
          onClose={() => setAddTask(false)}
          handleSubmit={handleSubmit}
        />
        {selectedTask && (
          <TaskDetails
            open={taskDetails}
            onClose={() => setTaskDetails(false)}
            task={selectedTask}
            onSave={handleSaveEdits}
            openSnackbar={handleOpenSnackbar}
          />
        )}
      </Container>
    </>
  );
}