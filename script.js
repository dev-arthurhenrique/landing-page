
// =========================
// 1. MENU MOBILE
// =========================

const menuToggle = document.querySelector("#menu-toggle");
const nav = document.querySelector("#nav");

menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
    );
});

// Fecha o menu quando um link é clicado.
nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
    });
});


// =========================
// 2. ANO AUTOMÁTICO
// =========================

document.querySelector("#year").textContent =
    new Date().getFullYear();


// =========================
// 3. DATA MÍNIMA
// =========================

const dateInput = document.querySelector("#date");

// Usa a data local, evitando problemas de fuso horário.
function getLocalDate() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

dateInput.min = getLocalDate();


// =========================
// 4. FORMULÁRIO WHATSAPP
// =========================

const form = document.querySelector("#booking-form");

// IMPORTANTE:
// Troque pelo número real da barbearia.
// Use código do país + DDD + número.
// Exemplo fictício: 5582999999999
const whatsappNumber = "5582996355177";

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const service = document.querySelector("#service").value;
    const date = document.querySelector("#date").value;
    const time = document.querySelector("#time").value;
    const message = document.querySelector("#message").value.trim();

    // Impede o envio caso a data seja anterior à atual.
    if (date < getLocalDate()) {
        alert("Escolha uma data igual ou posterior a hoje.");
        dateInput.focus();
        return;
    }

    // Converte AAAA-MM-DD para DD/MM/AAAA sem
    // depender do fuso horário do navegador.
    const [year, month, day] = date.split("-");

    const formattedDate = `${day}/${month}/${year}`;

    const whatsappMessage = [
        "Olá! Gostaria de solicitar um agendamento.",
        "",
        `*Nome:* ${name}`,
        `*Serviço:* ${service}`,
        `*Data desejada:* ${formattedDate}`,
        `*Horário desejado:* ${time}`,
        message ? `*Observações:* ${message}` : "",
        "",
        "Poderiam confirmar a disponibilidade?"
    ]
        .filter(Boolean)
        .join("\n");

    const url =
        `https://wa.me/${whatsappNumber}?text=` +
        encodeURIComponent(whatsappMessage);

    window.open(url, "_blank", "noopener,noreferrer");
});
