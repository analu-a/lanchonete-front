document.getElementById('submitBtn').addEventListener('click', function() {
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var endereco = document.getElementById('endereco').value;
    var telefone = document.getElementById('telefone').value;
    var preferencias = [];
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
    checkboxes.forEach(function(checkbox) {
        preferencias.push(checkbox.value);
    });

    console.log("Nome:", nome);
    console.log("E-mail:", email);
    console.log("Endereço:", endereco);
    console.log("Telefone:", telefone);
    console.log("Preferências:", preferencias);
});
