/**
 * ECOAGRO - LANDING PAGE INTERATIVA
 * Script para "Agro Forte e Futuro Sustentável"
 * * Desenvolvido exclusivamente com JavaScript Puro (Vanilla JS).
 * Foco em performance, acessibilidade e otimização de renderização.
 */

(function () {
    'use strict';

    // Aguarda o DOM estar totalmente carregado para iniciar os módulos
    document.addEventListener('DOMContentLoaded', () => {
        initMenuMobile();
        initScrollReveal();
        initContadoresAnimados();
        initCardsAcordeao();
    });

    /**
     * MODULE 1: Menu Mobile Responsivo
     * Controla a abertura e fechamento do menu em dispositivos móveis.
     */
    function initMenuMobile() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        // Validação preventiva para evitar erros caso o elemento não exista em alguma página
        if (!menuToggle || !navLinks) return;

        menuToggle.addEventListener('click', (event) => {
            // Evita comportamentos padrão de clique caso seja um link/botão interno
            event.preventDefault();
            
            // Altera o estado de ativação do menu
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            
            // Alterna a classe que dispara a transição suave no CSS
            navLinks.classList.toggle('active');
        });

        // Fecha o menu automaticamente ao clicar em qualquer link interno (UX de navegação)
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /**
     * MODULE 2: Scroll Reveal (Animação de Entrada)
     * Detecta a rolagem da página de forma performática usando IntersectionObserver.
     */
    function initScrollReveal() {
        const hiddenElements = document.querySelectorAll('.hidden-element');
        
        if (hiddenElements.length === 0) return;

        // Configurações do observador de interseção
        const observerOptions = {
            root: null, // Usa a viewport do navegador como referência
            rootMargin: '0px',
            threshold: 0.15 // Dispara a animação quando 15% do elemento estiver visível
        };

        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                // Se o elemento entrou na área visível da tela
                if (entry.isIntersecting) {
                    // Adiciona a classe CSS que executa a transição de fade/slide
                    entry.target.classList.add('show-element');
                    // Remove o elemento do observador para não gastar processamento repetidas vezes
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(revealCallback, observerOptions);

        // Vincula todos os elementos escondidos ao observador
        hiddenElements.forEach(element => observer.observe(element));
    }

    /**
     * MODULE 3: Contadores Numéricos Animados
     * Faz os números de impacto subirem de 0 ao alvo de forma fluída.
     */
    function initContadoresAnimados() {
        const metricsContainer = document.querySelector('.metrics-container');
        const counters = document.querySelectorAll('.counter-number');

        if (!metricsContainer || counters.length === 0) return;

        // Função responsável por fazer a contagem progressiva individual
        const dispararContagem = (counter) => {
            // Converte o valor do atributo string "data-target" para número absoluto
            const target = +counter.getAttribute('data-target');
            const duracaoTotal = 2000; // Tempo total da animação em milissegundos (2 segundos)
            const frameRate = 1000 / 60; // Baseado em aproximadamente 60 frames por segundo
            const totalPassos = duracaoTotal / frameRate;
            const incremento = target / totalPassos;

            let valorAtual = 0;

            const atualizarNumero = () => {
                valorAtual += incremento;

                if (valorAtual < target) {
                    // Atualiza o texto aproximando para o número inteiro mais próximo
                    counter.innerText = Math.ceil(valorAtual).toLocaleString('pt-BR');
                    // Recursividade otimizada via requestAnimationFrame (garante suavidade de tela)
                    requestAnimationFrame(atualizarNumero);
                } else {
                    // Garante que o número termine exatamente no valor final alvo
                    counter.innerText = target.toLocaleString('pt-BR');
                }
            };

            atualizarNumero();
        };

        // Observer dedicado para disparar a animação apenas quando a seção de métricas estiver na tela
        const metricsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Dispara a contagem para cada um dos números
                    counters.forEach(counter => dispararContagem(counter));
                    // Desativa o observer para evitar re-animações ao subir/descer a página
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 }); // Exige 30% da seção visível para iniciar

        metricsObserver.observe(metricsContainer);
    }

    /**
     * MODULE 4: Cards Acordeão/Expansíveis
     * Gerencia a expansão e o fechamento dinâmico dos detalhes dos pilares agroecológicos.
     */
    function initCardsAcordeao() {
        const cards = document.querySelectorAll('.card-pilar');

        if (cards.length === 0) return;

        cards.forEach(card => {
            card.addEventListener('click', () => {
                const extraContent = card.querySelector('.card-extra');
                
                if (!extraContent) return;

                // Verifica se o card clicado já está ativo
                const estaAtivo = extraContent.classList.contains('active');

                // COMPORTAMENTO ACORDEÃO: Fecha todos os outros antes de abrir o atual
                cards.forEach(outroCard => {
                    const outroConteudo = outroCard.querySelector('.card-extra');
                    if (outroConteudo && outroConteudo !== extraContent) {
                        outroConteudo.classList.remove('active');
                    }
                });

                // Alterna o estado do card atual
                if (estaAtivo) {
                    extraContent.classList.remove('active');
                } else {
                    extraContent.classList.add('active');
                }
            });
        });
    }

})();