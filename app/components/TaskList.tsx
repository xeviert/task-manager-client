"use client";
import React, { useMemo } from 'react';
import { useEffect, useState } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  Container,
  Grid
} from '@mui/material';
import CreateTask from './modals/CreateTask';
import TaskDetails from './modals/TaskDetails';
import DeleteTask from './modals/DeleteTask';
import { useSnackbar } from '../../utils/alert';
import TasksApiServices from '../../services/tasks-api-services';
import { TaskDescription } from '../../utils/helpers';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskColumn } from './TasksColumn';

interface Task {
  id: string;
  title: string;
  status: string;
  description: string;
}

export default function TaskList({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [addTask, setAddTask] = useState(false);
  const [taskDetails, setTaskDetails] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const { handleOpenSnackbar, SnackbarComponent } = useSnackbar();

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const handleCreateTask = async (
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

  const handleDelete = async () => {
    try {
      await TasksApiServices.deleteTask(selectedTask.id);

      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== selectedTask.id)
      );

      console.log('Task deleted successfully');
      handleOpenSnackbar('Task deleted successfully!', 'success');
      setSelectedTask(null);
      setDeleteTask(false)
    } catch (error) {
      console.error('Error deleting task:', error);
      handleOpenSnackbar('Failed to delete task!', 'error');
    }
  };

  const filteredTasks = useMemo(() => {
    const pending = [];
    const inProgress = [];
    const completed = [];

    tasks.forEach(task => {
      if (task.status === 'pending') {
        pending.push(task);
      } else if (task.status === 'in-progress') {
        inProgress.push(task);
      } else {
        completed.push(task)
      }
    })
    return {
      pending,
      inProgress,
      completed
    }
  }, [tasks]);

  const { pending: pendingTasks, inProgress: inProgressTasks, completed: completedTasks } = filteredTasks;

  return (
    <>
      {SnackbarComponent}
      <Container sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
          Task Manager
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
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

        <Grid container spacing={3}>
          <TaskColumn
            title="Pending"
            tasks={pendingTasks}
            onTaskClick={(task) => {
              setSelectedTask(task);
              setTaskDetails(true);
            }}
            onDelete={(task) => {
              setSelectedTask(task);
              setDeleteTask(true);
            }}
          />

          <TaskColumn
            title="In Progress"
            tasks={inProgressTasks}
            onTaskClick={(task) => {
              setSelectedTask(task);
              setTaskDetails(true);
            }}
            onDelete={(task) => {
              setSelectedTask(task);
              setDeleteTask(true);
            }}
          />

          <TaskColumn
            title="Completed"
            tasks={completedTasks}
            onTaskClick={(task) => {
              setSelectedTask(task);
              setTaskDetails(true);
            }}
            onDelete={(task) => {
              setSelectedTask(task);
              setDeleteTask(true);
            }}
          />
        </Grid>

        <CreateTask
          open={addTask}
          onClose={() => setAddTask(false)}
          handleSubmit={handleCreateTask}
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
        {selectedTask && (
          <DeleteTask
            open={deleteTask}
            onClose={() => {
              setDeleteTask(false)
              setSelectedTask(null)
            }}
            task={selectedTask}
            handleDelete={handleDelete}
          />
        )}
      </Container>
    </>
  );
}