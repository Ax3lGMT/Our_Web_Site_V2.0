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
// MÓDULO POMODORO INTERACTIVO (Versión 2.0)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const btnOpen = document.getElementById('btn-open-pomodoro');
    const pomodoroContainer = document.getElementById('pomodoro-container');
    const pomodoroLauncher = document.getElementById('pomodoro-launcher');
    const btnClose = document.getElementById('pomodoro-close');

    const clockDisplay = document.getElementById('pomodoro-clock');
    const btnStart = document.getElementById('pomodoro-start');
    const btnPause = document.getElementById('pomodoro-pause');
    const btnReset = document.getElementById('pomodoro-reset');

    let timer = null;
    let totalSeconds = 25 * 60; // 25 minutos
    let isRunning = false;

    // 1. Mostrar el reloj al hacer clic en el botón pequeño
    if (btnOpen && pomodoroContainer && pomodoroLauncher) {
        btnOpen.addEventListener('click', () => {
            pomodoroLauncher.classList.add('d-none');
            pomodoroContainer.classList.remove('d-none');
        });

        // Ocultar y regresar al botón inicial
        btnClose.addEventListener('click', () => {
            stopTimer();
            resetTimerData();
            pomodoroContainer.classList.add('d-none');
            pomodoroLauncher.classList.remove('d-none');
        });
    }

    // Actualizar formato visual del reloj (MM:SS)
    function updateClockDisplay() {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        clockDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // 2. Controladores de tiempo
    if (btnStart) {
        btnStart.addEventListener('click', () => {
            if (isRunning) return;
            isRunning = true;

            timer = setInterval(() => {
                if (totalSeconds > 0) {
                    totalSeconds--;
                    updateClockDisplay();
                } else {
                    clearInterval(timer);
                    isRunning = false;
                    alert('¡Tiempo cumplido! Tómate un descanso de 5 minutos.');
                }
            }, 1000);
        });
    }

    if (btnPause) {
        btnPause.addEventListener('click', stopTimer);
    }

    if (btnReset) {
        btnReset.addEventListener('click', () => {
            stopTimer();
            resetTimerData();
        });
    }

    function stopTimer() {
        clearInterval(timer);
        isRunning = false;
    }

    function resetTimerData() {
        totalSeconds = 25 * 60;
        updateClockDisplay();
    }
});
// ==========================================
// LÓGICA DE ELEMENTO ARRASTRABLE (Drag and Drop)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const pomodoroCard = document.getElementById('draggable-pomodoro');
    if (!pomodoroCard) return;

    let isDragging = false;
    let startX, startY, initialX, initialY;

    pomodoroCard.addEventListener('mousedown', (e) => {
        // Evitar arrastrar si se hace clic en los botones o inputs
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return;
        
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        
        const rect = pomodoroCard.getBoundingClientRect();
        initialX = rect.left;
        initialY = rect.top;

        // Cambiar a posición fija respecto a la ventana para moverlo libremente
        pomodoroCard.style.position = 'fixed';
        pomodoroCard.style.top = `${initialY}px`;
        pomodoroCard.style.left = `${initialX}px`;
        pomodoroCard.style.right = 'auto';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        pomodoroCard.style.left = `${initialX + dx}px`;
        pomodoroCard.style.top = `${initialY + dy}px`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
});
// ==========================================
// MÓDULO DE REPRODUCTOR DE AUDIO HTML5 (Versión 2.0)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const btnToggleMusic = document.getElementById('btn-toggle-music');
    const audioContainer = document.getElementById('audio-player-container');
    const audioPlayer = document.getElementById('html5-audio-player');

    let isPlayingMusic = false;

    if (btnToggleMusic && audioContainer && audioPlayer) {
        btnToggleMusic.addEventListener('click', () => {
            if (!isPlayingMusic) {
                audioPlayer.load();
                audioPlayer.play().then(() => {
                    audioContainer.classList.remove('d-none');
                    btnToggleMusic.textContent = '⏸ Pausar Música';
                    btnToggleMusic.classList.remove('btn-outline-dark');
                    btnToggleMusic.classList.add('btn-danger');
                    isPlayingMusic = true;
                }).catch(error => {
                    console.log("Error al reproducir audio: ", error);
                    alert("No se pudo iniciar la reproducción automáticamente.");
                });
            } else {
                audioPlayer.pause();
                audioContainer.classList.add('d-none');
                btnToggleMusic.textContent = '▶ Reproducir Lo-Fi';
                btnToggleMusic.classList.remove('btn-danger');
                btnToggleMusic.classList.add('btn-outline-dark');
                isPlayingMusic = false;
            }
        });
    }
});
// ==========================================
// ADICIÓN DE SOPORTE TÁCTIL (Sin borrar código previo)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const pomodoroCard = document.getElementById('draggable-pomodoro');
    if (!pomodoroCard) return;

    // Duplicamos el comportamiento de arrastre para pantallas táctiles de forma independiente
    let touchStartX = 0, touchStartY = 0, initialTouchX = 0, initialTouchY = 0;
    let isTouchDragging = false;

    pomodoroCard.addEventListener('touchstart', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT' || e.target.tagName === 'AUDIO') return;
        if (e.touches.length === 1) {
            isTouchDragging = true;
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            
            const rect = pomodoroCard.getBoundingClientRect();
            initialTouchX = rect.left;
            initialTouchY = rect.top;

            pomodoroCard.style.position = 'fixed';
            pomodoroCard.style.top = `${initialTouchY}px`;
            pomodoroCard.style.left = `${initialTouchX}px`;
            pomodoroCard.style.right = 'auto';
        }
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (!isTouchDragging || e.touches.length !== 1) return;
        
        const dx = e.touches[0].clientX - touchStartX;
        const dy = e.touches[0].clientY - touchStartY;

        pomodoroCard.style.left = `${initialTouchX + dx}px`;
        pomodoroCard.style.top = `${initialTouchY + dy}px`;
    }, { passive: true });

    document.addEventListener('touchend', () => {
        isTouchDragging = false;
    });
});
// ==========================================
// INTERACTIVIDAD EN INTRODUCCIÓN: DIAGNÓSTICO
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.check-habito');
    const resultadoBox = document.getElementById('resultado-diagnostico');

    if (checkboxes.length > 0 && resultadoBox) {
        const totalCasillas = checkboxes.length;
        checkboxes.forEach(chk => {
            chk.addEventListener('change', () => {
                // Contar cuántos checkboxes están marcados usando el DOM
                const marcados = document.querySelectorAll('.check-habito:checked').length;
                
                if (marcados === 0) {
                    resultadoBox.innerHTML = `💡 <strong>Diagnóstico:</strong> ¡Excelente! Tienes un control absoluto de tus hábitos.`;
                } else if (marcados === 1 ) {
                    resultadoBox.innerHTML = `⚠️ <strong>Nivel Moderado (${marcados}/3):</strong> Estás a tiempo de aplicar un sistema antes de que el estrés te alcance. ¡Revisa los tips!`;
                    } else if (marcados === 2 || marcados === 3) {
                    resultadoBox.innerHTML = `⚠️ <strong>Nivel Intermedio (${marcados}/3):</strong> Estas llegando a un punto intermedio, debes mejorar!`;
                } else {
                    resultadoBox.innerHTML = `🔥 <strong>Nivel Crítico (${marcados}/3):</strong> ¡Necesitas esta guía urgentemente! Tu mente está cargada de ruido innecesario.`;

                }
            });
        });
    }
});
