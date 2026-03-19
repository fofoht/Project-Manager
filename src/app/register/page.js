"use client";
import { useState } from "react";
import { registerUser } from "../services/api";
import { useRouter } from "next/navigation";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    await registerUser({ name, email, password });
    alert("Usuario creado");
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Registro</h1>

      <input className="border p-2" placeholder="Nombre" onChange={(e) => setName(e.target.value)} />
      <input className="border p-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        className="border p-2"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-green-500 text-white px-4 py-2"
        onClick={handleRegister}
      >
        Registrarse
      </button>

      <a href="/login" className="bg-blue-500 text-white px-4 py-2">
        Iniciar Sesión
      </a>
      
    </div>
  );
}
