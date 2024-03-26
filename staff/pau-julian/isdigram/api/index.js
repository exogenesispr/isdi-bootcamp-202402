const fs = require('fs')

console.log('start')
try {

    fs.readFile('./users.json', 'utf8', (error, usersJson) => {
        if (error) {
            console.error(error)

            return
        }

        const users = JSON.parse(usersJson)

        const user = {
            name: 'Cal Vo',
            birthdate: '2004-01-01',
            email: 'cal@vo.com',
            username: 'calvo',
            password: 'calvo123',
            status: 'online',
            id: '8cweandh7u'
        }

        users.push(user)

        const usersJson2 = JSON.stringify(users)

        fs.writeFile('./users.json', usersJson2, (error) => {
            if (error) {
                console.error(error)

                return
            }

            console.log('end')
        })
    })
} catch (error) {
    console.error(error)
}

console.log('continue...')