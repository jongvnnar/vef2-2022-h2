# .env.local

```
NEXT_PUBLIC_API_URL=https://vef2-2022-h1.herokuapp.com
NEXT_PUBLIC_WS_URL=wss://vef2-2022-h1.herokuapp.com
```

# Vefforritun 2, 2021, hópverkefni 2

[Kynning í fyrirlestri](https://youtu.be/).

Útfæra skal React framenda ofan á vefþjónustur úr hópverkefni 1.

Fyrir óauðkenndan notanda á að vera hægt að:

- skoða matseðil
- leið til að setja vörur af matseðli „í körfu“
- búa til pöntun
- fylgjast með stöðu pöntunar

Fyrir starfsmenn veitingastaðs/eldhús sem eru innskráðir er hægt að:

- sjá opnar pantanir
- breyta stöðum á pöntunum
- vinna með matseðil

## Virkni

Hægt er að útfæra á móti þeirri lausn sem hópur vann í hópverkefni 1, eða nýta [sýnilausn](https://vef2-2022-h1-synilausn.herokuapp.com/) á [hópverkefni 1](https://github.com/vefforritun/vef2-2022-h1-synilausn).

### Valmynd/haus

Valmynd í haus hefur tengla á:

- Forsíðu með titli vefs, t.d. `Vefforritunar veitingastaðurinn`
- Tengill á matseðil
- Karfa með fjölda vara sem eru í körfu, er tengill á körfusíðu

### Fótur

Í fæti er tengill á innskráningu fyrir starfsmenn í „bakvinnslu“.

### Forsíða

Forsíða hefur „statísk“ gögn með dummy content og mynd, setjið inn eigið með t.d. `lorem ipsum` texti og myndum frá [Unsplash](unsplash.com/).

### Matseðill

Birta skal allar vörur með síðuflettingu sjálfgefið. Þ.e.a.s. fyrir neðan vörur er hægt að ýta á takka/tengil til að skoða næstu síðu af vörum þar til búið er að skoða allar síður.

Fyrir hverja vöru er mynd, titill og verð birt. Einnig er hægt að bæta vöru í körfu eða smella á titil/mynd til að sjá nánari upplýsingar um vöru.

Fyrir ofan, eða til hliðar, skal birta flokka. Þegar smellt er á flokk skal birta aðeins þær vörur sem eru í þeim flokk.

Fyrir ofan, eða til hliðar skal birta leitarglugga sem leitar í matseðli. Ef leit er virk og smellt er á flokk skal leita innan þess flokks.

Ef smellt er á vöru er birt síða fyrir vöruna með lýsingu á henni ásamt öllum gögnum um vöru. Einnig tengill til að fara til baka í matseðil eða bæta í körfu.

### Karfa

Fyrir hverja vöru er hægt að setja vöru í körfu, þá er birt einhver tilkynning um að vara sé komin í körfu.

Á körfu síðu eru allar vörur í körfu birtar ásamt titli, mynd, verði, fjölda í körfu og samtals fyrir línu. Fyrir neðan allar línur eru birt summa verðs.

Aðgerð er til staðar á körfusíðunni sem breytir körfu yfir í pöntun þar sem fylla þarf inn nafn. Eftir að aðgerð er framkvæmd er farið yfir á pöntunarsíðu.

### Pöntun

Þegar pöntun er orðin til er staðfesting birt notanda. Opnuð er WebSocket tenging við bakenda sem tekur við uppfærslum á stöðu pöntunar. Birt er einhversskonar tilkynning um að beðið sé eftir uppfærslum.

Ef WebSocket tenging lokast er reynt að opna hana aftur.

### Notendaumsjón

Þegar farið er á bakvinnslusíðu er login gluggi, eftir login sem virkaði er token og upplýsingar um notanda vistað og notandi sendur á bakvinnslu síðu. Upplýsingar skal vista í localStorage. Möguleiki skal vera á að skrá sig út sem eyðir gögnum úr localStorage.

Ekki þarf að útfæra viðmót ofan á aðgerðir fyrir notendur:

- `GET` `/users`
- `GET` eða `PATCH` á `/users/:id`

### Bakvinnsla

Ef notandi er innskráður sem stjórnandi er hægt að:

- Búa til, eyða, breyta flokk
- Búa til, eyða, breyta vöru á matseðli
- Skoða lista af pöntunum og velja pöntun
- Fyrir opna pöntun, breyta stöðu ef staða er ekki komin í lokastöðu
- Fara á síðu sem birtir pantanir sem koma inn með því að tengjast WebSocket, þegar pöntun kemur inn skal vera hægt að opna hana til að breyta stöðu hennar

Stöður pöntunar eru:

- `NEW`, pöntun er komin inn en ekkert hefur verið gert
- `PREPARE`, pöntun er móttekin af starfsmönnum/eldhúsi og er í undirbúningi
- `COOKING`, verið er að elda það sem er í pöntun
- `READY`, pöntun er tilbúin til afhendingar til viðskiptvinar
- `FINISHED`, pöntun hefur verið afhend viðskiptavin

## Útlit

Setja skal upp einfalt, skalanlegt útlit fyrir vefinn. Mælst er til að nota grid og flexbox.

Leyfilegt er að nota Sass.

## Next.js og almenn virkni

Setja skal verkefnið upp með Next.js og TypeScript. Setja skal upp með _server-side rendering_.

Þegar kallað er í vefþjónustu skal birta loading state og bregðast við villum. Þar sem gögn geta verið tóm skal huga að empty state.

Ef síða finnst ekki skal birta 404 síðu.

Ef reynt er að skoða síðu sem ekki er heimild til að skoða skal birta að ekki sé heimild til að skoða.

## Tæki og tól

Setja skal upp eslint fyrir JavaScript. Engar villur skulu koma fram ef npm run lint er keyrt. Leyfilegt er að skilgreina hvaða reglusett er notað, ekki er krafa um að nota það sem hefur verið notað í öðrum verkefnum.

Skrifa skal a.m.k. fjögur test með [Cypress](https://www.cypress.io/). Í `README` skal tiltaka hvernig test eru keyrð.

## Hópavinna

Verkefnið skal unnið í hóp, helst með þremur einstaklingum. Hópar með tveim eða fjórum einstaklingum eru einnig í lagi, ekki er dregið úr kröfum fyrir færri í hóp en gerðar eru auknar kröfur ef fleiri en þrír einstaklingar eru í hóp.

Hægt er að auglýsa eftir hóp á slack á rásinni #vef2-2022-vantar-hóp.

Ekki er krafa um að vera í sama hóp og í hópverkefni 1.

Hafið samband við kennara ef ekki tekst eða ekki er mögulegt að vinna í hóp.

## README

Í rót verkefnis skal vera `README.md` skjal sem tilgreinir:

- Upplýsingar um hvernig setja skuli upp verkefnið
- Innskráning fyrir `admin` stjórnanda ásamt lykilorði
- Nöfn og notendanöfn allra í hóp

## Mat

- 10% Tæki, tól og test. README uppsett, verkefni keyrir á hýsingu
- 10% Almenn uppsetning á vef: útlit, haus, fótur og forsíða
- 30% Matseðill, karfa og pöntun
- 10% Innskráning og útskráning
- 30% Bakvinnsla
- 10% Websocket virkni fyrir pöntun og í bakvinnslu

## Sett fyrir

Verkefni sett fyrir í fyrirlestri miðvikudaginn 23. mars 2022.

## Skil

Tilnefna skal hópstjóra sem skráir sig í ákveðinn hóp undir „Hópverkefni 2“ í Canvas. Aðrir nemendur skrá sig í framhaldinu í sama hóp.

Hópstjóri skal skila fyrir hönd allra og skila skal í Canvas í seinasta lagi föstudaginn 22. apríl.

Skil skulu innihalda:

- GitHub notendanöfn allra (passa þarf að allir nemendur séu í hópnum!)
- Slóð á verkefni keyrandi á Heroku
- Slóð á GitHub repo fyrir verkefni. Dæmatímakennurum skal hafa verið boðið í repo. Notendanöfn þeirra eru:
  - `MarzukIngi`
  - `WhackingCheese`
  - `osk`

---

> Útgáfa 0.1

| Útgáfa | Breyting      |
| ------ | ------------- |
| 0.1    | Fyrsta útgáfa |
