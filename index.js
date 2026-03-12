// Importar Bootstrap CSS y JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Importar AOS (Animaciones al hacer scroll)
import AOS from 'aos';
import 'aos/dist/aos.css';

// Importar CSS personalizado
import './assets/css/style.css';

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar AOS
    AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-in-out',
    });

    // 0. Preloader Logic
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
            }, 500); // Pequeño delay para asegurar suavidad
        });
    }

    // 1. WhatsApp Float Button
    const waFloat = document.createElement('a');
    waFloat.href = 'https://wa.me/525549050421?text=Hola!%20Me%20gustaría%20recibir%20asesoría%20sobre%20migración%20a%20Canadá.';
    waFloat.className = 'whatsapp-float';
    waFloat.target = '_blank';
    waFloat.rel = 'noopener noreferrer';
    waFloat.innerHTML = `
        <div class="whatsapp-btn">
            <i class="fa-brands fa-whatsapp"></i>
        </div>
        <span class="whatsapp-msg">¿Necesitas ayuda?</span>
    `;
    document.body.appendChild(waFloat);

    // 2. Forms Validation
    const forms = document.querySelectorAll('form:not(#crsSimulator)');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
                form.classList.add('was-validated');
            } else {
                e.preventDefault();
                form.classList.add('was-validated');
                const btn = form.querySelector('button[type="submit"]');
                if(btn) {
                    const originalText = btn.innerHTML;
                    btn.disabled = true;
                    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando...';
                    setTimeout(() => {
                        form.reset();
                        form.classList.remove('was-validated');
                        btn.disabled = false;
                        btn.innerHTML = originalText;
                        alert('¡Mensaje enviado con éxito!');
                    }, 2000);
                }
            }
        });
    });

    // 3. Navbar Scroll
    const nav = document.getElementById('mainNav');
    const handleScroll = () => {
        if (nav) {
            if (window.scrollY > 40) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // 4. Eligibility Quiz Logic (if present)
    window.startQuiz = () => {
        document.getElementById('quiz-intro').classList.add('d-none');
        document.getElementById('question-1').classList.remove('d-none');
    };

    window.nextQuestion = (current, answer) => {
        document.getElementById(`question-${current}`).classList.add('d-none');
        document.getElementById(`question-${current + 1}`).classList.remove('d-none');
    };

    window.showResult = (answer) => {
        document.getElementById('question-3').classList.add('d-none');
        const resultDiv = document.getElementById('quiz-result');
        const resultTitle = document.getElementById('result-title');
        const resultText = document.getElementById('result-text');
        
        resultTitle.innerText = "¡Perfil con alto potencial!";
        resultText.innerText = "Basado en tus respuestas, tienes un perfil prometedor para programas de trabajo directo o Express Entry. Te recomendamos agendar una asesoría gratuita para detallar tu plan.";
        
        resultDiv.classList.remove('d-none');
    };

    window.resetQuiz = () => {
        document.getElementById('quiz-result').classList.add('d-none');
        document.getElementById('quiz-intro').classList.remove('d-none');
    };
});