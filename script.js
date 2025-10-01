// script.js
document.addEventListener("DOMContentLoaded", () => {
    activarMenuDinamico();
    animacionesScroll();
    validarFormulario();
    menuHamburguesa(); // 👈 activamos el menú responsive
});

// ----------- MENÚ ACTIVO DINÁMICO -----------
function activarMenuDinamico() {
    const navLinks = document.querySelectorAll("nav ul li a");
    const currentPage = window.location.pathname.split("/").pop();

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
}

// ----------- ANIMACIONES AL HACER SCROL (Optimizado con IntersectionObserver) -----------
function animacionesScroll() {
    const elements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // evitar re-ejecutar
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
} 

// ----------- FORMULARIO DE CONTACTO (Validación Mejorada) -----------
function validarFormulario() {
    const form = document.querySelector("#contact-form");

    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.querySelector("#name");
        const email = document.querySelector("#email");
        const message = document.querySelector("#message");

        let valid = true;

        // Validación nombre
        if (name.value.trim().length < 2) {
            mostrarError(name, "El nombre debe tener al menos 2 caracteres.");
            valid = false;
        } else {
            limpiarError(name);
        }

        // Validación email con regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            mostrarError(email, "Por favor ingresa un correo válido.");
            valid = false;
        } else {
            limpiarError(email);
        }

        // Validación mensaje
        if (message.value.trim().length < 5) {
            mostrarError(message, "El mensaje debe tener al menos 5 caracteres.");
            valid = false;
        } else {
            limpiarError(message);
        }

        if (valid) {
            // Simulación de envío
            const feedback = document.createElement("p");
            feedback.textContent = `✅ Gracias ${name.value}, hemos recibido tu mensaje.`;
            feedback.classList.add("form-success");
            form.appendChild(feedback);

            form.reset();
            setTimeout(() => feedback.remove(), 4000);
        }
    });
}

// ----------- Funciones auxiliares de validación -----------
function mostrarError(input, mensaje) {
    let error = input.nextElementSibling;
    if (!error || !error.classList.contains("error-msg")) {
        error = document.createElement("small");
        error.classList.add("error-msg");
        input.insertAdjacentElement("afterend", error);
    }
    error.textContent = mensaje;
    input.classList.add("input-error");
}

function limpiarError(input) {
    const error = input.nextElementSibling;
    if (error && error.classList.contains("error-msg")) {
        error.remove();
    }
    input.classList.remove("input-error");
}

// ----------- MENÚ HAMBURGUESA (Responsive) -----------
function menuHamburguesa() {
    const menuToggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav");

    if (!menuToggle || !nav) return;

    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}
