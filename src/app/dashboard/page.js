"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getProjects,
  createProject,
  deleteProject,
  getTasksByProject,
  createTask,
  deleteTask,
  updateTask
} from "../services/api";



export default function Dashboard(){
    const [projects,setProjects]= useState([]);
    const [newProject, setNewProject]= useState("");
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [tasks, setTasks] = useState({});
    const [newTask, setNewTask] = useState({});
    const [confirmDeleteTask, setConfirmDeleteTask] = useState(null);
    const router = useRouter();


// Cargar proyectos al montar el componente
    useEffect(()=>{
        loadProjects();
    },[]);

// Función para cargar proyectos y sus tareas
    const loadProjects = async()=>{
        const data = await getProjects();
        setProjects(data);

         data.forEach((project) => {
    loadTasks(project.id);
  });
    };

// Función para crear un nuevo proyecto
    const handleCreateProject = async ()=>{
        if (!newProject) return;

        await createProject({name: newProject});

        setNewProject("");
        loadProjects();
    };

// Funcion eliminar proyecto y lo hacemos en cascada para que no queden datos huefanos
    const handleDeleteProject = async (projectId) => {
  // 1. Obtener tareas del proyecto
  const projectTasks = await getTasksByProject(projectId);

  // 2. Elimina cada tarea
  for (const task of projectTasks) {
    await deleteTask(task.id);
  }

  // 3. Eliminar el proyecto
  await deleteProject(projectId);

  // 4. Recargar datos
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


//funcion para actualizar tarea
const handleToggleTask = async (task, projectId) => {
  await updateTask(task.id, {
    ...task,
    completed: !task.completed,
  });

  loadTasks(projectId);
};
// Función para eliminar una tarea
const handleDeleteTask = async (taskId, projectId) => {
  await deleteTask(taskId);
  loadTasks(projectId);
};

// Función para cerrar sesión
const handleLogout = () => {
  localStorage.removeItem("user");
  router.push("/login");
};

// Renderizar el dashboard con la lista de proyectos y un formulario para crear nuevos proyectos + btn para eliminar
    return (
        
        <div className ="p-6">

                {/* btn logout */}
            <div className="flex justify-end mb-4">
                <button
                    className="bg-red-600 text-white px-4 py-2"
                    onClick={handleLogout}
                > Logout</button>
            </div>

            <h1 className=" flex justify-center text-3xl font-bold mb-7">Dashboard</h1>
        <div className="flex gap-2 mb-4">
            <input
            className="border p-2"
            placeholder ="Nuevo Proyecto"
            value={newProject}
            onChange={(e)=> setNewProject(e.target.value)}/>

        <button 
        className="bg-green-500 text-white px-4"
        onClick={handleCreateProject}>Crear</button> 
    
        </div>
  
        <div> 
  {projects.map((project) => (
    <div
      key={project.id}
      className="border p-2 mb-2 flex justify-between items-center"
    >
      <div className="flex flex-col w-full">
  <span className="font-bold">{project.name}</span>

  {/* INPUT PARA CREAR TAREA */}
  <div className="flex gap-2 mt-2">
    <input
      className="border p-2"
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
      className="bg-blue-500 text-white px-2"
      onClick={() => handleCreateTask(project.id)}
    > +</button>
  </div>

  {/* LISTA DE TAREAS */}
  <div className="mt-2">
    {(tasks[project.id] || []).map((task) => (
      <div key={task.id} className="ml-4 flex items-center gap-2">
        <span>- {task.title}</span>
        <input
  type="checkbox"
  checked={task.completed}
  onChange={() => handleToggleTask(task, project.id)}
/>
         <button
      className="bg-red-500 text-white px-2 text-sm"
      onClick={() => setConfirmDeleteTask(task.id)}
    > X</button>

{confirmDeleteTask === task.id && (
  <div className="flex gap-2 mt-1">
    <button
      className="bg-red-700 text-white px-2 text-sm"
      onClick={() => {
        handleDeleteTask(task.id, project.id);
        setConfirmDeleteTask(null);
      }}
    >Confirmar</button>

    <button
      className="bg-gray-400 text-white px-2 text-sm"
      onClick={() => setConfirmDeleteTask(null)}
    >Cancelar</button>
  </div>
)}


      </div>
    ))}
  </div>
</div>

      <div>
        <button // Primer click muestra confirmación, segundo click elimina
          className="bg-red-500 text-white px-2"
          onClick={() => setConfirmDelete(project.id)}
        >Eliminar </button>

        {confirmDelete === project.id && (
          <div className="mt-2 flex gap-2">
            <button
              className="bg-red-700 text-white px-2"
              onClick={() => handleDeleteProject(project.id)}
            >Confirmar </button>

            <button
              className="bg-gray-400 text-white px-2"
              onClick={() => setConfirmDelete(null)}
            >Cancelar </button>
          </div>
        )}
      </div>
    </div>
  ))}
</div>

    </div>
    ); 
}