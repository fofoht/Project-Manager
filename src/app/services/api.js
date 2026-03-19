const API_URL = "http://localhost:4000";

// USERS
export const registerUser = async (user) => {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${API_URL}/users?email=${email}&password=${password}`);
  const data = await res.json();
  return data[0];
};

// PROJECTS
export const getProjects = async () => {
  const res = await fetch(`${API_URL}/projects`);
  return res.json();
};

export const createProject = async (project) => {
  const res = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  return res.json();
};

export const deleteProject = async (id) => {
  await fetch(`${API_URL}/projects/${id}`, {
    method: "DELETE",
  });
};

// TASKS
//busca todas las tareas
export const getTasks = async () => {
  const res = await fetch(`${API_URL}/tasks`);
  return res.json();
};


// busca tarea por proyecto
export const getTasksByProject = async (projectId) => {
  const res = await fetch(`${API_URL}/tasks?projectId=${projectId}`);
  return res.json();
};

// crear tarea
export const createTask = async (task) => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
};

// actualizar tarea
export const updateTask = async (id, updatedTask) => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTask),
  });
  return res.json();
};

// para eliminar una tarea
export const deleteTask = async (id) => {
  await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
  });
};