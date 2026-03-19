This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Guía para ejecutar el Proyecto (Project Manager)


Este proyecto fue desarrollado con Next.js + React + JSON Server.

REQUISITOS 
-Debes tener instalado Node.js
-Ejecutar dos terminales: (se explica mas abajo)
-Una para la API (json-server)
-Otra para la app (Next.js)

Sigue estos pasos para descargarlo y ejecutarlo correctamente en tu computadora.


1.Clonar el repositorio

Abre una terminal y ejecuta:

git clone https://github.com/TU-USUARIO/TU-REPOSITORIO.git

Luego entra a la carpeta del proyecto:

cd TU-REPOSITORIO




2. Instalar dependencias

Ejecuta:

npm install

Esto instalará todas las librerías necesarias.




3. Ejecutar la API (JSON Server)

Este proyecto usa un servidor local para guardar datos.

Primero instala json server

Ejecuta:
npm install -g json-server


Luego Ejecuta:
npx json-server --watch db.json --port 4000

Esto levanta la API en:
http://localhost:4000





4. Ejecutar la aplicación

En otra terminal (IMPORTANTE), ejecuta:

npm run dev



5.Abrir en el navagador :

http://localhost:3000


!!!!AMBAS TERMINALES TIENEN QUE ESTAR ABIERTAS MIENTRAS SE TRABAJA EN EL PROYECTO!!!! 
(ES DECIR LEVANTAR EL JSON SERVER Y EN OTRA TERMINAL LA APLICACION )




6. Uso del sistema

-Puedes registrarte como usuario

-Iniciar sesión

-Crear proyectos

-Agregar tareas

-Marcar tareas como completadas

-Eliminar proyectos y tareas


Tecnologías utilizadas:

-React
-Next.js
-Tailwind CSS
-JSON Server























First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
