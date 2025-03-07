import TaskList from './components/TaskList';
import TasksApiServices from '../services/tasks-api-services';

export default async function Home() {
  const tasks = await TasksApiServices.getTasks()
  const visibleTasks = tasks.filter((task) => task.deletedAt === null);

  return (
    <div>
      <TaskList initialTasks={visibleTasks} />
    </div>
  );
}
