# Vefforritun 2, 2022. Hópaverkefni 2: Matarkerfi

## Vefsíða

Verkefnið keyrir á vefsíðunni [https://vef2-2022-h2.vercel.app](https://vef2-2022-h2.vercel.app)

Notandi að síðu stjórnenda er `admin` og password hans `adminPassword`.

## Höfundar

- Benedikt Aron Ívarsson, [bai3@hi.is](mailto:bai3@hi.is)
  - github: [`Ben-Ivars`](https://github.com/Ben-Ivars)
- Björn Borgar Magnússon, [bbm5@hi.is](mailto:bbm5@hi.is)
  - github: [`BearPays`](https://github.com/BearPays)
- Fannar Steinn Aðalsteinsson, [fsa3@hi.is](mailto:fsa3@hi.is)
  - github: [`fsa3`](https://github.com/fsa3)
- Jón Gunnar Hannesson, [ jgh12@hi.is](mailto:jgh12@hi.is)
  - github: [`jongvnnar`](https://github.com/jongvnnar)

## Keyrsla

Dæmi um .env.local skrá sem þarf að hafa til að hægt sé að keyra forritið:

```
NEXT_PUBLIC_API_URL=https://vef2-2022-h1.herokuapp.com
NEXT_PUBLIC_WS_URL=wss://vef2-2022-h1.herokuapp.com
```

Til að keyra verkefni:

```
npm install
npm run setup
npm start
```

## Lint og prettier

Eslint er sett upp, hægt að keyra með:

```
yarn lint
```

Prettier er einnig sett upp. Hægt er að keyra með:

```
yarn prettier
```

## Test

Test eru stilt upp með [Cypress](https://www.cypress.io/)

Test eru keyrð með:

```
yarn run cypress open 
```
