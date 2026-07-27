# Auto škola Dule — sajt (statični fajlovi)

Ovaj folder sadrži kompletan sajt, spreman za push na GitHub (npr. GitHub Pages).

## Fajlovi
- `Auto škola Dule.dc.html` — Početna
- `Naš tim.dc.html` — Naš tim
- `Kategorije.dc.html` — Kategorije (tabovi A/B/C, cenovnik detalja, upis online, e-učionica)
- `Cenovnik.dc.html` — Cenovnik
- `Vozila.dc.html` — Vozni park
- `O nama.dc.html` — O nama
- `support.js` — runtime potreban svakoj stranici (ne menjati/brisati)
- `preloader.js` — logika za intro animaciju
- `mobile.css` — responsive stilovi (mobilni/tablet prelomi)
- `index.html` — redirect na početnu stranu (za root URL na GitHub Pages)

## Deploy na GitHub Pages
1. Napravi novi repo i push-uj sav sadržaj ovog foldera u njegov koren (ili u `/docs` folder).
2. U repo Settings → Pages, izaberi granu i folder (root ili `/docs`).
3. Sajt će biti dostupan na `https://<user>.github.io/<repo>/` — `index.html` automatski vodi na početnu.

## Napomena
Svaka `.dc.html` stranica je samostalan fajl (nosi sopstveni `<head>`/stilove) i učitava `support.js` relativnom putanjom — folder mora ostati pljosnat (svi fajlovi u istom nivou) kao što jeste ovde.

Forme za online upis i e-učionicu trenutno samo simuliraju uspešno slanje (nema stvarnog backend-a/emaila) — to treba povezati sa servisom po izboru (npr. Formspree, EmailJS, ili sopstveni endpoint) pre produkcije.
