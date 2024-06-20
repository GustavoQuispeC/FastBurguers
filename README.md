# FastBurgers

FastBurgers es una plataforma web para la venta de hamburguesas que ofrece seguimiento de pedidos en tiempo real a través de mapas, autenticación de terceros, integración de pagos con PayPal, un chatbot y un chat entre administradores y usuarios. Además, implementa el envío de detalles de pedido por correo electrónico utilizando Nodemailer.

## Características

- *Seguimiento de Pedidos en Mapas:* Los usuarios pueden realizar un seguimiento en tiempo real del estado de sus pedidos mediante la visualización en mapas.

- *Autenticación de Terceros:* La plataforma permite a los usuarios iniciar sesión utilizando cuentas de terceros como Google, Facebook, etc.

- *Integración de Pagos con PayPal:* Los usuarios pueden realizar pagos de forma segura utilizando PayPal.

- *Chatbot:* Un chatbot ofrece asistencia automatizada para los usuarios, respondiendo preguntas frecuentes y ayudando en el proceso de pedido.

- *Chat Admin/Usuario:* Los administradores y usuarios pueden comunicarse a través de un chat integrado en la plataforma.

- *Envío de Detalles de Pedido por Correo Electrónico:* Después de realizar un pedido, los detalles se envían automáticamente al correo electrónico del usuario utilizando Nodemailer.

- *Uso de imagenes:* Los usuarios pueden realizar envio de imagenes gracias al uso de cloudinary 

## Tecnologías Utilizadas

### Frontend
- Next.js
- React
- Tailwind CSS
- TypeScript

### Backend
- Nest.js
- Docker
- Node js
- Cloudinary
- base de datos Postgre Sql Shell
- TypeOrm
- Schedule

### Otras Tecnologías
- Nodemailer

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/GustavoQuispeC/FastBurguers.git

2. Instala las dependencias del frontend y backend:

cd FastBurguers/frontend
npm install

cd ../backend
npm install

3. Configura las variables de entorno necesarias para la autenticación de terceros, integración de pagos y envío de correos electrónicos.
Back-end:

- .env.development: Configura tus variables de entorno en el archivo .env.development
DB_USERNAME 
DB_PASSWORD 
DB_NAME 
DB_HOST 
DB_PORT 
POSTGRES_PASSWORD 
POSTGRES_DB 
JWT_SECRET 
CLOUDINARY_CLOUD_NAME 
CLOUDINARY_API_KEY 
CLOUDINARY_API_SECRET 

Front-end:
- .env: Configura tus variables de entorno en el archivo .env
GOOGLE_CLIENT_ID 
GOOGLE_CLIENT_SECRET 
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY 
FACEBOOK_CLIENT_ID 
FACEBOOK_CLIENT_SECRET 
NEXT_PUBLIC_API_URL 
NEXTAUTH_URL 
NEXTAUTH_SECRET 
NEXT_PUBLIC_PAYPAL_CLIENT_ID 

4. Inicia tanto el frontend como el backend:

# Dentro del directorio frontend
npm run dev

# Dentro del directorio backend
npm run start:dev

Contribución

¡Las contribuciones son bienvenidas! Si deseas contribuir a FastBurgers, sigue estos pasos:

Haz un fork del repositorio.
Crea una rama para tu función: git checkout -b mi-nueva-funcion.
Realiza tus cambios y haz commit de ellos: git commit -m 'Agrega una nueva función'.
Sube tus cambios a la rama: git push origin mi-nueva-funcion.
Abre una solicitud de extracción en GitHub.

Módulos/Componentes:
users: gestion de usuarios
auth: autenticacion de usuarios, admin y superAdmin
categories: gestion de categorias por producto
files: gestion de archivos de imagenes
mailer: gestion de emails
orders: gestion de proceso de la orden 
products: gestion de productos
statushistory: gestion de historial de estado del pedido
storage: gestion de ordenes que fueron canceladas o no pagadas
testimony: gestion de testimonios por parte de usuarios

Uso
Rutas/Endpoints:
user:
GET /users: Obtiene una lista de usuarios.
GET /users/{id}: Obtiene la listado de usuario por id.
PUT /users/{id}: actualizacion de usuario por id.
PUT /users/makeAdmin/{id}: actualizacion de permisos Admin por id.
PUT /users/makeSuperAdmin/{id}: actualizacion de permisos SuperAdmin por id.
POST /users: Crea un nuevo usuario.
DELETE /users/{id}: eliminar usaurio por id

Categories:
GET /categories: Obtiene lista de categorias
GET /categories/{id}: obtiene listado de categoria por id
POST /categories: crear nueva categoria
PUT /categories/{id}: actualizar categoria por id
DELETE /categories/{id}: eliminar categoria por id

Products:
GET /products: obtiene listado de productos
GET /products/{query}: obtiene listado paginado de productos  
GET /products/{id}: obtiene producto por id
POST /products/categories: crear producto por categoria
PUT /products/{id}: actualizar producto por id
DELETE /products/{id}: eliminar producto por id

Auth:
POST /auth/signin: crear logueo de usuario
POST /auth/signup: crear registro de usuario
POST /auth/third/signin: crear logueo de terceros
POST /auth/third/signup: crear registro de terceros

Files:
POST /files/uploadImage/{id}: crear y subir imagen

orders:
GET /orders: obtiene la lista de ordenes
GET /orders/{id}: obtiene la lista orden por id
POST /orders: crea nueva orden
PUT /orders/{id}: actualiza la orden por id
DELETE /orders/{id}: elimina la orden por id

testimony:
GET /testimony: obtiene la lista de testimonios
POST /testimony: crear nuevo testimonio

storage:
GET /storage/{id}: obtiene lista de ordenes canceladas
POST /storage: crear y guardar la orden cancelada
DELETE /storage/{id}: elimina la orden cancelada

statushistory:
GET /statushistory/{id}: obtener listado estado historial por id
POST /statushistory/{id}: crear estado historial por id

Ejecución_y_Pruebas:
npm run start:dev
npm run start

Despliegue:
- Crea un Dockerfile para tu aplicación.
- Construir y probar la imagen Docker localmente.
- Subir el código a un repositorio de GitHub.
- Configurar Render para desplegar tu aplicación desde el repositorio de GitHub usando Docker.
- Verifica el despliegue.
