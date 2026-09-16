const tarjetas = document.querySelectorAll('.card');

tarjetas.forEach((tarjeta) => {
  tarjeta.addEventListener('mouseenter', () => {
    const icono = tarjeta.querySelector('.icon');
    if (icono) {
      icono.style.transition = 'transform 0.2s ease';
      icono.style.transform = 'scale(1.2) rotate(5deg)';
    }
  });

  tarjeta.addEventListener('mouseleave', () => {
    const icono = tarjeta.querySelector('.icon');
    if (icono) {
      icono.style.transform = 'scale(1) rotate(0deg)';
    }
  });
});
// Frases aleatorias para la notita amarilla
const frases = [
  '«Organizarse es ganar libertad para disfrutar lo que te gusta.»',
  '«Un paso a la vez: prioriza lo urgente y planifica lo importante.»',
  '«El secreto de avanzar es comenzar.»',
  '«No busques tiempo, créalo.»'
];

const postItText = document.querySelector('.sticky-note p');
const postIt = document.querySelector('.sticky-note');

if (postItText && postIt) {
  postIt.addEventListener('click', () => {
    // Elige una frase al azar
    const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
    postItText.textContent = fraseAleatoria;
    
    // Efecto visual de rebote
    postIt.style.transform = 'scale(1.05) rotate(0deg)';
    setTimeout(() => {
      postIt.style.transform = 'rotate(-1.5deg)';
    }, 200);
  });
}
// ==========================================
// MINIJUEGO: DESPEJA LAS DISTRACCIONES
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const btnStart = document.getElementById('btn-start-game');
    const gameArea = document.getElementById('game-area');
    const timerDisplay = document.getElementById('game-timer');
    const scoreDisplay = document.getElementById('game-score');
    const startMsg = document.getElementById('game-start-msg');

    if (!btnStart || !gameArea) return;

    let score = 0;
    let timeLeft = 15;
    let gameInterval = null;
    let itemInterval = null;
    let isPlaying = false;

    const goodItems = ['📚 Estudiar', '✍️ Hacer Tarea', '💧 Tomar Agua', '📖 Leer', '🧘 Pausa Pomodoro'];
    const badItems = ['📱 Redes', '🎮 Videojuegos', '🔔 Notificación', '📺 Serie', '🛌 Procrastinar'];

    btnStart.addEventListener('click', startGame);

    function startGame() {
        if (isPlaying) return;

        isPlaying = true;
        score = 0;
        timeLeft = 15;
        scoreDisplay.textContent = score;
        timerDisplay.textContent = timeLeft;
        btnStart.style.display = 'none';
        if (startMsg) startMsg.style.display = 'none';

        // Limpiar elementos viejos
        gameArea.querySelectorAll('.minijuego-item').forEach(el => el.remove());

        // Temporizador principal
        gameInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;

            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);

        // Generar elementos flotantes cada 600ms
        itemInterval = setInterval(spawnItem, 600);
    }

    function spawnItem() {
        if (!isPlaying) return;

        const isGood = Math.random() > 0.4; // 60% probabilidad de buenas
        const list = isGood ? goodItems : badItems;
        const text = list[Math.floor(Math.random() * list.length)];

        const item = document.createElement('div');
        item.classList.add('minijuego-item', isGood ? 'item-good' : 'item-bad');
        item.textContent = text;

        // Posición horizontal aleatoria dentro del cuadro
        const posX = Math.floor(Math.random() * (gameArea.clientWidth - 120));
        item.style.left = `${Math.max(10, posX)}px`;

        item.addEventListener('click', () => {
            if (isGood) {
                score += 10;
            } else {
                score = Math.max(0, score - 5);
            }
            scoreDisplay.textContent = score;
            item.remove();
        });

        gameArea.appendChild(item);

        // Remover automáticamente cuando termine la animación
        setTimeout(() => {
            if (item.parentNode) item.remove();
        }, 3000);
    }

    function endGame() {
        isPlaying = false;
        clearInterval(gameInterval);
        clearInterval(itemInterval);

        gameArea.querySelectorAll('.minijuego-item').forEach(el => el.remove());

        let mensaje = '';
        if (score >= 80) mensaje = '🏆 ¡Nivel Leyenda! Mente 100% enfocada.';
        else if (score >= 40) mensaje = '🌟 ¡Muy bien! Buen control del tiempo.';
        else mensaje = '😅 ¡Cuidado con las distracciones! Inténtalo de nuevo.';

        if (startMsg) {
            startMsg.innerHTML = `<div class="p-2"><strong>¡Tiempo agotado!</strong><br>${mensaje}<br><small>Puntaje final: ${score} pts</small></div>`;
            startMsg.style.display = 'flex';
        }

        btnStart.textContent = '🔄 Jugar de nuevo';
        btnStart.style.display = 'inline-block';
    }
});
// ==========================================
// CAMBIO DE TEMA (MODO CLARO / OSCURO)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const btnTheme = document.getElementById('btn-theme');
    const currentTheme = localStorage.getItem('theme');

    // Aplicar tema guardado si existe
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (btnTheme) btnTheme.textContent = '☀️ Modo Claro';
    }

    if (btnTheme) {
        btnTheme.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');

            let theme = 'light';
            if (document.body.classList.contains('dark-mode')) {
                theme = 'dark';
                btnTheme.textContent = '☀️ Modo Claro';
            } else {
                btnTheme.textContent = '🌙 Modo Oscuro';
            }

            // Guardar preferencia en el navegador
            localStorage.setItem('theme', theme);
        });
    }
});




document.addEventListener("DOMContentLoaded", function () {
    const tareaInput = document.getElementById("tareaInput");
    const btnAgregarTarea = document.getElementById("btnAgregarTarea");
    const listaTareas = document.getElementById("listaTareas");
    const mensajeTarea = document.getElementById("mensajeTarea");

    if (!tareaInput || !btnAgregarTarea || !listaTareas || !mensajeTarea) {
        return;
    }

    function mostrarMensaje(texto, tipo) {
        mensajeTarea.textContent = texto;
        mensajeTarea.className = "alert mt-3";
        mensajeTarea.classList.add("alert-" + tipo);
        mensajeTarea.classList.remove("d-none");
        setTimeout(function () {
            mensajeTarea.classList.add("d-none");
        }, 3000);
    }

    // --- CARGAR TAREAS GUARDADAS AL ABRIR LA PÁGINA ---
    function obtenerTareasGuardadas() {
        const tareas = localStorage.getItem("mis_tareas");
        return tareas ? JSON.parse(tareas) : [];
    }

    function guardarTareasEnLocalStorage(tareas) {
        localStorage.setItem("mis_tareas", JSON.stringify(tareas));
    }

    function renderizarTareas() {
        listaTareas.innerHTML = "";
        const tareas = obtenerTareasGuardadas();

        tareas.forEach((tareaObj, index) => {
            const nuevaTarea = document.createElement("li");
            nuevaTarea.className = "list-group-item tarea-item d-flex justify-content-between align-items-center";
            if (tareaObj.completada) {
                nuevaTarea.classList.add("tarea-completada");
            }

            const texto = document.createElement("span");
            texto.className = "tarea-texto";
            texto.textContent = tareaObj.texto;
            if (tareaObj.completada) {
                texto.style.textDecoration = "line-through";
                texto.style.opacity = "0.6";
            }

            const btnCompletar = document.createElement("button");
            btnCompletar.type = "button";
            btnCompletar.className = "btn btn-outline-success btn-sm btn-completar";
            btnCompletar.textContent = tareaObj.completada ? "↩ Pendiente" : "✓ Completar";
            
            btnCompletar.addEventListener("click", function () {
                tareas[index].completada = !tareas[index].completada;
                guardarTareasEnLocalStorage(tareas);
                renderizarTareas();
            });

            const btnEliminar = document.createElement("button");
            btnEliminar.type = "button";
            btnEliminar.className = "btn btn-outline-danger btn-sm btn-eliminar";
            btnEliminar.textContent = "Eliminar";

            btnEliminar.addEventListener("click", function () {
                tareas.splice(index, 1);
                guardarTareasEnLocalStorage(tareas);
                renderizarTareas();
                mostrarMensaje("🗑️ Tarea eliminada.", "info");
            });

            const botones = document.createElement("div");
            botones.className = "d-flex gap-2";
            botones.appendChild(btnCompletar);
            botones.appendChild(btnEliminar);

            nuevaTarea.appendChild(texto);
            nuevaTarea.appendChild(botones);
            listaTareas.appendChild(nuevaTarea);
        });
    }

    // Cargar tareas al iniciar
    renderizarTareas();

    // --- AGREGAR NUEVA TAREA ---
    btnAgregarTarea.addEventListener("click", function () {
        const textoTarea = tareaInput.value.trim();

        if (textoTarea === "") {
            mostrarMensaje("⚠️ Escribe una tarea antes de agregarla.", "warning");
            tareaInput.focus();
            return;
        }

        const tareas = obtenerTareasGuardadas();
        tareas.push({ texto: textoTarea, completada: false });
        guardarTareasEnLocalStorage(tareas);
        renderizarTareas();

        mostrarMensaje("✅ ¡Tarea agregada correctamente!", "success");
        tareaInput.value = "";
        tareaInput.focus();
    });

    tareaInput.addEventListener("keydown", function (evento) {
        if (evento.key === "Enter") {
            btnAgregarTarea.click();
        }
    });
});