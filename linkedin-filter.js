// ==UserScript==
// @name         Filtro do LinkedIn (Simples)
// @match        https://www.linkedin.com/feed/*
// @grant        none
// ==/UserScript==

const palavraChave = "vaga";

function filtrarFeed() {
    // Busca tanto o post quanto a caixa de comentários/atividades
    const blocosDoFeed = document.querySelectorAll('.fie-impression-container, .update-v2-social-activity');

    blocosDoFeed.forEach(bloco => {
        const texto = bloco.innerText ? bloco.innerText.toLowerCase() : "";

        // Se o bloco não contiver a palavra-chave, ele é ocultado
        if (!texto.includes(palavraChave)) {
            bloco.style.display = 'none';
        } else {
            bloco.style.display = 'block';
        }
    });
}

// Executa ao rolar a página
window.addEventListener('scroll', filtrarFeed);

// Executa assim que a página carrega
setTimeout(filtrarFeed, 2000);
