let amigos = [];

function agregarAmigo() {
    let amigoInput = document.getElementById('amigo');
    let nombres = amigoInput.value.split(',').map(nombre => nombre.trim());

    if (nombres.length === 0 || nombres[0] === '') {
        alert('Por favor, escribe un nombre válido.');
        return;
    }

    nombres.forEach(nombreAmigo => {
        if (nombreAmigo !== '' && !amigos.map(a => a.toLowerCase()).includes(nombreAmigo.toLowerCase())) {
            amigos.push(nombreAmigo);
        } else if (nombreAmigo !== '') {
            alert(`El nombre "${nombreAmigo}" ya ha sido agregado.`);
        }
    });

    actualizarListaAmigos();
    amigoInput.value = '';
    amigoInput.focus();
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert('Agrega al menos 2 amigos para poder realizar el sorteo.');
        return;
    }

    const indiceSorteado = Math.floor(Math.random() * amigos.length);
    const amigoSorteado = amigos[indiceSorteado];

    let resultado = document.getElementById('resultado');
    resultado.innerHTML = `<p>Tu amigo secreto es: ${amigoSorteado}</p>`;

    const rect = resultado.getBoundingClientRect();
    const x = (rect.left + rect.right) / 2 / window.innerWidth;
    const y = (rect.top + rect.bottom) / 2 / window.innerHeight;

    confetti({
        origin: { x, y }
    });
}

function reiniciar() {
    const inputSection = document.querySelector('.input-section');
    inputSection.classList.add('restarting');

    setTimeout(() => {
        amigos = [];
        document.getElementById('listaAmigos').innerHTML = '';
        document.getElementById('resultado').innerHTML = '';
        document.getElementById('amigo').value = '';
        document.getElementById('totalAmigos').textContent = '';
        inputSection.classList.remove('restarting');
    }, 500); // 500ms to match the animation duration
}

function actualizarListaAmigos() {
    let lista = document.getElementById('listaAmigos');
    let totalAmigos = document.getElementById('totalAmigos');
    lista.innerHTML = '';

    for (let i = 0; i < amigos.length; i++) {
        let item = document.createElement('li');
        item.textContent = `${i + 1}. ${amigos[i]}`;
        lista.appendChild(item);
    }

    totalAmigos.textContent = `Total de amigos: ${amigos.length}`;
}

document.getElementById('amigo').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        agregarAmigo();
    }
});
