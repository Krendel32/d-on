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
const pageName = document.getElementById('pageName');
const playerDon = document.getElementById('playerDon');
const playerUls = document.getElementById('playerUls');

const episodesDon = [
  { title: 'Эпизод 1', url: 'https://www.dropbox.com/scl/fi/ruht8iy2etf02vfjwp1am/.mp4?rlkey=w7sbbxkjt0uh3kwlcmzk9j5fp&st=rx8wzh5z&raw=1' },
  //{ title: 'Мем но.1', url: 'https://www.dropbox.com/scl/fi/u5x4wcjgeh0fpc7ulkekq/.mp4?rlkey=koy1lhb5zmq15adi9ze7y8sij&st=w6ujd38o&raw=1' },
];

const episodesUls = [
  { title: 'Не жмать', url: 'https://www.dropbox.com/scl/fi/n329a23pj62v91dla7r3z/Rick-Astley-Never-Gonna-Give-You-Up-Video.mp4?rlkey=p1nhpu17b02oy52f0waygh6jk&st=mztns8ud&raw=1' },
];

const donQuotes = [
  '<span class="quote">Не аниме, а карнавал абсурда!</span>',
  '<span class="quote">Музыка, абсурд и никакого здравого смысла</span>',
  '<span class="quote">Чифирь слабый какой-то</span>',
];

const ulsQuotes = [
  '<span class="quote">"Деградирующая Звезда" — это не метафора, это диагноз</span>',
];

function preloadImages(...urls) {
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

preloadImages(
  'https://www.dropbox.com/scl/fi/fohsj1o875a07dvt9qshf/97_20250429195538.png?rlkey=ikm1njj8aicz4umqczw2wb0cd&st=ksqg3jrv&raw=1',
  'https://www.dropbox.com/scl/fi/swmkjabc418wzhpf1ook3/pngwing.com-2.png?rlkey=gca25464k5aeo73hwqs76u5qx&st=u9mh0ytm&raw=1',
  'https://www.dropbox.com/scl/fi/dafr4x3li2fi3908he7fc/pngwing.com-4.png?rlkey=ya1ywkh8b6s36ef3mx30z0mx4&st=1b45092c&raw=1',
  'https://www.dropbox.com/scl/fi/mnlqtnc4mntp4xg9rb3z8/pngwing.com-5.png?rlkey=xqlzx2jdkuqvdib9k2bmpxilh&st=zlrqj5ai&raw=1'
);

const backgrounds = {
  default: {
    left: '',
    right: ''
  },
  don: {
    left: 'https://www.dropbox.com/scl/fi/fohsj1o875a07dvt9qshf/97_20250429195538.png?rlkey=ikm1njj8aicz4umqczw2wb0cd&st=ksqg3jrv&raw=1',
    right: 'https://www.dropbox.com/scl/fi/swmkjabc418wzhpf1ook3/pngwing.com-2.png?rlkey=gca25464k5aeo73hwqs76u5qx&st=u9mh0ytm&raw=1'
  },
  uls: {
    left: 'https://www.dropbox.com/scl/fi/dafr4x3li2fi3908he7fc/pngwing.com-4.png?rlkey=ya1ywkh8b6s36ef3mx30z0mx4&st=1b45092c&raw=1',
    right: 'https://www.dropbox.com/scl/fi/mnlqtnc4mntp4xg9rb3z8/pngwing.com-5.png?rlkey=xqlzx2jdkuqvdib9k2bmpxilh&st=zlrqj5ai&raw=1'
  }
};
function setBackgroundSet(key) {
  const left = document.getElementById('bgLeft');
  const right = document.getElementById('bgRight');
  const bg = backgrounds[key] || backgrounds.default;

  // скрываем на мобильных
  if (window.innerWidth < 600) {
    left.style.display = 'none';
    right.style.display = 'none';
    return;
  }

  left.src = bg.left;
  right.src = bg.right;
  left.style.display = bg.left ? 'block' : 'none';
  right.style.display = bg.right ? 'block' : 'none';
}

document.addEventListener('fullscreenchange', () => {
  const isFullscreen = !!document.fullscreenElement;

  if (isFullscreen) {
    playerDon.style.border = 'none';
	playerUls.style.border = 'none';
  } else {
    playerDon.style.border = '3px solid #444';
	playerUls.style.border = '3px solid #444';
  }
});

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

const logoBlock = document.getElementById('logoBlock');
let logoClickCount = 0;
let logoClickTimer;

logoBlock.addEventListener('click', () => {
  logoClickCount++;

  clearTimeout(logoClickTimer);
  logoClickTimer = setTimeout(() => { logoClickCount = 0; }, 1000); // сброс через 1 сек

  if (logoClickCount >= 3) {
    document.querySelector('.menu-item a#Memee')?.parentElement?.classList.remove('hidden');
    console.log('%c🎉 Мем-страница активирована через логотип!', 'color: orange; font-weight: bold');
    logoClickCount = 0;
  }
});

function initExpandableBlocks() {
  document.querySelectorAll('.expandableBlock').forEach(block => {
    const btn = block.querySelector('.toggleMoreBtn');
    const more = block.querySelector('.moreText') || block.querySelector('.gridInfo');

    btn.addEventListener('click', () => {
      const isExpanded = more.classList.contains('expanded');
      more.classList.toggle('expanded', !isExpanded);
      btn.textContent = isExpanded ? 'Показать больше' : 'Скрыть';
    });
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

function monolith(mode = 1) {
  if (mode === 1) {
    // Включить монолитный стиль
    textContent.style.display = 'block';
    textContent.style.padding = '20px';
    textContent.style.background = '#222';
    textContent.style.marginTop = '0';
    textContent.style.borderRadius = '8px';
    textContent.style.margin = '20px auto';
  } else {
    // Отключить / сбросить стиль
    textContent.style.display = 'none';
    textContent.style.padding = '';
    textContent.style.background = '';
    textContent.style.marginTop = '';
    textContent.style.borderRadius = '';
    textContent.style.margin = '';
  }
}

function randomQuote(id, quotes = []) {
  const el = document.getElementById(id);
  if (!el || quotes.length === 0) return;

  const randomIndex = Math.floor(Math.random() * quotes.length);
  el.innerHTML = `<p style="text-align: center; font-size: ${window.innerWidth <= 600 ? '0.8rem' : '1rem'}"><em>${quotes[randomIndex]}</em></p>`;
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
  monolith(0);
  setBackgroundSet('default');
  resetAllPlayers();
  deion.style.display = 'none';
  meme.style.display = 'none';
  ulss.style.display = 'none';
  pageName.innerHTML = '';
  pageName.innerHTML = `<p style="font-size: 1.8rem">Главная</p>`;

  textContent.innerHTML = '';
  requestAnimationFrame(() => {
    textContent.style.display = 'block';
  });

  // Первый блок
  const welcomeBlock = document.createElement('div');
  welcomeBlock.className = 'textBlock';
  welcomeBlock.innerHTML = `
    <h1 style="text-align: center; font-size: ${window.innerWidth <= 600 ? '1.5rem' : '2rem'}">Добро пожаловать!</h1>
    <p style="text-align: center; font-size: ${window.innerWidth <= 600 ? '1.1rem' : '1.5rem'}">Слева сверху, в меню навигации, есть выбор желаемого контента. Ниже наведена краткая информация о нас</p>
  `;
  textContent.appendChild(welcomeBlock);

  // Второй блок
  const infoBlock = document.createElement('div');
  infoBlock.className = 'textBlock';
  infoBlock.innerHTML = `
    <h1 style="text-align: center; font-size: ${window.innerWidth <= 600 ? '1.5rem' : '2rem'}">Кто же мы такие?</h1>
    <p style="text-align: center; font-size: ${window.innerWidth <= 600 ? '1.1rem' : '1.5rem'}">Мы - студия пародийной переозвучки, созданная несколькими школьниками из СНГ для развлечения. Она запущена 25 января 2025 года, и на сегодняшний день у нас готов только один проект - D-ON. На данный момент ведётся активная работа над новым проектом - над Деградирующей Звездой</p>
	<p style="text-align: center; font-size: ${window.innerWidth <= 600 ? '1.1rem' : '1.5rem'}">Если хотите следить за прогрессом - подпишитесь на наш <a href="https://t.me/+xDrz3EcbS-8zMmYy" class="external" target="_blank" style="text-decoration: none; color: #b8c6ff">Телеграм канал</a></p>
	<p style="text-align: center; font-size: ${window.innerWidth <= 600 ? '1.1rem' : '1.5rem'}">Также у нас есть <a href="https://www.youtube.com/@Deb_Dub" class="external" target="_blank" style="text-decoration: none; color: #ffb8b8">Ютуб канал</a>, на котором будут выкладываться все серии переозвучек, за которые нам не прилетит АП</p>
	
  `;
  textContent.appendChild(infoBlock);


  sidebar.classList.remove('open');
  document.querySelector('main#content').scrollTo({ top: 0, behavior: 'smooth' });
});

// Страница D-ON!
const pageContent = document.getElementById('pageContent'); // Новый контейнер

don.addEventListener('click', e => {
  e.preventDefault();
  setBackgroundSet('don');
  resetAllPlayers();
  monolith(1);
  deion.style.display = 'block';
  meme.style.display = 'none';
  ulss.style.display = 'none';
  pageName.innerHTML = '';
  pageName.innerHTML = `<p style="font-size: 1.8rem">D-ON!</p>`;
  textContent.innerHTML = `
    <h1 style="text-align: center; font-size: ${window.innerWidth <= 600 ? '1.3rem' : '3rem'}">
      Добро пожаловать в Клуб Дебильной Музыки!
    </h1>
    <div id="donQuote"></div>

    <div class="expandableBlock">
      <h2 style="font-size: ${window.innerWidth <= 600 ? '1.1rem' : '1.5rem'}; text-indent: 1em">Информация</h2>
    
	  
	
      <div class="gridInfo moreText">
	    <hr>
	    <div class="label">Статус:</div>
		
          <div>
            <span class="status-done" style="font-size: ${window.innerWidth <= 600 ? '0.8rem' : '1rem'}">Вышел 1 эпизод</span>
          </div>

	
  	    <hr>
	  
        <div class="label">Роли озвучивают:</div>
	    <div>
	  	  <span class="desc" style="font-size: ${window.innerWidth <= 600 ? '0.8rem' : '1rem'}">Злодей Бо Финн – Юи (Фин), Уи, Нодока, Савако<br>
		  Крендель – Рицу (Максим)<br>
		  Никита Доброжирович Македонский – Мио (Никита)<br>
		  Психопатрик Батерман – Цумуги (Вадим)</span>
	    </div>

        <hr>

        <div class="label">Описание:</div>
          <div>
            <span class="desc" style="font-size: ${window.innerWidth <= 600 ? '0.8rem' : '1rem'}">D-ON (или же Дейон) — это наш трэш-проект на основе аниме K-ON. Мы попытались соединить наш юмор, тонну абсурда и немного музыки, чтобы создать нечто рофельное. Проект D-ON является эксклюзивным для сайта</span>
          </div>
      </div>

	


      <button class="toggleMoreBtn">Показать больше</button>
    </div>
  `;

  // Плеер
  playerDon.style.display = 'block';
  textContent.appendChild(playerDon);

  // Панель с кнопками эпизодов
  const scrollContainer = document.createElement('div');
  scrollContainer.className = 'scrollContainer';

  const scrollPanel = document.createElement('div');
  scrollPanel.id = 'scrollPanel';
  scrollPanel.innerHTML = buttonsDonHTML;

  scrollContainer.appendChild(scrollPanel);
  textContent.appendChild(scrollContainer);

  initExpandableBlocks();
  randomQuote('donQuote', donQuotes);
  sidebar.classList.remove('open');
  document.querySelector('main#content').scrollTo({ top: 0, behavior: 'smooth' });
});


// Страница Degro-Star
uls.addEventListener('click', e => {
  e.preventDefault();
  setBackgroundSet('uls');
  resetAllPlayers();
  monolith(1);
  deion.style.display = 'none';
  meme.style.display = 'none';
  ulss.style.display = 'block';
  pageName.innerHTML = '';
  pageName.innerHTML = `<p style="font-size: 1.8rem">Деградирующая Звезда</p>`;
  textContent.innerHTML = `
    <h1 style="text-align: center; font-size: ${window.innerWidth <= 600 ? '1.3rem' : '3rem'}">
      В разработке!
    </h1>
    <div id="ulsQuote"></div>

    <div class="expandableBlock">
      <h2 style="font-size: ${window.innerWidth <= 600 ? '1.1rem' : '1.5rem'}; text-indent: 1em">Информация</h2>
    
	
	
      <div class="gridInfo moreText">
	    <hr>
	    <div class="label">Статус:</div>
          <div>
            <span class="status-writing" style="font-size: ${window.innerWidth <= 600 ? '0.8rem' : '1rem'}">Пишется сценарий к 1 эпизоду</span>
          </div>

		<hr>
		
		<div class="label">Роли озвучивают:</div>
	    <div>
	  	  <span class="desc" style="font-size: ${window.innerWidth <= 600 ? '0.8rem' : '1rem'}">Злодей Бо Финн – Коната<br>
		  Психопатрик Батерман – Кагами<br>
		  Никита Доброжирович Македонский – Цукаса<br>
		  Крендель – Миюки</span>
	    </div>
		
		


        <hr>

        <div class="label">Описание:</div>
          <div>
            <span class="desc" style="font-size: ${window.innerWidth <= 600 ? '0.8rem' : '1rem'}">Ни в коем случае не жмите на кнопку - иначе сайт не выдержит и всё полетит к хуям</span>
          </div>
      </div>

	


      <button class="toggleMoreBtn">Показать больше</button>
    </div>
  `;



  // Плеер
  playerUls.style.display = 'block';
  textContent.appendChild(playerUls);

  // Панель с кнопками эпизодов
  const scrollContainer = document.createElement('div');
  scrollContainer.className = 'scrollContainer';

  const scrollPanel = document.createElement('div');
  scrollPanel.id = 'scrollPanel';
  scrollPanel.innerHTML = buttonsUlsHTML;

  scrollContainer.appendChild(scrollPanel);
  textContent.appendChild(scrollContainer);

  initExpandableBlocks();
  randomQuote('ulsQuote', ulsQuotes);
  sidebar.classList.remove('open');
  document.querySelector('main#content').scrollTo({ top: 0, behavior: 'smooth' });
});

// Анекдоты
Memee.addEventListener('click', e => {
  e.preventDefault();
  setBackgroundSet('default');
  monolith(0);
  resetAllPlayers();
  deion.style.display = 'none';
  ulss.style.display = 'none';
  meme.style.display = 'block';
  sidebar.classList.remove('open');
  textContent.innerHTML = '';
  pageName.innerHTML = '';
  pageName.innerHTML = `<p style="font-size: 1.8rem">Анекдоты от ДебДаба</p>`;
  textContent.style.display = 'block';
  // Первый блок
  const anek1 = document.createElement('div');
  anek1.className = 'textBlock';
  anek1.style.width = `${window.innerWidth <= 600 ? '100%' : '50%'}`;
  anek1.innerHTML = `<p>
    - Позвольте папироску!<br>
    - Вы моих курить не будете.<br>
	- А что - крепкие очень?<br>
	- Нет..<br>
	- Слабые?<br>
	- Нет..<br>
	- А что же?<br>
	- Я вам не дам просто.</p>
	<p style="text-align: right">©Никита Доброжирович Македонский</p>
  `;
  textContent.appendChild(anek1);

  // Второй блок
  const anek2 = document.createElement('div');
  anek2.className = 'textBlock align-right';
  anek2.style.width = `${window.innerWidth <= 600 ? '100%' : '50%'}`;
  anek2.innerHTML = `<p>
    Клинтон спрашивает у Бога.<br>
	— Когда мой народ будет жить счастливой жизнью?<br>
	— Через двадцать лет, — ответил Бог.<br>
	Клинтон заплакал и ушел. Тогда Ельцин спрашивает:<br>
	— Господи, а когда мой народ будет жить счастливо?<br>
	Бог заплакал и ушел.</p>
	<p style="text-align: right">©Злодей Бо Финн</p>
  `;
  textContent.appendChild(anek2);

  // Третий блок
  const anek3 = document.createElement('div');
  anek3.className = 'textBlock';
  anek3.style.width = `${window.innerWidth <= 600 ? '100%' : '50%'}`;
  anek3.innerHTML = `<p>Сидит нарик на камне возле речки, косяк забивает. К нему подходит мужик:<br>
    — Слышь, братан! Ты знаешь, где эту речку можно вброд перейти?<br>
	— Да прямо тут и проходи!<br>
	Ну мужик и пошел. Сделал пару шагов и скрылся под водой. Вылазит весь мокрый и злой, подходит к нарику и спрашивает:<br>
	— Ты чё мне тут наплёл?!<br>
	— Слышь, братан, клянусь — утки всего полчаса назад речку здесь по пояс перешли!
    </p>
	<p style="text-align: right">©Психопатрик Батерман</p>
  `;
  textContent.appendChild(anek3);

  // Четвёртый блок
  const anek4 = document.createElement('div');
  anek4.className = 'textBlock align-right';
  anek4.style.width = `${window.innerWidth <= 600 ? '100%' : '50%'}`;
  anek4.innerHTML = `<p>
    </p>
	<p style="text-align: right">©Крендель</p>
  `;
  textContent.appendChild(anek4);

  document.querySelector('main#content').scrollTo({ top: 0, behavior: 'smooth' });
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

window.addEventListener('DOMContentLoaded', () => {
  homeLink.click(); // симулируем клик по "Главная"
});