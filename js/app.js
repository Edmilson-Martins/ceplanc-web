const EQUIPES = ['ALFA', 'BRAVO', 'CHARLIE', 'DELTA', 'ECHO'];

const estado = {
  filaAtual:   0,
  historico:   [],
  contadorOco: 14,
  horaInicio:  null,
};

function salvarEstado() {
  localStorage.setItem('ceplanc_estado', JSON.stringify(estado));
}

function carregarEstado() {
  const salvo = localStorage.getItem('ceplanc_estado');
  if (salvo) {
    try {
      const parsed = JSON.parse(salvo);
      Object.assign(estado, parsed);
    } catch (e) {
      console.warn('Erro ao carregar estado:', e);
    }
  }

  if (estado.historico.length === 0) {
    estado.historico = [
      { id: '#0014', tipo: 'Flagrante — Roubo a transeúnte', equipe: 'ALFA',    status: 'atendendo', data: agora() },
      { id: '#0013', tipo: 'Flagrante — Tráfico de drogas',  equipe: 'ECHO',    status: 'concluido', data: '06/05/2026 23:10' },
      { id: '#0012', tipo: 'Violência doméstica',            equipe: 'DELTA',   status: 'concluido', data: '06/05/2026 22:47' },
      { id: '#0011', tipo: 'Porte ilegal de arma',           equipe: 'CHARLIE', status: 'andamento', data: '06/05/2026 21:30' },
      { id: '#0010', tipo: 'Furto qualificado',              equipe: 'BRAVO',   status: 'concluido', data: '06/05/2026 20:15' },
    ];
    estado.contadorOco = 14;
  }

  if (!estado.horaInicio) {
    estado.horaInicio = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  salvarEstado();
}

function getEquipeAtual() {
  return EQUIPES[estado.filaAtual];
}

function passarVez() {
  const anterior = getEquipeAtual();
  estado.filaAtual = (estado.filaAtual + 1) % EQUIPES.length;
  estado.horaInicio = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  salvarEstado();
  window.dispatchEvent(new CustomEvent('filaAtualizada'));
  toast('Vez passada de ' + anterior + ' para ' + getEquipeAtual());
  return getEquipeAtual();
}

function proximoId() {
  estado.contadorOco += 1;
  salvarEstado();
  return '#' + String(estado.contadorOco).padStart(4, '0');
}

function registrarOcorrencia(tipo, equipe, status, obs) {
  obs = obs || '';
  const nova = {
    id:     proximoId(),
    tipo:   tipo,
    equipe: equipe,
    status: status,
    obs:    obs,
    data:   agora(),
  };
  estado.historico.push(nova);
  salvarEstado();
  toast('Ocorrencia ' + nova.id + ' registrada com sucesso!');
  return nova;
}

function agora() {
  const d = new Date();
  return d.toLocaleDateString('pt-BR') + ' ' +
         d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function toast(msg, tipo) {
  tipo = tipo || 'ok';
  const container = document.getElementById('toast-container');
  if (!container) return;
  const el = document.createElement('div');
  el.className = 'toast' + (tipo === 'erro' ? ' erro' : '');
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(function () {
    el.style.animation = 'fadeOut 0.4s ease forwards';
    setTimeout(function () { el.remove(); }, 400);
  }, 3000);
}

function badgeEquipeStatus(status) {
  const map = {
    atendendo:  ['badge-status badge-atendendo',  'Em Atendimento'],
    aguardando: ['badge-status badge-aguardando', 'Aguardando'],
    ocorrencia: ['badge-status badge-ocorrencia', 'Em Ocorrencia'],
    concluido:  ['badge-status badge-concluido',  'Concluido'],
    andamento:  ['badge-status badge-andamento',  'Em Andamento'],
  };
  const entry = map[status] || ['badge-status', status];
  return '<span class="' + entry[0] + '">' + entry[1] + '</span>';
}

function iniciarRelogio() {
  const el = document.getElementById('relogio');
  if (!el) return;
  function atualiza() {
    el.textContent = new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  }
  atualiza();
  setInterval(atualiza, 1000);
}

function iniciarNav() {
  const pagina = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    if (a.getAttribute('href') === pagina) a.classList.add('ativo');
  });

  const btn      = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (btn && navLinks) {
    btn.addEventListener('click', function () {
      navLinks.classList.toggle('aberto');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('aberto');
      });
    });
  }
}

window.getEquipeAtual      = getEquipeAtual;
window.passarVez           = passarVez;
window.registrarOcorrencia = registrarOcorrencia;
window.badgeEquipeStatus   = badgeEquipeStatus;
window.toast               = toast;

window.ceplanc = {
  EQUIPES:             EQUIPES,
  estado:              estado,
  getEquipeAtual:      getEquipeAtual,
  passarVez:           passarVez,
  registrarOcorrencia: registrarOcorrencia,
  badgeEquipeStatus:   badgeEquipeStatus,
  toast:               toast,
};

document.addEventListener('DOMContentLoaded', function () {
  carregarEstado();
  iniciarNav();
  iniciarRelogio();
  window.dispatchEvent(new CustomEvent('estadoCarregado'));
});
