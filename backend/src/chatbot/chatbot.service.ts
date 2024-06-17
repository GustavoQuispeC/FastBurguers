import { Injectable } from '@nestjs/common';
import { log } from 'console';

@Injectable()
export class ChatbotService {
  private steps = {
    0: 'Por favor, dime tu nombre.',
    1: 'Hola {name}, Bienvenido a FastBurgers.¿Te gustaria ver la lista de opciones disponibles?',
    2: 'Selecciona una opción:1. Las mejores hamburguesas del día 2. Nuestros locales 3. Números de contacto',
    3: 'Aquí tienes algunas hamburguesas del día:- Hamburguesa clásica - Hamburguesa vegetariana ¿Te gustaría ver más opciones? 1. Si 2. volver al menú anterior',
    4: 'visita nuestra página web [FastBurgers](https://fast-burguers.vercel.app) para más información. 1. volver al menú anterior 2. salir',
    5: 'Nuestros locales están ubicados en:- av.lima 123 SMP - Jr. Arica 234 Miraflores. 1. volver al menu anterior 2. salir',
    6: 'Nuestros números de contacto son:- Teléfono 1: 9999999 - Teléfono 2: 8888888  escriba 1. volver al menu anterior 2. salir',
    7: 'Gracias por su visita. Visítanos en [FastBurgers](https://fast-burguers.vercel.app)',
  };

  private userSession = new Map<string, { step: number; name?: string }>();

  getNextStep(userId: string, message: string): string {
    if (!this.userSession.has(userId)) {
      // Inicia una nueva sesión para el usuario
      this.userSession.set(userId, { step: 0 }); // Inicia desde el paso 0
    }
    const session = this.userSession.get(userId);
    let response: string;

    try{
      switch (session.step) {
        case 0:
          // Paso 0: Solicitar nombre
          response = this.steps[0];
          session.step++;
          break;
        case 1:
          // Paso 1: Saludo y pregunta sobre recomendaciones
          session.name = message.trim();
          response = this.steps[1].replace('{name}', session.name);
          session.step++;
          break;
        case 2:
          // Paso 2: Mostrar opciones
          response = this.steps[2];
          // response = this.handleOptionSelection(message, session);
          session.step++;
          break;
        
        case 3:
          // Paso 2: redirigir a opciones
          response = this.handleOptionSelection(message, session);
          // session.step++;
          break;
        case 4:
          // Paso 3: Mostrar hamburguesas del día
          response = this.handleBurgerOptions(message, session);          
          break;
        case 5:
          // Paso 4: Mostrar información adicional
          response = this.handleAdditionalInfo(message, session);
          break;
        case 6:
          // Paso 5: Mostrar locales
          response = this.handleLocationInfo(message, session);
          break;
        case 7:
          // Paso 6: Mostrar números de contacto
          response = this.handleContactInfo(message, session);
          break;
        case 8:
          // Paso 7: Despedida
          response = this.steps[7];
          // Reiniciar la conversación eliminando la sesión del usuario
          this.userSession.delete(userId);
          break;
        default:
          // Por defecto, si se alcanza este caso, se termina la conversación
          response = 'Gracias por tu tiempo. ¡Hasta luego!';
          this.userSession.delete(userId);
      }
    } catch (error) {
      response = 'Ha ocurrido un error. Por favor, intenta nuevamente.';
      console.error(`Error handling step ${session.step} for user ${userId}:`, error);
    }
    
    return response;
  }

  private handleOptionSelection(message: string, session: { step: number; name?: string }): string {
    const option = parseInt(message, 10);

    if (isNaN(option) || option < 1 || option > 3) {
      return 'Opción inválida. Por favor, selecciona una opción correcta.';
    }

    switch (option) {
      case 1:
        session.step = 3;
        break;
      case 2:
        session.step = 5;
        break;
      case 3:
        session.step = 6;
        break;
    }

    return this.steps[session.step];
  }

  private handleBurgerOptions(message: string, session: { step: number; name?: string }): string {
    switch (message) {
      case '1':
        session.step = 4;
        return this.steps[3];
      case '2':
        session.step = 2;
        return this.steps[2];
      default:
        return 'Opción inválida. Por favor, selecciona una opción correcta.';
    }
  }

  private handleAdditionalInfo(message: string, session: { step: number; name?: string }): string {
    switch (message) {
      case '1':
        session.step = 2;
        return this.steps[2];
      case '2':
        session.step = 7;
        return this.steps[7];
      default:
        return 'Opción inválida. Por favor, selecciona una opción correcta.';
    }
  }

  private handleLocationInfo(message: string, session: { step: number; name?: string }): string {
    switch (message) {
      case '1':
        session.step = 2;
        return this.steps[2];
      case '2':
        session.step = 7;
        return this.steps[7];
      default:
        return 'Opción inválida. Por favor, selecciona una opción correcta.';
    }
  }

  private handleContactInfo(message: string, session: { step: number; name?: string }): string {
    switch (message) {
      case '1':
        session.step = 2;
        return this.steps[2];
      case '2':
        session.step = 7;
        return this.steps[7];
      default:
        return 'Opción inválida. Por favor, selecciona una opción correcta.';
    }
  }
}
