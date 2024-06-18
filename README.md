# FastBurgers

FastBurgers es una plataforma web para la venta de hamburguesas que ofrece seguimiento de pedidos en tiempo real a través de mapas, autenticación de terceros, integración de pagos con PayPal, un chatbot y un chat entre administradores y usuarios. Además, implementa el envío de detalles de pedido por correo electrónico utilizando Nodemailer.

## Características

- *Seguimiento de Pedidos en Mapas:* Los usuarios pueden realizar un seguimiento en tiempo real del estado de sus pedidos mediante la visualización en mapas.

- *Autenticación de Terceros:* La plataforma permite a los usuarios iniciar sesión utilizando cuentas de terceros como Google, Facebook, etc.

- *Integración de Pagos con PayPal:* Los usuarios pueden realizar pagos de forma segura utilizando PayPal.

- *Chatbot:* Un chatbot ofrece asistencia automatizada para los usuarios, respondiendo preguntas frecuentes y ayudando en el proceso de pedido.

- *Chat Admin/Usuario:* Los administradores y usuarios pueden comunicarse a través de un chat integrado en la plataforma.

- *Envío de Detalles de Pedido por Correo Electrónico:* Después de realizar un pedido, los detalles se envían automáticamente al correo electrónico del usuario utilizando Nodemailer.

## Tecnologías Utilizadas

### Frontend
- Next.js
- React
- Tailwind CSS
- TypeScript

### Backend
- Nest.js
- Docker
- PostgreSQL
- SocketIO
- Jwt

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

4. Inicia tanto el frontend como el backend:

# Dentro del directorio frontend
npm run dev

# Dentro del directorio backend
npm run start

## Contribución

¡Las contribuciones son bienvenidas! Si deseas contribuir a FastBurgers, sigue estos pasos:

Haz un fork del repositorio.
Crea una rama para tu función: git checkout -b mi-nueva-funcion.
Realiza tus cambios y haz commit de ellos: git commit -m 'Agrega una nueva función'.
Sube tus cambios a la rama: git push origin mi-nueva-funcion.
Abre una solicitud de extracción en GitHub.

Licencia
Este proyecto está bajo la Licencia MIT.
