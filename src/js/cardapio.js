document.addEventListener('DOMContentLoaded', function() {
    const produtos = [
        {
            nome: 'X bancon',
            descricao: 'Três hamburgueres bovinos (150g) em pão brioche tostado na manteiga, fatias crocantes de bacon e molho especial da casa.',
            preco: 'R$ 49,50',
            imagem: '../img/lanche1.png'
        },
        {
            nome: 'Refrigerante',
            descricao: 'Refrigerante de cola em lata 350ml.',
            preco: 'R$ 5,00',
            imagem: '../img/bebida1.png'
        },
        {
            nome: 'Torta de chocolate',
            descricao: 'Deliciosa torta de chocolate com cobertura de ganache.',
            preco: 'R$ 8,00',
            imagem: '../img/sobremesa1.png'
        },
        {
            nome: 'Cerveja',
            descricao: 'Cerveja gelada, perfeita para acompanhar seu lanche.',
            preco: 'R$ 7,00',
            imagem: '../img/bebida_alcoolica1.png'
        }
    ];

    async function getProdutos (){
        const url = 'http://localhost:8080/v1/lanchonete/produtos'
        const response = await fetch(url)
        const data = await response.json()
        console.log(data);
        return data
    
    }

    const popup = document.getElementById('popup');
    const popupNome = document.getElementById('popup-produto-nome');
    const popupDescricao = document.getElementById('popup-produto-descricao');
    const popupPreco = document.getElementById('popup-produto-preco');
    const popupImagem = document.getElementById('popup-produto-imagem');

    function openPopup(produto) {
        popupNome.textContent = produto.nome;
        popupDescricao.textContent = produto.descricao;
        popupPreco.textContent = produto.preco;
        popupImagem.src = produto.imagem;
        popup.style.display = 'block';
    }

    function closePopup() {
        popup.style.display = 'none';
    }

    function adicionarProdutoAoCarrinho() {
        const produto = {
            nome: popupNome.textContent,
            descricao: popupDescricao.textContent,
            preco: popupPreco.textContent,
            imagem: popupImagem.src
        };
        // Aqui você pode adicionar o produto ao carrinho
        closePopup();
    }

    document.querySelectorAll('.product-box').forEach((box, index) => {
        box.addEventListener('click', () => {
            openPopup(produtos[index]);
        });
    });

    document.querySelector('.close-btn').addEventListener('click', closePopup);
    document.querySelector('.add-to-cart-btn').addEventListener('click', adicionarProdutoAoCarrinho);
});

function adicionarProdutoAoCarrinho() {
    const nome = document.getElementById('popup-produto-nome').textContent;
    const descricao = document.getElementById('popup-produto-descricao').textContent;
    const preco = document.getElementById('popup-produto-preco').textContent;
    const imagem = document.getElementById('popup-produto-imagem').src;

    const produto = { nome, descricao, preco, imagem };

    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    carrinho.push(produto);

    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Redireciona para a página de pedidos
    window.location.href = 'pedidos.html';
}

