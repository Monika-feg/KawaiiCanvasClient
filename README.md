# KawaiiCanvasClient

Detta är frontend-delen till KawaiiCanvas, en kawaii-inspirerad webbshop för tavlor! 🖼️✨

## Backend

Det finns ett tillhörande backend-repo: [KawaiiCanvasApi](https://github.com/Monika-feg/KawaiiCanvasApi)

## Brancher och miljöer

- Använd **main**-branchen i både backend- och frontend-repo för lokal utveckling och testning.
- Använd **deploy**-branchen i både backend- och frontend-repo om du vill testa den deployade versionen.

Se till att Stripe-URL:er och API-anrop pekar rätt beroende på om du kör lokalt eller mot deployment.

## Funktioner

- Bläddra bland tavlor med bilder, pris och lagerstatus
- Liveuppdatering av lager (WebSocket)
- Varningar när lagret är lågt (”Endast X kvar!” blinkar)
- Lägg till i varukorg och beställ
- Betalning via Stripe
- Chatbot med kawaii-personlighet och fuzzy matching
- Responsiv och färgglad design

## Teknologier

- React (TypeScript)
- Vite
- Bootstrap
- Material UI
- WebSocket
- Stripe

## Kom igång

1. Klona repot:
   ```bash
   git clone https://github.com/Monika-feg/KawaiiCanvasClient.git
   ```
2. Gå till projektmappen:
   ```bash
   cd KawaiiCanvasClient/KawaiiCanvasClient
   ```
3. Installera beroenden:
   ```bash
   npm install
   ```
4. Starta utvecklingsservern:
   ```bash
   npm run dev
   ```

## Frontend-backend-integration

- Starta backend-servern (se backend-repo).
- Se till att API-anropen i frontend pekar mot rätt backend-url.
- För betalning, se till att Stripe-URL:er i backend och frontend matchar.

## Testa betalning med Stripe

För att testa köpflödet i utvecklingsmiljö:

1. Välj "kort" som betalningsmetod i Stripe-rutan.
2. Använd ett testmail (valfritt, t.ex. test@example.com).
3. Använd detta testkort:
   - **Kortnummer:** 4242 4242 4242 4242
   - **Utgångsdatum:** valfritt framtida datum, t.ex. 12/26
   - **CVC:** 123

Du behöver inte använda riktiga kortuppgifter – Stripe hanterar testköp automatiskt i utvecklingsläge.

## Kontakt

Byggd av Monika-feg. Kontakta mig gärna via GitHub!

---

_Projektet är ett hobby-/skolprojekt och inte en riktig butik._
