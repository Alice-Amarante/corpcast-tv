// ============================================================
// CorpCastTV — JavaScript do painel
// ============================================================

// ---------- 1. MODAL (abrir e fechar) ----------
const modal = document.getElementById('modal');
const btnNovoAnuncio = document.getElementById('btnNovoAnuncio');
const btnCancelar = document.getElementById('btnCancelar');

btnNovoAnuncio.addEventListener('click', () => {
    modal.classList.add('show');
});

btnCancelar.addEventListener('click', () => {
    modal.classList.remove('show');
});

// Fechar modal clicando fora dele (no overlay)
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});

// Fechar modal apertando ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modal.classList.remove('show');
    }
});

// ---------- 2. CONTADOR DE TEMPO DAS TVs ----------
// Pega todos os elementos <strong> dentro de .tv-footer
// (onde está o tempo restante de cada TV)
const tempos = document.querySelectorAll('.tv-footer strong');

// Tempo inicial (em segundos) de cada TV — só pra começar
let temposSegundos = [13, 22, 8];

// Função que atualiza os tempos na tela
function atualizarTempos() {
    tempos.forEach((el, i) => {
        // Formata como 00:XXs
        const seg = temposSegundos[i];
        el.textContent = `00:${String(seg).padStart(2, '0')}s`;
    });
}

// Roda a cada 1 segundo
setInterval(() => {
    temposSegundos = temposSegundos.map((seg, i) => {
        // Diminui 1 segundo
        let novo = seg - 1;

        // Se chegou a 0, reseta pro tempo original
        // (só pra dar sensação de "sempre rodando")
        if (novo < 0) {
            const temposOriginais = [13, 22, 8];
            novo = temposOriginais[i];
        }

        return novo;
    });

    atualizarTempos();
}, 1000);

// Roda uma vez ao carregar pra formatar bonito
atualizarTempos();

// ---------- 3. INSERIR NA FILA (simulação) ----------
// Pega o botão "Inserir na Fila" dentro do modal
// (é o último botão .btn-primary dentro do modal)
const btnInserir = modal.querySelector('.modal-actions .btn-primary');

btnInserir.addEventListener('click', () => {
    // Pega o título digitado (opcional)
    const titulo = modal.querySelector('input[type="text"]').value;

    if (!titulo.trim()) {
        alert('Digite um título para o anúncio.');
        return;
    }

    alert(`✅ Anúncio "${titulo}" inserido na fila!\n\n(Na versão final, isso seria enviado ao servidor da AWS.)`);

    // Limpa o campo e fecha o modal
    modal.querySelector('input[type="text"]').value = '';
    modal.classList.remove('show');
});