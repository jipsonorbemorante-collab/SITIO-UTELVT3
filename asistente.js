/* ==============================================================
   1. INYECTAR AUTOMÁTICAMENTE LOS DOS CHATBOX EN LA PÁGINA
   ============================================================== */
const htmlAsistentes = `
    <!-- CHATBOT DE TEXTO -->
    <button class="chatbot-btn" onclick="toggleChat()">💬</button>
    <div class="chat-window" id="chatWindow">
        <div class="chat-header"><span>Asistente UTLVTE</span><button onclick="toggleChat()" style="background:none;border:none;color:white;cursor:pointer;">✕</button></div>
        <div class="chat-body" id="chatBody"><div class="message bot-msg">¡Hola! Bienvenido al portal oficial. ¿En qué puedo ayudarte?</div></div>
        <div class="chat-footer">
            <input type="text" id="userInput" placeholder="Escribe tu consulta..." onkeypress="if(event.key==='Enter')sendMessage()">
            <button onclick="sendMessage()">Enviar</button>
        </div>
    </div>

    <!-- CHATBOX DE AUDIO -->
    <button class="voicebot-btn" onclick="toggleVoiceChat()" title="Asistente por Voz">🎙️</button>
    <div class="voice-window" id="voiceWindow">
        <div class="voice-header">
            <span>Asistente de Audio UTLVTE</span>
            <button onclick="toggleVoiceChat()" style="background:none;border:none;color:white;cursor:pointer;">✕</button>
        </div>
        <div class="voice-body" id="voiceBody">
            <div class="message bot-msg">Pulsa el botón y háblame:<br>• <b>Colores (toda la página):</b> azul, rojo, verde, morado, naranja, celeste, amarillo, dorado, rosado, café, gris, oscuro...<br>• <b>Idiomas:</b> español, inglés, portugués, francés, italiano<br>• <b>Secciones:</b> inicio, historia, nosotros, servicios, carreras, contacto, juego, emociones, promedio<br>• <b>Reiniciar:</b> "volver al estado normal"</div>
        </div>
        <div class="voice-footer">
            <button id="btnHablar" class="btn-hablar" onclick="activarVoz()">🎤 Pulsar para hablar</button>
        </div>
    </div>
`;

document.body.insertAdjacentHTML('beforeend', htmlAsistentes);

/* ==============================================================
   2. LÓGICA DEL CHATBOT DE TEXTO
   ============================================================== */
function toggleChat() {
    const chat = document.getElementById('chatWindow');
    chat.style.display = (chat.style.display === 'flex') ? 'none' : 'flex';
}

const baseDeDatosBot = [
    {
        palabras: ['admision', 'admisión', 'cupo', 'requisito', 'inscribir', 'postular', 'ingreso', 'inscripcion'],
        respuesta: 'El proceso de admisión requiere: copia de cédula, título de bachiller y registro en la plataforma oficial de la UTLVTE.'
    },
    {
        palabras: ['carrera', 'carreras', 'oferta', 'estudiar', 'profesion', 'titulos'],
        respuesta: 'Se ofrecen las carreras de Administracion de Empresas, Contabilidad y Auditoria, Tecnologias de la Información (TICS).'
    },
    {
        palabras: ['horarios', 'clases', 'jornada', 'turno', 'seccion'],
        respuesta: 'Las clases se imparten en jornadas matutina de 7:30 a.m a 12:30 a.m y vespertina de 13:00 p.m a 18:00 p.m. Los horarios oficiales se publican antes de iniciar el ciclo.'
    },
    {
        palabras: ['ubicacion', 'direccion', 'donde', 'llegar', 'mapa', 'queda'],
        respuesta: 'Nos encontramos en el Km 1.5 Vía La Villegas, Cantón La Concordia, Santo Domingo de los Tsáchilas, Ecuador.'
    },
    {
        palabras: ['costo', 'precio', 'pagar', 'cuota', 'pension', 'gratis', 'valor'],
        respuesta: 'Estudiar en la UTLVTE no tiene costo, es una universidad pública y de educación superior totalmente gratuita.'
    },
    {
        palabras: ['contacto', 'telefono', 'correo', 'email', 'secretaria', 'atencion'],
        respuesta: 'Puedes escribir al correo: admision.santodomingo@ute-lvt.edu.ec o llamar al (02) 275-0000.'
    }
];

function getBotResponse(input) {
    const textoUsuario = input.toLowerCase();
    for (let item of baseDeDatosBot) {
        if (item.palabras.some(palabra => textoUsuario.includes(palabra))) {
            return item.respuesta;
        }
    }
    return 'Lo siento, no reconozco esa consulta. Puedes preguntarme sobre: admisiones, carreras, horarios, ubicación, costos o contactos.';
}

function sendMessage() {
    const input = document.getElementById('userInput');
    const text = input.value.trim();
    if (!text) return;

    const chatBody = document.getElementById('chatBody');
    chatBody.innerHTML += `<div class="message user-msg">${text}</div>`;
    input.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
        const respuestaBot = getBotResponse(text);
        chatBody.innerHTML += `<div class="message bot-msg">${respuestaBot}</div>`;
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 500);
}

/* ==============================================================
   3. LÓGICA DEL CHATBOX DE AUDIO (CON MEMORIA ENTRE PÁGINAS)
   ============================================================== */
let idiomaPagina = localStorage.getItem('utlvte_idioma') || 'es';

const configIdiomas = {
    es: {
        speechLang: 'es-EC',
        sub1: 'UNIVERSIDAD TÉCNICA "LUIS VARGAS TORRES" DE ESMERALDAS',
        sub2: 'SEDE SANTO DOMINGO - LA CONCORDIA',
        footer: '© 2026 Universidad Técnica Luis Vargas Torres de Esmeraldas - Sede Santo Domingo',
        btnHablar: '🎤 Pulsar para hablar',
        confirmacion: 'Idioma cambiado a español.'
    },
    en: {
        speechLang: 'en-US',
        sub1: 'TECHNICAL UNIVERSITY "LUIS VARGAS TORRES" OF ESMERALDAS',
        sub2: 'SANTO DOMINGO - LA CONCORDIA CAMPUS',
        footer: '© 2026 Technical University Luis Vargas Torres of Esmeraldas - Santo Domingo Campus',
        btnHablar: '🎤 Press to speak',
        confirmacion: 'Language changed to English.'
    },
    pt: {
        speechLang: 'pt-BR',
        sub1: 'UNIVERSIDADE TÉCNICA "LUIS VARGAS TORRES" DE ESMERALDAS',
        sub2: 'CAMPUS SANTO DOMINGO - LA CONCORDIA',
        footer: '© 2026 Universidade Técnica Luis Vargas Torres de Esmeraldas - Campus Santo Domingo',
        btnHablar: '🎤 Pressione para falar',
        confirmacion: 'Idioma alterado para português.'
    },
    fr: {
        speechLang: 'fr-FR',
        sub1: 'UNIVERSITÉ TECHNIQUE "LUIS VARGAS TORRES" D\'ESMERALDAS',
        sub2: 'CAMPUS SANTO DOMINGO - LA CONCORDIA',
        footer: '© 2026 Université Technique Luis Vargas Torres d\'Esmeraldas - Campus Santo Domingo',
        btnHablar: '🎤 Appuyez pour parler',
        confirmacion: 'Langue changée en français.'
    },
    it: {
        speechLang: 'it-IT',
        sub1: 'UNIVERSITÀ TECNICA "LUIS VARGAS TORRES" DI ESMERALDAS',
        sub2: 'SEDE SANTO DOMINGO - LA CONCORDIA',
        footer: '© 2026 Università Tecnica Luis Vargas Torres di Esmeraldas - Sede Santo Domingo',
        btnHablar: '🎤 Premi per parlare',
        confirmacion: 'Lingua cambiata in italiano.'
    }
};

function aplicarTemaColor(tema, guardar = true) {
    const root = document.documentElement.style;
    root.setProperty('--utlvte-green', tema.principal);
    root.setProperty('--utlvte-red', tema.secundario);
    root.setProperty('--bg-light', tema.fondo);
    root.setProperty('--header-bg', tema.header);
    root.setProperty('--card-bg', tema.tarjeta);
    root.setProperty('--dark-color', tema.footer);
    root.setProperty('--text-color', tema.texto);
    root.setProperty('--hero-overlay', tema.banner);

    if (guardar) {
        localStorage.setItem('utlvte_tema', JSON.stringify(tema));
    }
}

function toggleVoiceChat() {
    const voiceWin = document.getElementById('voiceWindow');
    voiceWin.style.display = (voiceWin.style.display === 'flex') ? 'none' : 'flex';
}

function responderConAudio(texto) {
    const voiceBody = document.getElementById('voiceBody');
    voiceBody.innerHTML += `<div class="message bot-msg">${texto}</div>`;
    voiceBody.scrollTop = voiceBody.scrollHeight;

    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const voz = new SpeechSynthesisUtterance(texto);
        voz.lang = configIdiomas[idiomaPagina].speechLang;
        window.speechSynthesis.speak(voz);
    }
}

function aplicarIdioma(lang, guardar = true) {
    idiomaPagina = lang;
    document.documentElement.lang = lang;

    // Traduce el menú y cualquier texto que tenga data-es, data-en, data-pt, etc.
    document.querySelectorAll('[data-' + lang + ']').forEach(el => {
        el.innerHTML = el.getAttribute('data-' + lang);
    });

    const datos = configIdiomas[lang];
    const sub1 = document.getElementById('sub1');
    const sub2 = document.getElementById('sub2');
    const footer = document.getElementById('textoFooter');
    const btnHablar = document.getElementById('btnHablar');

    if (sub1) sub1.textContent = datos.sub1;
    if (sub2) sub2.textContent = datos.sub2;
    if (footer) footer.textContent = datos.footer;
    if (btnHablar) btnHablar.textContent = datos.btnHablar;

    if (reconocimiento) {
        reconocimiento.lang = datos.speechLang;
    }

    if (guardar) {
        localStorage.setItem('utlvte_idioma', lang);
    }
}

function ejecutarAccionPorVoz(frase) {
    const cmd = frase.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // 1. VOLVER AL ESTADO NORMAL
    if (cmd.includes('normal') || cmd.includes('original') || cmd.includes('restaurar') ||
        cmd.includes('reiniciar') || cmd.includes('predeterminado') || cmd.includes('defecto') ||
        cmd.includes('reset') || cmd.includes('padrao')) {
        aplicarTemaColor({
            principal: '#008a3c',
            secundario: '#d9232a',
            fondo: '#f4f6f8',
            header: '#ffffff',
            tarjeta: 'rgba(255, 255, 255, 0.95)',
            footer: '#222222',
            texto: '#222222',
            banner: 'rgba(0, 138, 60, 0.85)'
        }, false);
        aplicarIdioma('es', false);
        localStorage.removeItem('utlvte_tema');
        localStorage.removeItem('utlvte_idioma');
        responderConAudio('Toda la página ha vuelto a su estado normal.');
        return;
    }

    // 2. CAMBIAR DE COLOR TODA LA PÁGINA
    const paletasColores = [
        { claves: ['azul', 'blue'], nombre: 'azul', tema: { principal: '#1565c0', secundario: '#0d47a1', fondo: '#bbdefb', header: '#e3f2fd', tarjeta: '#e3f2fd', footer: '#0d47a1', texto: '#0d2b5c', banner: 'rgba(21, 101, 192, 0.88)' } },
        { claves: ['celeste', 'turquesa', 'cyan', 'aqua'], nombre: 'celeste', tema: { principal: '#00838f', secundario: '#006064', fondo: '#b2ebf2', header: '#e0f7fa', tarjeta: '#e0f7fa', footer: '#004d40', texto: '#00363a', banner: 'rgba(0, 131, 143, 0.88)' } },
        { claves: ['rojo', 'red', 'vermelho'], nombre: 'rojo', tema: { principal: '#c62828', secundario: '#8e0000', fondo: '#ffcdd2', header: '#ffebee', tarjeta: '#ffebee', footer: '#7f0000', texto: '#4a0000', banner: 'rgba(198, 40, 40, 0.88)' } },
        { claves: ['verde', 'green'], nombre: 'verde', tema: { principal: '#2e7d32', secundario: '#1b5e20', fondo: '#c8e6c9', header: '#e8f5e9', tarjeta: '#e8f5e9', footer: '#1b5e20', texto: '#103813', banner: 'rgba(46, 125, 50, 0.88)' } },
        { claves: ['morado', 'violeta', 'lila', 'purple', 'roxo'], nombre: 'morado', tema: { principal: '#6a1b9a', secundario: '#4a148c', fondo: '#e1bee7', header: '#f3e5f5', tarjeta: '#f3e5f5', footer: '#38006b', texto: '#2c0052', banner: 'rgba(106, 27, 154, 0.88)' } },
        { claves: ['naranja', 'anaranjado', 'orange', 'laranja'], nombre: 'naranja', tema: { principal: '#ef6c00', secundario: '#e65100', fondo: '#ffe0b2', header: '#fff3e0', tarjeta: '#fff3e0', footer: '#bf360c', texto: '#4e1600', banner: 'rgba(239, 108, 0, 0.88)' } },
        { claves: ['amarillo', 'dorado', 'oro', 'yellow', 'gold', 'amarelo'], nombre: 'amarillo dorado', tema: { principal: '#f9a825', secundario: '#f57f17', fondo: '#fff9c4', header: '#fffde7', tarjeta: '#fffde7', footer: '#e65100', texto: '#3e2723', banner: 'rgba(249, 168, 37, 0.88)' } },
        { claves: ['rosado', 'rosa', 'pink'], nombre: 'rosado', tema: { principal: '#ad1457', secundario: '#880e4f', fondo: '#f8bbd0', header: '#fce4ec', tarjeta: '#fce4ec', footer: '#560027', texto: '#3e001c', banner: 'rgba(173, 20, 87, 0.88)' } },
        { claves: ['cafe', 'marron', 'brown', 'marrom'], nombre: 'café', tema: { principal: '#4e342e', secundario: '#3e2723', fondo: '#d7ccc8', header: '#efebe9', tarjeta: '#efebe9', footer: '#260e04', texto: '#260e04', banner: 'rgba(78, 52, 46, 0.88)' } },
        { claves: ['gris', 'plateado', 'gray', 'cinza'], nombre: 'gris', tema: { principal: '#455a64', secundario: '#263238', fondo: '#cfd8dc', header: '#eceff1', tarjeta: '#eceff1', footer: '#263238', texto: '#1c262b', banner: 'rgba(69, 90, 100, 0.88)' } },
        { claves: ['negro', 'oscuro', 'nocturno', 'black', 'dark', 'preto'], nombre: 'modo oscuro', tema: { principal: '#008a3c', secundario: '#ff5252', fondo: '#121212', header: '#1e1e1e', tarjeta: '#242424', footer: '#000000', texto: '#f5f5f5', banner: 'rgba(18, 18, 18, 0.90)' } }
    ];

    for (let itemColor of paletasColores) {
        if (itemColor.claves.some(c => cmd.includes(c))) {
            aplicarTemaColor(itemColor.tema);
            responderConAudio(`Toda la página ha cambiado a color ${itemColor.nombre}.`);
            return;
        }
    }

    // 3. CAMBIAR IDIOMA
    const idiomasDetectables = [
        { claves: ['portugues', 'portuguese'], codigo: 'pt' },
        { claves: ['ingles', 'english'], codigo: 'en' },
        { claves: ['frances', 'french', 'francais'], codigo: 'fr' },
        { claves: ['italiano', 'italian'], codigo: 'it' },
        { claves: ['espanol', 'spanish', 'castellano'], codigo: 'es' }
    ];

    for (let langItem of idiomasDetectables) {
        if (langItem.claves.some(k => cmd.includes(k))) {
            aplicarIdioma(langItem.codigo);
            responderConAudio(configIdiomas[langItem.codigo].confirmacion);
            return;
        }
    }

    // 4. NAVEGAR A TODAS LAS SECCIONES
    const todasLasSecciones = [
        { palabras: ['inicio', 'principal', 'portada', 'home'], archivo: 'index.html', titulo: 'Inicio' },
        { palabras: ['historia', 'history'], archivo: 'historia.html', titulo: 'Historia' },
        { palabras: ['nosotros', 'quienes somos', 'about', 'sobre nos'], archivo: 'nosotros.html', titulo: 'Nosotros' },
        { palabras: ['servicios', 'servicio', 'services', 'servicos'], archivo: 'servicios.html', titulo: 'Servicios' },
        { palabras: ['carreras', 'carrera', 'majors', 'cursos'], archivo: 'carreras.html', titulo: 'Carreras' },
        { palabras: ['contacto', 'contactos', 'contact', 'contato'], archivo: 'contacto.html', titulo: 'Contacto' },
        { palabras: ['juego', 'juegos', 'jugar', 'game', 'jogo'], archivo: 'juego.html', titulo: 'Juego' },
        { palabras: ['emociones', 'emocion', 'emotions', 'emocoes'], archivo: 'emociones.html', titulo: 'Emociones' },
        { palabras: ['promedio', 'promedios', 'notas', 'gpa', 'media'], archivo: 'promedio.html', titulo: 'Promedio' }
    ];

    for (let sec of todasLasSecciones) {
        if (sec.palabras.some(p => cmd.includes(p))) {
            responderConAudio(`Dirigiéndote a la sección ${sec.titulo}.`);
            setTimeout(() => {
                window.location.href = sec.archivo;
            }, 1500);
            return;
        }
    }

    // 5. LEER CONTENIDO PRINCIPAL DE CUALQUIER PÁGINA
    if (cmd.includes('leer') || cmd.includes('read') || cmd.includes('ler')) {
        const mainContent = document.querySelector('main');
        const textoLeer = mainContent ? mainContent.innerText : document.body.innerText;
        responderConAudio(textoLeer);
        return;
    }

    responderConAudio('No reconocí ese comando. Puedes decir un color, un idioma como portugués o inglés, una sección, o "volver al estado normal".');
}

// Reconocimiento de voz
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let reconocimiento = null;

if (SpeechRecognition) {
    reconocimiento = new SpeechRecognition();
    reconocimiento.lang = configIdiomas[idiomaPagina].speechLang;
    reconocimiento.continuous = false;
    reconocimiento.interimResults = false;

    reconocimiento.onstart = function () {
        const btn = document.getElementById('btnHablar');
        btn.classList.add('escuchando');
        btn.textContent = '🔴 Escuchando... habla ahora';
    };

    reconocimiento.onresult = function (event) {
        const textoHablado = event.results[0][0].transcript;
        const voiceBody = document.getElementById('voiceBody');
        voiceBody.innerHTML += `<div class="message user-msg">${textoHablado}</div>`;
        voiceBody.scrollTop = voiceBody.scrollHeight;
        ejecutarAccionPorVoz(textoHablado);
    };

    reconocimiento.onend = function () {
        const btn = document.getElementById('btnHablar');
        btn.classList.remove('escuchando');
        btn.textContent = configIdiomas[idiomaPagina].btnHablar;
    };

    reconocimiento.onerror = function (event) {
        const btn = document.getElementById('btnHablar');
        btn.classList.remove('escuchando');
        btn.textContent = configIdiomas[idiomaPagina].btnHablar;
        responderConAudio('Error de micrófono (' + event.error + '). Abre la página con Live Server en Chrome o Edge.');
    };
}

function activarVoz() {
    if (!reconocimiento) {
        alert('Tu navegador no soporta reconocimiento de voz. Usa Google Chrome o Microsoft Edge.');
        return;
    }
    try {
        reconocimiento.start();
    } catch (e) {
        reconocimiento.stop();
    }
}

// Al cargar cualquier sección, recupera el color y el idioma elegidos anteriormente
window.addEventListener('DOMContentLoaded', () => {
    const temaGuardado = localStorage.getItem('utlvte_tema');
    if (temaGuardado) {
        aplicarTemaColor(JSON.parse(temaGuardado), false);
    }
    if (idiomaPagina !== 'es') {
        aplicarIdioma(idiomaPagina, false);
    }
});