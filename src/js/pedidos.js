const pedidosContainer = document.getElementById('pedidos-container');
const limparCarrinhoBtn = document.getElementById('limpar-carrinho-btn');
const prosseguirBtn = document.getElementById('prosseguir-btn');
const popupConfirmacao = document.getElementById('popup-confirmacao');

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];


const createPedidoCard = (product, index) => {
    // console.log(product)

    const card = document.createElement('div');
    card.classList.add('bg-[#622c05]', 'h-28', 'w-[180vh]', 'rounded-lg', 'translate-x-10', 'flex', 'items-center', 'mb-8');

    card.innerHTML = `
            <img src="${product.fotoProduto}" alt="img do card de pedidos" class="size-[90px]" style="transform: translate(10px)">
            <article class="p-5 text-white ">
                <h1 class="font-medium space-y-4">${product.nomeProduto}</h1>
                <p class="text-orange-50">${product.descricaoProduto}</p>
                <p>${product.preco}</p>
            </article>
            <button class="ml-auto mr-5 bg-orange-800 text-white px-3 py-1 rounded" onclick="removerPedido(${index})">Excluir pedido</button>
        `;

    return card;
};


const removerPedido = (index) => {
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarPedidos();
};

const limparCarrinho = () => {
    localStorage.removeItem('carrinho');
    carrinho = [];
    carregarPedidos();
};

const carregarPedidos = () => {
    pedidosContainer.innerHTML = '';
    if (carrinho.length === 0) {
        pedidosContainer.innerHTML = '<p class="text-center text-[#622c05] text-xl">Seu carrinho está vazio.</p>';
    } else {
        carrinho.forEach((product, index) => {


            const pedidoCard = createPedidoCard(product, index);
            pedidosContainer.appendChild(pedidoCard);
        });
    }
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

limparCarrinhoBtn.addEventListener('click', limparCarrinho);

prosseguirBtn.addEventListener('click', () => {
    if (carrinho.length > 0) {
        localStorage.setItem('carrinhoParaPagamento', JSON.stringify(carrinho));
        console.log('Produtos no carrinhoParaPagamento:', JSON.parse(localStorage.getItem('carrinhoParaPagamento')));
        window.location.href = 'pagamento.html';
    } else {
        alert('Seu carrinho está vazio.');
    }
});

document.getElementById('cancelar-btn').addEventListener('click', fecharPopupConfirmacao);

document.getElementById('finalizar-btn').addEventListener('click', finalizarPedido);

carregarPedidos();

window.removerPedido = removerPedido;

window.onload = async () => {

}