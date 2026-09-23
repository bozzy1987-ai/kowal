# Kowal — lokalna koncepcja strony

Nieoficjalna demonstracyjna strona szkoły jazdy Artur Kowal z Zawiercia. React, Vinext, CSS, Embla Carousel. Nie jest opublikowana w internecie.

## Uruchomienie

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 3000 --strictPort
```

http://localhost:3000

Sprawdzenie: `npm run build` i `npx tsc --noEmit`.

Slider: 3 sceny, automatyczna zmiana co 6,5 s, strzałki, klawiatura, gest przesuwania, pauza, zatrzymanie po uzyskaniu fokusu i przy najechaniu, respektowanie ograniczenia ruchu. Menu mobilne, nawigacja po sekcjach, telefon, e-mail i link do mapy. Bez pozornie działających formularzy.

Oferta, kontakt i lokalizacja pochodzą z https://naukajazdyzawiercie.pl/ . Przed ewentualnym wdrożeniem właściciel powinien potwierdzić aktualność kategorii, danych i oferty. Nie dodano fikcyjnych opinii, cen, terminów ani statystyk. Metadane noindex/nofollow.

## Fotografie ilustracyjne

Zdjęcia nie przedstawiają floty ani instruktorów szkoły. Licencja Pexels: https://www.pexels.com/license/

- `public/images/interior.jpg`: https://www.pexels.com/photo/hands-of-driver-on-steering-wheel-8388228/
- `public/images/motorcycle.jpg`: https://www.pexels.com/photo/motorcycle-on-the-road-5249397/
- `public/images/learner-car.png`: ilustracja wygenerowana wbudowanym narzędziem imagegen; białe auto szkoleniowe z niebieskim L, czarnymi felgami i limonkowymi akcentami. Nie przedstawia rzeczywistej floty szkoły. Pełny prompt: `image-prompt.txt`.

Pliki są zapisane lokalnie i zoptymalizowane.
