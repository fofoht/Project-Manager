
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <h1 className="text-4xl font-bold">Project Manager 🚀</h1>

      <a href="/login" className="bg-blue-500 text-white px-4 py-2">
        Iniciar Sesión
      </a>

      <a href="/register" className="bg-green-500 text-white px-4 py-2">
        Registrarse
      </a>
    </div>
  );
}
