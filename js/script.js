// Definimos saldo inicial
let saldo = 1000;
// Se define array historial de transacciones vacío
let historialTransacciones = [];
// Se define objeto cliente
let cliente = null;

//--------------------------------------------------------------------------------
// Funciones para fecha y hora actuales para mostrar en el historial y en la búsqueda, se agrega cero antes de cada dígito de ser necesario
//--------------------------------------------------------------------------------

function obtenerFechaHoraActual() {
    const fechaHora = new Date();
    const dia = agregarCeroAntes(fechaHora.getDate());
    const mes = agregarCeroAntes(fechaHora.getMonth() + 1);
    const anio = fechaHora.getFullYear();
    const horas = agregarCeroAntes(fechaHora.getHours());
    const minutos = agregarCeroAntes(fechaHora.getMinutes());
    const segundos = agregarCeroAntes(fechaHora.getSeconds());
    return `${dia}/${mes}/${anio} | ${horas}:${minutos}:${segundos}`;
}

function agregarCeroAntes(numero) {
    return numero < 10 ? `0${numero}` : numero;
}

function mostrarSubMenuTipos() {
    return prompt("Tipos de transacciones:\n1. Retiro\n2. Depósito");
}

//--------------------------------------------------------------------------------
//Bloque de funcion display de pantalla de ingreso o login
//--------------------------------------------------------------------------------

function mostrarPantallaIngreso() {
    ocultarTodosLosElementos('pantallaIngreso');
    mostrarElemento('pantallaIngreso');
}



//--------------------------------------------------------------------------------
//Bloque de funcion de inicio de sesion
//--------------------------------------------------------------------------------

function iniciarSesion() {
    let nombre = document.getElementById('nombreInput').value;
    let apellido = document.getElementById('apellidoInput').value;
    let dni = document.getElementById('dniInput').value;

    if (!esNombreValido(nombre)) {
        mostrarMensaje("Ingrese un nombre válido (solo letras).", 'error');
        return;
    }

    if (!esNombreValido(apellido)) {
        mostrarMensaje("Ingrese un apellido válido (solo letras).", 'error');
        return;
    }

    if (!esNumeroDeCuentaValido(dni)) {
        mostrarMensaje("Ingrese un número de DNI válido (8 dígitos).", 'error');
        return;
    }

    // Simulación de autenticación del cliente (deberia ser mejor en una app real jeje)
    // Por ahora, vamos a simular que el proceso fue exitoso.
    cliente = {
        nombre: nombre,
        apellido: apellido,
        dni: dni,
        saldo: saldo, // Se agrega el saldo al objeto del cliente
        historialTransacciones: historialTransacciones // Se agrega el historial de transacciones al objeto del cliente
    };

    // Almacenar los datos del cliente en el almacenamiento local
    guardarDatosClienteEnLocalStorage();

    mostrarMenuPrincipal();
}

//--------------------------------------------------------------------------------
//Bloque de menú ppal
//--------------------------------------------------------------------------------

function mostrarMenuPrincipal() {
    ocultarTodosLosElementos('menuPrincipal');
    mostrarElemento('menuPrincipal');

    document.getElementById('menuPrincipal').innerHTML = `
        <h2>Bienvenido, ${cliente.nombre} ${cliente.apellido} (${cliente.dni})</h2>
        <button onclick="consultarSaldo()">Consultar Saldo</button>
        <button onclick="retirarEfectivo()">Retirar Efectivo</button>
        <button onclick="depositar()">Depositar</button>
        <button onclick="verHistorial()">Ver Últimos Movimientos</button>
        <button onclick="finalizarSesion()">Finalizar Sesión</button>`;
}

//--------------------------------------------------------------------------------
//Bloque de funcion de consulta de saldo
//--------------------------------------------------------------------------------

function consultarSaldo() {
    ocultarTodosLosElementos('saldo');
    mostrarElemento('saldo');

    let saldoElement = document.getElementById('saldo');
    saldoElement.innerHTML = `<h2>Su saldo es:</h2><p>$${cliente.saldo}</p>`;

    // Agrega un botón para regresar al menú principal
    saldoElement.innerHTML += '<button onclick="regresarMenuPrincipal()">Regresar al menú</button>';
}
//--------------------------------------------------------------------------------
//Bloque de funcion de retiro de efvo
//--------------------------------------------------------------------------------

function retirarEfectivo() {
    ocultarTodosLosElementos('retiro');
    mostrarElemento('retiro');

    let retiroElement = document.getElementById('retiro');
    retiroElement.innerHTML = ''; // Limpiamos el contenido previo

    let h2 = document.createElement('h2');
    h2.textContent = 'Retirar Efectivo';
    retiroElement.appendChild(h2);

    let montoRetiroInput = document.createElement('input');
    montoRetiroInput.type = 'number';
    montoRetiroInput.id = 'montoRetiroInput';
    montoRetiroInput.placeholder = 'Ingrese el monto';
    retiroElement.appendChild(montoRetiroInput);

    // Contenedor para los botones
    let botonesContainer = document.createElement('div');
    botonesContainer.className = 'botones-container';

    let btnRetirar = document.createElement('button');
    btnRetirar.textContent = 'Retirar';
    btnRetirar.onclick = realizarRetiro;
    botonesContainer.appendChild(btnRetirar);

    let btnCancelar = document.createElement('button');
    btnCancelar.textContent = 'Cancelar';
    btnCancelar.onclick = regresarMenuPrincipal;
    botonesContainer.appendChild(btnCancelar);

    retiroElement.appendChild(botonesContainer);
}

function realizarRetiro() {
    let montoRetiroInput = document.getElementById('montoRetiroInput');
    let monto = parseFloat(montoRetiroInput.value);

    if (isNaN(monto) || monto <= 0) {
        mostrarMensaje("Ingrese un monto válido.", 'error');
    } else if (monto > cliente.saldo) { // Cambio de 'saldo' a 'cliente.saldo'
        mostrarMensaje("Fondos insuficientes.", 'error');
    } else {
        cliente.saldo -= monto; // Actualización de 'saldo' a 'cliente.saldo'
        registrarTransaccion("Retiro", -monto);
        guardarDatosClienteEnLocalStorage(); // Guardar el cliente actualizado en el almacenamiento local
        mostrarMensaje(`Retiro exitoso. Nuevo saldo: $${cliente.saldo}`, 'success'); // Actualización de 'saldo' a 'cliente.saldo'
        regresarMenuPrincipal();
        guardarHistorialTransaccionesEnLocalStorage(); // Guardar historial de transacciones en el almacenamiento local
    }
}


//--------------------------------------------------------------------------------
//Bloque de funcion de deposito
//--------------------------------------------------------------------------------
function depositar() {
    ocultarTodosLosElementos('deposito');
    mostrarElemento('deposito');

    let depositoElement = document.getElementById('deposito');
    depositoElement.innerHTML = ''; // Limpiamos el contenido previo

    let h2 = document.createElement('h2');
    h2.textContent = 'Depositar';
    depositoElement.appendChild(h2);

    let montoDepositoInput = document.createElement('input');
    montoDepositoInput.type = 'number';
    montoDepositoInput.id = 'montoDepositoInput';
    montoDepositoInput.placeholder = 'Ingrese el monto';
    depositoElement.appendChild(montoDepositoInput);

    // Contenedor para los botones
    let botonesContainer = document.createElement('div');
    botonesContainer.className = 'botones-container';

    let btnDepositar = document.createElement('button');
    btnDepositar.textContent = 'Depositar';
    btnDepositar.onclick = realizarDeposito;
    botonesContainer.appendChild(btnDepositar);

    let btnCancelar = document.createElement('button');
    btnCancelar.textContent = 'Cancelar';
    btnCancelar.onclick = regresarMenuPrincipal;
    botonesContainer.appendChild(btnCancelar);

    depositoElement.appendChild(botonesContainer);
}

function realizarDeposito() {
    let montoDepositoInput = document.getElementById('montoDepositoInput');
    let monto = parseFloat(montoDepositoInput.value);

    if (isNaN(monto) || monto <= 0) {
        mostrarMensaje("Ingrese un monto válido.", 'error');
    } else {
        cliente.saldo += monto; // Actualización de 'saldo' a 'cliente.saldo'
        registrarTransaccion("Depósito", monto);
        mostrarMensaje(`Depósito exitoso. Nuevo saldo: $${cliente.saldo}`, 'success'); // Actualización de 'saldo' a 'cliente.saldo'
        regresarMenuPrincipal();
        guardarHistorialTransaccionesEnLocalStorage(); // Guardar historial de transacciones en el almacenamiento local
    }
}

//--------------------------------------------------------------------------------
//Bloque de Ultimos Movimientos
//--------------------------------------------------------------------------------

function verHistorial() {
    ocultarTodosLosElementos('historial');
    mostrarElemento('historial');

    let historialElement = document.getElementById('historial');
    historialElement.innerHTML = '<h2>Historial de Transacciones</h2>';

    // Crear el contenedor con desplazamiento
    let historialContainer = document.createElement('div');
    historialContainer.id = 'historialContainer';
    historialContainer.style.maxHeight = '150px'; // Puedes ajustar según tus preferencias
    historialContainer.style.overflowY = 'auto';

    historialElement.appendChild(historialContainer);

    if (historialTransacciones.length === 0) {
        historialContainer.innerHTML += '<p>No hay transacciones registradas.</p>';
    } else {
        const totalMovimientos = historialTransacciones.length;

        for (let i = 0; i < totalMovimientos; i++) {
            const fechaHora = historialTransacciones[i].fechaHora;
            const tipoTransaccion = historialTransacciones[i].tipo;
            const monto = historialTransacciones[i].monto;

            historialContainer.innerHTML += `<p>${fechaHora} | ${tipoTransaccion} | $${monto}</p>`;
        }
    }

    // Crear el botón de regreso al menú principal
    let btnRegresarMenu = document.createElement('button');
    btnRegresarMenu.textContent = 'Regresar al Menú';
    btnRegresarMenu.onclick = regresarMenuPrincipal;
    historialElement.appendChild(btnRegresarMenu);
}

//--------------------------------------------------------------------------------
//Bloque de Finalizar sesión
//--------------------------------------------------------------------------------

function finalizarSesion() {
    // Llamada para limpiar los datos del cliente en localStorage
    limpiarDatosClienteDelLocalStorage();
    // Restablecer variables globales a sus valores predeterminados
    saldo = 1000;
    historialTransacciones = [];
    mostrarDespedida();
}

function mostrarDespedida() {
    ocultarTodosLosElementos('despedida');
    mostrarElemento('despedida');
}

// Agrega una función para regresar al menú de ingreso sin tarjeta desde la pantalla de despedida
function regresarMenuIngresoSinTarjeta() {
    ocultarElemento('despedida');
    mostrarElemento('app');
}

//--------------------------------------------------------------------------------
//Bloque de Funciones para local storage
//--------------------------------------------------------------------------------

// Función para guardar los datos del cliente en localStorage al iniciar sesión
function guardarDatosClienteEnLocalStorage() {
    localStorage.setItem('cliente', JSON.stringify(cliente));
}

// Función para guardar el historial de transacciones en localStorage
function guardarHistorialTransaccionesEnLocalStorage() {
    localStorage.setItem('historialTransacciones', JSON.stringify(historialTransacciones));
}

function recuperarDatosClienteDelLocalStorage() {
    const clienteGuardado = localStorage.getItem('cliente');
    if (clienteGuardado) {
        cliente = JSON.parse(clienteGuardado);
        // Mostrar el menú principal después de recuperar los datos del cliente
        mostrarMenuPrincipal();
        // Mostrar un mensaje de alerta
        mostrarMensaje("Datos del cliente recuperados del almacenamiento local.", 'success');
    } else {
        // Mostrar un mensaje de alerta si no se encuentran datos en el almacenamiento local
        mostrarMensaje("No se encontraron datos del cliente en el almacenamiento local.", 'error');
    }
}

function recuperarHistorialTransaccionesDelLocalStorage() {
    const historialGuardado = localStorage.getItem('historialTransacciones');
    if (historialGuardado) {
        historialTransacciones = JSON.parse(historialGuardado);
    }
}

// Función para limpiar los datos del cliente del localStorage al finalizar sesión
function limpiarDatosClienteDelLocalStorage() {
    localStorage.removeItem('cliente');
}

// Llamada para recuperar los datos del cliente y el historial de transacciones al cargar la página
recuperarDatosClienteDelLocalStorage();
recuperarHistorialTransaccionesDelLocalStorage();


//--------------------------------------------------------------------------------
//Bloques de funciones adicionales
//--------------------------------------------------------------------------------

function regresarMenuPrincipal() {
    ocultarTodosLosElementos();
    mostrarElemento('menuPrincipal');
}


function ocultarTodosLosElementos(excepcion) {
    const secciones = ['retiro', 'deposito', 'historial', 'saldo', 'menuPrincipal', 'app', 'pantallaIngreso'];

    for (const seccion of secciones) {
        if (seccion !== excepcion) {
            ocultarElemento(seccion);
        }
    }
}


function registrarTransaccion(tipo, monto) {
    historialTransacciones.push({ tipo: tipo, monto: monto, fechaHora: obtenerFechaHoraActual() });
}

function esNombreValido(nombre) {
    return /^[a-zA-Z]+$/.test(nombre);
}

function esNumeroDeCuentaValido(numero) {
    return /^\d{8}$/.test(numero);
}

function ocultarElemento(elementoId) {
    let elemento = document.getElementById(elementoId);
    if (elemento) {
        elemento.style.display = 'none';
    }
}

function mostrarElemento(elementoId) {
    let elemento = document.getElementById(elementoId);
    if (elemento) {
        elemento.style.display = 'block';
    }
}


function mostrarMensaje(mensaje, tipo) {
    let mensajeElement = document.getElementById('mensaje');
    mensajeElement.innerHTML = mensaje;
    mensajeElement.classList.remove('hidden', 'success', 'error');
    mensajeElement.classList.add(tipo);

    setTimeout(() => {
        mensajeElement.classList.add('hidden');
    }, 3000);
}