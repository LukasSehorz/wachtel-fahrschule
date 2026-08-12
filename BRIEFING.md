# Fahrschule Wachtel — Website Neubau

**Quelle Inhalte:** https://www.fahrschule-wachtel-theorie.de (alle Texte 1:1 übernehmen, NICHTS umformulieren, NICHTS erfinden)
**Design-Referenzen:** fs-speedlimit.com · fahrschule-servus.de · fahrschule-obermaier.de

---

## 1. HARTE REGELN

1. **Alle Inhalte 1:1** von der Bestandsseite. Keine erfundenen Preise, Zahlen, Bewertungen, Teamnamen, Google-Sterne oder Testimonials. Was nicht im Briefing steht, kommt nicht auf die Seite.
2. **Alle Section-Hintergründe sind WEISS** (`#FFFFFF`). Keine dunklen Bänder, keine farbigen Vollflächen als Section-Background. Trennung erfolgt über Karten, Rahmen, Schatten und Bilder.
3. **Kein "KI-Look"**: keine Emoji-Icons, keine Glow-/Neon-Effekte, keine lila/blaue Verlaufsflächen, keine generischen "AI-Gradients", keine Stock-Floskeln.
4. **Animationen dezent**: nur `transform` + `opacity`, 150–400 ms, Scroll-Reveal mit kleinem Versatz (max. 24 px), Text-Fill-Effekt beim Scrollen. Keine langen Scroll-Choreografien, kein Parallax-Overkill. `prefers-reduced-motion` respektieren.
5. **Autos nur von innen.** Kein Fahrzeug von außen, kein Kennzeichen. VW-Logo am Lenkrad ist erwünscht (Kunde fährt u. a. Golf GTD).

---

## 2. DESIGN-SYSTEM

### Farben (abgeleitet aus dem Logo: gelb / rot / schwarz)
```css
--wa-yellow:      #FFCC00;  /* Primär-Akzent, CTA-Buttons, Zahlen, Marker */
--wa-yellow-deep: #E6B400;  /* Hover / Border */
--wa-red:         #D6001C;  /* Sekundär-Akzent, Highlights, Icon-Details */
--wa-red-deep:    #A80016;
--wa-black:       #111111;  /* Headlines, sekundäre Buttons */
--wa-ink:         #1C1C1C;  /* Fließtext */
--wa-grey:        #5A5A5A;  /* Sekundärtext */
--wa-line:        #E4E4E4;  /* Rahmen, Trenner */
--wa-surface:     #FFFFFF;  /* ALLE Sections */
--wa-card:        #FFFFFF;  /* Karten + 1px Border + weicher Schatten */
```
**Kontrast:** Gelb NIE als Textfarbe auf Weiß. Gelbe Buttons bekommen **schwarze** Schrift (`#111`) — Kontrast 12:1. Roter Text auf Weiß ist erlaubt (`#D6001C`, 5.3:1).

### Typografie
```
Headlines: "Archivo", ui-sans-serif  — 700/800, leicht negatives Tracking (-0.02em)
Fließtext: "Inter", system-ui        — 400/500/600, line-height 1.65
```
Google Fonts: `https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap`

Type-Scale (clamp, mobile→desktop):
- H1 `clamp(2.4rem, 6vw, 4.4rem)` · H2 `clamp(1.9rem, 3.6vw, 3rem)` · H3 `1.35rem` · Body `1.0625rem` · Small `0.9375rem`

### Form & Raum
- Container `max-width: 1200px`, Padding `0 24px`
- Section-Abstand `clamp(72px, 9vw, 128px)`
- Radius: Karten `18px`, Buttons `999px` (Pill, wie Servus), Bilder `18px`
- Schatten: `0 2px 4px rgba(0,0,0,.04), 0 12px 32px rgba(0,0,0,.07)`
- Buttons: **Primär** gelb + schwarze Schrift + Pfeil `→`; **Sekundär** schwarz + weiße Schrift; **Tertiär** transparent + 1.5px schwarze Border

### Animationen (erlaubte Liste)
| Effekt | Einsatz | Detail |
|---|---|---|
| `reveal` | Sections, Karten | opacity 0→1, translateY 24px→0, 500ms ease-out, Stagger 60ms |
| `text-fill` | H2 der Hauptsections | Buchstaben starten bei `color: #DADADA`, füllen sich beim Scrollen zu `#111` (background-clip Trick, an Scroll-Fortschritt gekoppelt) |
| `img-zoom` | Bildkarten | scale 1→1.04 bei Hover, 400ms |
| `counter` | Zahlen (nur echte!) | nicht verwenden — keine echten Statistiken vorhanden |
| `sticky-header` | Header | ab 40px scrollen: Schatten + kompakter |

---

## 3. SEITENSTRUKTUR

**Multipage**, statisches HTML/CSS/JS (kein Build-Tool), Dateien:

```
index.html               Startseite
service.html             SERVICE
klassen.html             KLASSEN (Übersicht Ausbildungsklassen)
b197.html                AUTOMATIKREGELUNG B197
b196.html                FÜHRERSCHEIN-UPGRADE B196
formalitaeten.html       FORMALITÄTEN
filialen.html            FILIALEN
fuehrerscheinklassen.html Führerscheinklassen (große Rechtstabelle)
pruefungsrichtlinie.html Prüfungsrichtlinie
praxis.html              Praxis
theorie.html             Theorie
anmeldung.html           Anmeldung & Unterlagen + Neuanmeldung-Formular
impressum.html
datenschutz.html
standort.html
assets/css/style.css
assets/js/main.js
assets/img/…  assets/video/…
```

### Navigation (exakt wie Original)
`HOME · SERVICE · KLASSEN · AUTOMATIKREGELUNG B197 · FÜHRERSCHEIN-UPGRADE B196 · FORMALITÄTEN · FILIALEN · Bürozeiten`

Topbar darüber (wie Obermaier): Telefon `08161-7064` · E-Mail · „Anfahrt" · Button **„Neuanmeldung"** (gelb).
Footer-Nav (wie Original): `Führerscheinklassen · Prüfungsrichtlinie · Praxis · Theorie · Anmeldung & Unterlagen`

---

## 4. STARTSEITE — SECTION-PLAN
*(Sections gewählt aus den drei Referenzen, Quelle jeweils genannt)*

**S1 — Hero** *(Servus-Layout + Obermaier-Textanimation)*
- Vollbreites **Video** (`assets/video/hero-fahrstunde.mp4`, autoplay muted loop playsinline, Poster = `hero-fahrstunde.jpg`), darüber Verlauf `linear-gradient(90deg, rgba(0,0,0,.72) 0%, rgba(0,0,0,.35) 55%, transparent 100%)`
- Kicker: `Fahrschule in Freising & Allershausen`
- H1: **„In unserer Fahrschule, sicher und mit Freude zum Führerschein"** *(Originaltext)*
- Sub: „Preise vergleichen lohnt sich! Ihr wollt faire Preise? Freundliche und erfahrene Fahrlehrer? Dann ab zu uns!" *(Originaltext)*
- CTAs: **„Jetzt anmelden →"** (gelb) · **„08161-7064"** (weiß-outline)
- Hero-Höhe `min(88vh, 780px)`

**S2 — Hinweis-Band (USP)** *(Speedlimit-Pill-Reihe, hier als Karte)*
Weißer Hintergrund, gelb umrandete Karte mit rotem Icon:
> **KEINE PFLICHT ZU SIMULATORSTUNDEN!!!** — BEI UNS AB DER 1. FAHRT AM REALEN FAHRZEUG *(Originaltext)*
Zweite Karte: **THEORIE LERNEN, AN DEM ORT DEINER WAHL** *(Originaltext)*

**S3 — Klassen-Grid** *(Servus-Bildkarten + Obermaier-Farbwelt)*
Überschrift „Unsere Ausbildungsklassen". Karten für **Mofa, AM, A1, A2, A, B, BE, B196, B197** mit den Originalbeschreibungen aus `n_klassen.txt`. Kartenstil: weiße Karte, gelbe Klassen-Plakette oben links, Beschreibung, Link „mehr erfahren →".

**S4 — Service** *(Speedlimit „Über uns" 2-Spalter)*
Links Text-Intro „Nutzen Sie unseren freundlichen und zuverlässigen Service", rechts die 7 Punkte als Checkliste mit rotem Haken *(alle Punkte aus `n_service.txt`, wortwörtlich)*. Bild: `praxis-fahrstunde.jpg`.

**S5 — Dein Weg zum Führerschein** *(Obermaier Zickzack-Timeline, aber auf WEISS)*
5 Schritte mit großen **gelben Ziffern 01–05**, dünne graue Verbindungslinien-Pfeile (SVG), abwechselnd links/rechts. Inhalte aus `n_formalitaeten.txt` + `w_139.txt` (Antrag → Sehtest/Erste Hilfe/Passbild → Theorie & Praxis → Theorieprüfung → praktische Prüfung). Bilder: `theorie-unterricht.jpg`, `praxis-fahrstunde.jpg`, `erfolg-fuehrerschein.jpg`.

**S6 — Checkliste zur Anmeldung** *(Original-Highlight der Bestandsseite)*
„CHECKLISTE !!! Was brauchst du für die Anmeldung bei uns?" — die 6 Punkte 1:1 als nummerierte Karten. CTA: „Zur Neuanmeldung →".

**S7 — B197 / B196 Doppelkarte** *(Servus „Wir bieten an"-Karten)*
Zwei große Karten mit Kurzbeschreibung und Link auf die Detailseiten.

**S8 — Filialen** *(Servus-Standortsektion mit Icon-Raster)*
Zwei Standorte (Freising / Allershausen) mit Adresse, Telefon, Öffnungszeiten — alles aus `n_filialen.txt` und dem Kontakt-Widget.

**S9 — FAQ** *(Servus-Accordion)*
Nur Fragen, die aus vorhandenem Content beantwortbar sind (Unterlagen, Bearbeitungszeit, Theorieumfang, Sonderfahrten, Fristen). Antworten wörtlich aus `w_139.txt` / `n_formalitaeten.txt` / `w_41.txt`.

**S10 — Kontakt / CTA** *(Speedlimit-Kontaktsektion, auf Weiß)*
Links Kontaktdaten + Öffnungszeiten, rechts Kontaktformular (Name, Telefon, E-Mail, Nachricht, Datenschutz-Checkbox). Formular ohne Backend → `mailto:` bzw. deutlich als Demo markiert.

**S11 — Footer**
Schwarzer Footer ist erlaubt (Footer ≠ Section). Logo-Schriftzug, Adresse, Kontakt, Footer-Nav, Impressum/Datenschutz/Standort.

---

## 5. INHALTE (1:1 zu übernehmen)

Alle Volltexte liegen in `_research/txt/`:

| Datei | Inhalt |
|---|---|
| `wachtel_home.txt` | Startseite, Slider-Claims, Checkliste, Kontakt-Widget |
| `n_service.txt` | SERVICE (7 Leistungspunkte) |
| `n_klassen.txt` | KLASSEN (Mofa…B197 mit Beschreibungen) |
| `n_b197.txt` | AUTOMATIKREGELUNG B197 (voller Text + „Das ist zu beachten") |
| `n_b196.txt` | FÜHRERSCHEIN-UPGRADE B196 (voller Text) |
| `n_formalitaeten.txt` | FORMALITÄTEN (Unterlagen, Umfang, Termine & Fristen, Sonstige) |
| `n_filialen.txt` | FILIALEN (Freising + Allershausen) |
| `w_39.txt` | Führerscheinklassen — komplette Rechtstabelle (gültig seit 19.01.2013) |
| `w_41.txt` | Praxis — Grundausbildung + Sonderfahrten + Klassenliste |
| `w_43.txt` | Theorie — Theoretische Mindestausbildung + Klassenliste |
| `w_44.txt` | Prüfungsrichtlinie (Stand März 2014) — sehr lang, vollständig übernehmen |
| `w_139.txt` | Benötigte Unterlagen zur Führerscheinprüfung |
| `w_49.txt` | Anmeldeformular-Felder + Sprachauswahl |
| `w_286.txt` | Impressum |
| `w_382.txt` | Datenschutzerklärung (vollständig) |

### Stammdaten
```
Fahrschule Wachtel
General-von-Nagel-Str. 3, 85354 Freising
Filiale: Freisinger Straße 12, 85391 Allershausen
Tel:   08161-7064
Fax:   08161-548 758
Mail:  fahrschule-wachtel@t-online.de
USt-IdNr.: DE 246116273
Verantwortlich: Herr Hofmann
Fahrerlaubnisbehörde: Landratsamt Freising, Landshuter Straße 31, 85354 Freising

Bürozeiten / Unterricht
Freising:      Montag 17.30–18.30 Uhr · Donnerstag 17.30–18.30 Uhr
Allershausen:  Dienstag und Mittwoch 18.00–18.30 Uhr
```

---

## 6. MEDIEN (bereits generiert, in `assets/`)

| Datei | Motiv | Einsatz |
|---|---|---|
| `img/hero-fahrstunde.jpg` | Fahrschülerin am VW-Lenkrad, bayerische Landstraße (2752×1536) | Hero-Poster |
| `video/hero-fahrstunde.mp4` | 5 s Kling-3.0-Loop derselben Szene | Hero-Video |
| `img/theorie-unterricht.jpg` | Theorieunterricht, Fahrlehrer + Schüler | S5 Schritt „Theorie" |
| `img/praxis-fahrstunde.jpg` | Fahrlehrer + Fahrschüler im VW-Innenraum | S4 / S5 |
| `img/erfolg-fuehrerschein.jpg` | Junger Mann hält Führerschein | S5 Schritt 05 |

Fehlende Motive (Motorrad B196, Automatik B197, Standorte) **nicht** durch Stockbilder oder Platzhalter ersetzen, sondern durch typografische/ikonografische Karten lösen (SVG-Icons, gelbe Klassen-Plaketten). Icons: Lucide/Heroicons als Inline-SVG, Strichstärke 1.75.

---

## 7. QUALITÄTSKRITERIEN (Abnahme)

- [ ] Jeder Text der Bestandsseite ist auffindbar — kein Inhalt verloren
- [ ] Kein erfundener Inhalt (Preise, Bewertungen, Namen, Zahlen)
- [ ] Alle Section-Backgrounds weiß
- [ ] Gelbe Buttons mit schwarzer Schrift, Kontrast ≥ 4.5:1 überall
- [ ] Responsive geprüft bei 375 / 768 / 1024 / 1440 px, kein horizontales Scrollen
- [ ] Telefonnummer und „Neuanmeldung" von jeder Seite in ≤ 1 Klick erreichbar
- [ ] Animationen ≤ 400 ms, `prefers-reduced-motion` respektiert
- [ ] Keine Emoji als Icons, keine Placeholder-Bilder, keine Lorem-ipsum-Reste
- [ ] Alle internen Links funktionieren, alle Seiten existieren
