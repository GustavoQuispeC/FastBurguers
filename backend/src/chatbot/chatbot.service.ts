import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatbotService {
  private steps = {
    0: 'Por favor, dime tu nombre.',
    1: '👋Hola <b>{name}</b>, Bienvenido a <b>FastBurgers</b>. ¿Te gustaría ver la lista de opciones disponibles?',
    2: `<b>Selecciona una opción:</b><br>
        Escribe:<br>
        1️⃣ 🍔 Las mejores hamburguesas del día<br>
        2️⃣ 🏠 Nuestros locales<br>
        3️⃣ 📞 Números de contacto<br>
        --------------------------------<br>
        También puedes:<br>
        🍔 Revisa nuestros productos <a href="https://fast-burguers.vercel.app/product">👉<b>VER</b></a><br>
        📌  Conversa con nosotros <a href="https://fast-burguers.vercel.app/chat">👉<b>VER</b></a><br>`,

    3: `<b>Aquí tienes algunas hamburguesas sugerencias:</b><br>
        ✅ 🍔 Double Cheeseburger. <a href="https://fast-burguers.vercel.app/product/d71740e6-0aaa-483b-a178-58e0897cbca2">👉<b>VER</b></a><br>
        ✅ 🍔 Bacon Burger. <a href="https://fast-burguers.vercel.app/product/f729276f-da23-4726-810f-a8a1a2a1c1cb">👉<b>VER</b></a><br>
        ✅ 🍔 BBQ Burger. <a href="https://fast-burguers.vercel.app/product/5c3d7af9-8fa5-4bc8-b728-76e99017d604">👉<b>VER</b></a><br>
        Escribe:<br>
        1️⃣ Volver al menú principal<br>
        2️⃣ Salir`,

    4: `<b>Nuestros locales están ubicados en:</b><br>
        🏠 Av. Lima 123 SMP<br>
        <a target="_blank" href="https://www.google.com/maps/place/SHALOM+PUENTE+ARICA/@-11.8585891,-77.0897244,15z/data=!4m6!3m5!1s0x9105d7d1c204f9b3:0xa570ac9ea01765c3!8m2!3d-11.8531043!4d-77.0886659!16s%2Fg%2F11lgf2g_gz?entry=ttu">👉<b>VER MAPA</b></a><br>
        🏠 Jr. Arica 234 Miraflores.<br>
        <a target="_blank" href="https://www.google.com/maps/place/El+Aguaje+Restaurante+y+Eventos+Amazonicos/@-11.8733579,-77.0740329,16.25z/data=!4m6!3m5!1s0x9105d1350cbe1de1:0xc0e9071b47c6f748!8m2!3d-11.8721596!4d-77.0704163!16s%2Fg%2F11b6nq3xlr?entry=ttu">👉<b>VER MAPA</b></a><br>
        Escribe:<br>
        1️⃣ Volver al menú principal<br>
        2️⃣ Salir`,

    5: `<b>Nuestros números de contacto son:</b><br>
        📞 Teléfono ➡️: 9999999<br>
        📞 Teléfono ➡️: 8888888<br>
        Escribe:<br>
        1️⃣ Volver al menú principal<br>
        2️⃣ Salir`,
    6: `Gracias por su visita</a>`,
  };
  private userSession = new Map<string, { step: number; name?: string }>();

  getNextStep(userId: string, message: string): string {
    if (!this.userSession.has(userId)) {
      // Inicia una nueva sesión para el usuario
      this.userSession.set(userId, { step: 0 }); // Inicia desde el paso 0
    }
    const session = this.userSession.get(userId);
    let response: string;
    switch (session.step) {
      case 0:
        // Paso 0: Solicitar nombre
        response = this.steps[0];
        session.step++;
        break;
      case 1:
        // Paso 1: Saludo y pregunta sobre recomendaciones
        session.name = message;
        response = this.steps[1].replace('{name}', session.name);
        session.step++;
        break;
      case 2:
        // Paso 2: Mostrar opciones
        response = this.steps[2];
        if (message.toLowerCase() === 'no') {
          response = this.steps[6];
          this.userSession.delete(userId);
        } else {
          session.step++;
        }
        break;
      case 3:
        // Paso 3: Menu principal
        if (message === '1') {
          response = this.steps[3];
          session.step = 4;
        } else if (message === '2') {
          response = this.steps[4];
          session.step = 5;
        } else if (message === '3') {
          response = this.steps[5];
          session.step = 6;
        } else {
          response =
            '<b>Opción inválida. </b> Por favor, selecciona una opción válida.';
        }
        break;
      case 4:
        // Paso 4: Mostrar hamburguesas sugeridas
        if (message === '1') {
          response = this.steps[2]; // Volver al menu principal
          session.step = 3;
        } else if (message === '2') {
          response = this.steps[6];
          this.userSession.delete(userId);
        } else {
          response =
            'Opción inválida. Por favor, selecciona una opción válida.';
        }
        break;
      case 5:
        // Paso 5: Mostrar locales
        if (message === '1') {
          response = this.steps[2];
          session.step = 3; // Volver al menu principal
        } else if (message === '2') {
          response = this.steps[6];
          this.userSession.delete(userId);
        } else {
          response =
            'Opción inválida. Por favor, selecciona una opción válida.';
        }
        break;
      case 6:
        // Paso 6: Mostrar números de contacto
        if (message === '1') {
          response = this.steps[2];
          session.step = 3; // Volver al menu principal
        } else if (message === '2') {
          response = this.steps[6];
          this.userSession.delete(userId);
        } else {
          response =
            'Opción inválida. Por favor, selecciona una opción válida.';
        }
        break;
      default:
        // Por defecto, si se alcanza este caso, se termina la conversación
        response = 'Gracias por tu tiempo. ¡Hasta luego!';
        this.userSession.delete(userId);
    }
    return response;
  }
}
