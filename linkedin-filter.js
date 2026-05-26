// ==UserScript==
// @name         Filtro do LinkedIn
// @match        https://www.linkedin.com/feed/*
// @grant        none
// ==/UserScript==

const palavrasChave = ["vaga"];

function filtrarPosts() {
    // Busca apenas as publicações que ainda não foram analisadas pelo script
    const posts = document.querySelectorAll('[role="listitem"]:not([data-analisado="true"])');

    posts.forEach(post => {
        // Marca o post para que ele seja ignorado na próxima execução
        post.setAttribute('data-analisado', 'true');

        const caixaDeTexto = post.querySelector('[data-testid="expandable-text-box"]');

        // Se não houver caixa de texto (post apenas com imagem/vídeo), oculta
        if (!caixaDeTexto) {
            post.style.display = 'none';
            return; 
        }

        const texto = caixaDeTexto.innerText.toLowerCase();
        const temPalavra = palavrasChave.some(palavra => texto.includes(palavra));

        // Se não encontrar as palavras-chave, oculta a publicação inteira
        if (!temPalavra) {
            post.style.display = 'none';
        }
    });
}

// Executa o filtro continuamente a cada 1 segundo (evita travamentos)
setInterval(filtrarPosts, 1000);
