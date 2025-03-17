// Lista de amigos Aquí creamos un array vacío llamado amigos donde se almacenarán los nombres ingresados.
let amigos = [];

// Función para agregar un amigo
function agregarAmigo() {
    let input = document.getElementById("amigo"); // Obtener el campo de entrada
    let nombre = input.value.trim(); // Eliminar espacios en blanco antes y después del nombre
    let alerta = document.getElementById("alerta"); // Obtener el mensaje de alerta

    if (nombre === "") {
        alerta.textContent = "⚠️ Ingresa un nombre válido.";  // Mostrar mensaje si el campo está vacío
        return;  // Salir de la función sin agregar nada
    }

    amigos.push(nombre);  // Agregar el nombre a la lista de amigos
    input.value = ""; // Limpiar el input
    alerta.textContent = ""; // Limpiar mensaje de alerta si se ingresó un nombre válido
    actualizarLista(); // Llamar a la función para actualizar la lista en pantalla
}


// Permitir agregar nombres con la tecla "Enter" 
document.getElementById("amigo").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Evita el envío del formulario
        agregarAmigo(); // Llama a la función para agregar el nombre
    }
});


// Función para actualizar la lista en pantalla
function actualizarLista() {
    let lista = document.getElementById("listaAmigos"); // Obtener la lista de amigos en la pantalla
    lista.innerHTML = ""; // Limpiar la lista antes de actualizarla

    amigos.forEach((amigo, index) => {
        let li = document.createElement("li"); // Crear un elemento <li>
        li.textContent = `${index + 1}. ${amigo}`; // Agregar número y nombre del amigo
        lista.appendChild(li); // Añadir el elemento a la lista en pantalla
    });
}

// Función para sortear todos los amigos sin repetir
function sortearAmigos() {
    if (amigos.length < 2) {
        alert("Debe haber al menos 2 participantes para sortear.");
        return;
    }

    let resultado = document.getElementById("resultado");
    resultado.innerHTML = ""; // Limpiar resultado previo

    let disponibles = [...amigos];  // Copiar la lista de amigos
    let asignaciones = {}; // Guardará las asignaciones de amigo secreto

    amigos.forEach((amigo) => {
        let opciones = disponibles.filter((a) => a !== amigo); // No puede tocarse a sí mismo

        if (opciones.length === 0) {
            return sortearAmigos(); // Reinicia el sorteo si hay un problema
        }

        let elegido = opciones[Math.floor(Math.random() * opciones.length)]; // Elegir un amigo al azar
        asignaciones[amigo] = elegido; // Guardar la asignación
        disponibles = disponibles.filter((a) => a !== elegido); // Eliminar el elegido de las opciones
    });

    // Mostrar los resultados
    Object.keys(asignaciones).forEach((amigo) => {
        let li = document.createElement("li");
        li.textContent = `${amigo} → ${asignaciones[amigo]}`;
        resultado.appendChild(li);
    });
}

// Función para reiniciar la lista
function reiniciarLista() {
    amigos = [];
    document.getElementById("listaAmigos").innerHTML = "";  // Limpiar lista en pantalla
    document.getElementById("resultado").innerHTML = ""; // Limpiar resultados
    document.getElementById("alerta").textContent = ""; // Limpiar mensajes de alerta
}
