loginForm = document.getElementById('loginForm')
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let login = document.getElementById("login");
    let senha = document.getElementById("senha");

    if (login.value == "" || senha.value == "") {
        alert("Insira um usuario e uma senha");
        location.reload()
    } else {

        fetch('http://localhost/api/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ login: login.value, senha: senha.value })
        }).then(
            async function (resposta) {
                resposta = await resposta.json()
                console.log(resposta)
                if (resposta.status == 'sucesso') {
                    localStorage.setItem('token', `Bearer ${resposta.mensagem}`)
                    location.href = 'pages/gestao'
                }
                else { alert('Login ou senha incorretos') }
            }
        )
    }
});

