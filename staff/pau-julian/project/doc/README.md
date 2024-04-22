# BOOST

## Intro

Fulfill a need in the game community to find cheaper and legal Boosts & services.

![](https://media.giphy.com/media/MSTqntEzXV7BmCrhA7/giphy.gif?cid=790b7611teohudjwrj35k7xqz0r7q8b2k7s5eg5cwwxw2i3p&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional Description

### Use Cases

- Check prices for most communities on basic services:
    - Nova
    - Oblivion
    - Dawn
    - Sylvanas

- Allow create accounts to ease contact between customer and seller.
- Sorting offers depending on user selection of filters(Language, communities, particulars).
- Allow created accounts to update their price on 1 basic service (M10)


### UI DESIGN

TO - DO 

### Modules
- api (db + server logic)
- discord bot (db populate function)
- app (client interface + client logic)
- com (common utils and tools)

### Technologies

- TypeScript
- React
- Express
- Node
- Tailwind
- Mongo

### Data Model

- User 
    - id (req)
    - username (req)
    - password (req)
    - discord username (req)
    - battle.net username (req) //creo que no hace falta
    - language (FR?/DE?/ES?/EN/RU?/IT?/PO?)
    - M10 price (if blank: no price)
    - status (online/offline)
    - booster? (true/false) // NEED TO CHECK IT STILL


- Community
    - id (req)
    - username (reserved name)
    - password (not needed, admin operates this data)
    - discord link (req)
    - M10 price
    - HC VIP price
    - HC Unsaved price
    - HC Saved price


(maybe)
- Booster (shallow copy of a User if they choose to Boost)
    - id (req)
    - username
    - discord username
    - battle.net username
    - language
    - M10 price (req)
    - status (ONLY online)