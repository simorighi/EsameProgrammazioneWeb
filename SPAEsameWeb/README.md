# Bootstrap — breve guida d'uso

Bootstrap è un framework CSS open-source che semplifica la creazione di layout responsive e componenti UI pronti all'uso (griglie, bottoni, card, navbar, form). Nel contesto di questa SPA viene usato principalmente per il sistema a griglia (container / row / col), le utility classes per spacing e allineamento e le componenti visive (card, buttons).

Come includere Bootstrap nel progetto:

1. Installazione via npm (già presente in `package.json`):

```bash
npm install bootstrap
```

Nota per React: molti componenti di Bootstrap richiedono modifiche dirette del DOM; per integrazioni migliori si possono usare librerie come `react-bootstrap`.

Concetti utili di Bootstrap usati nel progetto:
- Grid system: `container`, `row`, `col-12 col-sm-6 col-md-4` (breakpoint xs/sm/md/lg/xl/xxl).
- Utility classes: `d-flex`, `justify-content-center`, `align-items-center`, `p-2`, `m-3`, `text-white`.
- Componenti: `card`, `btn`, `navbar`.
- Personalizzazione: è possibile sovrascrivere variabili Sass di Bootstrap per tema e colori se si compila da sorgente.

Esempio rapido di layout responsivo:

```jsx
<div className="container">
  <div className="row">
    <div className="col-12 col-md-6">Colonna 1</div>
    <div className="col-12 col-md-6">Colonna 2</div>
  </div>
</div>
```

# Consegna progetto — SPA Meteo (React + TypeScript + Vite)

Questo documento è la versione formale della documentazione pensata per la consegna a un docente universitario. Descrive scopo, funzionamento, istruzioni di setup, struttura del codice, verifiche da eseguire e note importanti per la valutazione.

## Informazioni progetto
- **Titolo:** SPA Meteo — Esame/Progetto
- **Linguaggi / Tool:** React, TypeScript, Vite, Bootstrap 5
- **Scopo:** fornire una Single Page Application che permetta di cercare una città e visualizzarne il meteo attuale, salvare città preferite e consultare dettagli meteorologici.

## Studente / Autore
- Inserire qui il nome dello studente, matricola e corso (es. "Nome Cognome — Matricola — Corso di ...").

## Requisiti per esecuzione
- Node.js >= 16
- npm o yarn

## Setup rapido (per il docente)
1. Clonare il repository
2. Installare dipendenze:

```bash
npm install
```

3. Avviare l'app in sviluppo:

```bash
npm run dev
```

4. Compilare per produzione:

```bash
npm run build
```

5. Anteprima della build:

```bash
npm run preview
```

Nota: la API key di OpenWeatherMap è attualmente inserita direttamente in `src/utils/weatherApi.ts` per semplicità di valutazione. Per un deployment reale occorre spostarla in variabili d'ambiente e non committarla.

## Come testare (checklist rapida per il docente)
- Avviare `npm run dev` e aprire `http://localhost:5173` (o la porta indicata da Vite).
- Nella Home verificare che venga caricata la città principale (es. Roma) e che appaiano le card informative.
- Usare la barra di ricerca per cercare una città a scelta; verificare che la pagina di dettaglio mostri i dati corretti (temperatura, minima/massima, umidità, vento, pressione, coordinate).
- Aggiungere/rimuovere dai preferiti e verificare che i dati siano persistiti via `localStorage` (chiudere/riaprire pagina).
- Ridimensionare la finestra per verificare il comportamento responsive (mobile/tablet/desktop).

## Struttura del progetto (principali file e cartelle)
- `index.html` — entry HTML
- `src/main.tsx` — bootstrap dell'app
- `src/App.tsx` — definizione delle rotte e layout
- `src/pages/Home.tsx` — pagina principale (ricerca, header, elenco città)
- `src/pages/CityDetails.tsx` — pagina di dettaglio per singola città
- `src/pages/Favorites.tsx` — pagina preferiti
- `src/components/componentsReusable/` — componenti riutilizzabili
  - `CardInfo.tsx` — card dettagliata meteo per una città
  - `CardCity.tsx` — card riassuntiva per la lista delle città
  - `SearchBar.tsx` — input di ricerca
  - `Button.tsx` — componente bottone riutilizzabile
- `src/hooks/useFavorites.ts` — hook per la gestione dei preferiti (salvataggio su `localStorage`)
- `src/utils/weatherApi.ts` — wrapper per OpenWeatherMap (più funzioni di utilità)

## Componenti principali — descrizione breve
- `CardInfo` — mostra i dettagli completi di una città (icona, temperature, umidità, vento, pressione, coordinate). Usata in `CityDetails` e in Home per riepilogo.
- `CardCity` — card compatta usata per la lista di città suggerite nella Home.
- `SearchBar` — componente con input e callback `onSearch(city: string)` che esegue il redirect verso `/city/:cityName`.
- `useFavorites` — hook che espone `addFavorite`, `removeFavorite`, `isFavorite` e mantiene i preferiti in `localStorage`.

## API e configurazione
- Le chiamate meteo si trovano in `src/utils/weatherApi.ts`. Funzioni principali:
  - `getCurrentWeatherByCity(cityName: string): Promise<WeatherData | null>`
  - `getWeatherForMultipleCities(cityNames: string[]): Promise<WeatherData[]>`
  - `getCurrentWeatherByCoordinates(lat: number, lon: number): Promise<WeatherData | null>`
- `WeatherData` è l'interfaccia TypeScript che definisce i campi utilizzati dall'app (nome città, temperature, umidità, vento, icona, lat/lon).
- Per consegna formale: si consiglia di estrarre la API key in una variabile d'ambiente. Esempio `.env` (NON committare il file `.env`):

```env
VITE_OPENWEATHER_API_KEY=la_tua_chiave
```

e in `weatherApi.ts` leggere con `import.meta.env.VITE_OPENWEATHER_API_KEY`.

## Funzionalità implementate (lista per la valutazione)
- Ricerca città e visualizzazione dettagli meteo
- Lista di città pre-caricate nella Home
- Visualizzazione dettagli (temperatura, percepita, min/max, umidità, vento, pressione, coordinate)
- Aggiungi/rimuovi preferiti con persistenza in `localStorage`
- Layout responsive basato su Bootstrap

## Test manuali consigliati (casi minimi da verificare)
1. Ricerca di una città valida (es. "Milano") → pagina dettagli: dati sensati.
2. Ricerca di città non valida → mostra messaggio di errore o fallback.
3. Aggiunta ai preferiti → verifica `localStorage` e visualizzazione nella pagina `Favorites`.
4. Visualizzazione su schermo piccolo (mobile): controllare leggibilità e sovrapposizioni.

## Limitazioni note
- API key è hardcoded (motivo: semplicità per l'esercizio). Da rimuovere prima di deploy pubblico.
- Mancano test automatizzati unit/e2e.
- Gestione errori minima — può essere migliorata con notifiche e retry.

## Miglioramenti possibili (per punti extra)
- Spostare la API key nel `.env` e usarla con `import.meta.env`.
- Aggiungere test unitari (Jest / React Testing Library) e test di integrazione.
- Localizzazione completa (i18n) e gestione multi-lingua.
- Migliorare accessibilità e coprire casi di edge (offline, latenza alta).

## Istruzioni di consegna (consigliate per il docente)
1. Includere il repository Git con tutti i file sorgente.
2. Se richiesto, allegare un file ZIP con la cartella del progetto.
3. Fornire il branch o il tag usato per la consegna.
4. Fornire eventuali credenziali o API key di prova (se necessario) in un file separato e non committato.

Suggerimento commit esempio:

```bash
git add .
git commit -m "feat: consegna progetto SPA Meteo - Nome Cognome"
git push origin main
```

## Valutazione: checklist suggerita per il docente
- [ ] L'app si avvia correttamente con `npm run dev`.
- [ ] Le funzionalità richieste (ricerca, dettagli, preferiti) sono implementate.
- [ ] Uso corretto di TypeScript (tipi principali definiti).
- [ ] Interfaccia responsive funzionante su breakpoint comuni.
- [ ] Codice leggibile e organizzato in componenti.

## Contatti e note finali
- Se vuoi che prepari una versione con API key esterna (`.env`) o che aggiunga test automatici, posso farlo su richiesta.

---

### Stato attività (interno)
- Bozza README: completata
- Aggiornamento file repo: completato
- Verifica finale: disponibile su richiesta
