document.addEventListener('DOMContentLoaded', init);

function init() {
    // const novidadesContainer = document.getElementById('novidades');
    // const favoritosContainer = document.getElementById('favoritos');

    // Simulação de dados recebidos do backend
    // const novidades = [
    //     {
    //         id: 1,
    //         nome: 'X-bacon',
    //         descricao: 'Três hamburgueres bovinos (150g) em pão brioche tostado na manteiga, fatias crocantes de bacon e molho especial da casa.',
    //         preco: 'R$ 49,50',
    //         imagem: 'https://via.placeholder.com/150' // Exemplo de URL válida
    //     },
    //     {
    //         id: 2,
    //         nome: 'X-salada',
    //         descricao: 'Hamburguer bovino (150g), alface, tomate, cebola roxa e molho especial da casa.',
    //         preco: 'R$ 29,50',
    //         imagem: 'https://via.placeholder.com/150' // Exemplo de URL válida
    //     }
    // ];

    // const favoritos = [
    //     {
    //         id: 1,
    //         nome: 'Coxinha de Frango',
    //         descricao: 'Peito de frango, azeite extra virgem, óleo de girassol, ovo pasteurizado, alho, salsinha fresca, sal rosa, orégano e especiarias.',
    //         preco: 'R$ 3,00 Unid.',
    //         imagem: 'https://via.placeholder.com/150' // Exemplo de URL válida
    //     },
    //     {
    //         id: 2,
    //         nome: 'Bolinho de Bacalhau',
    //         descricao: 'Bacalhau, batata, salsa, cebola, alho e especiarias.',
    //         preco: 'R$ 5,00 Unid.',
    //         imagem: 'https://via.placeholder.com/150' // Exemplo de URL válida
    //     }
    // ];

    async function getProdutos (){
        const url = 'http://localhost:8080/v1/lanchonete/produtos'
        const response = await fetch(url)
        const data = await response.json()
        console.log(data);
        return data
    
    }

    // Função para criar um card de produto
    const createProductCard = (product) => {

  

        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = product.fotoProduto;
        img.alt = `imagem do ${product.nomeProduto}`;

        const article = document.createElement('article');

        const h1 = document.createElement('h1');
        h1.textContent = product.nomeProduto;

        const pDescricao = document.createElement('p');
        pDescricao.textContent = product.descricaoProduto;

        const pPreco = document.createElement('p');
        pPreco.textContent = product.preco;
        pPreco.classList.add('preco');

        article.appendChild(h1);
        article.appendChild(pDescricao);
        article.appendChild(pPreco);

        card.appendChild(img);
        card.appendChild(article);

        // Adiciona evento de clique ao card
        card.addEventListener('click', () => {
            openPopup(product);
        });

        return card;
    };

    async function preencherContainer() {

        const container = document.getElementById('card')
        const produtos = await getProdutos()
        const produtoObject = produtos.nomeProduto
        console.log(produtoObject);
        produtoObject.forEach(produtos => {
            const card = createProductCard(produtos)
            console.log(card);
            container.appendChild(card)
        });
    
    }
    
    preencherContainer()
    

    // Limpa os containers antes de adicionar os produtos
    // novidadesContainer.innerHTML = '';
    // favoritosContainer.innerHTML = '';

    // Adiciona os produtos aos containers

    // novidades.forEach(product => {
    //     const productCard = createProductCard(product);
    //     novidadesContainer.appendChild(productCard);
    // });

    // favoritos.forEach(product => {
    //     const productCard = createProductCard(product);
    //     favoritosContainer.appendChild(productCard);
    // });
}

function adicionarProdutoAoCarrinho() {
    const nomeProduto = document.getElementById('popup-produto-nome').textContent;
    const descricaoProduto = document.getElementById('popup-produto-descricao').textContent;
    const preco = document.getElementById('popup-produto-preco').textContent;
    const fotoProduto= document.getElementById('popup-produto-imagem').src;

    const produto = { nomeProduto, descricaoProduto, preco, fotoProduto};

    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    carrinho.push(produto);

    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Redireciona para a página de pedidos
    window.location.href = 'pedidos.html';
}

function openPopup(product) {
    document.getElementById('popup-produto-nome').textContent = product.nomeProduto;
    document.getElementById('popup-produto-imagem').src = product.fotoProduto;
    document.getElementById('popup-produto-descricao').textContent = product.descricaoProduto;
    document.getElementById('popup-produto-preco').textContent = product.preco;
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

