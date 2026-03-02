document.addEventListener('DOMContentLoaded', () => {
    // 1. Filtrado de vacantes
    const filterBtns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.vacancy-item');

    if(filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => {
                    b.classList.remove('btn-turquoise', 'active');
                    b.classList.add('btn-outline-secondary');
                });
                btn.classList.add('btn-turquoise', 'active');
                btn.classList.remove('btn-outline-secondary');

                const filter = btn.getAttribute('data-filter');
                items.forEach(item => {
                    item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1) translateY(0)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.95) translateY(10px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 400);
                    }
                });
            });
        });
    }

    // 2. Botón flotante de WhatsApp
    const waFloat = document.createElement('a');
    waFloat.href = 'https://wa.me/5215512345678?text=Hola!%20Me%20gustaría%20recibir%20asesoría%20sobre%20migración%20a%20Canadá.';
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

    // 3. Validación de formularios con Bootstrap alerts
    const forms = document.querySelectorAll('form:not(#crsSimulator)');
    forms.forEach(form => {
        // Only attach generic validation if it's not handled by specific modals
        form.addEventListener('submit', (e) => {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
                form.classList.add('was-validated');
                
                // Mostrar alerta de error
                let alertMsg = form.querySelector('.alert-validation');
                if(!alertMsg) {
                    alertMsg = document.createElement('div');
                    alertMsg.className = 'alert alert-danger mt-3 alert-validation';
                    alertMsg.role = 'alert';
                    alertMsg.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Por favor, completa todos los campos requeridos correctamente.';
                    form.appendChild(alertMsg);
                }
            } else {
                e.preventDefault(); // Simulate submission
                form.classList.add('was-validated');
                const btn = form.querySelector('button[type="submit"]');
                if(btn) {
                    const originalText = btn.innerHTML;
                    btn.disabled = true;
                    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando...';
                    setTimeout(() => {
                        let alertMsg = form.querySelector('.alert-validation');
                        if(alertMsg) alertMsg.remove();
                        
                        const successMsg = document.createElement('div');
                        successMsg.className = 'alert alert-success mt-3 animate__animated animate__fadeIn';
                        successMsg.role = 'alert';
                        successMsg.innerHTML = '<i class="fa-solid fa-circle-check"></i> ¡Éxito! Tu solicitud ha sido procesada.';
                        form.appendChild(successMsg);
                        
                        form.reset();
                        form.classList.remove('was-validated');
                        setTimeout(() => {
                            btn.disabled = false;
                            btn.innerHTML = originalText;
                            successMsg.remove();
                            // If modal, hide it
                            const modal = btn.closest('.modal');
                            if (modal) {
                                const bsModal = bootstrap.Modal.getInstance(modal);
                                if (bsModal) bsModal.hide();
                            }
                        }, 3000);
                    }, 2000);
                }
            }
        });
    });

    // CRS Simulator specific logic
    const crsForm = document.getElementById('crsSimulator');
    const resultModalEl = document.getElementById('resultModal');
    if (crsForm && resultModalEl) {
        const resultModal = new bootstrap.Modal(resultModalEl);
        const scoreDisplay = document.getElementById('totalScore');
        crsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const ageScore = parseInt(document.getElementById('crsAge').value) || 0;
            const eduScore = parseInt(document.getElementById('crsEducation').value) || 0;
            const langScore = parseInt(document.getElementById('crsLanguage').value) || 0;
            scoreDisplay.innerText = ageScore + eduScore + langScore;
            resultModal.show();
        });
    }

    // 4. Hover effect for province cards
    const provinceCards = document.querySelectorAll('.province-card');
    provinceCards.forEach(card => {
        const overlay = card.querySelector('.fun-fact-overlay');
        const factText = card.querySelector('.fact-text');
        const fact = card.getAttribute('data-fun-fact');
        
        if(overlay && factText && fact) {
            factText.innerText = fact;
            overlay.classList.remove('d-none');
        }
    });

    // 5. Eligibility Quiz Logic
    let quizData = {
        english: '',
        degree: '',
        jobOffer: ''
    };

    window.startQuiz = function() {
        document.getElementById('quiz-intro').classList.add('d-none');
        document.getElementById('question-1').classList.remove('d-none');
    };

    window.nextQuestion = function(currentStep, value) {
        if (currentStep === 1) {
            quizData.english = value;
            document.getElementById('question-1').classList.add('d-none');
            document.getElementById('question-2').classList.remove('d-none');
        } else if (currentStep === 2) {
            quizData.degree = value;
            document.getElementById('question-2').classList.add('d-none');
            document.getElementById('question-3').classList.remove('d-none');
        }
    };

    window.showResult = function(jobOfferValue) {
        quizData.jobOffer = jobOfferValue;
        document.getElementById('question-3').classList.add('d-none');
        document.getElementById('quiz-result').classList.remove('d-none');

        const title = document.getElementById('result-title');
        const text = document.getElementById('result-text');

        if (quizData.jobOffer === 'si') {
            title.innerText = "¡Perfil de Alta Prioridad!";
            text.innerText = "Tienes una oferta de trabajo validada. Esto facilita enormemente tu proceso migratorio a través de un Permiso de Trabajo o LMIA.";
        } else if (quizData.english === 'alto' && quizData.degree === 'si') {
            title.innerText = "Tienes un perfil fuerte para Express Entry";
            text.innerText = "Tu combinación de alto nivel de inglés y formación profesional te otorga un puntaje CRS competitivo para la residencia permanente.";
        } else {
            title.innerText = "Te recomendamos la ruta de estudios";
            text.innerText = "Un programa de estudios en Canadá te permitirá obtener experiencia local y un permiso de trabajo post-graduación (PGWP), fortaleciendo tu perfil.";
        }
    };

    window.resetQuiz = function() {
        quizData = { english: '', degree: '', jobOffer: '' };
        const steps = document.querySelectorAll('.quiz-step');
        steps.forEach(step => step.classList.add('d-none'));
        document.getElementById('quiz-intro').classList.remove('d-none');
    };

    // Navbar Scroll
    window.addEventListener('scroll', function() {
        const nav = document.getElementById('mainNav');
        if (nav) {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    });
});