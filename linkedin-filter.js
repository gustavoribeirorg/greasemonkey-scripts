// ==UserScript==
// @name         Filtro do LinkedIn
// @match        https://www.linkedin.com/feed/*
// @grant        none
// ==/UserScript==

const palavrasChave = ["vaga"];

function filtrarPosts() {
    // Busca todas as áreas de texto das publicações
    const caixasDeTexto = document.querySelectorAll('[data-testid="expandable-text-box"]');

    caixasDeTexto.forEach(caixa => {
        const texto = caixa.innerText.toLowerCase();
        const temPalavra = palavrasChave.some(palavra => texto.includes(palavra));

        // Se não encontrar as palavras-chave, oculta a publicação inteira
        if (!temPalavra) {
            const post = caixa.closest('[role="listitem"]');
            if (post) {
                post.style.display = 'none';
            }
        }
    });
}

// Observa a página para rodar o filtro sempre que você rolar para baixo
const observer = new MutationObserver(filtrarPosts);
observer.observe(document.body, { childList: true, subtree: true });