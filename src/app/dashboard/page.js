"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
  getTasksByProject,
  createTask,
  deleteTask,
  updateTask
} from "../services/api";

export default function Dashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState("");
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [tasks, setTasks] = useState({});
  const [newTask, setNewTask] = useState({});
  const [confirmDeleteTask, setConfirmDeleteTask] = useState(null);
  const router = useRouter();

  //  ESTADOS: Para controlar la edición de las tareas
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState("");

  // Cargar proyectos al montar el componente
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      loadProjects();
    }
  }, [isAuthenticated]);

  // Función para cargar proyectos y sus tareas
  const loadProjects = async () => {
    const data = await getProjects();
    setProjects(data);

    data.forEach((project) => {
      loadTasks(project.id);
    });
  };

  // Función para crear un nuevo proyecto
  const handleCreateProject = async () => {
    if (!newProject) return;

    await createProject({ name: newProject });

    setNewProject("");
    loadProjects();
  };

  // Logout
  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // Funcion eliminar proyecto y lo hacemos en cascada para que no queden datos huefanos
  const handleDeleteProject = async (projectId) => {
    const projectTasks = await getTasksByProject(projectId);
    for (const task of projectTasks) {
      await deleteTask(task.id);
    }
    await deleteProject(projectId);
    loadProjects();
  };

  // Función para cargar tareas de un proyecto
  const loadTasks = async (projectId) => {
    const data = await getTasksByProject(projectId);
    setTasks((prev) => ({
      ...prev,
      [projectId]: data,
    }));
  };

  // Función para crear una nueva tarea
  const handleCreateTask = async (projectId) => {
    const title = newTask[projectId];
    if (!title) return;

    await createTask({
      title,
      projectId,
      completed: false,
    });

    setNewTask((prev) => ({
      ...prev,
      [projectId]: "",
    }));

    loadTasks(projectId);
  };

  // funcion para actualizar tarea (checkbox)
  const handleToggleTask = async (task, projectId) => {
    await updateTask(task.id, {
      ...task,
      completed: !task.completed,
    });
    loadTasks(projectId);
  };

  //  FUNCIONES: Para gestionar el modo edición de tareas
  const startEditingTask = (task) => {
    setEditingTaskId(task.id);
    setEditingTaskTitle(task.title);
  };

  const cancelEditingTask = () => {
    setEditingTaskId(null);
    setEditingTaskTitle("");
  };

  const handleSaveEditTask = async (task, projectId) => {
    if (!editingTaskTitle.trim()) return;
    await updateTask(task.id, {
      ...task,
      title: editingTaskTitle,
    });
    cancelEditingTask();
    loadTasks(projectId);
  };

  // Función para eliminar una tarea
  const handleDeleteTask = async (taskId, projectId) => {
    await deleteTask(taskId);
    loadTasks(projectId);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {user?.role === "gerente" && (
        <div className="flex gap-3 mb-6 bg-white p-4 rounded-xl shadow items-center">
          <input
            className="border border-gray-300 p-2 rounded-lg w-full md:w-1/2 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Nuevo Proyecto"
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
          />
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            onClick={handleCreateProject}
          >
            Crear
          </button>
        </div>
      )}

      <div>
        {projects.map((project) => {
          //  LÓGICA: Matemáticas para la barra de progreso
          const projectTasks = tasks[project.id] || [];
          const totalTasks = projectTasks.length;
          const completedTasks = projectTasks.filter((t) => t.completed).length;
          const progressPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

          return (
            <div
              key={project.id}
              className="bg-white p-4 mb-4 rounded-xl shadow flex justify-between items-start gap-4"
            >
              <div className="flex flex-col w-full">
                <span className="font-bold text-black text-xl">{project.name}</span>

                {/* TU BARRA DE PROGRESO ADAPTADA AL NUEVO DISEÑO */}
                <div className="mt-3 mb-4 pr-4">
                  <div className="flex justify-between text-sm mb-1 text-gray-500 font-medium">
                    <span>Progreso de actividades</span>
                    <span>{progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-green-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* INPUT PARA CREAR TAREA */}
                {user?.role === "gerente" && (
                  <div className="flex gap-2 mt-2">
                    <input
                      className="border border-gray-300 p-2 rounded-lg flex-1 max-w-md text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Nueva tarea"
                      value={newTask[project.id] || ""}
                      onChange={(e) =>
                        setNewTask({
                          ...newTask,
                          [project.id]: e.target.value,
                        })
                      }
                    />
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 rounded-lg"
                      onClick={() => handleCreateTask(project.id)}
                    >
                      +
                    </button>
                  </div>
                )}

                {/* LISTA DE TAREAS */}
                <div className="mt-4">
                  {(tasks[project.id] || []).map((task) => (
                    <div
                      key={task.id}
                      className="ml-2 flex items-center gap-3 bg-gray-50 p-2 rounded-lg mt-2 shadow-sm"
                    >
                      {/*  Modo Edición y Modo Vista */}
                      {editingTaskId === task.id ? (
                        // MODO EDICIÓN
                        <>
                          <input
                            className="border border-gray-300 p-1 rounded flex-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={editingTaskTitle}
                            onChange={(e) => setEditingTaskTitle(e.target.value)}
                          />
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 text-sm rounded transition"
                            onClick={() => handleSaveEditTask(task, project.id)}
                          >
                            Guardar
                          </button>
                          <button
                            className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 text-sm rounded transition"
                            onClick={cancelEditingTask}
                          >
                            Cancelar
                          </button>
                        </>
                      ) : (
                        // MODO VISTA
                        <>
                          <span
                            className={`text-sm flex-1 ${
                              task.completed
                                ? "line-through text-gray-400"
                                : "text-gray-800 font-medium"
                            }`}
                          >
                            {task.title}
                          </span>
                          <input
                            type="checkbox"
                            className="w-4 h-4 cursor-pointer"
                            checked={task.completed}
                            onChange={() => handleToggleTask(task, project.id)}
                          />

                          {/* Botones protegidos para gerente */}
                          {user?.role === "gerente" && (
                            <>
                              <button
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 text-sm rounded transition"
                                onClick={() => startEditingTask(task)}
                              >
                                Editar
                              </button>
                              <button
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm rounded transition"
                                onClick={() => setConfirmDeleteTask(task.id)}
                              >
                                X
                              </button>
                            </>
                          )}

                          {confirmDeleteTask === task.id && (
                            <div className="flex gap-2 ml-2">
                              <button
                                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-sm rounded"
                                onClick={() => {
                                  handleDeleteTask(task.id, project.id);
                                  setConfirmDeleteTask(null);
                                }}
                              >
                                Confirmar
                              </button>
                              <button
                                className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-1 text-sm rounded"
                                onClick={() => setConfirmDeleteTask(null)}
                              >
                                Cancelar
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Controles del Proyecto (Solo Gerente) */}
              {user?.role === "gerente" && (
                <div className="flex flex-col items-end gap-2 min-w-[150px]">
                  <button
                    className="bg-yellow-500 text-white hover:bg-yellow-600 px-3 py-1 text-sm rounded w-full transition"
                    onClick={() => {
                      setEditingProjectId(project.id);
                      setEditedName(project.name);
                    }}
                  >
                    Editar proyecto
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm rounded w-full transition"
                    onClick={() => setConfirmDelete(project.id)}
                  >
                    Eliminar proyecto
                  </button>

                  {confirmDelete === project.id && (
                    <div className="bg-red-100 border border-red-300 p-2 rounded-lg w-full mt-2 shadow-sm">
                      <p className="text-red-700 text-xs mb-2 font-medium text-center">
                        ¿Seguro que deseas eliminar este proyecto?
                      </p>
                      <div className="flex gap-2">
                        <button
                          className="bg-red-700 hover:bg-red-800 text-white px-2 py-1 text-sm rounded w-full"
                          onClick={() => handleDeleteProject(project.id)}
                        >
                          Sí
                        </button>
                        <button
                          className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 text-sm rounded w-full"
                          onClick={() => setConfirmDelete(null)}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {editingProjectId && (
        // Modal para editar proyecto
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Editar Proyecto
            </h2>
            <input
              className="border border-gray-300 p-2 rounded-lg w-full text-gray-800 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition"
                onClick={() => setEditingProjectId(null)}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                onClick={async () => {
                  if (!editedName.trim()) return;
                  await updateProject(editingProjectId, {
                    name: editedName,
                  });
                  setEditingProjectId(null);
                  setEditedName("");
                  loadProjects();
                }}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}