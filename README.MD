## Tercera Pre-entrega JavaScript - CoderHouse

Alumno: Daniel Díaz

Comision: 49845

Profesor: Jonathan Cruz

Tutores: Matías Aguilera, Igna Borraz, Jorge Mendez

## Sobre el proyecto:

Se trata de un simulador de cajero automatico del tipo ATM.

## Modo de uso:

	- Seleccionar la opcion "ingresar sin tarjeta"
	- Ingresar los datos solicitados
	- se contará con un saldo inicial de $1000
	- se pueden realizar extracciones, depositos, consulta de saldo y ver ultimos movimientos
	- Por el momento el LocalStorage se utiliza para la persistencia de datos
	- Al actualizar la pagina o cerrarla y volver a abrir los datos ingresados y las operaciones realizadas persistencia
	- Seleccionar la opcion "Finalizar Sesion" para cerrar la sesion, esto limpiará todos los datos del LocalStorage

## Rubricas de entrega:

  -Codificar funciones de procesos esenciales y notificación de resultados por HTML, añadiendo interacción al simulador.
  
	-Se definieron funciones para procesos esenciales como iniciar sesión, realizar retiros, depositar fondos, consultar saldo y ver el historial de transacciones. Se implementó la notificación de resultados mediante mensajes en HTML para informar al usuario sobre el resultado de las acciones.
  
  -Ampliar y refinar el flujo de trabajo del script en términos de captura de eventos, procesamiento del simulador y notificación de resultados en forma de salidas por HTML, modificando el DOM.:
  
	-El flujo de trabajo del script se ha ampliado y refinado para manejar eventos de usuario, procesar acciones como retiros y depósitos, y notificar los resultados mediante la modificación del DOM para mostrar mensajes en pantalla.
  
  -Implementación con uso de JSON y Storage.
  
	-Se utilizó JSON para almacenar y recuperar los datos del cliente, en el almacenamiento local del navegador.
  
  -Modificación del DOM y detección de eventos de usuario.
  
	-El script modifica el DOM para mostrar elementos como formularios, mensajes de resultado y el historial de transacciones. También detecta eventos de usuario, como clics en botones, para ejecutar acciones correspondientes.
