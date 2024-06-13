'use strict'

const button = document.getElementById('login');

async function validarLogin() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    let logado = false

    try {
        const users = await fetch('http://localhost:8080/v1/Lanchonete/postarUsuarios/')
        const listUsers = await users.json()
        console.log(listUsers)
        listUsers.nomeFuncionario.forEach((user) => {
            if (email === user.emailFuncionario && senha === user.senhaFuncionario) {
                logado = true
                localStorage.setItem("idusuario", user.id)
                window.location.href = '../pages/home.html'
            }
            console.log(user.email)
            console.log(user.senha)
            console.log(user.id)
        })

        if (!logado) {
            alert('login inválido')
        }
    } catch (error) {
        console.log(error)
    }

}
