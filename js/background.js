// js/background.js

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById('mathCanvas');
    if (!canvas) return; // Seguridad por si no encuentra el canvas

    const ctx = canvas.getContext('2d');
    let width, height;

    // Fórmulas matemáticas clave para Data Science
    const formulas = [
        "P(A|B) = P(B|A)P(A)/P(B)", // Bayes
        "y = mx + b",
        "f(x) = 1 / (1 + e⁻ˣ)",     // Sigmoide
        "σ = √[ Σ(x - μ)² / N ]",    // Desviación
        "∇J(θ)",                     // Gradiente
        "∫ eˣ dx",
        "x̄ = Σx / n",
        "lim x→∞",
        "H(p) = -Σ p(x) log p(x)",   // Entropía
        "Aᵀ", "λ", "θ", "π", "Σ", "∞", "µ", "ℒ"
    ];

    const particles = [];
    const particleCount = 50; // Cantidad de fórmulas (ajustable)

    function init() {
        resize();
        
        particles.length = 0;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.reset(true); // true = dispersión inicial en toda la pantalla
        }

        reset(initial = false) {
            this.text = formulas[Math.floor(Math.random() * formulas.length)];
            this.x = Math.random() * width;
            // Si es inicio, aleatorio en Y. Si no, empieza debajo de la pantalla
            this.y = initial ? Math.random() * height : height + 50; 
            
            // Velocidad y opacidad
            this.speed = 0.3 + Math.random() * 0.5; // Movimiento lento y elegante
            this.opacity = 0.05 + Math.random() * 0.2; // Opacidad baja para no distraer
            this.size = Math.floor(14 + Math.random() * 20); 
        }

        update() {
            this.y -= this.speed; 
            // Si sale por arriba, reciclar abajo
            if (this.y < -50) { 
                this.reset();
            }
        }

        draw() {
            // Usamos el color 'Slate' de tu tema (#8892b0) con transparencia
            ctx.fillStyle = `rgba(136, 146, 176, ${this.opacity})`;
            ctx.font = `${this.size}px "Times New Roman", serif`;
            ctx.fillText(this.text, this.x, this.y);
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resize();
        init();
    });

    init();
    animate();
});