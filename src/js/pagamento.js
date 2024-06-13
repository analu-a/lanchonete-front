document.addEventListener('DOMContentLoaded', () => {
    const pagamentoContainer = document.getElementById('pagamento-container');
    const totalContainer = document.getElementById('total-container');
    const carrinhoParaPagamento = JSON.parse(localStorage.getItem('carrinhoParaPagamento')) || [];
    const popupConfirmacao = document.getElementById('popup-confirmacao');

    async function getProdutos (){
        const url = 'http://localhost:8080/v1/lanchonete/produtos'
        const response = await fetch(url)
        const data = await response.json()
        console.log(data);
        return data
    
    }
getProdutos()

    const createPedidoCard = (product) => {
        console.log(product);
        
        const card = document.createElement('div');
        card.classList.add('bg-[#622c05]', 'h-28', 'w-[180vh]', 'rounded-lg', 'translate-x-10', 'flex', 'items-center', 'mb-8');

        card.innerHTML = `
            <img src="${product.fotoProduto}" alt="img do card de pedidos" class="size-[90px]" style="transform: translate(10px)">
            <article class="p-5 text-white ">
                <h1 class="font-medium space-y-4">${product.nomeProduto}</h1>
                <p class="text-orange-50">${product.descricaoProduto}</p>
                <p>${product.preco}</p>
            </article>
        `;

        return card;
    };

    const calcularTotal = () => {
        let total = 0;
        carrinhoParaPagamento.forEach((product) => {
            total += parseFloat(product.preco);
        });
        return total;
    };

    const carregarPedidosParaPagamento = () => {
        pagamentoContainer.innerHTML = '';
        if (carrinhoParaPagamento.length === 0) {
            pagamentoContainer.innerHTML = '<p class="text-center text-[#622c05] text-xl">Seu carrinho está vazio.</p>';
        } else {
            carrinhoParaPagamento.forEach((product) => {
                const pedidoCard = createPedidoCard(product);
                pagamentoContainer.appendChild(pedidoCard);
            });
        }
        const total = calcularTotal().toFixed(2);
        totalContainer.textContent = `Total do Pedido: R$ ${total}`;
    };

    const abrirPopupConfirmacao = () => {
        popupConfirmacao.style.display = 'block';
    };

    const fecharPopupConfirmacao = () => {
        popupConfirmacao.style.display = 'none';
    };

    const finalizarPedido = () => {
        alert('Pedido finalizado com sucesso!');
        fecharPopupConfirmacao();
    };

    const finalizarPagamentoBtn = document.getElementById('finalizar-pagamento-btn');

      // Evento de clique no botão de finalizar pagamento
    finalizarPagamentoBtn.addEventListener('click', () => {
        abrirPopupConfirmacao();
    });

    // Evento de clique no botão "Cancelar" do popup de confirmação
    document.getElementById('cancelar-btn').addEventListener('click', () => {
        fecharPopupConfirmacao();
    });

    // Evento de clique no botão "Finalizar" do popup de confirmação
    document.getElementById('finalizar-btn').addEventListener('click', () => {
        finalizarPedido();
    });

    carregarPedidosParaPagamento();
    
});
