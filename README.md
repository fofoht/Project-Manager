# Project-Manager
crea proyectos y tareas 

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
