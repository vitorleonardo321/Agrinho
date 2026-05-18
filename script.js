// ==========================================
// AGRO FORTE - FUTURO SUSTENTÁVEL
// Script do Simulador de Produtividade
// ==========================================

// ===============================
// MAPEAMENTO DOS ELEMENTOS DOM
// ===============================
const formulario = document.querySelector(".form-simulador");
const inputHectares = document.getElementById("hectares");
const resultado = document.getElementById("resultado");

// ===============================
// EVENTO DE SUBMIT DO FORMULÁRIO
// ===============================
formulario.addEventListener("submit", function (event) {

    // Impede o recarregamento padrão da página
    event.preventDefault();

    // Captura e converte o valor digitado
    const hectares = Number(inputHectares.value);

    // ===============================
    // VALIDAÇÃO SIMPLES
    // ===============================
    if (hectares <= 0 || isNaN(hectares)) {

        resultado.innerHTML = `
            <div class="mensagem-erro">
                <p>
                    ⚠️ Por favor, informe uma quantidade válida de hectares.
                </p>
            </div>
        `;

        resultado.style.color = "#c1121f";
        return;
    }

    // ===============================
    // CÁLCULOS DO SIMULADOR
    // ===============================

    // Simulação de CO2 reduzido
    const reducaoCO2 = hectares * 4;

    // Simulação de água economizada
    const aguaEconomizada = hectares * 1500;

    // ===============================
    // FORMATAÇÃO DOS NÚMEROS
    // ===============================
    const aguaFormatada = aguaEconomizada.toLocaleString("pt-BR");
    const co2Formatado = reducaoCO2.toLocaleString("pt-BR");

    // ===============================
    // EXIBIÇÃO DINÂMICA DOS RESULTADOS
    // ===============================
    resultado.innerHTML = `
        <div class="resultado-card">
            <h3>🌱 Resultado da Simulação</h3>

            <p>
                Com <strong>${hectares}</strong> hectares utilizando o modelo
                <strong>Agro Forte</strong>, você produz com eficiência e
                alcança os seguintes resultados ambientais:
            </p>

            <ul class="lista-resultados">
                <li>
                    💧 Poupa cerca de
                    <strong>${aguaFormatada} litros de água</strong>
                    através de sensores de precisão.
                </li>

                <li>
                    🌍 Reduz o impacto em
                    <strong>${co2Formatado} toneladas de CO₂</strong>
                    no solo.
                </li>
            </ul>

            <p class="mensagem-final">
                Tecnologia e sustentabilidade caminhando juntas no campo.
            </p>
        </div>
    `;

    // Cor padrão de sucesso
    resultado.style.color = "#1b4332";

    // ===============================
    // LIMPA O CAMPO APÓS O CÁLCULO
    // ===============================
    inputHectares.value = "";

});