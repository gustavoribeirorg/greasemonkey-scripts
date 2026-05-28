// ==UserScript==
// @name         Filtro do LinkedIn
// @match        https://www.linkedin.com/feed/*
// @grant        none
// ==/UserScript==

const palavrasChave = ["vaga"];

function analisarPost(elementoTexto) {
    // Sobe na estrutura até encontrar o contêiner principal do post completo
    const postCompleto = elementoTexto.closest('.fie-impression-container') || elementoTexto.closest('article');
    
    if (!postCompleto || postCompleto.getAttribute('data-analisado') === 'true') return;
    postCompleto.setAttribute('data-analisado', 'true');

    const texto = elementoTexto.innerText.toLowerCase();
    const temPalavra = palavrasChave.some(palavra => texto.includes(palavra));

    // Se não tiver a palavra-chave, oculta a estrutura inteira (post e comentários acoplados)
    if (!temPalavra) {
        postCompleto.style.display = 'none';
        
        // Remove também elementos irmãos problemáticos que possam ser os comentários soltos
        if (postCompleto.nextElementSibling && postCompleto.nextElementSibling.classList.contains('feed-shared-update-v2__comments-container')) {
            postCompleto.nextElementSibling.style.display = 'none';
        }
    }
}

// Observador para analisar o texto assim que ele surge na tela
const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
        // Foca diretamente nas caixas de texto que você identificou
        const caixasDeTexto = document.querySelectorAll('.feed-shared-inline-show-more-text');
        caixasDeTexto.forEach(analisarPost);
    });
});

// Inicia a observação do feed
observer.observe(document.body, { childList: true, subtree: true });
