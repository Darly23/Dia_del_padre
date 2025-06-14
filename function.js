document.getElementById('menu-toggle').addEventListener('click', function () {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

window.addEventListener('load', function () {
    setTimeout(function () {
        document.getElementById('video-loading').style.display = 'none';
    }, 1500);
});

let celebrationTriggered = false;

document.getElementById('show-dedication-btn').addEventListener('click', function () {
    const poem = `
        Papá, tus manos fuertes y tu voz tan sabia,<br>
        fueron guía firme, faro y esperanza.<br>
        En cada paso, tu amor me acompañaba,<br>
        como abrigo tierno, como luz que abraza.<br><br>
        Hoy te celebro con todo mi corazón,<br>
        gracias por ser mi ejemplo y mi canción.
    `;

    const dedicationDisplay = document.getElementById('dedication-display');
    const dedicationContent = document.getElementById('dedication-content');

    dedicationContent.innerHTML = poem;
    dedicationDisplay.classList.remove('hidden');

    setTimeout(() => {
        dedicationDisplay.classList.add('show');
        dedicationDisplay.classList.add('glowing-border');

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }, 50);
});

function launchFathersDayConfetti() {
    const colors = ['#FFD700', '#4169E1', '#32CD32', '#FF6347'];
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            confetti({
                particleCount: 150,
                spread: 60,
                origin: { y: 0.6 },
                colors: colors
            });
        }, i * 300);
    }
    
    setTimeout(() => {
        confetti({
            particleCount: 100,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        
        confetti({
            particleCount: 100,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });
    }, 1000);
}

function showSpecialMessage() {
    let specialMessage = document.getElementById('special-day-message');
    if (!specialMessage) {
        specialMessage = document.createElement('div');
        specialMessage.id = 'special-day-message';
        specialMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg,rgb(56, 163, 229),rgb(237, 237, 237));
            color: #333;
            padding: 30px;
            border-radius: 20px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 1000;
            animation: bounce 1s ease-out;
        `;
        specialMessage.innerHTML = `
            <h2 style="margin: 0 0 10px 0; font-size: 28px;">¡FELIZ DÍA DEL PADRE! 🎉</h2>
            <p style="margin: 0; font-size: 18px;">¡Hoy es tu día especial, papá!</p>
        `;
        document.body.appendChild(specialMessage);
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes bounce {
                0% { transform: translate(-50%, -50%) scale(0); }
                50% { transform: translate(-50%, -50%) scale(1.1); }
                100% { transform: translate(-50%, -50%) scale(1); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            specialMessage.style.opacity = '0';
            specialMessage.style.transition = 'opacity 1s';
            setTimeout(() => {
                if (specialMessage.parentNode) {
                    specialMessage.parentNode.removeChild(specialMessage);
                }
            }, 1000);
        }, 5000);
    }
}

// Contador regresivo mejorado
function updateCountdown() {
    const fathersDayDate = new Date(2025, 5, 15); 
    const currentDate = new Date();

    const difference = fathersDayDate - currentDate;

    if (difference <= 0 && !celebrationTriggered) {
        celebrationTriggered = true;
        
        // Mostrar que es el día especial
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        
        setTimeout(() => {
            launchFathersDayConfetti();
            showSpecialMessage();
        }, 500);
        
        return;
    }
    
    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
        
        if (days === 0 && hours === 0 && minutes === 0 && seconds <= 10 && seconds > 0) {
            const countdownElement = document.querySelector('.countdown-container') || document.body;
            countdownElement.style.animation = `pulse ${seconds/10}s ease-in-out`;
        }
    }
}

setInterval(updateCountdown, 1000);
updateCountdown(); 

window.addEventListener('DOMContentLoaded', function () {
    const savedDedication = localStorage.getItem('fathersDayDedication');

    if (savedDedication) {
        document.getElementById('dedication-text').value = savedDedication;
        document.getElementById('dedication-content').textContent = savedDedication;
        document.getElementById('dedication-display').classList.remove('hidden');
        setTimeout(() => {
            document.getElementById('dedication-display').classList.add('show');
            document.getElementById('dedication-display').classList.add('glowing-border');
        }, 500);
    }
});



