// --- Config ---
const CONFIG = {
    password: "034323", // Your special date
    particleCount: 400,
    introTexts: [
        "Every day I cannot believe how lucky I am",
        "Amongst trillions of stars...",
        "Over billions of years...",
        "To be alive, and to get to spend this life with you",
        "You're a poetry",
        "Written by God Himself",
        "And i, I'm the reader",
        "Falling for every line",
        "Is so incredibly, unfathomably unlikely",
        "And yet here I am to get the impossible chance to get to know you",
        "I love you so much, more than words can say",
        "And I can't wait to spend all the time in the world with you!",
        "Happy Valentine's Day Love❤️ <3",
        "Ya'aburnee"
    ],
    letter: `To my Dearest and Rarest Anmol Ratan Triparna❤️ (PenguSonnuu),

Tui amar jibone eshe shob kichu change kore diyechis, U add colour to my life.
Tor hashi amar shob dukkho bhule jaay.Remember 1 thing I said to you Colgate Smile! always.
Ei bochor ta amar jiboner shobcheye sundor chapter jeta ami kono din o Bhulbo naa.
I will forever be your Biggest Supporter/Cheerleader.
I choose you, Always and forever. Loads and Loads of Love ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️Sonnuuu ❤️`,
    letter2: `Porish purota, toke scroll korte hobe automatically ekta point of time er por niche jabe naa. 🐧

If I could freeze one feeling in time, it would be the way my heart feels when I think of you.
Not loud. Not dramatic. Just full. My Eyes filled up when i think about you.
You don’t just walk into a room… you change its temperature. You don’t just smile… you create a moment. And somehow, you make ordinary days feel like something worth remembering.
Being with you feels like peace and excitement at the same time. Like home… but also like adventure.
You're rare as diamond, Every little part of you is magic to me.
You deserve a love that celebrates you loudly, protects you quietly, and chooses you daily. And Yesterday, today, tommorow and every day, I choose you.
You’re not just special, Sonuuuu.
You are unforgettable.
Happy Valentine’s Day to the girl who makes my world brighter just by existing. ❤️✨
You’ve become that person I want to tell everything to.
The one I want to sit with in silence.
The one I want when things are good… and especially when they’re not, when life gets harder.
And maybe it sounds intense — but I don’t want a little bit of you.
I want all of you.
Your chaos.
Your softness.
Your overthinking.
Your childishness, Your's Everything.
You're the the moon to my dark sky.
There is no one like you in this world.
There is saying if you can't handle Your women, Then You have found the right one.
You Know what's more beautiful than you? it's You, Only You
You’re not just special to me, Sonnuuu,
You’re the kind of person people write songs about when they can’t sleep.
You are my safe place, my home, and my greatest adventure and greatest gift from Bhogoban.
Thank you for being you. ❤️`
};

// --- Init Canvas (Particles) ---
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
class Particle {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
        this.fadeDelay = Math.random() * 600 + 100;
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = 0;
        this.fadeDir = 1;
        this.fadeSpeed = Math.random() * 0.01 + 0.005;
        this.hue = Math.random() * 40 + 350; // 320-360 pink range
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.fadeDir === 1) {
            this.opacity += this.fadeSpeed;
            if (this.opacity >= 1) { this.opacity = 1; this.fadeDir = -1; }
        } else {
            this.opacity -= this.fadeSpeed;
            if (this.opacity <= 0) { this.reset(); }
        }
    }
    draw() {
        ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < CONFIG.particleCount; i++) particles.push(new Particle());
}
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
}
initParticles();
animateParticles();
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


// --- Navigation System ---
function nextSection(id) {
    document.querySelectorAll('section').forEach(s => {
        s.classList.remove('active-section');
        s.classList.add('hidden-section');
    });

    const next = document.getElementById(id);
    if (next) {
        next.classList.remove('hidden-section');
        next.classList.add('active-section');

        // Trigger specific logic for sections
        if (id === 'intro-section') playIntro();
        if (id === 'letter-section') typeLetter();
        if (id === 'music-section') playMusic();
        if (id === 'proposal-section') initProposal();
    }
}

// --- 5. Music Section Logic ---
function playMusic() {
    const music = document.getElementById("our-song");
    if (music) {
        music.volume = 0.8; // Set volume to 80%
        music.currentTime = 42; // Start from 42 seconds
        music.play().catch(error => console.log("Audio play failed:", error));
    }
}


// --- 1. Lock Screen Logic ---
const pwdInput = document.getElementById('passwordInput');
const unlockBtn = document.getElementById('unlockBtn');
const errorMsg = document.getElementById('error-msg');

function checkPassword() {
    if (pwdInput.value === CONFIG.password) {
        nextSection('intro-section');
    } else {
        errorMsg.textContent = "Wrong try again😜";
        pwdInput.classList.add('shake');
        setTimeout(() => pwdInput.classList.remove('shake'), 500);
    }
}
unlockBtn.addEventListener('click', checkPassword);


// --- 2. Intro Sequencer ---
const textContainer = document.getElementById("text-container");
const startBtn = document.getElementById("startJourneyBtn");

function playIntro() {
    let index = 0;

    function showNextText() {
        if (index >= CONFIG.introTexts.length) {
            startBtn.style.display = "block";
            return;
        }

        const div = document.createElement("div");
        div.classList.add("apple-text", "fade-in");
        div.innerText = CONFIG.introTexts[index];
        textContainer.appendChild(div);

        setTimeout(() => {
            div.classList.remove("fade-in");
            div.classList.add("fade-out");
            setTimeout(() => {
                div.remove();
                index++;
                showNextText();
            }, 1200);
        }, 2500); // Read time
    }
    showNextText();
}
startBtn.addEventListener('click', () => nextSection('gallery-section'));


// --- 4. Letter Typewriter ---
let typeTimeout; // Global variable to store timeout ID

function typeWriter(text, elementId, speed = 50) {
    const el = document.getElementById(elementId);
    if (!el) return;

    // Clear any existing typing animation
    if (typeTimeout) clearTimeout(typeTimeout);

    el.innerHTML = "";
    let i = 0;

    function type() {
        if (i < text.length) {
            el.innerHTML += text.charAt(i);
            i++;
            // Store the timeout ID
            typeTimeout = setTimeout(type, speed);
        } else {
            typeTimeout = null; // Clear when done
        }
    }
    type();
}

function typeLetter() {
    typeWriter(CONFIG.letter, 'typewriterText');
    // Reset buttons
    const nextBtn = document.getElementById('nextLetterBtn');
    if (nextBtn) nextBtn.style.display = 'inline-block';
}

function showNextLetter() {
    typeWriter(CONFIG.letter2, 'typewriterText');
    const nextBtn = document.getElementById('nextLetterBtn');
    if (nextBtn) nextBtn.style.display = 'none'; // Hide after clicking
}


// --- 7. Proposal Logic ---
function initProposal() {
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const result = document.getElementById("result");
    const zone = document.getElementById("zone");

    // "No" Runaway
    const moveNo = () => {
        const zoneRect = zone.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();
        const randX = Math.random() * (zoneRect.width - btnRect.width);
        const randY = Math.random() * (zoneRect.height - btnRect.height);
        noBtn.style.left = `${randX}px`;
        noBtn.style.top = `${randY}px`;
        noBtn.style.transform = "none";
    };
    noBtn.addEventListener('mouseover', moveNo);
    noBtn.addEventListener('click', moveNo);

    // "Yes" Confetti
    yesBtn.addEventListener('click', () => {
        yesBtn.style.display = 'none';
        noBtn.style.display = 'none';
        result.style.display = 'block';
        startConfetti();
    });
}

function startConfetti() {
    const end = Date.now() + 15 * 1000;
    (function frame() {
        confetti({
            particleCount: 10,
            angle: 60,
            spread: 60,
            origin: { x: 0 },
            colors: ['#ff0a54', '#ff477e', '#ff7096']
        });
        confetti({
            particleCount: 10,
            angle: 120,
            spread: 60,
            origin: { x: 1 },
            colors: ['#ff0a54', '#ff477e', '#ff7096']
        });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}




// --- Optimization: RAF Loop for Mouse Effects ---
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let isMoving = false;
const cursor = document.getElementById('magic-cursor');

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMoving = true;
});

function loop() {
    if (isMoving) {
        // 1. 3D Tilt
        const card = document.querySelector('.active-section .glass-card');
        if (card) {
            const cx = (window.innerWidth / 2 - mouseX) / 25;
            const cy = (window.innerHeight / 2 - mouseY) / 25;
            card.style.transform = `rotateY(${cx}deg) rotateX(${cy}deg)`;

            const rect = card.getBoundingClientRect();
            const cardX = mouseX - rect.left;
            const cardY = mouseY - rect.top;

            card.style.setProperty('--mouse-x', `${cardX}px`);
            card.style.setProperty('--mouse-y', `${cardY}px`);

            // Ensure glare exists
            if (!card.querySelector('.card-glare')) {
                const glare = document.createElement('div');
                glare.classList.add('card-glare');
                card.appendChild(glare);
            }
        }

        // 2. Magic Cursor (Lerp for smoothness)
        if (cursor) {
            // Simple linear interpolation for smooth 'drag' feel
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;

            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
        }

        // Trail generation (throttled)
        if (Math.random() < 0.2) {
            const dot = document.createElement('div');
            dot.classList.add('cursor-trail');
            dot.style.left = `${mouseX}px`;
            dot.style.top = `${mouseY}px`;
            document.body.appendChild(dot);
            setTimeout(() => dot.remove(), 1000);
        }
        // 3. Smart No Button (Evasion)
        const noBtn = document.getElementById("noBtn");
        if (noBtn && noBtn.style.display !== 'none' && document.getElementById('proposal-section')?.classList.contains('active-section')) {
            const btnRect = noBtn.getBoundingClientRect();
            const btnCenterX = btnRect.left + btnRect.width / 2;
            const btnCenterY = btnRect.top + btnRect.height / 2;

            const dist = Math.hypot(mouseX - btnCenterX, mouseY - btnCenterY);

            if (dist < 150) { // Proximity Threshold
                const zone = document.getElementById("zone");
                if (zone) {
                    const zoneRect = zone.getBoundingClientRect();
                    const randX = Math.random() * (zoneRect.width - btnRect.width);
                    const randY = Math.random() * (zoneRect.height - btnRect.height);

                    noBtn.style.left = `${randX}px`;
                    noBtn.style.top = `${randY}px`;
                    noBtn.style.transform = "none";
                }
            }
        }
    }
    requestAnimationFrame(loop);
}
loop();

// Hover States
const hoverables = document.querySelectorAll('button, input');
hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor?.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor?.classList.remove('hovered'));
});

// Click Burst
document.addEventListener('click', (e) => {
    confetti({
        particleCount: 15,
        spread: 60,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
        colors: ['#ffd700', '#ff4d6d'],
        ticks: 60,
        gravity: 0.5,
        scalar: 0.5
    });
});

// --- Shimmer Text Injection ---
document.querySelectorAll('h1').forEach(h => h.classList.add('shimmer-text'));

// --- Foreground Fireflies ---
function initFireflies() {
    const container = document.getElementById('fireflies-container');
    const count = 30;

    for (let i = 0; i < count; i++) {
        const fly = document.createElement('div');
        fly.classList.add('firefly');

        // Random start positions
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Random animation props
        const duration = 10 + Math.random() * 20;
        const delay = Math.random() * 10;

        fly.style.left = `${x}vw`;
        fly.style.top = `${y}vh`;
        fly.style.animationDuration = `${duration}s, ${3 + Math.random()}s`;
        fly.style.animationDelay = `-${delay}s, -${Math.random()}s`;

        container.appendChild(fly);
    }
}
initFireflies();

// --- Theme Toggle ---
const themeToggle = document.getElementById('themeToggle');
const candleToggle = document.getElementById('candleToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.remove('candle-theme');
    body.classList.toggle('light-theme');
    themeToggle.textContent = body.classList.contains('light-theme') ? "☀️" : "🌙";
});

candleToggle.addEventListener('click', () => {
    body.classList.remove('light-theme');
    body.classList.toggle('candle-theme');
    themeToggle.textContent = "🌙"; // Reset main toggle icon
});

// --- Quiz Logic ---
let correctCount = 0;
const totalCorrect = 3;

window.handleQuiz = function (isCorrect, btn) {
    const result = document.getElementById('quizResult');

    if (btn.classList.contains('selected')) return; // Prevent double clicking

    if (isCorrect) {
        btn.classList.add('selected');
        correctCount++;

        if (correctCount === totalCorrect) {
            result.textContent = "Correct! You know us so well ❤️";
            result.style.color = "var(--gold)";
            confetti({
                particleCount: 300,
                spread: 80,
                origin: { x: 0.5, y: 0.5 }
            });
        } else {
            result.textContent = `That's one! Find ${totalCorrect - correctCount} more... 😉`;
            result.style.color = "var(--text-color)";
        }
    } else {
        result.textContent = "Wrong 😜 but still cute";
        result.style.color = "var(--text-color)";
        btn.classList.add('shake');
        setTimeout(() => btn.classList.remove('shake'), 500);
    }
};



// --- Floating Penguins ---
function initFloatingPenguins() {
    const container = document.getElementById('penguin-container');
    if (!container) return;

    // Simple SVG Penguin
    const penguinSVG = `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="overflow:visible">
            <g class="penguin-inner">
                <!-- Feet -->
                <ellipse cx="35" cy="95" rx="10" ry="5" fill="#FFA500" />
                <ellipse cx="65" cy="95" rx="10" ry="5" fill="#FFA500" />
                <!-- Body -->
                <ellipse cx="50" cy="55" rx="30" ry="38" fill="#1a1a1a" />
                <!-- Belly -->
                <ellipse cx="50" cy="60" rx="20" ry="28" fill="#FFF" />
                <!-- Eyes -->
                <circle cx="42" cy="45" r="4" fill="#FFF" />
                <circle cx="58" cy="45" r="4" fill="#FFF" />
                <circle cx="42" cy="45" r="1.5" fill="#000" />
                <circle cx="58" cy="45" r="1.5" fill="#000" />
                <!-- Beak -->
                <path d="M45 52 L55 52 L50 58 Z" fill="#FFA500" />
                 <!-- Blush -->
                <ellipse cx="35" cy="53" rx="4" ry="2.5" fill="#FFC0CB" opacity="0.6"/>
                <ellipse cx="65" cy="53" rx="4" ry="2.5" fill="#FFC0CB" opacity="0.6"/>
            </g>
        </svg>
    `;

    const count = 19; // Number of penguins

    for (let i = 0; i < count; i++) {
        const div = document.createElement('div');
        div.classList.add('penguin');
        div.innerHTML = penguinSVG;

        // Random properties
        const startX = Math.random() * 100; // 0-100vw
        const endX = (Math.random() - 0.5) * 40 + "vw"; // Drift amount
        const duration = 25 + Math.random() * 30; // Slower float
        const delay = Math.random() * -30;
        const scale = 0.4 + Math.random() * 0.4; // 0.4 - 0.8 scale

        div.style.left = `${startX}vw`;
        div.style.setProperty('--end-x', endX);
        div.style.animationDuration = `${duration}s`;
        div.style.animationDelay = `${delay}s`;
        div.style.opacity = 0.5 + Math.random() * 0.5;

        // Randomly flip direction (scaleX)
        if (Math.random() > 0.5) {
            div.style.transform = `scale(-${scale}, ${scale})`;
        } else {
            div.style.transform = `scale(${scale})`;
        }

        container.appendChild(div);
    }
}
initFloatingPenguins();
