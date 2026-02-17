
Map Strukture - Karta
```bash
DuckDriveBeta/
+- index.html
+- package.json
+- package-lock.json
+- Plan.md
+- server/
│   +- storage/
│   │  (files)
│   +- repository/
│   │   +- fileRepository.js
│   +- server.js
│   +- package.json
│   +- files/
│
+-  src/
│   +- main.jsx
│   +- App.jsx
│   +- components/
│   │  +- Sidebar/
│   │  │  +- Sidebar.jsx
│   │  │  +- NavButton.jsx
│   │  │
│   │  +- FileView/
│   │  │  +- DownloadButton.jsx
│   │  │  +- EmptyState.jsx
│   │  │  +- FileView.jsx
│   │  │  +- SearchField.jsx
│   │  │  +- FileList.jsx
│   │  │  +- FileRow.jsx
│   │  │ 
│   │  +- Topbar/
│   │      +- Topbar.jsx
│   │
│   +- services/
│   │   +- fileService.js
│   +- styles/
│   │   +- dark-theme.css
│   │   +- layout.css
│   │   +- light-theme.css
│   │   +- variables.css
│   │
│   +- assets/
│   
+- node_modules/
```
^ updatera ofta plz ida ^
**Appen tanke**
```bash
main.jsx
  v
App.jsx
  v
Sidebar        FileView
                  v
        SearchField + FileList
                            v
                         FileRow
```
allt är UI + data flöde
# Ansvar
### `main.jsx`
- **Ansvar**
    - startpunkt för react
    - monterar `<App />` i DOM

### `App.jsx`
- **Ansvar**
  - övergripande layout
  - äger global UI-struktur
  - Delarup sidan i:
    - Sidebar
    - Huvudytan (FileView)

Äger troligen
- tema (dark/light)
- appens grundlayout
- ev.global state (WIP senare)

### `components/` - UI byggblock
```bash
components/Sidebar/
+- Sidebar.jsx
+- NavButton.jsx
```
`Sidebar.jsx`
- **Ansvar**
  - Renderar vänstermenyn
  - Bestämmer vilka knappar som finns
- **innehåller**
  - flera `<NavButton />`

### `NavButton.jsx`
- **Ansvar** 
  - en återanvändbar menyknapp
- **Tar Emot**
  - text
  - ev. ikon
  - ev. active-state  

### `FileView.jsx`
- **Ansvar** 
  - Huvudytan till höger
  - Binder ihop:
    - sökfält
    - fil-lista
- **äger**
  - lista med filer (state)
  - söksträng (state)

### `SerachField`
- **Ansvar**
  - Visar sökfältet
  - skickar up användar input
- **Gör ej**
  - filtrerar filer själv

### `FileList.jsx`
- **Ansvar**
  - Tar emot lista av filer
  - loopar och renderar `<FileRow />`

### `FileRow.jsx`
- **Ansvar**
  - Visar en fil
  - namn
  - ikon
  - datum
  - klickbar

### `services/` - seperation av ansvsare
```
services/
+-fileService.js
```
`fileService.js`
- **Ansvar** 
  - all logik för filer
  - hämtning
  - uppladdning
  - borttagning
  - (senare) API-anrop
- **UI får Ej**
  - göra fetch
  - prata direkt med servern

### `style/`
- **Ansvar**
  - global styles
  - theme-variabler
  - reset
  - layout
- **som Exempel**
  - `variable.css`
  - `theme.css`
  - `global.css`

## prakti? plan? idk`?
börja med filerow.jsx 
- minimal jsx
- props
- ingen styling ennu

eller app.jsx layout elller eller siderbar + navbutton?
welp mc fucking goodluck

### koppla sökfältet 
```bash
SearchField -> App (state) -> FileList -> FileRow

```
### börja med light/dark mode (done)ish
Browsern väljer automatiskt
```bash
@media (prefers-color-scheme: dark) {
  body {
    background: #121212;
    color: #f5f5f5;
  }
}
```
### börja med fileService.js (done)
flyta 
- fil-lista
- sökning
- (sen upload/delet)
till
```bash
services/fileService.js
```
bra förberedelse
- för REST-API
- Visar sepration of concerns
- Gör övergång till server trivial

### gör? Fuzzy search? (mmmmmm)
idk read more .-.

### börja server (Node + Express) deutschland!
```bash
DuckDrive/
+- client/                <- React
│  +- src/
│  +- dist/               <- build-output
│  +- package.json
│
+- server/                <- Node + Express
│  +- files/              <- lagrade filer
│  +- routes/
│  │  +- files.js
│  +- server.js
│  +- package.json
│
+- README.md
```
övergripande strukture
```bash
+─────────────+        HTTP        +─────────────────+
│   Browser   │  ─────────────>    │  Express Server │
│ (React App) │  <─────────────    │  (Node.js)      │
+─────────────+                    +─────────────────+
       │                                      │
       │ GET /                                │
       │ GET /api/files                       │
       │ PUT /api/files/*                     │
       │ DELETE /api/files/*                  │
       v                                      v
  UI (React)                         File system (disk)
```
Servern ska:

1. Leverera React-appen
   - färdigbyggd (npm run build)
   - via Node + Express
2. Tillhandahålla ett REST-API
   - hantera filer på disk
   - exakt de endpoints som står i uppgiften
3. Vara utbytbar
   - frontend ska inte bry sig om hur servern funkar
   - endast vad den svarar med
Detta är riktig fullstack-arkitektur, inte skol-lab.

**problem**
använder nu i koppling med frontend
```bash
fileService.js -> lokalt minne
```
byt till liknade:
```bash
fileService.js -> fetch("/api/files")
```

### `server/server.js` ska
- starta Express
- svara på
  - `/api/files`
- senare
  - server React-build  

  React (5173)        Express (3001)
     x  <—— ingen koppling ännu
----
     
     server.js        → bara HTTP & routes
     fileService.js  → all fillogik & data

### next on list connect react and /api/files
Målet:
- Sluta använda hårdkodad files i App.jsx
- Hämta dem från servern via fetch

Resultat:
- Frontend ↔ Backend på riktigt
- Ledningen ser “aha, det här är ett moln”

1. Flytta fetch-logik till fileService.js (frontend)
```bash
getFiles()
uploadFile()
deleteFile()
```
2. Upload (PUT api/files/*)
- `<input type="file">`
- Skicka bytes till servern
- Spara på disk

### 1. inge hårdkodad i `App.jsx`
```bash
Server (api/files)
        v
fetch()
        v
App.jsx (state)
        v
FileList → FileRow
```

## Obs!
```bash
Vite / React        Express API
localhost:5173  ->  localhost:3001
```
starta backend från `Server.js`

starta frontend från projectet som `src/App.jsx`

kör samtidigt!

# ino om server status
för att se om funkar har implementerat så vi kan se status om backend funkar eller inte med dessa
```bash
http://localhost:5173
(vite/react)   (frontend)
```
```bash
http://localhost:3001
(Express)   (backend)
```
```bash
http://localhost:3001/health
(healt status should say OK)
```
```bash
http://localhost:3001/api/files
(file staus api should be just bunch of text of .pdf and .png stuff)
```

# info om Node ohc npm och express
- node.js är plattformen, inte ett externt bibliotek
- kan inte räknas som "onödigt NPm-paket"

Node.js används som server.runtime för att kunna köra JavaScript på serversidan.

- Express är ett enda välmotiverat paket
- Alternativet hade varit att bygga routing, headers, body-parsing själv -> onödigt tidskrävande

Express används för att förenkla routing och hantering av HTTP-requests.
Utan Express hade samma funktionalitet krävt betydligt mer egen kod utan att tillföra pedagogiskt värde

`node_modules`
vi har gjort npm install 2 gånger, varje `packet.json` är sin egen värld. 
det endast detta spelar roll:
1. vad som står i `dependencies`
2. vad vi faktiskt `import`/`require` i koden

```bash
  "dependencies": {
    "express": "^4.19.2"
  }
--------------------
  "dependencies": {
    "express": "^5.2.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
```  
 ^ i `package.json` i `servern/` och brevid `App.jsx` är det enda aktiva NPM-valet.

**kontroll**
vi kan kollla om vi använder:
```bash
import axios from "axios";
import multer from "multer";
import lodash from "lodash";
``` 
^som vi inte har behov av  me som expemel

Projektet har två package.json eftersom server och klient är separerade.
På serversidan används endast Express som externt NPM-paket.
Övriga beroenden på klientsidan kommer från byggverktyget och används inte direkt i egen kod.

```bash
import express from "express";
import fs from "fs";
import path from "path";
``` 
i `server.js`  import
- express  = Extern NPM-paket
- fs       = Node core
- path     = Node core

- lösning med root `npm unistall express` i package.json i root/
- filuppladdning hanteras utan extern biblotek geonm Express raw-middleware och Node.js fs

vi skulle kunnna göra egen mini-server utan express men det är inte värt med den tiden vi har i läget.

inge fell med Express 
- routing (GET /api/files)
- middleware (`express.json`, `express.raw`)
- starta server (`app.listen`)

### gör egen express?
- använda `http.createServer`
- parsa URL manuelt
- läsa header själv
- hantera CORS själv
- hantera body streams själv
- bygga routing själv

```bash
import http from "http";

http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/api/files") {
    // ...
  }
});
```
- sanolik risk för buggar = mycket
- kommer inte ge mer betyg för det = nej inte den extra jobb
- tid = ja
