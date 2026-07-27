(function () {
  if (window.__dulePreloaderDone) return;
  window.__dulePreloaderDone = true;
  // dolazak sa "Saznaj više" kartica (A/B/C) - te veze imaju svoj Lottie prelaz
  if (/[?&]kat=/i.test(window.location.search || '')) return;

  var START = Date.now();
  var LOOPS = 2;
  var MIN = 3200;          // fallback if duration nije poznato
  var HARD_CAP = 9000;
  var pageDone = false;
  var closed = false;

  var wrap = document.createElement('div');
  wrap.id = 'dule-preloader';
  wrap.setAttribute('style', [
    'position:fixed', 'inset:0', 'z-index:99999',
    'display:flex', 'align-items:center', 'justify-content:center',
    'background:#ffffff', 'opacity:1',
    'transition:opacity .5s ease'
  ].join(';'));

  var box = document.createElement('div');
  box.setAttribute('style', 'width:min(280px,46vw);aspect-ratio:1/1;display:flex;align-items:center;justify-content:center');
  wrap.appendChild(box);

  var player = document.createElement('dotlottie-wc');
  player.setAttribute('src', 'https://lottie.host/a94041c1-6ce6-4df3-9fe1-ee856e204c68/iDwhPzxUcp.lottie');
  player.setAttribute('autoplay', '');
  player.setAttribute('loop', '');
  player.setAttribute('style', 'width:100%;height:100%');
  box.appendChild(player);

  (function mark() {
    if (document.documentElement) document.documentElement.setAttribute('data-preloading', '1');
  })();

  (function mount() {
    if (document.body) document.body.appendChild(wrap);
    else requestAnimationFrame(mount);
  })();

  var s = document.createElement('script');
  s.type = 'module';
  s.src = 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js';
  document.head.appendChild(s);

  // Kad se animacija učita, izračunaj trajanje dva prolaza
  var tries = 0;
  var probe = setInterval(function () {
    tries++;
    var dl = player.dotLottie;
    var dur = dl && dl.duration;
    if (dur && dur > 0) {
      clearInterval(probe);
      MIN = Math.min(5000, dur * 1000 * LOOPS + 250);
      maybeClose();
    } else if (tries > 100) {
      clearInterval(probe);
    }
  }, 100);

  // animacije koje su bile pauzirane tokom preloadera kreću od početka
  function restartAnims() {
    var touched = [];
    document.querySelectorAll('[style*="animation"]').forEach(function (el) {
      var name = getComputedStyle(el).animationName || '';
      if (name.indexOf('dule-rise') !== 0) return;
      var prev = el.style.animation;
      el.style.animation = 'none';
      void el.offsetWidth;
      el.style.animation = prev;
      touched.push(el);
    });
    // ako animacije uopšte ne teku, ne dozvoli da tekst ostane nevidljiv
    setTimeout(function () {
      touched.forEach(function (el) {
        if (getComputedStyle(el).opacity === '0') el.style.animation = 'none';
      });
    }, 1600);
  }

  function finish() {
    if (closed) return;
    closed = true;
    document.documentElement.removeAttribute('data-preloading');
    restartAnims();
    wrap.style.opacity = '0';
    wrap.style.pointerEvents = 'none';
    setTimeout(function () { wrap.remove(); }, 600);
  }

  var pending = null;
  function maybeClose() {
    if (!pageDone || closed) return;
    if (pending) clearTimeout(pending);
    pending = setTimeout(finish, Math.max(0, MIN - (Date.now() - START)));
  }

  function onLoad() { pageDone = true; maybeClose(); }
  if (document.readyState === 'complete') onLoad();
  else window.addEventListener('load', onLoad);

  setTimeout(finish, HARD_CAP);
})();
