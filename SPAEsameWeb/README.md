# Progetto Deployato con  Netlify
```
https://69825567bc3067301f4ef4a5--gleeful-liger-060a5b.netlify.app/
```


# Bootstrap — breve guida d'uso

Bootstrap è un framework CSS utilizzato per il layout e l'organizzazione dei componenti "scrivendo il css" nel ClassName di un tag (simile a tailwindcss). Bootstrap si basa su un sistema di container righe e colonne. Ogni riga ha 12 spazi e i componenti vengono impostati su questo criterio (es: se volessi avere due componenti vicino all'altro utilizzando tutti i 12 spazi, quest'ultimi verranno suddivisi in 2 quindi 6 per un elemento 6 spazi per un altro).

Per includere Bootstrapv 5.3 nel progetto:

1. Installarlo via npm (che è già in `package.json`):

```bash
npm install bootstrap
```

<<<<<<< HEAD
Nota per React: molti componenti di Bootstrap richiedono modifiche dirette del DOM; per integrazioni migliori si possono usare librerie come `react-bootstrap`.
=======
2. L'Import CSS (parte con tutti i componenti scss) nel `main.tsx`:

```ts
import 'bootstrap/dist/css/bootstrap.min.css';
```

Nota per React: molti componenti di Bootstrap richiedono manipolazione diretta del DOM; per integrazioni più idiomatiche si possono usare librerie come `react-bootstrap`. Nel progetto corrente usiamo solo classi CSS e il grid system, quindi non è necessario importare JS aggiuntivo.
>>>>>>> 9bf5abdc1b7fe0b5101617ac3e791d3e0961341c

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

## Informazioni progetto
- **Titolo:** SPA Meteo — Esame/Progetto
- **Linguaggi / Tool:** React, TypeScript, Vite, Bootstrap 5
- **Scopo:** fornire una Single Page Application che permetta di cercare una città e visualizzarne il meteo attuale, salvare città preferite e consultare dettagli meteorologici.

## Studente / Autore
- Inserire qui il nome dello studente, matricola e corso (es. "Nome Cognome — Matricola — Corso di ...").

## Requisiti per esecuzione
- Node.js >= 16
- npm o yarn

## Installazioni per il funzionamento del progetto:
1. Clonare il repository
2. Installare dipendenze:

```bash
npm install
```

3. Avviare l'app in sviluppo:

```bash
npm run dev
```

## Lascio il link della SPA deployato grazie a Netlify

```

```

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
