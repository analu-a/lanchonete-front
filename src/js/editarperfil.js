document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contato-form");
    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("email");
    const fotoInput = document.getElementById("foto-upload");
    const fotoUrlInput = document.getElementById("foto-url");
    const telefoneInput = document.getElementById("telefone");
    const enderecoInput = document.getElementById("endereco");
    const adicionarBtn = document.getElementById("adicionar-btn");
    const salvarBtn = document.getElementById("salvar-btn");
    const fotoPreview = document.getElementById("foto-preview");
    const fotoPlaceholder = document.getElementById("foto-placeholder");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = nomeInput.value;
        const email = emailInput.value;
        const telefone = telefoneInput.value;
        const endereco = enderecoInput.value;

        if (fotoInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const fotoUrl = e.target.result;
                fotoPreview.src = fotoUrl;
                fotoPreview.classList.remove("hidden");
                fotoPlaceholder.classList.add("hidden");
                fotoUrlInput.value = fotoUrl; 
                fotoUrlInput.dispatchEvent(new Event('input')); 
            };
            reader.readAsDataURL(fotoInput.files[0]);
        }

        adicionarBtn.style.display = "none";
        salvarBtn.style.display = "block";

        nomeInput.value = nome;
        emailInput.value = email;
        telefoneInput.value = telefone;
        enderecoInput.value = endereco;
    });

    salvarBtn.addEventListener("click", function() {
        adicionarBtn.style.display = "block";
        salvarBtn.style.display = "none";
    });
});
