import TaskList from './components/TaskList';
import TasksApiServices from '../services/tasks-api-services';

export default async function Home() {
  const tasks = await TasksApiServices.getTasks()

  return (
    <div>
      <TaskList initialTasks={tasks} />
    </div>
  );
}
