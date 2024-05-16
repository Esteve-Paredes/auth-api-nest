# Auth-Api-Nest

Esta es una aplicación backend desarrollada con NestJS. Proporciona servicios para registrar usuarios, autenticarlos y realizar operaciones CRUD en una base de datos de usuarios.

## Stack Tecnológico

Node, Nest JS, Typescript, MongoDB

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/Esteve-Paredes/auth-api-nest.git
   ```

2. Entra en el directorio del proyecto:

   ```bash
   cd auth-api-nest
   ```

3. Instala las dependencias con el siguiente comando:

   ```bash
   npm install
   ```

4. Configura las variables de entorno necesarias (ver sección de Configuración).

## Configuración

Antes de ejecutar la aplicación, necesitas configurar algunas variables de entorno en un archivo `.env`. Aquí tienes un ejemplo de cómo debería lucir:

```plaintext
PORT=3000
DB_CONNECTION=your_connectionDB
```

## Ejecución de la Aplicación

Para iniciar la aplicación, usa el siguiente comando:

```bash
npm run start
```

Para ejecutar en modo de desarrollo con recarga automática, usa:

```bash
npm run start:dev
```

## Uso

#### Registro de Usuarios

Para registrar un nuevo usuario, haz una solicitud POST a la siguiente ruta:

```bash
POST  => /auth/register
```

Envía un cuerpo de solicitud JSON con los siguientes campos:

```bash
{
	"name": "nombre",
	"lastName": "apellido",
	"email" : "email",
	"password" : "contraseña"
}
```

#### Inicio de Sesión

Para iniciar sesión, haz una solicitud POST a la siguiente ruta:

```bash
POST  => /auth/login
```

Envía un cuerpo de solicitud JSON con los siguientes campos:

```bash
{
	"email" : "email",
	"password" : "contraseña"
}
```

El servidor responderá con un token de autenticación que deberá ser incluido en las solicitudes posteriores como un encabezado de autorización.

#### Operaciones CRUD de Usuarios

Las operaciones CRUD en los usuarios requieren autenticación mediante un token JWT. Asegúrate de incluir el token de autenticación en el encabezado de autorización de todas las solicitudes.

#### Obtener todos los usuarios registrados:

```bash
GET  => /users
```

#### Obtener un usuario por ID:

```bash
GET  => /users/:id
```

#### Actualizar información de un usuario:

```bash
PATCH  => /users/:id
```

#### Eliminar un usuario:

```bash
DELETE  => /users/:id
```

#### Ejemplo de cómo enviar el token en el encabezado de autorización:

```bash
Authorization: Bearer <tu_token_jwt>
```
