export async function getPedidos (){
    const url = 'http://localhost:8080/v1/lanchonete/produtos'
    const response = await fetch(url)
    const data = await response.json()
    // console.log(data);
    return data
}