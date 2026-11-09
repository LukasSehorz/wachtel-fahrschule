/* Foto-Galerie: Vorschaubild anklicken -> groß im Dialog anzeigen */
(function () {
  var links = document.querySelectorAll('.photo-strip__item');
  if (!links.length || typeof HTMLDialogElement === 'undefined') return;

  var dlg = document.createElement('dialog');
  dlg.className = 'lightbox';
  dlg.setAttribute('aria-label', 'Foto vergrößert');
  dlg.innerHTML = '<button class="lightbox__close" type="button" aria-label="Schließen">×</button><img alt="">';
  document.body.appendChild(dlg);
  var img = dlg.querySelector('img');

  links.forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var thumb = a.querySelector('img');
      img.src = a.getAttribute('href');
      img.alt = thumb ? thumb.alt : '';
      dlg.showModal();
    });
  });
  dlg.addEventListener('click', function () { dlg.close(); });
})();
