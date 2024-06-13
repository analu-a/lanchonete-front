export async function getProdutos() {

    const url = `http://localhost:8080/v1/lanchonete/produtos`
    const response = await fetch(url)
    const data = await response.json()

    return data
}