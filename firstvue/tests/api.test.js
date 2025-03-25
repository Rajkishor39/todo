import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchTasks, addTask, updateTask, deleteTask } from "../src/api.js"; 

global.fetch = vi.fn(); 
describe("API Functions", () => {
  beforeEach(() => {
    vi.clearAllMocks(); 
  });

  it("fetchTasks should return a list of tasks", async () => {
    const mockTasks = [{ id: 1, title: "Task 1" }, { id: 2, title: "Task 2" }];

    fetch.mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockTasks),
    });

    const result = await fetchTasks();
    expect(result).toEqual(mockTasks);
    expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_BASE_URL}/tasks`);
  });

  it("addTask should send a POST request and return the new task", async () => {
    const newTask = { id: 3, title: "New Task" };

    fetch.mockResolvedValue({
      json: vi.fn().mockResolvedValue(newTask),
    });

    const result = await addTask(newTask);
    expect(result).toEqual(newTask);
    expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_BASE_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
  });

  it("updateTask should send a PUT request", async () => {
    fetch.mockResolvedValue({});

    await updateTask(1, { title: "Updated Task" });
    expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_BASE_URL}/tasks/1`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Updated Task" }),
    });
  });

  it("deleteTask should send a DELETE request", async () => {
    fetch.mockResolvedValue({});

    await deleteTask(1);
    expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_BASE_URL}/tasks/1`, {
      method: "DELETE",
    });
  });
});
