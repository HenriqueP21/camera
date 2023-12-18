var mediaStream;

const downloadLink = document.createElement('a');
downloadLink.textContent = 'Clique aqui para baixar';
document.body.appendChild(downloadLink);
downloadLink.style.display = 'block';
downloadLink.style.margin = '30px';
downloadLink.style.textAlign = 'center';

function abrirCamera() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function (stream) {
            mediaStream = stream;
            const areaVideo = document.getElementById('camera');
            areaVideo.srcObject = stream;
        })
        .catch(function (error) {
            console.error('Erro ao acessar a câmera:', error);
        });
}

function tirarFoto() {
    const areaVideo = document.getElementById('camera');
    const canvas = document.createElement('canvas');
    canvas.width = areaVideo.videoWidth;
    canvas.height = areaVideo.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(areaVideo, 0, 0, canvas.width, canvas.height);

    const imagedataURL = canvas.toDataURL();

    const fotoDiv = document.getElementById('foto');
    fotoDiv.style.backgroundImage = `url(${imagedataURL})`;

    localStorage.setItem('imagemDataURL', imagedataURL);

    downloadLink.href = imagedataURL;
    downloadLink.download = 'foto.png';
}

function apagarFoto() {
    localStorage.removeItem('imagemDataURL');

    const fotoDiv = document.getElementById('foto');
    fotoDiv.style.backgroundImage = 'url("foto.png")';

    downloadLink.removeAttribute('href');
    downloadLink.removeAttribute('download');
}

function fechar() {
    navigator.mediaDevices.getUserMedia({ video: false });
    const areaVideo = document.getElementById('camera');
    areaVideo.srcObject = null;
    mediaStream = null;
}

function verificarImagemLocalStorage() {
    const imagemArmazenada = localStorage.getItem('imagemDataURL');
    if (imagemArmazenada) {
        const fotoDiv = document.getElementById('foto');
        fotoDiv.style.backgroundImage = `url(${imagemArmazenada})`;
        downloadLink.href = imagemArmazenada;
        downloadLink.download = 'foto.png';
    }
}

verificarImagemLocalStorage();
