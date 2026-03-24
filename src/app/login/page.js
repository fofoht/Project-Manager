"use client";
import { useState } from "react";
import { loginUser } from "../services/api";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const router = useRouter();
  const { login } = useAuth();
  const router = useRouter();

    const handleLogin = async () => {
    const userData = await loginUser(email, password); 
    const success = login(userData); // actualizamos context
    if (success) router.push("/dashboard");
    else alert("Credenciales incorrectas");
};
 

  return (


    <div className="min-h-screen bg-gray-900 flex items-center justify-center">

    <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-sm flex flex-col gap-4">
      <p className="text-gray-400 text-sm text-center"> Sistema de Gestión de Proyectos</p>
      
      <h1 className="text-2xl font-bold text-white text-center">
        Iniciar sesión
      </h1>

      <input
        className="border border-gray-600 bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="border border-gray-600 bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
        onClick={handleLogin}
      >
        Iniciar sesión
      </button>

      <a
        href="/register"
        className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-center transition"
      >
        Registrarse
      </a>

    </div>

  </div>
);

}
