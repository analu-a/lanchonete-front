'use strict'

import { getProdutos } from "./requisicoes_produtos.js"

export function createProductCard(product) {

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
    pPreco.textContent = product.precoProduto;
    pPreco.classList.add('preco');

    article.appendChild(h1);
    article.appendChild(pDescricao);
    article.appendChild(pPreco);

    card.appendChild(img);
    card.appendChild(article);

    card.addEventListener('click', () => {
        openPopup(product);
    });

    return card;
};

export async function preencherContainer() {

    const container = document.getElementById('card')
    const produtos = await getProdutos()

    produtos.nomeProduto.forEach(produto => {

        console.log(produto);


        const card = createProductCard(produto)
        container.appendChild(card)
    });

}

export function adicionarProdutoAoCarrinho() {
    const nomeProduto = document.getElementById('popup-produto-nome').textContent;
    const descricaoProduto = document.getElementById('popup-produto-descricao').textContent;
    const precoProduto = document.getElementById('popup-produto-preco').textContent;
    const fotoProduto = document.getElementById('popup-produto-imagem').src;

    let produto = {
        nomeProduto,
        descricaoProduto,
        precoProduto,
        fotoProduto
    };

    let carrinho = []

    carrinho = JSON.parse(localStorage.getItem('carrinho'))

    carrinho.push(produto);

    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    document.getElementById('popup').style.display = 'none';
}

const btn_add_carrinho = document.getElementById('btn_add_carrinho')
btn_add_carrinho.addEventListener('click', adicionarProdutoAoCarrinho)

export function openPopup(product) {
    document.getElementById('popup-produto-nome').textContent = product.nomeProduto;
    document.getElementById('popup-produto-imagem').src = product.fotoProduto;
    document.getElementById('popup-produto-descricao').textContent = product.descricaoProduto;
    document.getElementById('popup-produto-preco').textContent = product.precoProduto;
    document.getElementById('popup').style.display = 'block';
}

const close_popup = document.getElementById('close_popup')
close_popup.addEventListener('click', () => {
    document.getElementById('popup').style.display = 'none';
})

window.onload = async () => {
    const produtos = await getProdutos()
    preencherContainer()

}