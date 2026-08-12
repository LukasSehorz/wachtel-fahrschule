# Fahrschule Wachtel — neue Website

Statische Website (HTML/CSS/JS, kein Build-Tool). Einfach `index.html` im Browser öffnen
oder den Ordner auf einen Webspace legen.

## Seiten (15)

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite |
| `service.html` | Service |
| `klassen.html` | Ausbildungsklassen |
| `b197.html` | Automatikregelung B197 |
| `b196.html` | Führerschein-Upgrade B196 |
| `formalitaeten.html` | Formalitäten |
| `filialen.html` | Filialen + Bürozeiten (`#buerozeiten`) |
| `anmeldung.html` | Anmeldung & Unterlagen + Anmeldeformular |
| `fuehrerscheinklassen.html` | Alle Führerscheinklassen (Rechtstabelle) |
| `pruefungsrichtlinie.html` | Prüfungsrichtlinie (Stand März 2014, 31 Tabellen) |
| `praxis.html` | Praktische Mindestausbildung |
| `theorie.html` | Theoretische Mindestausbildung |
| `standort.html` | Standort / Anfahrt |
| `impressum.html` | Impressum |
| `datenschutz.html` | Datenschutzerklärung |

## Inhalt

Alle Texte stammen 1:1 von **fahrschule-wachtel-theorie.de**. Geprüft per Skript
(`_research/coverage.py`): **97,5 % wörtliche Zeilenabdeckung**. Die restlichen 2,5 %
sind ausschließlich Zeilen, deren Wortlaut durch die Umstellung auf echte Tabellen in
die Spaltenköpfe gewandert ist (z. B. „Mindestalter: 15 Jahre" → Spalte *Mindestalter*,
Zelle *15 Jahre*). Kein Satz wurde gekürzt, umformuliert oder erfunden.

**Bewusst nicht erfunden:** Preise, Google-Bewertungen, Sterne, Teammitglieder,
Statistiken. Sobald der Kunde diese liefert, lassen sie sich als weitere Sections
ergänzen (Komponenten stehen bereit).

## Design

Orientiert an den Referenzen fs-speedlimit.com, fahrschule-servus.de und
fahrschule-obermaier.de — übernommen wurden jeweils die stärksten Sections:

- **Hero mit Video + dunklem Verlauf** (Servus/Speedlimit)
- **Zickzack-Timeline mit großen gelben Ziffern 01–05** (Obermaier)
- **Standortkarten mit Icon-Raster** (Servus)
- **Klassen-Karten, FAQ-Accordion, Kontaktsektion** (Servus/Speedlimit)

Farben aus dem Logo: Gelb `#FFCC00`, Rot `#D6001C`, Schwarz `#111111`.
**Alle Section-Hintergründe sind weiß**, nur der Footer ist schwarz.

**Schrift:** Fraunces (Serif, Überschriften) + Figtree (Grotesk, Fließtext und
Bedienelemente). Die Serif gibt den Überschriften Charakter, die Grotesk hält
Buttons, Navigation und Formulare klar — bewusst weg von der
Standard-Sans-Kombination, die nach Baukasten aussieht.

**Login:** oben rechts, mit Schloss-Symbol links neben „Neuanmeldung" — gleiche
Reihenfolge wie auf der Bestandsseite. Der Button öffnet ein Anmeldefenster mit
Benutzername und Passwort (dieselben Felder wie das heutige TYPO3-Login zum
Lerncenter). **Es ist noch keine Anmeldung angeschlossen** — beim Absenden
erscheint ein Vorschau-Hinweis. Die Verbindung zum Lerncenter kommt beim
Livegang dazu.

**Navigation:** sechs Punkte in einer Zeile. Die langen Titel
„Automatikregelung B197" und „Führerschein-Upgrade B196" liegen im Untermenü
unter *Klassen*, zusammen mit Ausbildungsklassen, Führerscheinklassen, Praxis
und Theorie. Auf dem Handy ist das Untermenü dauerhaft ausgeklappt.

### Animationen
- Scroll-Reveal (opacity + 24 px translateY, 500 ms), Elemente gestaffelt
- **Text-Fill-Effekt**: Überschriften starten hellgrau und füllen sich beim Scrollen
  buchstabenweise mit Schwarz
- Bilder fahren hinter einer Kante hervor (clip-path) und zoomen dabei leicht aus
- Hero: Inhalte staffeln sich beim Laden ein, das Video zoomt langsam aus
- Schrittziffern 01–05 setzen sich versetzt, Plaketten und Icons poppen auf,
  Listenpunkte laufen nacheinander ein, der Kicker-Strich wächst auf
- Untermenü gleitet auf, Accordion-Antworten gleiten ein, Tabellenzeilen
  bekommen beim Überfahren eine gelbe Kante
- Bild-Hover-Zoom (1.04), Sticky-Header
- `prefers-reduced-motion` schaltet alles ab

Das Hero-Video läuft **einmal durch und bleibt dann stehen** (kein Loop).

## Medien

Mit KI erzeugt (kie.ai — Bilder: Nano Banana 2, Video: Kling 3.0):

| Datei | Motiv |
|---|---|
| `assets/video/hero-fahrstunde.mp4` | 5 s Hero-Video, Fahrschülerin am VW-Lenkrad |
| `assets/img/hero-fahrstunde.jpg` | Poster zum Video |
| `assets/img/praxis-fahrstunde.jpg` | Fahrlehrer + Fahrschüler im VW-Innenraum |
| `assets/img/erfolg-fuehrerschein.jpg` | Junger Mann mit Führerschein |
| `assets/img/theorie-unterricht.jpg` | Theorieunterricht |

Alle Fahrzeugaufnahmen sind **Innenaufnahmen mit VW-Logo**, kein Kennzeichen sichtbar.
Originaldateien liegen in `_research/orig/`, web-optimiert sind es zusammen 1,4 MB
(vorher 11 MB).

### Offen: weitere Motive
Das kie.ai-Guthaben ist aufgebraucht (Kling 3.0 kostet ~70 Credits pro 5-s-Video,
Nano Banana 2 8–12 Credits pro Bild). Mit neuem Key sinnvoll ergänzbar:
Motorrad (B196), Automatikgetriebe (B197), Außenansicht der beiden Filialen,
Team-/Büroaufnahmen. Diese Stellen sind aktuell typografisch/mit SVG-Grafiken gelöst
und sehen bewusst gestaltet aus, nicht wie fehlende Bilder.

## Technischer Stand (geprüft)

- Kein horizontales Scrollen bei 375 / 768 / 1024 / 1440 px
- Genau eine `<h1>` pro Seite, saubere Überschriftenhierarchie
- Alle Bilder mit `alt`, keine toten Links, keine fehlenden Dateien
- Keine Konsolenfehler, keine Emoji als Icons, alle Icons als Inline-SVG
- Gelbe Buttons mit schwarzer Schrift (Kontrast 12:1)
- Skip-Link, Tastaturbedienung, `aria-current` auf dem aktiven Navigationspunkt

## Zu klären mit dem Kunden

1. **Logo** — es liegt keine Logodatei vor. Aktuell ist ein typografischer Lockup
   in HTML/CSS gebaut (gelb/rot/schwarz). Original-Logo bitte anfordern.
2. **Formulare** — es gibt kein Backend. Kontakt- und Anmeldeformular öffnen das
   E-Mail-Programm (`mailto:`). Für echten Versand braucht es ein Formular-Skript
   oder einen Dienst.
3. **Online-Lerncenter / Login** — die alte Seite hat einen Schülerlogin
   (TYPO3-Extension). Der ist hier nicht nachgebaut; falls er bleiben soll, muss
   er verlinkt oder angebunden werden.
4. **Google Maps** — auf `standort.html` bewusst nur als Link (kein iframe) wegen
   Datenschutz. Auf Wunsch mit Zwei-Klick-Lösung einbindbar.
5. **Bewertungen/Preise** — sobald vorhanden, ergänzen wir Sections dafür.

## Ordner

```
index.html … datenschutz.html   die 15 Seiten
assets/css/style.css            Design-System
assets/js/main.js               Navigation, Reveal, Text-Fill, Accordion, Formulare
assets/img/  assets/video/      Medien
BRIEFING.md                     Design- und Content-Briefing
_research/                      Recherche, Originaltexte, Screenshots, Prüfskripte
                                (gehört nicht zum Livegang)
```
