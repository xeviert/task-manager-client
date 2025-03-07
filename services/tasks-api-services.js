const TasksApiServices = {
  async getTasks() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`);

    if (!response.ok) {
      throw new Error(`Failed to fetch tasks: ${response.statusText}`);
    }

    return response.json();
  },
  async createTask(newTask) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });

    if (!response.ok) {
      throw new Error(`Failed to create task: ${response.statusText}`);
    }

    return response.json();
  },
  async updateTask(changes) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${changes.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(changes),
    });

    if (!response.ok) {
      throw new Error(`Failed to update task: ${response.statusText}`);
    }

    return response.json();
  },
};

export default TasksApiServices;