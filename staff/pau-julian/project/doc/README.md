# BOOST

## Intro

Fulfill a need in the game community to find cheaper and legal boosts & services.

![](https://media.giphy.com/media/MSTqntEzXV7BmCrhA7/giphy.gif?cid=790b7611teohudjwrj35k7xqz0r7q8b2k7s5eg5cwwxw2i3p&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional Description

### Use Cases

- Check prices for most communities on basic services:
    - Nova
    - Oblivion
    - Dawn
    - Sylvanas

- Allow create accounts to ease contact between customer and seller.
- Sorting offers depending on user selection of filters(Language, communities, users).
- Allow created accounts to update their price on 1 basic service (M10)

### UI DESIGN

TO - DO 

### Modules
- api (db + server logic)
- discord bot (db populate function + modify communities (admin tasks))
- app (client interface + client logic)
- com (common utils and tools)

### Technologies

- TypeScript
- React
- React-native
- Express
- Node
- Mongo / mongoose

### Data Model

- User 
    - id (req)
    - username (req)
    - password (req)
    - discord username (req)
    - language (EN/DE?/ES?/RU?/IT?/PT?)
    - price (req, object)
        - m10 (req)
            - value (req, number, default = 0)
            - lastEdited (req, date, default = onRegisterDate)
    - online (req, boolean)

- Community
    - id (req)
    - username (reserved name) ['Nova', 'Oblivion', 'Dawn', 'Sylvanas']
    - *password (not needed, admin operates this data)*
    - discord link (req)
    - price (req)
        - M10 price
            - value (req)
            - lastEdited (req)
        - raid VIP price
            - value (req)
            - lastEdited (req)
        - raid Unsaved price
            - value (req)
            - lastEdited (req)
        - raid Saved price
            - value (req)
            - lastEdited (req)