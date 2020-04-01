const fs  = require('fs')

const id = 1

fs.readFile('./data.json', 'utf-8', (err, data) => {
    if(err) {
        console.log(err) 
    } else { 
        const users = JSON.parse(data) 
        const user = users.find(user => user.id == id) 
        if(user) {
            console.log(user) 
        } else {
            console.log({})
        }
    }
})  