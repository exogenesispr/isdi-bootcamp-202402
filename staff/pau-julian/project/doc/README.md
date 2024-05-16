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
- Offers sorted by price and displaying the cheapest Community.
- Allow created accounts to update their price on 1 basic service (Mythic 10)

### Modules
- Api (db + server logic)
- App (client interface + client logic) - created with React Native
- com (common utils and tools)
- discord bot (db populate function + modify communities (admin tasks)) -> Moved to future version

### Technologies

- TypeScript
- JavaScript
- React
- React-native + Expo
- Express
- Node + Cron (as a scheduler)
- Mongo / mongoose
- Moment (Date Formatter)

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