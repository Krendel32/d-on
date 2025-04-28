const menuButton = document.getElementById('menuButton');
const sidebar = document.getElementById('sidebar');
const intro = document.getElementById('intro');
const textContent = document.getElementById('textContent');
const homeLink = document.getElementById('homeLink');
const meme = document.getElementById('meme');
const Memee = document.getElementById('Memee');
const don = document.getElementById('don');
const deion = document.getElementById('deion');
const uls = document.getElementById('uls');
const ulss = document.getElementById('ulss');

const playerDon = document.getElementById('playerDon');
const playerUls = document.getElementById('playerUls');

const episodesDon = [
  { title: 'Эпизод 1', url: 'https://www.dropbox.com/scl/fi/ruht8iy2etf02vfjwp1am/.mp4?rlkey=w7sbbxkjt0uh3kwlcmzk9j5fp&st=rx8wzh5z&raw=1' },
  { title: 'Мем но.1', url: 'https://www.dropbox.com/scl/fi/u5x4wcjgeh0fpc7ulkekq/.mp4?rlkey=koy1lhb5zmq15adi9ze7y8sij&st=w6ujd38o&raw=1' },
];

const episodesUls = [
  { title: 'Не жмать', url: 'https://www.dropbox.com/scl/fi/n329a23pj62v91dla7r3z/Rick-Astley-Never-Gonna-Give-You-Up-Video.mp4?rlkey=p1nhpu17b02oy52f0waygh6jk&st=mztns8ud&raw=1' },
];

let buttonsDonHTML = episodesDon.map(episode => 
  `<button class="scrollButton donButton" onclick="loadEpisode('playerDon', '${episode.url}', this)">${episode.title}</button>`
).join('');

let buttonsUlsHTML = episodesUls.map(episode => 
  `<button class="scrollButton ulsButton" onclick="loadEpisode('playerUls', '${episode.url}', this)">${episode.title}</button>`
).join('');

// Сброс всех активных плееров
function resetAllPlayers() {
  [playerDon, playerUls].forEach(player => {
    if (player) {
      player.pause();
      player.removeAttribute('src');
      player.load();
      player.style.display = 'none';
    }
  });
}

// Автоматическое изменение object-fit при fullscreen
document.addEventListener('fullscreenchange', () => {
  const activePlayer = document.fullscreenElement?.tagName === 'VIDEO' ? document.fullscreenElement : null;
  if (activePlayer) {
    activePlayer.style.objectFit = 'contain';
    activePlayer.style.objectPosition = 'center center';
  } else {
    document.querySelectorAll('video').forEach(video => {
      video.style.objectFit = 'cover';
      video.style.objectPosition = 'center center';
    });
  }
});

// Загрузка эпизода
function loadEpisode(playerId, src, button) {
  const player = document.getElementById(playerId);
  if (!player) return;

  // Скрыть все плееры перед показом нужного
  resetAllPlayers();
  player.style.display = 'block';
  player.src = src;
  player.load();
  player.play();

  document.querySelectorAll('.scrollButton').forEach(btn => btn.classList.remove('active'));
  if (button) {
    button.classList.add('active');
  }
}

// Меню-кнопка
menuButton.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

// Кнопки разворота подменю
document.querySelectorAll('.expand-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const submenu = btn.nextElementSibling;
    submenu.classList.toggle('open');
    btn.textContent = btn.textContent.endsWith('▸')
      ? btn.textContent.replace('▸', '▾')
      : btn.textContent.replace('▾', '▸');
  });
});

// Переход на Главную
homeLink.addEventListener('click', e => {
  e.preventDefault();
  resetAllPlayers();
  deion.style.display = 'none';
  intro.style.display = 'block';
  meme.style.display = 'none';
  ulss.style.display = 'none';
  textContent.style.display = 'none';
  sidebar.classList.remove('open');
  document.querySelector('main#content').scrollTo({ top: 0});
});

// Страница D-ON!
const pageContent = document.getElementById('pageContent'); // Новый контейнер

don.addEventListener('click', e => {
  e.preventDefault();
  resetAllPlayers();
  deion.style.display = 'block';
  intro.style.display = 'none';
  meme.style.display = 'none';
  ulss.style.display = 'none';
  document.body.style.paddingTop = '13px';
  textContent.style.display = 'block';

  pageContent.innerHTML = `
    <h1 style="text-align: center; font-size: ${window.innerWidth <= 600 ? '1.3rem' : '3rem'}">Добро пожаловать в Клуб Дебильной Музыки!</h1>
    <p style="text-indent: 2em; font-size: ${window.innerWidth <= 600 ? '1rem' : '1.5rem'}">"D-ON!" - это наша переозвучка аниме "K-ON!"</p>
  `;
  
  playerDon.style.display = 'block';
  
  document.getElementById('scrollPanel')?.remove();
  const scrollPanel = document.createElement('div');
  scrollPanel.id = 'scrollPanel';
  scrollPanel.innerHTML = buttonsDonHTML;
  pageContent.appendChild(scrollPanel);
  
  sidebar.classList.remove('open');

  document.querySelector('main#content').scrollTo({ top: 0});

});

// Страница "В разработке"
uls.addEventListener('click', e => {
  e.preventDefault;
  resetAllPlayers();
  deion.style.display = 'none';
  intro.style.display = 'none';
  meme.style.display = 'none';
  ulss.style.display = 'block';
  document.body.style.paddingTop = '13px';
  textContent.style.display = 'block';

  pageContent.innerHTML = `
    <h1 style="text-align: center; font-size: ${window.innerWidth <= 600 ? '1.3rem' : '3rem'}">В разработке!</h1>
    <p style="text-indent: 2em; font-size: ${window.innerWidth <= 600 ? '1rem' : '1.5rem'}">Когда-нибудь выйдет</p>
    <div id="scrollPanel">${buttonsUlsHTML}</div>
  `;

  playerUls.style.display = 'block';
  sidebar.classList.remove('open');
  document.querySelector('main#content').scrollTo({ top: 0});
});

// Мем-кнопка
Memee.addEventListener('click', e => {
  e.preventDefault();
  resetAllPlayers();
  deion.style.display = 'none';
  intro.style.display = 'none';
  ulss.style.display = 'none';
  textContent.style.display = 'none';
  meme.style.display = 'block';
  sidebar.classList.remove('open');
  document.querySelector('main#content').scrollTo({ top: 0});
});

// Глобальная обработка ссылок
document.querySelectorAll('.menu-item a').forEach(link => {
  if (link.classList.contains('external')) return;

  link.addEventListener('click', e => {
    e.preventDefault();
    resetAllPlayers();
    const src = link.getAttribute('data-src');
    const type = link.getAttribute('data-type');
    const content = link.getAttribute('data-content');

    deion.style.display = 'none';
    intro.style.display = 'none';
    meme.style.display = 'none';
    textContent.style.display = 'none';

    if (type === 'text' && content) {
      textContent.innerText = content;
      textContent.style.display = 'block';
    } else if (src) {
      const tempPlayer = document.createElement('video');
      tempPlayer.src = src;
      tempPlayer.load();
      tempPlayer.play();
      textContent.appendChild(tempPlayer);
    }

    sidebar.classList.remove('open');
  });
});
