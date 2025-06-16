document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");
    const errorMessage = document.querySelector(".error-message");
    const copyBtn = document.getElementById("copy-email-btn");

    // Función para copiar el correo al portapapeles
    function copyEmailToClipboard() {
        const email = "ismaelluchi436@gmail.com";

        // Crear un elemento temporal para copiar el texto
        const tempInput = document.createElement("textarea");
        tempInput.value = email;
        document.body.appendChild(tempInput);

        // Seleccionar y copiar el texto
        tempInput.select();
        document.execCommand("copy");

        // Eliminar el elemento temporal
        document.body.removeChild(tempInput);

        // Mostrar mensaje de éxito
        const successMsg = document.createElement("div");
        successMsg.className = "copy-success";
        successMsg.textContent = "¡Correo copiado al portapapeles!";

        const emailContainer = document.querySelector(".email-container");
        emailContainer.appendChild(successMsg);

        // Eliminar el mensaje después de 2 segundos
        setTimeout(() => {
            successMsg.style.opacity = "0";
            setTimeout(() => {
                if (emailContainer.contains(successMsg)) {
                    emailContainer.removeChild(successMsg);
                }
            }, 300);
        }, 2000);

        // Animación del botón
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copiado';
        copyBtn.style.background = "rgba(100, 255, 218, 0.3)";

        setTimeout(() => {
            copyBtn.innerHTML = '<i class="far fa-copy"></i> Copiar';
            copyBtn.style.background = "";
        }, 2000);
    }

    // Evento para el botón de copiar
    copyBtn.addEventListener("click", copyEmailToClipboard);

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Ocultar mensajes previos
        formStatus.className = "form-status";
        errorMessage.classList.remove("visible");
        errorMessage.className = "error-message";

        // Obtener valores del formulario
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;

        // Validación básica
        if (!name || !email || !subject || !message) {
            showStatus("Por favor completa todos los campos", "error");
            return;
        }

        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showStatus("Por favor ingresa un email válido", "error");
            return;
        }

        // Mostrar estado de envío
        showStatus("Enviando mensaje...", "success");

        try {
            // Crear FormData con los datos del formulario
            const formData = new FormData(contactForm);

            // Enviar datos a Formspree
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                showStatus(
                    "¡Mensaje enviado con éxito! Te responderé pronto.",
                    "success"
                );
                contactForm.reset();
            } else {
                const data = await response.json();
                if (data.errors) {
                    showStatus(
                        `Error: ${data.errors
                            .map((error) => error.message)
                            .join(", ")}`,
                        "error"
                    );
                } else {
                    // Mostrar el mensaje de error personalizado
                    errorMessage.className = "error-message visible";
                    errorMessage.classList.add("visible");
                    formStatus.className = "form-status";
                }
            }
        } catch (error) {
            console.error("Error de red:", error);
            // Mostrar el mensaje de error personalizado
            errorMessage.className = "error-message visible";
            formStatus.className = "form-status";
        }
    });

    // Función para mostrar estados del formulario
    function showStatus(text, type) {
        formStatus.textContent = text;
        formStatus.className = `form-status visible ${type}`;

        // Ocultar el mensaje después de 5 segundos (excepto éxito)
        if (type !== "success") {
            setTimeout(() => {
                formStatus.className = "form-status";
            }, 5000);
        }
    }
});