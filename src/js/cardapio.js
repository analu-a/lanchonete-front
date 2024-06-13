'use strict'

import { getProdutos } from "./requisicoes_produtos.js"
import { preencherContainer } from "./homeprodutos.js"

export function criarCardCardapio(produto) {

    const product_box = document.createElement('div')
    product_box.classList.add("product_box")

    const product_pic = document.createElement('img')
    product_pic.classList.add("product_pic")
    product_pic.src = produto.fotoProduto

    const product_name = document.createElement('h1')
    product_name.classList.add("product_name")
    product_name.textContent = produto.nomeProduto


    product_box.append(product_pic, product_name)

    return product_box
}

export function preencherCardCardapio() {

    const allCategorias = document.getElementById('allCategorias')
    const produtos = getProdutos()

    produtos.nomeProduto.forEach(produto => {
        
        const cardCardapio = criarCardCardapio(produto)
        allCategorias.appendChild(cardCardapio)
    });
}

export function openPopup(product) {
    document.getElementById('popup-produto-nome').textContent = product.nomeProduto;
    document.getElementById('popup-produto-imagem').src = product.fotoProduto;
    document.getElementById('popup-produto-descricao').textContent = product.descricaoProduto;
    document.getElementById('popup-produto-preco').textContent = product.precoProduto;
    document.getElementById('popup').style.display = 'block';
}

const btn_close_popup = document.getElementById('btn_close_popup')
btn_close_popup.addEventListener('click', () => {
    document.getElementById('popup').style.display = 'none';
})

const close_popup = document.getElementById('close_popup')
close_popup.addEventListener('click', () => {
    document.getElementById('popup').style.display = 'none';
})

// document.querySelectorAll('.product-box').forEach((box, index) => {
//     box.addEventListener('click', async () => {
//         // console.log(box)
//         const produtos = await getProdutos()
//         openPopup(produtos);
//     });
// });

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
btn_add_carrinho.addEventListener('click', adicionarProdutoAoCarrinho);


window.onload = async () =>{

    preencherContainer()
}