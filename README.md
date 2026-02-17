# QuackDrive - Ett modernt molnlagringskoncept

QuackDrive är en professionell fullstack-applikation och en förenklad klon av Google Drive. Projektet visar upp ett rent och intuitivt användargränssnitt för effektiv filhantering, stöttat av en robust Node.js-server.

## 🚀 Översikt
Detta projekt har utvecklats för att demonstrera hög standard inom mjukvaruuteckning med fokus på:
- **Frontend-logik:** Komplex tillståndshantering med React hooks, flervalsfunktionalitet och "debounced" sökning.
- **Backend-integritet:** Asynkron filhantering med Express och säker lagringshantering.
- **Säkerhet:** Implementering av "filename sanitization" för att förhindra Path Traversal-sårbarheter.
- **Modern UI/UX:** En responsiv design inspirerad av Google Drive med fullt stöd för ljust och mörkt tema.

## ✨ Nyckelfunktioner
- **Filoperationer:** Ladda upp, ladda ner och ta bort filer utan ansträngning.
- **Flerval:** Hantera flera filer samtidigt med kryssrutor och massradering.
- **Snabb sökning:** Filtrering av filer i realtid med ett sökfält som använder debounce för optimerad prestanda.
- **Teman:** Växla mellan ljust och mörkt läge med en sömlös användarupplevelse.
- **Användarvänlig felhantering:** Integrerade notifieringar vid nätverks- eller serverproblem.
- **Säkerhet:** Backend-validering säkerställer att alla filoperationer hålls strikt inom den angivna lagringsmappen.

## 🛠 Teknikstack
- **Frontend:** React (Vite), CSS3 (Variabler & Media Queries)
- **Backend:** Node.js, Express
- **API:** RESTful-arkitektur
- **Verktyg:** Git, npm, PowerShell/Bash

## 📦 Installation & Konfiguration

### Förutsättningar
- **Node.js** (v16.0.0 eller högre)
- **npm** (v7.0.0 eller högre)

### Steg-för-steg setup
1. **Klona repot:**
   ```bash
   git clone https://github.com/dittanvandarnamn/quackdrive.git
   cd quackdrive
   ```

2. **Installera beroenden för Frontend:**
   ```bash
   npm install
   ```

3. **Installera beroenden för Backend:**
   ```bash
   cd server
   npm install
   ```

### Köra lokalt
1. **Starta Backend-servern:**
   ```bash
   # Inuti /server mappen
   npm run dev
   ```
   API:et finns tillgängligt på `http://localhost:3001`.

2. **Starta Frontend-servern:**
   ```bash
   # Från projektets rotmapp
   npm run dev
   ```
   Applikationen finns på `http://localhost:5173`.

## ☁️ Notering om distribution (Deployment)
Denna applikation använder för närvarande ett lokalt filsystem för lagring i demosyfte. På molnbaserade plattformar med "ephemeral hosting" (som **Render** eller **Vercel**) återställs uppladdade filer vid omstart av servern.

**Rekommendation för produktion:** För permanent lagring bör backend integreras med molnlösningar som **AWS S3**, **Google Cloud Storage** eller **Vercel Blob**.

## 📄 Licens
Detta projekt är licensierat under MIT-licensen.
