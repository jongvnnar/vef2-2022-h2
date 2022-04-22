# Vefforritun 2, 2022. Hópaverkefni 1: Matarkerfi

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

ATH: notandi á gagnagrunn verður að vera með CREATE role fyrir gagnagrunninn svo uuid virki.

Til að keyra verkefni:

```
createdb vef2_h1
npm install
npm run setup
npm start
```

## Lint og prettier

Eslint er sett upp, hægt að keyra með:

```
npm run lint
```

Prettier er einnig sett upp. Hægt er að keyra með:

```
npm run prettier
```

## Test

Dæmi um .env.test skrá sem þarf að vera til staðar til þess að keyra test:

```
DATABASE_URL=postgres://:@localhost/vef2_h1_test
JWT_SECRET=kldkfaKW#JKQ"%#KLJ#LKQASDFjzlksdfjklajdlkajl
TOKEN_LIFETIME=3600
PORT=8020
BCRYPT_ROUNDS=12
CLOUDINARY_URL=cloudinary://293432196917864:_xCctAOa3zSBNjwcfJ-80j8ZiSA@doq8yuvyt
ADMIN_USER=admin
ADMIN_PASS=adminPassword
TEST_USER=jon
TEST_PASS=password
```

Test eru keyrð með:

```
createdb vef2_h1_test
npm run setup-test
#Eftirfarandi keyrt í öðru terminal
npm test
```

## Nokkur dæmi um köll með cURL

## Websocket

- Logga sig inn á WS fyrir admin

  - `ws://vef2-2022-h1.herokuapp.com/admin`
  - Header `Authorization: Bearer YOUR_TOKEN`

- Tengjast WS fyrir client
  - `ws://vef2-2022-h1.herokuapp.com/orders/e7b2a445-aa01-4166-b675-d4c0934b32b0`
