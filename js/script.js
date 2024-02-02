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
        dni: dni
    };

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
    saldoElement.innerHTML = `<h2>Su saldo es:</h2><p>$${saldo}</p>`;

    // Agrega un botón para regresar al menú principal
    saldoElement.innerHTML += '<button onclick="regresarMenuPrincipal()">Regresar al menu</button>';
}

//--------------------------------------------------------------------------------
//Bloque de funcion de retiro de efvo
//--------------------------------------------------------------------------------

function retirarEfectivo() {
    ocultarTodosLosElementos('retiro');
    mostrarElemento('retiro');

    let retiroElement = document.getElementById('retiro');
    retiroElement.innerHTML = '<h2>Retirar Efectivo</h2>';
    retiroElement.innerHTML += '<input type="number" id="montoRetiroInput" placeholder="Ingrese el monto">';
    retiroElement.innerHTML += '<button onclick="realizarRetiro()">Retirar</button>';
    retiroElement.innerHTML += '<button onclick="regresarMenuPrincipal()">Cancelar</button>';
}

function realizarRetiro() {
    let montoRetiroInput = document.getElementById('montoRetiroInput');
    let monto = parseFloat(montoRetiroInput.value);

    if (isNaN(monto) || monto <= 0) {
        mostrarMensaje("Ingrese un monto válido.", 'error');
    } else if (monto > saldo) {
        mostrarMensaje("Fondos insuficientes.", 'error');
    } else {
        saldo -= monto;
        registrarTransaccion("Retiro", -monto);
        mostrarMensaje(`Retiro exitoso. Nuevo saldo: ${saldo}`, 'success');
        regresarMenuPrincipal();
    }
}

//--------------------------------------------------------------------------------
//Bloque de funcion de deposito
//--------------------------------------------------------------------------------
function depositar() {
    ocultarTodosLosElementos('deposito');
    mostrarElemento('deposito');

    let depositoElement = document.getElementById('deposito');
    depositoElement.innerHTML = '<h2>Depositar</h2>';
    depositoElement.innerHTML += '<input type="number" id="montoDepositoInput" placeholder="Ingrese el monto">';
    depositoElement.innerHTML += '<button onclick="realizarDeposito()">Depositar</button>';
    depositoElement.innerHTML += '<button onclick="regresarMenuPrincipal()">Cancelar</button>';
}

function realizarDeposito() {
    let montoDepositoInput = document.getElementById('montoDepositoInput');
    let monto = parseFloat(montoDepositoInput.value);

    if (isNaN(monto) || monto <= 0) {
        mostrarMensaje("Ingrese un monto válido.", 'error');
    } else {
        saldo += monto;
        registrarTransaccion("Depósito", monto);
        mostrarMensaje(`Depósito exitoso. Nuevo saldo: ${saldo}`, 'success');
        regresarMenuPrincipal();
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

            historialContainer.innerHTML += `<p>${fechaHora} | ${tipoTransaccion} | ${monto}</p>`;
        }
    }

    historialElement.innerHTML += '<button onclick="regresarMenuPrincipal()">Regresar al Menú</button>';
}

//--------------------------------------------------------------------------------
//Bloque de Finalizar sesión
//--------------------------------------------------------------------------------

function finalizarSesion() {
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