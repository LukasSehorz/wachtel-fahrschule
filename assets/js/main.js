/* Fahrschule Wachtel — Interaktionen
   Dezent: nur transform/opacity, prefers-reduced-motion wird respektiert. */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Mobile-Navigation ------------------------------------------------ */
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('primary-menu');
  var header = document.querySelector('.site-header');

  function setHeaderOffset() {
    if (!header) return;
    var rect = header.getBoundingClientRect();
    document.documentElement.style.setProperty('--header-offset', Math.round(rect.bottom) + 'px');
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      setHeaderOffset();
      toggle.setAttribute('aria-expanded', String(!open));
      menu.classList.toggle('is-open', !open);
      document.body.style.overflow = !open ? 'hidden' : '';
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 1024 && menu.classList.contains('is-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
        document.body.style.overflow = '';
      }
      setHeaderOffset();
    });
  }

  /* ---- Sticky-Header-Zustand -------------------------------------------- */
  if (header) {
    var onScrollHeader = function () {
      header.classList.toggle('is-stuck', window.scrollY > 40);
    };
    onScrollHeader();
    window.addEventListener('scroll', onScrollHeader, { passive: true });
  }

  /* ---- Login-Dialog ------------------------------------------------------ */
  var loginDialog = document.getElementById('login-dialog');
  if (loginDialog) {
    var lastFocus = null;

    var openLogin = function () {
      lastFocus = document.activeElement;
      if (typeof loginDialog.showModal === 'function') {
        loginDialog.showModal();
      } else {
        loginDialog.setAttribute('open', '');   // sehr alte Browser
      }
      var first = loginDialog.querySelector('#login-user');
      if (first) setTimeout(function () { first.focus(); }, 60);
    };

    var closeLogin = function () {
      if (typeof loginDialog.close === 'function') loginDialog.close();
      else loginDialog.removeAttribute('open');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };

    document.querySelectorAll('[data-login-open]').forEach(function (b) {
      b.addEventListener('click', openLogin);
    });
    document.querySelectorAll('[data-login-close]').forEach(function (b) {
      b.addEventListener('click', closeLogin);
    });

    /* Klick auf den Hintergrund schließt den Dialog */
    loginDialog.addEventListener('click', function (e) {
      if (e.target !== loginDialog) return;
      var r = loginDialog.getBoundingClientRect();
      var inside = e.clientX >= r.left && e.clientX <= r.right &&
                   e.clientY >= r.top  && e.clientY <= r.bottom;
      if (!inside) closeLogin();
    });

    var loginForm = document.getElementById('login-form');
    var loginNote = document.getElementById('login-note');
    if (loginForm && loginNote) {
      loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var user = loginForm.querySelector('#login-user');
        var pass = loginForm.querySelector('#login-pass');
        if (!user.value.trim() || !pass.value) {
          loginNote.textContent = 'Bitte Benutzername und Passwort eingeben.';
          loginNote.hidden = false;
          (!user.value.trim() ? user : pass).focus();
          return;
        }
        loginNote.textContent = 'Vorschau: Der Login wird beim Livegang mit dem Lerncenter ' +
                                'der Fahrschule verbunden.';
        loginNote.hidden = false;
      });
    }
  }

  /* ---- Untermenü "Klassen" ---------------------------------------------- */
  var subItems = document.querySelectorAll('.nav__item--has-sub');
  subItems.forEach(function (item) {
    var btn = item.querySelector('.nav__link--sub');
    if (!btn) return;

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (window.innerWidth <= 1024) return;   // mobil ist es dauerhaft offen
      var open = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });

    item.addEventListener('mouseenter', function () {
      if (window.innerWidth > 1024) btn.setAttribute('aria-expanded', 'true');
    });
    item.addEventListener('mouseleave', function () {
      if (window.innerWidth > 1024) {
        item.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  document.addEventListener('click', function (e) {
    subItems.forEach(function (item) {
      if (!item.contains(e.target)) {
        item.classList.remove('is-open');
        var b = item.querySelector('.nav__link--sub');
        if (b) b.setAttribute('aria-expanded', 'false');
      }
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    subItems.forEach(function (item) {
      if (!item.classList.contains('is-open')) return;
      item.classList.remove('is-open');
      var b = item.querySelector('.nav__link--sub');
      if (b) { b.setAttribute('aria-expanded', 'false'); b.focus(); }
    });
  });

  /* ---- Elemente automatisch für die Scroll-Animation auszeichnen --------- */
  /* Spart identische Klassen in 15 HTML-Dateien und hält die Seiten synchron. */
  var AUTO = '.section-head, .split > div, .location, .num-card, .class-card,' +
             '.feature-card, .notice, .acc, .form, .table-wrap, .note-box,' +
             '.cta-band, .check-list, .step, .contact-list, .info-grid, .def';
  document.querySelectorAll(AUTO).forEach(function (el) {
    if (el.closest('.hero')) return;                    // Hero hat eigene Einblendung
    if (el.classList.contains('reveal')) return;
    if (el.parentElement && el.parentElement.closest('.reveal')) return;
    el.classList.add('reveal');
  });
  /* Bildkarten bekommen die Kanten-Animation statt des Verschiebens */
  document.querySelectorAll('.split__media, .step__media').forEach(function (el) {
    el.classList.add('reveal', 'reveal--media');
    el.classList.remove('reveal--plain');
  });

  /* ---- Scroll-Reveal ----------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');

  if (reduced || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = 0;
        var group = el.parentElement;
        if (group && group.hasAttribute('data-stagger')) {
          var siblings = Array.prototype.filter.call(group.children, function (c) {
            return c.classList.contains('reveal');
          });
          delay = Math.min(siblings.indexOf(el), 6) * 60;
        }
        setTimeout(function () { el.classList.add('is-visible'); }, delay);
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---- Text-Fill beim Scrollen ------------------------------------------ */
  /* Buchstaben starten hellgrau und füllen sich beim Hereinscrollen mit Schwarz. */
  var fillEls = Array.prototype.slice.call(document.querySelectorAll('.fill-text'));

  if (fillEls.length && !reduced) {
    var ticking = false;

    var updateFill = function () {
      var vh = window.innerHeight;
      fillEls.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        // Fortschritt: 0 wenn Oberkante bei 85% der Viewporthöhe, 1 bei 45%
        var start = vh * 0.85;
        var end = vh * 0.42;
        var p = (start - rect.top) / (start - end);
        p = Math.max(0, Math.min(1, p));
        el.style.backgroundPosition = (100 - p * 100) + '% 0';
      });
      ticking = false;
    };

    var requestFill = function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateFill);
    };

    updateFill();
    window.addEventListener('scroll', requestFill, { passive: true });
    window.addEventListener('resize', requestFill);
  } else {
    fillEls.forEach(function (el) {
      el.style.background = 'none';
      el.style.webkitTextFillColor = '#111111';
      el.style.color = '#111111';
    });
  }

  /* ---- Accordion: immer nur eines offen (pro Gruppe) --------------------- */
  document.querySelectorAll('.accordion').forEach(function (group) {
    var items = group.querySelectorAll('details.acc');
    items.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (!item.open) return;
        items.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      });
    });
  });

  /* ---- Hero-Video: bei reduzierter Bewegung anhalten --------------------- */
  var heroVideo = document.querySelector('.hero__media video');
  if (heroVideo && reduced) {
    heroVideo.pause();
    heroVideo.removeAttribute('autoplay');
  }

  /* ---- Formulare ohne Backend (mailto) ---------------------------------- */
  function labelFor(form, el) {
    if (el.getAttribute('data-label')) return el.getAttribute('data-label');
    var lb = el.id ? form.querySelector('label[for="' + el.id + '"]') : null;
    if (!lb) return el.name;
    return lb.textContent.replace(/\s+/g, ' ').replace(/\*/g, '').trim();
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-mailto-form]'), function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var subject, body;

      if (form.elements.nachricht) {
        /* Kontaktformular (Name / Telefon / E-Mail / Nachricht) */
        var name = (data.get('name') || '').toString().trim();
        subject = 'Anfrage über die Website – ' + name;
        body = [
          'Name: ' + name,
          'Telefon: ' + (data.get('telefon') || '').toString().trim(),
          'E-Mail: ' + (data.get('email') || '').toString().trim(),
          '',
          (data.get('nachricht') || '').toString().trim()
        ].join('\n');
      } else {
        /* Generisch: alle benannten Felder mit ihrem Label übertragen */
        var lines = [];
        Array.prototype.forEach.call(form.elements, function (el) {
          if (!el.name || el.disabled) return;
          if (el.type === 'submit' || el.type === 'button' || el.type === 'reset') return;
          var value = el.type === 'checkbox' ? (el.checked ? 'Ja' : 'Nein') : el.value.trim();
          lines.push(labelFor(form, el) + ': ' + value);
        });
        subject = form.getAttribute('data-mailto-form') || 'Nachricht über die Website';
        body = lines.join('\n');
      }

      window.location.href = 'mailto:fahrschule-wachtel@t-online.de'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);
    });
  });

  setHeaderOffset();
})();
