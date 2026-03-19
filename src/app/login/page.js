"use client";
import { useState } from "react";
import { loginUser } from "../services/api";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const user = await loginUser(email, password);

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/dashboard");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Login</h1>

      <input
        className="border p-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="border p-2"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
    
      <button
        className="bg-blue-500 text-white px-4 py-2"
        onClick={handleLogin}
      >Iniciar sesión</button>

      <a href="/register" className="bg-green-500 text-white px-4 py-2">
        Registrarse
      </a>


    </div>
  );
}
