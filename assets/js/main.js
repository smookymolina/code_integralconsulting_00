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

    // 3. Validación de formularios
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

    // 4. Navbar Scroll (Solo para efectos visuales de sombra/compactación)
    const nav = document.getElementById('mainNav');
    function handleScroll() {
        if (nav) {
            if (window.scrollY > 40) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
});