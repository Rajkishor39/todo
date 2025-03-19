const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const fetchTasks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};


export const addTask = async (task) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding task:", error);
  }
};


export const updateTask = async (id, updatedFields) => {
  try {
    await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields),
    });
  } catch (error) {
    console.error("Error updating task:", error);
  }
};


export const deleteTask = async (id) => {
  try {
    await fetch(`${API_BASE_URL}/tasks/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
