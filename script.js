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

// ==========================================
// DIAGNÓSTICO INTERACTIVO
// ==========================================


// Seleccionamos elementos del DOM

const tiempoInput = document.querySelector("#tiempoInput");

const tiempoValor = document.querySelector("#tiempoValor");

const actividadSelect = document.querySelector("#actividadSelect");

const btnRecomendacion =
    document.querySelector("#btnRecomendacion");

const resultadoDiagnostico =
    document.querySelector("#resultadoDiagnostico");


// ==========================================
// EVENTO INPUT
// ==========================================

// El valor cambia mientras el usuario mueve
// la barra de tiempo.

tiempoInput.addEventListener("input", function () {

    tiempoValor.textContent = tiempoInput.value;

});


// ==========================================
// EVENTO CHANGE
// ==========================================

// Se ejecuta cuando el usuario cambia
// el tipo de actividad.

actividadSelect.addEventListener("change", function () {

    const actividad = actividadSelect.value;

    if (actividad === "estudiar") {

        resultadoDiagnostico.textContent =
            "📚 Estudiar requiere concentración. " +
            "Intenta trabajar sin distracciones.";

    }

    else if (actividad === "tarea") {

        resultadoDiagnostico.textContent =
            "📝 Divide tu tarea en pequeños pasos " +
            "para avanzar de manera organizada.";

    }

    else if (actividad === "examen") {

        resultadoDiagnostico.textContent =
            "🎯 Para un examen, prioriza los temas " +
            "más importantes y difíciles.";

    }

    else if (actividad === "descanso") {

        resultadoDiagnostico.textContent =
            "☕ Un descanso breve puede ayudarte a " +
            "recuperar la concentración.";

    }

});


// ==========================================
// EVENTO CLICK
// ==========================================

btnRecomendacion.addEventListener("click", function () {

    const tiempo = Number(tiempoInput.value);

    const actividad = actividadSelect.value;

    let recomendacion = "";

    
    // Analizamos el tiempo disponible

    if (tiempo <= 30) {

        recomendacion =
            "⏱️ Tienes poco tiempo. " +
            "Concéntrate en una sola actividad " +
            "y evita las distracciones.";

    }

    else if (tiempo <= 60) {

        recomendacion =
            "⏱️ Tienes un tiempo moderado. " +
            "Puedes dividir tu sesión en bloques " +
            "y hacer una pequeña pausa.";

    }

    else {

        recomendacion =
            "⏱️ Tienes bastante tiempo. " +
            "Puedes organizar varias actividades " +
            "sin olvidar incluir descansos.";

    }


    // Agregamos una recomendación específica

    if (actividad === "estudiar") {

        recomendacion +=
            " 📚 Empieza por el tema que necesites reforzar más.";

    }

    else if (actividad === "tarea") {

        recomendacion +=
            " 📝 Divide la tarea en pasos y comienza por el más importante.";

    }

    else if (actividad === "examen") {

        recomendacion +=
            " 🎯 Dedica primero tu tiempo a los temas que requieren mayor preparación.";

    }

    else if (actividad === "descanso") {

        recomendacion +=
            " ☕ Aprovecha el descanso para despejarte antes de continuar.";

    }


    // ======================================
    // MANIPULACIÓN DEL DOM
    // ======================================

    resultadoDiagnostico.textContent = recomendacion;


    // Quitamos la animación anterior

    resultadoDiagnostico.classList.remove("mostrar");

    btnRecomendacion.classList.remove("animar");


    // Forzamos que la animación pueda repetirse

    void resultadoDiagnostico.offsetWidth;

    void btnRecomendacion.offsetWidth;


    // Agregamos nuevamente las clases

    resultadoDiagnostico.classList.add("mostrar");

    btnRecomendacion.classList.add("animar");

});
// ==========================================
// ANIMACIÓN DE LOS TIPS
// ==========================================

// Seleccionamos todas las tarjetas de los tips
const tips = document.querySelectorAll(".recomendacion-seccion");

// Agregamos un evento click a cada tarjeta
tips.forEach(function (tip) {

    tip.addEventListener("dblclick", function () {

        // Agregamos la clase que activa la animación
        tip.classList.add("tip-activo");

        // Quitamos la clase después de la animación
        setTimeout(function () {

            tip.classList.remove("tip-activo");

        }, 500);

    });

});